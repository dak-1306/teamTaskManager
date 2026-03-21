// Shared motion variants and timings for pages/components
export const container = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0,
    },
  },
};

export const item = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "ease-out" },
  },
};

export const cardTransition = { duration: 0.35, ease: "ease-out" };
