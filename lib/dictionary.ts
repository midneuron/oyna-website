import type { Locale, SiteDictionary } from "@/types/content";

const dictionaries: Record<Locale, () => Promise<SiteDictionary>> = {
  ru: () => import("@/locales/ru").then((module) => module.default),
  en: () => import("@/locales/en").then((module) => module.default),
};

export const getDictionary = async (locale: Locale = "ru"): Promise<SiteDictionary> => {
  const loadDictionary = dictionaries[locale] ?? dictionaries.ru;
  return loadDictionary();
};


