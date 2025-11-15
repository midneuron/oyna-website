import { SiteDictionary } from "@/types/content";

const enDictionary: SiteDictionary = {
  meta: {
    title: "Oyna — media platform inside taxis",
    description:
      "Oyna is the largest in-taxi tablet media network in Kazakhstan. A data-driven platform for advertisers, passengers, and taxi fleets.",
    keywords: [
      "in taxi advertising",
      "oyna media",
      "interactive tablets",
      "digital out of home",
      "adtech kazakhstan",
    ],
    ogImage: "/images/oyna-main-screen.png",
  },
  navigation: {
    logo: "Oyna Development",
    tagline: "Media in motion",
    links: [
      { label: "Platform", href: "#platform" },
      { label: "Features", href: "#features" },
      { label: "Audiences", href: "#audiences" },
      { label: "Reach", href: "#geography" },
      { label: "Team", href: "#team" },
      { label: "Contacts", href: "#contacts" },
    ],
    cta: {
      label: "Launch a campaign",
      href: "#contacts",
    },
  },
  hero: {
    badge: "High-impact in-taxi media",
    title: "Oyna is the leading media platform inside Kazakhstani taxis",
    subtitle:
      "Branded tablets plus analytics connect brands, passengers, and fleets in one predictable channel.",
    description:
      "Install Oyna tablets to turn every ride into a measurable, personalized story with precise targeting.",
    primaryCta: {
      label: "Get the media kit",
      href: "#contacts",
    },
    secondaryCta: {
      label: "Connect your fleet",
      href: "#contacts",
    },
    media: {
      src: "/images/Oyna Intro.mp4",
      alt: "Oyna tablet interface",
    },
    astanaHub: {
      logo: "/images/Astana-hub logo.avif",
      text: "Astana Hub Member",
    },
    metrics: [
      {
        value: "600+",
        label: "active cars",
        description: "premium taxi partners equipped with tablets",
      },
      {
        value: "3",
        label: "cities",
        description: "Almaty, Astana, Shymkent",
      },
      {
        value: "98%",
        label: "attention",
        description: "eye-tracking verified passenger focus",
      },
      {
        value: "2.1x",
        label: "higher CTR",
        description: "vs. average in-app formats",
      },
    ],
  },
  about: {
    title: "An ecosystem for advertisers and taxi fleets",
    description:
      "We build hardware, software, and content delivery tools so brands control messaging while fleets unlock new revenue. All performance data lives in one dashboard.",
    highlights: [
      {
        title: "End-to-end technology",
        text: "In-house software, MDM, telemetry, and playlist engine.",
      },
      {
        title: "Flexible formats",
        text: "4K video, interactive stories, surveys, QR-to-Action, rich media.",
      },
      {
        title: "Rapid scale",
        text: "Launch a new city within 3 weeks via partner network.",
      },
    ],
  },
  features: {
    title: "Platform capabilities",
    subtitle:
      "Each tablet acts as a smart media device with dynamic content and analytics.",
    cards: [
      {
        title: "Smart playlisting",
        description:
          "Automatic creative delivery by city, time of day, and ride segment.",
        bullets: [
          "up to 12 scenarios per campaign",
          "geo-based pausing",
          "interactive modules",
        ],
      },
      {
        title: "Live analytics",
        description:
          "Monitor impressions, device status, and KPI fulfillment in real time.",
        bullets: [
          "brand-facing dashboards",
          "webhooks & BI exports",
          "automated SLA alerts",
        ],
      },
      {
        title: "Quality control",
        description:
          "MDM tracks brightness, battery, and access while support teams stay online 24/7.",
        bullets: [
          "remote reboot",
          "incident auto-logging",
          "service playbooks",
        ],
      },
    ],
  },
  tablet: {
    title: "Oyna tablets",
    subtitle: "Rugged LTE devices with signature UI and security by design.",
    cards: [
      {
        title: "Passenger experience",
        description:
          "Personalized mixes of content, routes, recommendations, and service widgets.",
        media: { src: "/images/Oyna_interfeys.png", alt: "Passenger interface" },
        tags: ["UX research", "offline cache", "motion design"],
      },
      {
        title: "Engaging advertising",
        description:
          "Playable mechanics, QR activations, lead forms, and coupons in one tap.",
        media: { src: "/images/Addvert-on-tablet.jpeg", alt: "Interactive advertising" },
        tags: ["Rich media", "A/B testing", "Realtime"],
      },
    ],
  },
  audiences: {
    title: "Value for every audience",
    subtitle:
      "We combine premium entertainment, measurable impact, and new monetization.",
    cards: [
      {
        id: "passengers",
        title: "Passengers",
        description:
          "Entertainment on the go, useful recommendations, and business-class service.",
        benefits: [
          "Personal playlists & live widgets",
          "Interactive & offline stories",
          "Taxi loyalty mechanics",
        ],
        badge: "NPS 4.9/5",
        media: { src: "/images/In-Taxi.jpeg", alt: "Passenger interface" },
      },
      {
        id: "advertisers",
        title: "Advertisers",
        description:
          "High reach with guaranteed contact and transparent measurement.",
        benefits: [
          "Video + interactive scenarios",
          "CDP & pixel integrations",
          "Attribution & brand-lift studies",
        ],
        badge: "CTR up to 4.8%",
        media: { src: "/images/oyna_advert_on_screen.png", alt: "Media platform" },
      },
      {
        id: "fleets",
        title: "Taxi fleets",
        description:
          "Additional revenue and premium differentiation with minimal overhead.",
        benefits: [
          "Fixed payouts per device",
          "24/7 maintenance and support",
          "Driver training & QA standards",
        ],
        badge: "+25% ARPU",
        media: { src: "/images/tablet.jpeg", alt: "Taxi fleet" },
      },
    ],
  },
  geography: {
    title: "Coverage & growth",
    description:
      "Partnerships with top aggregators and fleets power our expansion.",
    stats: [
      { value: "600+", label: "tablets deployed" },
      { value: "3", label: "cities live" },
      { value: "35 d", label: "launch cycle" },
    ],
    coverage: ["Almaty", "Astana", "Shymkent"],
    map: {
      src: "/images/oyna_screen.png",
      alt: "Oyna coverage map",
    },
  },
  awards: {
    title: "Awards & recognition",
    subtitle: "Oyna appears in regional digital and tech shortlists every year.",
    awards: [
      {
        year: "2024",
        title: "Ozimiz IT Awards",
        description: "Best AdTech product in Kazakhstan.",
      },
      {
        year: "2023",
        title: "TechOrda Showcase",
        description: "Innovative service in Smart Mobility.",
      },
      {
        year: "2023",
        title: "AdAsia Local Stars",
        description: "Top-ranked FMCG brand case.",
      },
    ],
    media: { src: "/images/Addvert-on-tablet.jpeg", alt: "Oyna trophies" },
  },
  company: {
    title: "Oyna Development",
    description:
      "An independent technology company building tools for smart city mobility and transportation media.",
    milestones: [
      { value: "2023", label: "platform launch" },
      { value: "120%", label: "YoY revenue growth" },
      { value: "40+", label: "experts on the team" },
    ],
  },
  team: {
    title: "Founding team",
    subtitle: "AdTech and product leaders shaping the market.",
    members: [
      {
        name: "Akzol Zhumagulov",
        role: "CEO & Co-founder",
        bio: "Owns strategy, partnerships, and product scale.",
        image: "/images/Akzhol-Zhumagulov.jpeg",
        expertise: ["Strategy", "BizDev", "Product Vision"],
      },
      {
        name: "Timur Tai",
        role: "COO & Co-founder",
        bio: "Leads operations, quality assurance, and city launches.",
        image: "/images/Timur-Tai.jpeg",
        expertise: ["Operations", "Quality", "People"],
      },
      {
        name: "Okubay Temudjin",
        role: "CTO & Co-founder",
        bio: "Designs architecture, device management, and analytics.",
        image: "/images/Okubay Temudjin.png",
        expertise: ["Engineering", "Data", "Security"],
      },
    ],
  },
  contacts: {
    title: "Talk to Oyna",
    description:
      "Choose the scenario and we will respond within one business day. Email + Telegram alerts keep the loop instant.",
    forms: [
      {
        id: "advertiser",
        title: "Launch a campaign",
        description: "Request a tailored media plan and industry cases.",
        cta: "Request proposal",
      },
      {
        id: "partner",
        title: "Become a partner",
        description: "Pitch co-projects, content integrations, or events.",
        cta: "Discuss partnership",
      },
      {
        id: "fleet",
        title: "Connect a fleet",
        description: "Learn tablet rollout terms and monetization program.",
        cta: "Connect fleet",
      },
    ],
    successMessage: "Thank you! The team will get back within 24 hours.",
    errorMessage: "We could not send the form. Please retry or ping us on Telegram.",
    policy: "By sending the form you agree with the Oyna privacy policy.",
    fields: [
      {
        id: "name",
        label: "Full name",
        placeholder: "Aigerim Akhmetova",
        type: "text",
      },
      {
        id: "company",
        label: "Company",
        placeholder: "Brand / Taxi Fleet / Agency",
        type: "text",
      },
      {
        id: "email",
        label: "Email",
        placeholder: "you@company.com",
        type: "email",
      },
      {
        id: "phone",
        label: "Phone or Telegram",
        placeholder: "+7 777 000 00 00",
        type: "tel",
      },
      {
        id: "message",
        label: "Comment",
        placeholder: "Describe the task or campaign scenario",
        type: "textarea",
      },
    ],
  },
  footer: {
    tagline: "Oyna — media in motion. Connecting brands and passengers.",
    rights: "© 2025 Oyna Development. All rights reserved.",
    links: [
      { label: "Privacy policy", href: "/privacy" },
      { label: "Instagram", href: "https://www.instagram.com/oyna_app/" },
    ],
  },
};

export default enDictionary;

