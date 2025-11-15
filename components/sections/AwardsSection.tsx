import Image from "next/image";
import { motion } from "framer-motion";
import { AwardsConfig } from "@/types/content";
import SectionHeading from "@/components/common/SectionHeading";
import { fadeInUp, staggerContainer } from "@/utils/motion";

interface AwardsSectionProps {
  awards: AwardsConfig;
}

export const AwardsSection = ({ awards }: AwardsSectionProps) => (
  <section id="awards" className="relative overflow-hidden bg-gradient-to-b from-white to-ash/30 px-6 py-20">
    <div className="mx-auto max-w-7xl space-y-16">
      <SectionHeading
        eyebrow="awards"
        title={awards.title}
        description={awards.subtitle}
      />
      <div className="grid gap-8 lg:grid-cols-[1.5fr,1fr]">
        <motion.div
          className="space-y-4 rounded-[36px] border border-slate/10 bg-gradient-to-br from-white to-ash/50 p-8 shadow-xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {awards.awards.map((award, index) => (
            <motion.div
              key={award.title}
              variants={fadeInUp}
              whileHover={{ x: 8 }}
              className="group relative overflow-hidden rounded-2xl border border-slate/10 bg-white p-6 shadow-md transition-all duration-300 hover:border-brand-teal/30 hover:shadow-lg"
            >
              {/* Year badge */}
              <div className="absolute right-6 top-6 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand-teal to-brand-teal/80 text-sm font-bold text-white shadow-lg">
                {award.year}
              </div>
              
              <div className="space-y-2 pr-20">
                <h4 className="text-lg font-bold text-night transition-colors group-hover:text-brand-teal">
                  {award.title}
                </h4>
                <p className="text-xs leading-relaxed text-slate">
                  {award.description}
                </p>
              </div>

              {/* Decorative accent */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-brand-teal to-transparent transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </motion.div>

        {/* Image side */}
        <motion.div
          className="group relative"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <div className="sticky top-24 overflow-hidden rounded-[36px] border border-slate/10 bg-gradient-to-br from-white to-slate/5 p-4 shadow-xl">
            <div className="overflow-hidden rounded-3xl">
              <Image
                src={awards.media.src}
                alt={awards.media.alt}
                width={800}
                height={1000}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default AwardsSection;

