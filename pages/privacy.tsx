import Head from "next/head";
import type { GetServerSideProps } from "next";
import Link from "next/link";
import { getDictionary } from "@/lib/dictionary";
import type { Locale, SiteDictionary } from "@/types/content";

const privacyCopy = {
  ru: {
    title: "Политика конфиденциальности Oyna",
    paragraphs: [
      "Мы собираем только ту информацию, которая необходима для обработки заявок и улучшения сервиса. Контактные данные используются для обратной связи и не передаются третьим лицам без вашего согласия.",
      "Доступ к данным ограничен командой Oyna Development. Передача сведений в аналитические системы выполняется в обезличенном виде и соответствует требованиям законодательства Республики Казахстан.",
      "Вы можете запросить удаление или обновление персональной информации, написав на privacy@oyna.dev. Мы отвечаем на все запросы в течение 10 рабочих дней.",
    ],
  },
  en: {
    title: "Oyna Privacy Policy",
    paragraphs: [
      "We only collect the information required to process requests and improve the service. Contact details are used solely for follow-up communication and are never shared with third parties without consent.",
      "Data access is restricted to the Oyna Development team. Any transfer to analytics platforms is aggregated and anonymized to stay compliant with Kazakhstan regulations.",
      "You can request deletion or updates of your personal data by emailing privacy@oyna.dev. We respond to every request within 10 business days.",
    ],
  },
};

interface PrivacyProps {
  dictionary: SiteDictionary;
  locale: Locale;
}

export default function PrivacyPage({ dictionary, locale }: PrivacyProps) {
  const copy = privacyCopy[locale];

  return (
    <>
      <Head>
        <title>{copy.title}</title>
        <meta name="robots" content="noindex" />
      </Head>
      <main className="min-h-screen bg-ash px-6 py-16 text-night">
        <div className="mx-auto max-w-4xl space-y-6 rounded-3xl border border-slate/10 bg-white p-8 shadow-soft">
          <p className="text-sm font-semibold text-night/60">{dictionary.navigation.logo}</p>
          <p className="text-sm uppercase tracking-[0.3em] text-brand-teal">privacy</p>
          <h1 className="text-3xl font-bold">{copy.title}</h1>
          {copy.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-base text-slate">
              {paragraph}
            </p>
          ))}
          <Link href="/" className="inline-flex text-brand-teal">
            ← {locale === "ru" ? "Вернуться на главную" : "Back to homepage"}
          </Link>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<PrivacyProps> = async ({ locale, res }) => {
  const currentLocale = (locale as Locale) ?? "ru";
  const dictionary = await getDictionary(currentLocale);
  
  // Кэширование на 1 час
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=3600, stale-while-revalidate=7200'
  );
  
  return {
    props: { dictionary, locale: currentLocale },
  };
};

