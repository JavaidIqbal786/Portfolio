import { motion, useScroll, useSpring } from 'framer-motion';

/* ═══════════════════════════════════════════════════════════════
   Scroll Progress Bar — fixed at very top of viewport
   ═══════════════════════════════════════════════════════════════ */
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  // smooth out the raw scroll value
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: '0%' }}
      className="fixed top-0 left-0 right-0 h-[3px] z-[9998]
                 bg-gradient-to-r from-[var(--accent-green)] to-[var(--accent-blue)]"
    />
  );
};

export default ScrollProgress;
