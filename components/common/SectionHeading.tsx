import clsx from "clsx";
import { motion } from "framer-motion";
import { fadeInUp } from "@/utils/motion";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  variant?: "light" | "dark";
}

export const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = "left",
  variant = "dark",
}: SectionHeadingProps) => (
  <motion.div
    variants={fadeInUp}
    className={clsx("space-y-3", align === "center" && "text-center mx-auto max-w-3xl")}
  >
    {eyebrow ? (
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-teal">
        {eyebrow}
      </p>
    ) : null}
    <h2 className={clsx(
      "text-3xl font-bold md:text-4xl",
      variant === "light" ? "text-white" : "text-night"
    )}>
      {title}
    </h2>
    {description ? (
      <p className={clsx(
        "text-lg",
        variant === "light" ? "text-white/80" : "text-slate"
      )}>
        {description}
      </p>
    ) : null}
  </motion.div>
);

export default SectionHeading;

