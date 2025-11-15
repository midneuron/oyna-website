import Image from "next/image";
import { motion } from "framer-motion";
import { GeographyConfig } from "@/types/content";
import SectionHeading from "@/components/common/SectionHeading";
import { fadeInUp, staggerContainer } from "@/utils/motion";

interface GeographySectionProps {
  geography: GeographyConfig;
}

export const GeographySection = ({ geography }: GeographySectionProps) => (
  <section id="geography" className="relative overflow-hidden bg-gradient-to-br from-night via-night-deep to-night text-white">
    {/* Animated background elements */}
    <div className="absolute inset-0">
      <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-brand-teal/10 blur-3xl" />
      <div className="absolute left-0 bottom-1/4 h-96 w-96 rounded-full bg-brand-teal/5 blur-3xl" />
    </div>

    <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-16 px-6 py-20 lg:flex-row lg:items-center lg:py-24">
      <motion.div 
        className="flex-1 space-y-10"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
      >
        <SectionHeading
          eyebrow="reach"
          title={geography.title}
          description={geography.description}
          variant="light"
        />
        
        <div className="grid grid-cols-3 gap-6">
          {geography.stats.map((stat, index) => (
            <motion.div 
              key={stat.label} 
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-sm transition-all hover:border-brand-teal/30 hover:from-brand-teal/10"
              whileHover={{ scale: 1.05, y: -4 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="mt-2 text-xs font-medium text-white/80">{stat.label}</p>
              
              {/* Decorative glow */}
              <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-brand-teal/20 opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>

        <motion.ul
          className="flex flex-wrap gap-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {geography.coverage.map((city, index) => (
            <motion.li
              key={city}
              variants={fadeInUp}
              whileHover={{ scale: 1.1 }}
              className="group relative overflow-hidden rounded-full border-2 border-brand-teal/30 bg-brand-teal/10 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-brand-teal hover:bg-brand-teal/20"
            >
              <span className="relative z-10">{city}</span>
              {/* Animated background on hover */}
              <div className="absolute inset-0 -z-0 bg-gradient-to-r from-brand-teal/0 via-brand-teal/30 to-brand-teal/0 opacity-0 transition-opacity group-hover:opacity-100" />
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>

      <motion.div
        className="group relative flex-1"
        initial={{ opacity: 0, x: 40, rotateY: -15 }}
        whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8 }}
      >
        {/* Glowing effect */}
        <div className="absolute -inset-6 rounded-[48px] bg-gradient-to-r from-brand-teal/30 via-brand-teal/10 to-transparent opacity-50 blur-3xl transition-opacity group-hover:opacity-75" />
        
        <div className="relative overflow-hidden rounded-[40px] border-2 border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-4 shadow-2xl backdrop-blur-sm">
          <div className="overflow-hidden rounded-[32px]">
            <Image
              src={geography.map.src}
              alt={geography.map.alt}
              width={900}
              height={700}
              className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

export default GeographySection;

