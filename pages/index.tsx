import Head from "next/head";
import type { GetServerSideProps } from "next";
import { getDictionary } from "@/lib/dictionary";
import type { Locale, SiteDictionary } from "@/types/content";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import TabletSection from "@/components/sections/TabletSection";
import AudienceSection from "@/components/sections/AudienceSection";
import GeographySection from "@/components/sections/GeographySection";
import AwardsSection from "@/components/sections/AwardsSection";
import CompanySection from "@/components/sections/CompanySection";
import TeamSection from "@/components/sections/TeamSection";
import ContactsSection from "@/components/sections/ContactsSection";

interface HomeProps {
  dictionary: SiteDictionary;
  locale: Locale;
}

export default function Home({ dictionary, locale }: HomeProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://oyna.dev";

  return (
    <>
      <Head>
        <title>{dictionary.meta.title}</title>
        <meta name="description" content={dictionary.meta.description} />
        <meta name="keywords" content={dictionary.meta.keywords.join(", ")} />
        <meta property="og:title" content={dictionary.meta.title} />
        <meta property="og:description" content={dictionary.meta.description} />
        <meta property="og:image" content={dictionary.meta.ogImage} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content={locale} />
        {[
          { locale: "ru", href: siteUrl },
          { locale: "en", href: `${siteUrl}/en` },
        ].map((entry) => (
          <link key={entry.locale} rel="alternate" hrefLang={entry.locale} href={entry.href} />
        ))}
      </Head>
      <div key={locale} className="bg-ash text-night">
        <Header navigation={dictionary.navigation} />
        <main>
          <HeroSection key={`hero-${locale}`} hero={dictionary.hero} />
          <AboutSection key={`about-${locale}`} about={dictionary.about} />
          <FeaturesSection key={`features-${locale}`} features={dictionary.features} />
          <TabletSection key={`tablet-${locale}`} tablet={dictionary.tablet} />
          <AudienceSection key={`audiences-${locale}`} audiences={dictionary.audiences} />
          <GeographySection key={`geography-${locale}`} geography={dictionary.geography} />
          <AwardsSection key={`awards-${locale}`} awards={dictionary.awards} />
          <CompanySection key={`company-${locale}`} company={dictionary.company} />
          <TeamSection key={`team-${locale}`} team={dictionary.team} />
          <ContactsSection key={`contacts-${locale}`} contacts={dictionary.contacts} />
        </main>
        <Footer footer={dictionary.footer} />
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async ({ locale, res }) => {
  const currentLocale = (locale as Locale) ?? "ru";
  const dictionary = await getDictionary(currentLocale);
  
  // Кэширование на 1 час для улучшения производительности
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=3600, stale-while-revalidate=7200'
  );
  
  return {
    props: { 
      dictionary,
      locale: currentLocale,
    },
  };
};
