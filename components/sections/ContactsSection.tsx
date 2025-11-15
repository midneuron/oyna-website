import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactsConfig } from "@/types/content";
import SectionHeading from "@/components/common/SectionHeading";

const contactSchema = z.object({
  name: z.string().min(2),
  company: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(5),
  message: z.string().min(10),
});

type ContactFormValues = z.infer<typeof contactSchema>;

interface ContactSectionProps {
  contacts: ContactsConfig;
}

export const ContactsSection = ({ contacts }: ContactSectionProps) => (
  <section id="contacts" className="bg-night-deep px-6 py-16 text-white">
    <div className="mx-auto max-w-7xl space-y-10">
      <SectionHeading
        eyebrow="contact"
        title={contacts.title}
        description={contacts.description}
        align="center"
      />
      <div className="grid gap-6 lg:grid-cols-3">
        {contacts.forms.map((form) => (
          <ContactFormCard
            key={form.id}
            form={form}
            fields={contacts.fields}
            successMessage={contacts.successMessage}
            errorMessage={contacts.errorMessage}
            policy={contacts.policy}
          />
        ))}
      </div>
    </div>
  </section>
);

interface ContactFormCardProps {
  form: ContactsConfig["forms"][number];
  fields: ContactsConfig["fields"];
  successMessage: string;
  errorMessage: string;
  policy: string;
}

const ContactFormCard = ({
  form,
  fields,
  successMessage,
  errorMessage,
  policy,
}: ContactFormCardProps) => {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (values: ContactFormValues) => {
    setStatus("idle");
    try {
      await axios.post("/api/contact", { type: form.id, ...values });
      setStatus("success");
      reset();
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft"
    >
      <p className="text-xs uppercase tracking-[0.3em] text-brand-teal">{form.id}</p>
      <h3 className="mt-2 text-2xl font-semibold text-white">{form.title}</h3>
      <p className="text-sm text-white/70">{form.description}</p>
      <div className="mt-4 space-y-4">
        {fields.map((field) => {
          const error = errors[field.id]?.message;
          const commonProps = {
            id: `${form.id}-${field.id}`,
            ...register(field.id),
            placeholder: field.placeholder,
            className:
              "w-full rounded-2xl border border-white/20 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-brand-teal focus:outline-none",
          };

          return (
            <div key={field.id} className="space-y-1">
              <label htmlFor={commonProps.id} className="text-sm text-white/80">
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <textarea {...commonProps} rows={4} />
              ) : (
                <input type={field.type} {...commonProps} />
              )}
              {error ? <p className="text-xs text-red-300">{error as string}</p> : null}
            </div>
          );
        })}
      </div>
      <p className="mt-4 text-xs text-white/60">{policy}</p>
      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 rounded-full bg-brand-teal px-5 py-3 font-semibold text-night transition hover:brightness-110 disabled:opacity-60"
      >
        {isSubmitting ? "..." : form.cta}
      </button>
      <div className="mt-3 min-h-[1.5rem] text-sm">
        {status === "success" ? (
          <p className="text-emerald-300" role="status">
            {successMessage}
          </p>
        ) : null}
        {status === "error" ? (
          <p className="text-red-300" role="alert">
            {errorMessage}
          </p>
        ) : null}
      </div>
    </form>
  );
};

export default ContactsSection;


