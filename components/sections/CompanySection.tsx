import { motion } from "framer-motion";
import { CompanyConfig } from "@/types/content";
import SectionHeading from "@/components/common/SectionHeading";
import { fadeInUp, staggerContainer } from "@/utils/motion";

interface CompanySectionProps {
  company: CompanyConfig;
}

export const CompanySection = ({ company }: CompanySectionProps) => (
  <section id="company" className="bg-ash px-6 py-16">
    <div className="mx-auto max-w-7xl space-y-10">
      <SectionHeading
        eyebrow="company"
        title={company.title}
        description={company.description}
      />
      <motion.div
        className="grid gap-4 sm:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        {company.milestones.map((milestone) => (
          <motion.div
            key={milestone.label}
            variants={fadeInUp}
            className="rounded-3xl border border-slate/10 bg-white p-6 text-center shadow-soft"
          >
            <p className="text-4xl font-semibold text-night">{milestone.value}</p>
            <p className="text-sm text-slate">{milestone.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default CompanySection;

