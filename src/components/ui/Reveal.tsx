import { motion, type HTMLMotionProps } from "motion/react";
import type { ElementType, ReactNode } from "react";

type RevealProps = Omit<HTMLMotionProps<"div">, "children"> & {
  children: ReactNode;
  delay?: number;
  as?: "div" | "section" | "li" | "article" | "header";
};

const tags: Record<NonNullable<RevealProps["as"]>, ElementType> = {
  div: motion.div,
  section: motion.section,
  li: motion.li,
  article: motion.article,
  header: motion.header,
};

/**
 * Editorial fade-and-rise as content scrolls into view.
 * Motion's global `reducedMotion="user"` (see App) strips the movement for those who ask.
 */
export function Reveal({ children, delay = 0, as = "div", ...rest }: RevealProps) {
  const Tag = tags[as];
  return (
    <Tag
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -5% 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
