import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { HeroConfig } from "@/types/content";
import { fadeInUp, staggerContainer } from "@/utils/motion";

interface HeroSectionProps {
  hero: HeroConfig;
}

export const HeroSection = ({ hero }: HeroSectionProps) => (
  <section id="hero" className="relative overflow-hidden bg-gradient-to-br from-night via-night-deep to-night text-white">
    {/* Animated background elements */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-1/2 -right-1/4 h-[800px] w-[800px] rounded-full bg-brand-teal/10 blur-3xl" />
      <div className="absolute -bottom-1/2 -left-1/4 h-[600px] w-[600px] rounded-full bg-brand-teal/5 blur-3xl" />
    </div>

    <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-16 px-6 py-20 lg:flex-row lg:items-center lg:py-24">
      <motion.div
        className="flex-1 space-y-8"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <motion.p
            variants={fadeInUp}
            className="inline-flex rounded-full border border-brand-teal/30 bg-brand-teal/10 px-5 py-2 text-sm font-medium uppercase tracking-[0.2em] text-brand-teal backdrop-blur-sm"
          >
            {hero.badge}
          </motion.p>
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-3 rounded-2xl border border-white/30 bg-white/90 px-4 py-2.5 shadow-lg backdrop-blur-sm transition-all hover:bg-white hover:shadow-xl"
          >
            <div className="relative h-10 w-10 flex-shrink-0">
              <Image
                src={hero.astanaHub.logo}
                alt="Astana Hub"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-sm font-semibold text-night">
              {hero.astanaHub.text}
            </span>
          </motion.div>
        </div>
        <motion.h1 
          variants={fadeInUp} 
          className="text-3xl font-bold leading-tight md:text-4xl lg:text-5xl"
        >
          {hero.title}
        </motion.h1>
        <motion.p variants={fadeInUp} className="text-lg leading-relaxed text-white/90">
          {hero.subtitle}
        </motion.p>
        <motion.p variants={fadeInUp} className="text-sm leading-relaxed text-white/70">
          {hero.description}
        </motion.p>
        <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 pt-2">
          <Link
            href={hero.primaryCta.href}
            className="group rounded-full bg-brand-teal px-8 py-4 font-semibold text-night shadow-xl shadow-brand-teal/30 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-brand-teal/40"
          >
            {hero.primaryCta.label}
          </Link>
          <Link
            href={hero.secondaryCta.href}
            className="group rounded-full border-2 border-white/30 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/60 hover:bg-white/10"
          >
            {hero.secondaryCta.label}
          </Link>
        </motion.div>
        <motion.div
          variants={fadeInUp}
          className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 backdrop-blur-xl"
        >
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {hero.metrics.map((metric, index) => (
              <motion.div 
                key={metric.label} 
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-transparent p-5 transition-all hover:from-brand-teal/20 hover:to-brand-teal/5"
                whileHover={{ scale: 1.05 }}
                transition={{ delay: index * 0.1 }}
              >
                <p className="text-2xl font-bold text-white">{metric.value}</p>
                <p className="mt-1 text-xs font-medium text-white/80">{metric.label}</p>
                {metric.description ? (
                  <p className="mt-1 text-[10px] text-white/60">{metric.description}</p>
                ) : null}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="flex flex-1 justify-center lg:justify-end"
        initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <div className="group relative w-full max-w-xl">
          {/* Glowing effect behind video */}
          <div className="absolute -inset-4 rounded-[48px] bg-gradient-to-r from-brand-teal/40 via-brand-teal/20 to-transparent opacity-75 blur-2xl transition-opacity group-hover:opacity-100" />
          
          <div className="relative overflow-hidden rounded-[44px] border-2 border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-3 shadow-2xl backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-radial from-brand-teal/30 via-transparent to-transparent opacity-50" />
            {hero.media.src.endsWith('.mp4') || hero.media.src.endsWith('.webm') ? (
              <video
                src={hero.media.src}
                autoPlay
                loop
                muted
                playsInline
                className="relative rounded-[36px] w-full h-auto shadow-xl"
              />
            ) : (
              <Image
                src={hero.media.src}
                alt={hero.media.alt}
                width={900}
                height={900}
                priority
                className="relative rounded-[36px] shadow-xl"
              />
            )}
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;

