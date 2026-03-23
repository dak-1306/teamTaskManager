// Shared motion variants and timings for pages/components
export const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0,
    },
  },
};

export const item = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "ease-out" },
  },
};

export const cardTransition = { duration: 0.35, ease: "ease-out" };

// Reusable viewport options for whileInView
export const inViewOptions = { once: true, amount: 0.15 };
