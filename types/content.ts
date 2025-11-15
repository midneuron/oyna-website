export type Locale = "ru" | "en";

export interface MetaConfig {
  title: string;
  description: string;
  keywords: string[];
  ogImage: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface NavigationConfig {
  logo: string;
  tagline: string;
  links: NavLink[];
  cta: {
    label: string;
    href: string;
  };
}

export interface Metric {
  value: string;
  label: string;
  description?: string;
}

export interface HeroConfig {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
  media: {
    src: string;
    alt: string;
  };
  astanaHub: {
    logo: string;
    text: string;
  };
  metrics: Metric[];
}

export interface AboutConfig {
  title: string;
  description: string;
  highlights: {
    title: string;
    text: string;
  }[];
}

export interface FeatureCard {
  title: string;
  description: string;
  bullets: string[];
}

export interface FeatureConfig {
  title: string;
  subtitle: string;
  cards: FeatureCard[];
}

export interface TabletCard {
  title: string;
  description: string;
  media: {
    src: string;
    alt: string;
  };
  tags: string[];
}

export interface TabletConfig {
  title: string;
  subtitle: string;
  cards: TabletCard[];
}

export interface AudienceCard {
  id: "passengers" | "advertisers" | "fleets";
  title: string;
  description: string;
  benefits: string[];
  badge: string;
  media: {
    src: string;
    alt: string;
  };
}

export interface AudienceConfig {
  title: string;
  subtitle: string;
  cards: AudienceCard[];
}

export interface GeographyConfig {
  title: string;
  description: string;
  stats: Metric[];
  coverage: string[];
  map: {
    src: string;
    alt: string;
  };
}

export interface Award {
  year: string;
  title: string;
  description: string;
}

export interface AwardsConfig {
  title: string;
  subtitle: string;
  awards: Award[];
  media: {
    src: string;
    alt: string;
  };
}

export interface CompanyConfig {
  title: string;
  description: string;
  milestones: Metric[];
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  expertise: string[];
}

export interface TeamConfig {
  title: string;
  subtitle: string;
  members: TeamMember[];
}

export interface ContactField {
  id: "name" | "company" | "email" | "phone" | "message";
  label: string;
  placeholder: string;
  type: "text" | "email" | "tel" | "textarea";
}

export interface ContactFormConfig {
  id: "advertiser" | "partner" | "fleet";
  title: string;
  description: string;
  cta: string;
}

export interface ContactsConfig {
  title: string;
  description: string;
  forms: ContactFormConfig[];
  successMessage: string;
  errorMessage: string;
  policy: string;
  fields: ContactField[];
}

export interface FooterConfig {
  tagline: string;
  rights: string;
  links: NavLink[];
}

export interface SiteDictionary {
  meta: MetaConfig;
  navigation: NavigationConfig;
  hero: HeroConfig;
  about: AboutConfig;
  features: FeatureConfig;
  tablet: TabletConfig;
  audiences: AudienceConfig;
  geography: GeographyConfig;
  awards: AwardsConfig;
  company: CompanyConfig;
  team: TeamConfig;
  contacts: ContactsConfig;
  footer: FooterConfig;
}

