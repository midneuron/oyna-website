import Image from "next/image";
import { motion } from "framer-motion";
import { AudienceConfig } from "@/types/content";
import SectionHeading from "@/components/common/SectionHeading";
import { fadeInUp, staggerContainer } from "@/utils/motion";

interface AudienceSectionProps {
  audiences: AudienceConfig;
}

export const AudienceSection = ({ audiences }: AudienceSectionProps) => (
  <section id="audiences" className="relative bg-white px-6 py-20">
    {/* Background decorative elements */}
    <div className="absolute left-0 top-1/4 h-96 w-96 rounded-full bg-brand-teal/5 blur-3xl" />
    <div className="absolute right-0 bottom-1/4 h-96 w-96 rounded-full bg-brand-teal/5 blur-3xl" />
    
    <div className="relative mx-auto max-w-7xl space-y-16">
      <SectionHeading
        eyebrow="audiences"
        title={audiences.title}
        description={audiences.subtitle}
        align="center"
      />

      <motion.div
        className="grid gap-8 lg:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        {audiences.cards.map((card, index) => (
          <motion.div
            key={card.id}
            variants={fadeInUp}
            whileHover={{ y: -12, scale: 1.02 }}
            className="group relative flex h-full flex-col overflow-hidden rounded-[36px] border border-slate/10 bg-gradient-to-br from-white to-ash/30 shadow-xl transition-all duration-500 hover:border-brand-teal/30 hover:shadow-2xl"
          >
            {/* Image at top with overlay effect */}
            <div className="relative h-56 flex-shrink-0 overflow-hidden">
              <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-white/90" />
              <Image
                src={card.media.src}
                alt={card.media.alt}
                width={500}
                height={400}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Badge overlay on image */}
              <div className="absolute right-4 top-4 z-20 rounded-full bg-night/90 px-4 py-2 text-xs font-bold text-white shadow-lg backdrop-blur-sm">
                {card.badge}
              </div>
            </div>

            <div className="relative flex flex-1 flex-col space-y-4 p-8">
              <h3 className="text-xl font-bold text-night transition-colors group-hover:text-brand-teal">
                {card.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate">
                {card.description}
              </p>
              <ul className="flex-1 space-y-3 pt-2">
                {card.benefits.map((benefit, idx) => (
                  <motion.li 
                    key={benefit} 
                    className="flex items-start gap-3 text-sm text-night/80"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + idx * 0.05 }}
                  >
                    <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-gradient-to-r from-brand-teal to-brand-teal/60" />
                    <span className="leading-relaxed">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Decorative gradient on hover */}
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-brand-teal/0 via-brand-teal to-brand-teal/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default AudienceSection;

