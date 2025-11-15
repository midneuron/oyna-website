import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  i18n: {
    locales: ["ru", "en"],
    defaultLocale: "ru",
  },
};

export default nextConfig;
