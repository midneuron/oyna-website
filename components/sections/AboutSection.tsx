import { motion } from "framer-motion";
import { AboutConfig } from "@/types/content";
import SectionHeading from "@/components/common/SectionHeading";
import { fadeInUp, staggerContainer } from "@/utils/motion";

interface AboutSectionProps {
  about: AboutConfig;
}

export const AboutSection = ({ about }: AboutSectionProps) => {
  if (!about || !about.highlights) {
    return null;
  }

  return (
    <section id="platform" className="bg-ash px-6 py-16">
      <div className="mx-auto max-w-7xl space-y-10">
        <SectionHeading
          eyebrow="platform"
          title={about.title}
          description={about.description}
        />
        <motion.div
          className="grid gap-6 md:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {about.highlights.map((highlight, index) => (
            <motion.div
              key={`${highlight.title}-${index}`}
              variants={fadeInUp}
              className="rounded-3xl border border-slate/10 bg-white p-6 shadow-soft"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-teal">
                {highlight.title}
              </p>
              <p className="mt-3 text-base text-slate">{highlight.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;

