import Link from "next/link";
import { FooterConfig } from "@/types/content";

interface FooterProps {
  footer: FooterConfig;
}

export const Footer = ({ footer }: FooterProps) => (
  <footer className="bg-black px-6 py-12 text-white" id="footer">
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-lg font-semibold">{footer.tagline}</p>
        <p className="text-sm text-white/60">{footer.rights}</p>
      </div>
      <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
        {footer.links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="rounded-full border border-white/20 px-4 py-1 transition hover:border-brand-teal hover:text-white"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;


