// Shared motion variants and timings for pages/components
type MotionVariant = {
  hidden: any;
  show: any;
};
type Transition = {
  duration: number;
  ease: string;
};
type inViewOptions = {
  once: boolean;
  amount: number;
};
export const container: MotionVariant = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0,
    },
  },
};

export const item: MotionVariant = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "ease-out" },
  },
};

export const cardTransition: Transition = { duration: 0.35, ease: "ease-out" };

// Reusable viewport options for whileInView
export const inViewOptions: inViewOptions = { once: true, amount: 0.15 };
