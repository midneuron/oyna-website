import Image from "next/image";
import { motion } from "framer-motion";
import { TabletConfig } from "@/types/content";
import SectionHeading from "@/components/common/SectionHeading";
import { fadeInUp, staggerContainer } from "@/utils/motion";

interface TabletSectionProps {
  tablet: TabletConfig;
}

export const TabletSection = ({ tablet }: TabletSectionProps) => {
  if (!tablet || !tablet.cards) {
    return null;
  }

  return (
    <section id="tablets" className="relative overflow-hidden bg-gradient-to-b from-ash to-white px-6 py-20">
      <div className="mx-auto max-w-7xl space-y-16">
        <SectionHeading
          eyebrow="tablets"
          title={tablet.title}
          description={tablet.subtitle}
        />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="grid gap-8 md:grid-cols-2"
        >
          {tablet.cards.map((card, index) => (
            <motion.div
              key={`${card.title}-${index}`}
              variants={fadeInUp}
              whileHover={{ y: -8 }}
              className="group relative flex h-full flex-col overflow-hidden rounded-[36px] border border-slate/10 bg-white p-8 shadow-xl transition-all duration-500 hover:border-brand-teal/30 hover:shadow-2xl"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-teal/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate/5 to-transparent p-2 shadow-lg">
                <div className="overflow-hidden rounded-2xl">
                  <Image
                    src={card.media.src}
                    alt={card.media.alt}
                    width={900}
                    height={700}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </div>

              <div className="relative mt-6 flex flex-1 flex-col space-y-3">
                <h3 className="text-xl font-bold text-night transition-colors group-hover:text-brand-teal">
                  {card.title}
                </h3>
                <p className="flex-1 text-sm leading-relaxed text-slate">
                  {card.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {card.tags?.map((tag, tagIndex) => (
                    <span
                      key={`${tag}-${tagIndex}`}
                      className="rounded-full bg-gradient-to-r from-brand-teal/10 to-brand-teal/5 px-4 py-1.5 text-sm font-medium text-brand-teal ring-1 ring-brand-teal/20 transition-all hover:ring-brand-teal/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TabletSection;

