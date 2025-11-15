"use client";

import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { NavigationConfig } from "@/types/content";
import { LanguageSwitcher } from "@/components/common/LanguageSwitcher";

interface HeaderProps {
  navigation: NavigationConfig;
}

export const Header = ({ navigation }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-night/90 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-4 text-white">
        {/* Logo */}
        <Link href="/" className="z-50 flex items-center gap-2 text-lg font-bold tracking-tight text-white">
          <span>{navigation.logo}</span>
          <span className="hidden text-sm font-medium text-white/60 sm:inline">{navigation.tagline}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex lg:flex-1 lg:justify-center">
          <ul className="flex items-center gap-1 text-sm text-white/80">
            {navigation.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-full px-4 py-2 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop CTA & Language Switcher */}
        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <Link
            href={navigation.cta.href}
            className="rounded-full bg-brand-teal px-5 py-2.5 text-sm font-semibold text-night shadow-lg shadow-brand-teal/40 transition hover:brightness-110"
          >
            {navigation.cta.label}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="z-50 flex flex-col items-center justify-center gap-1.5 p-2 lg:hidden"
          aria-label="Toggle menu"
        >
          <span
            className={clsx(
              "h-0.5 w-6 bg-white transition-all duration-300",
              mobileMenuOpen && "translate-y-2 rotate-45"
            )}
          />
          <span
            className={clsx(
              "h-0.5 w-6 bg-white transition-all duration-300",
              mobileMenuOpen && "opacity-0"
            )}
          />
          <span
            className={clsx(
              "h-0.5 w-6 bg-white transition-all duration-300",
              mobileMenuOpen && "-translate-y-2 -rotate-45"
            )}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[73px] z-40 overflow-hidden border-b border-white/10 bg-night/95 backdrop-blur-xl lg:hidden"
          >
            <nav className="mx-auto max-w-7xl px-6 py-8">
              <ul className="space-y-2">
                {navigation.links.map((link, index) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={closeMobileMenu}
                      className="block rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-base font-medium text-white transition-all hover:border-brand-teal/50 hover:bg-brand-teal/10"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-6 space-y-4 border-t border-white/10 pt-6">
                <div className="flex justify-center">
                  <LanguageSwitcher />
                </div>
                <Link
                  href={navigation.cta.href}
                  onClick={closeMobileMenu}
                  className="block rounded-full bg-brand-teal px-6 py-4 text-center text-base font-semibold text-night shadow-lg shadow-brand-teal/40 transition hover:brightness-110"
                >
                  {navigation.cta.label}
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

