import { motion } from "framer-motion";
import { FeatureConfig } from "@/types/content";
import SectionHeading from "@/components/common/SectionHeading";
import { fadeInUp, staggerContainer } from "@/utils/motion";

interface FeaturesSectionProps {
  features: FeatureConfig;
}

export const FeaturesSection = ({ features }: FeaturesSectionProps) => {
  if (!features || !features.cards) {
    return null;
  }

  return (
    <section id="features" className="bg-white px-6 py-16">
      <div className="mx-auto max-w-7xl space-y-12">
        <SectionHeading
          eyebrow="features"
          title={features.title}
          description={features.subtitle}
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="grid gap-6 md:grid-cols-3"
        >
          {features.cards.map((card, index) => (
            <motion.div
              key={`${card.title}-${index}`}
              variants={fadeInUp}
              className="group flex flex-col rounded-3xl border border-slate/10 bg-gradient-to-b from-white to-ash/30 p-6 shadow-soft"
            >
              <h3 className="text-xl font-semibold text-night">{card.title}</h3>
              <p className="mt-2 text-slate">{card.description}</p>
              <ul className="mt-4 space-y-2 text-sm text-night/80">
                {card.bullets?.map((bullet, bulletIndex) => (
                  <li key={`${bullet}-${bulletIndex}`} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-brand-teal" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;

