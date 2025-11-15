import { useRouter } from "next/router";
import clsx from "clsx";
import type { Locale } from "@/types/content";

const locales: Locale[] = ["ru", "en"];

export const LanguageSwitcher = () => {
  const router = useRouter();

  const handleLocaleChange = (locale: Locale) => {
    router.push(router.asPath, router.asPath, { locale, scroll: false });
  };

  return (
    <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm text-white backdrop-blur">
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => handleLocaleChange(locale)}
          className={clsx(
            "px-2 py-0.5 transition-colors",
            router.locale === locale ? "text-brand-teal font-semibold" : "text-white/70 hover:text-white"
          )}
          aria-label={`Switch to ${locale.toUpperCase()}`}
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;

