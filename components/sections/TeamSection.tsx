import Image from "next/image";
import { motion } from "framer-motion";
import { TeamConfig } from "@/types/content";
import SectionHeading from "@/components/common/SectionHeading";
import { fadeInUp, staggerContainer } from "@/utils/motion";

interface TeamSectionProps {
  team: TeamConfig;
}

export const TeamSection = ({ team }: TeamSectionProps) => (
  <section id="team" className="relative overflow-hidden bg-gradient-to-b from-white via-ash/30 to-white px-6 py-20">
    {/* Decorative background */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(12,189,189,0.05),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(12,189,189,0.05),transparent_50%)]" />
    
    <div className="relative mx-auto max-w-7xl space-y-16">
      <SectionHeading
        eyebrow="team"
        title={team.title}
        description={team.subtitle}
        align="center"
      />

      <motion.div
        className="grid gap-8 md:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        {team.members.map((member, index) => (
          <motion.div
            key={member.name}
            variants={fadeInUp}
            whileHover={{ y: -12 }}
            className="group relative flex h-full flex-col overflow-hidden rounded-[36px] border border-slate/10 bg-white shadow-xl transition-all duration-500 hover:border-brand-teal/30 hover:shadow-2xl"
          >
            {/* Image container with gradient overlay */}
            <div className="relative h-80 flex-shrink-0 overflow-hidden bg-gradient-to-b from-slate/5 to-transparent">
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-white via-white/20 to-transparent opacity-60 transition-opacity group-hover:opacity-40" />
              <Image
                src={member.image}
                alt={member.name}
                width={500}
                height={600}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Decorative glow effect */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-brand-teal/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>

            <div className="relative flex flex-1 flex-col space-y-4 p-8">
              <div className="flex-1 space-y-2">
                <h3 className="text-xl font-bold text-night transition-colors group-hover:text-brand-teal">
                  {member.name}
                </h3>
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-teal">
                  {member.role}
                </p>
                <p className="text-xs leading-relaxed text-slate">
                  {member.bio}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2 pt-2">
                {member.expertise.map((skill) => (
                  <span 
                    key={skill} 
                    className="rounded-full bg-gradient-to-r from-slate/10 to-slate/5 px-3 py-1.5 text-xs font-semibold text-night ring-1 ring-slate/10 transition-all hover:ring-brand-teal/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom accent line */}
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-brand-teal to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default TeamSection;

