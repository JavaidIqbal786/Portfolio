import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/* ═══════════════════════════════════════════════════════════════
   AnimatedSection — reusable scroll-triggered wrapper
   ═══════════════════════════════════════════════════════════════
   Props:
     children   — content to animate
     direction  — "up" | "left" | "right" | "fade"  (default "up")
     delay      — seconds delay before animation     (default 0)
     duration   — animation duration in seconds       (default 0.6)
     className  — optional extra classes
     threshold  — visibility ratio to trigger          (default 0.15)
     once       — animate only once                    (default true)
     amount     — distance in px for translate         (default 50)
     as         — wrapper element tag                  (default "div")
   ═══════════════════════════════════════════════════════════════ */

const directionMap = (dir, amount) => {
  switch (dir) {
    case 'left':
      return { hidden: { opacity: 0, x: -amount }, visible: { opacity: 1, x: 0 } };
    case 'right':
      return { hidden: { opacity: 0, x: amount }, visible: { opacity: 1, x: 0 } };
    case 'fade':
      return { hidden: { opacity: 0 }, visible: { opacity: 1 } };
    case 'up':
    default:
      return { hidden: { opacity: 0, y: amount }, visible: { opacity: 1, y: 0 } };
  }
};

const AnimatedSection = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  className = '',
  threshold = 0.15,
  once = true,
  amount = 50,
  as = 'div',
}) => {
  const [ref, inView] = useInView({ triggerOnce: once, threshold });
  const variants = directionMap(direction, amount);

  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </MotionTag>
  );
};

export default AnimatedSection;
