import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import nodemailer from "nodemailer";
import { z } from "zod";

const contactSchema = z.object({
  type: z.enum(["advertiser", "partner", "fleet"]),
  name: z.string().min(2),
  company: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(5),
  message: z.string().min(10),
});

type ContactPayload = z.infer<typeof contactSchema>;

const buildEmailBody = (payload: ContactPayload) => `
Новая заявка: ${payload.type}
Имя: ${payload.name}
Компания: ${payload.company}
Email: ${payload.email}
Телефон: ${payload.phone}
Комментарий:
${payload.message}
`;

const sendEmailNotification = async (payload: ContactPayload) => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, CONTACT_INBOX } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASSWORD || !CONTACT_INBOX) {
    return;
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `"Oyna Website" <${SMTP_USER}>`,
    to: CONTACT_INBOX,
    subject: `Новая заявка: ${payload.type}`,
    text: buildEmailBody(payload),
  });
};

const sendTelegramNotification = async (payload: ContactPayload) => {
  const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = process.env;
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    return;
  }

  const text = buildEmailBody(payload);
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  await axios.post(url, {
    chat_id: TELEGRAM_CHAT_ID,
    text,
    parse_mode: "HTML",
  });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "METHOD_NOT_ALLOWED" });
  }

  const parsed = contactSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "INVALID_DATA", details: parsed.error.flatten() });
  }

  try {
    await Promise.all([
      sendEmailNotification(parsed.data),
      sendTelegramNotification(parsed.data),
    ]);
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "DELIVERY_FAILED" });
  }
}

