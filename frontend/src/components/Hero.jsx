import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { TypeAnimation } from 'react-type-animation';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { FiDownload, FiChevronDown } from 'react-icons/fi';

/* ═══════════════════════════════════════════════════════════════
   Particles configuration
   ═══════════════════════════════════════════════════════════════ */
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

const particlesOptions = {
  fullScreen: false,
  fpsLimit: 60,
  particles: {
    number: { value: isMobile ? 25 : 50, density: { enable: true, area: 900 } },
    color: { value: ['#00ff88', '#00b4d8', '#bd93f9'] },
    shape: {
      type: 'char',
      options: {
        char: {
          value: ['{', '}', '<', '>', '/', '=', ';', '(', ')', '.', '*', '#'],
          font: 'JetBrains Mono',
          weight: '400',
        },
      },
    },
    opacity: {
      value: { min: 0.15, max: 0.45 },
      animation: { enable: true, speed: 0.6, sync: false },
    },
    size: {
      value: { min: 8, max: 16 },
    },
    move: {
      enable: true,
      speed: { min: 0.3, max: 0.8 },
      direction: 'none',
      outModes: 'out',
    },
    links: {
      enable: true,
      distance: 130,
      color: '#00ff88',
      opacity: 0.08,
      width: 1,
    },
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: 'grab' },
    },
    modes: {
      grab: { distance: 160, links: { opacity: 0.25 } },
    },
  },
  detectRetina: true,
};

/* ═══════════════════════════════════════════════════════════════
   Terminal lines (typed sequentially)
   ═══════════════════════════════════════════════════════════════ */
const terminalLines = [
  { prompt: '> whoami', answer: 'Full Stack Developer | AI Engineer | Ethical Hacker' },
  { prompt: '> skills --count', answer: '15+ Technologies Mastered' },
  { prompt: '> experience', answer: 'Passionate Developer | Problem Solver | Code Enthusiast' },
  { prompt: '> status', answer: '✅ Available for exciting projects' },
];

/* ═══════════════════════════════════════════════════════════════
   Framer Motion variants
   ═══════════════════════════════════════════════════════════════ */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const leftSlide = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const rightSlide = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

/* ═══════════════════════════════════════════════════════════════
   Terminal Widget sub-component
   ═══════════════════════════════════════════════════════════════ */
const TerminalWidget = () => {
  const [visibleLines, setVisibleLines] = useState([]);

  useEffect(() => {
    const timers = [];
    terminalLines.forEach((_, i) => {
      // show prompt
      timers.push(
        setTimeout(() => {
          setVisibleLines((prev) => [...prev, { type: 'prompt', text: terminalLines[i].prompt }]);
        }, i * 1400)
      );
      // show answer
      timers.push(
        setTimeout(() => {
          setVisibleLines((prev) => [...prev, { type: 'answer', text: terminalLines[i].answer }]);
        }, i * 1400 + 600)
      );
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="w-full overflow-hidden rounded-xl border border-border shadow-2xl shadow-black/40">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5" style={{ background: 'var(--bg-card)' }}>
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-auto code-font text-[11px] text-text-muted">javaid@portfolio:~$</span>
      </div>

      {/* Body */}
      <div
        className="min-h-[180px] px-3 py-3 code-font text-xs leading-relaxed sm:min-h-[220px] sm:px-5 sm:py-4 sm:text-sm"
        style={{ background: 'var(--bg-secondary)' }}
      >
        {visibleLines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={`${line.type === 'prompt' ? 'text-accent-green mt-2 first:mt-0' : 'text-text-muted ml-2'}`}
          >
            {line.text}
          </motion.div>
        ))}

        {/* blinking cursor */}
        <span className="mt-1 inline-block h-4 w-2 animate-pulse" style={{ background: 'var(--accent-green)' }} />
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   Hero Component
   ═══════════════════════════════════════════════════════════════ */
const Hero = () => {
  const [engineReady, setEngineReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setEngineReady(true));
  }, []);

  const particlesLoaded = useCallback(async (container) => {}, []);

  const options = useMemo(() => particlesOptions, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* ── Particles background ────────────────────────────── */}
      {engineReady && (
        <Particles
          id="hero-particles"
          options={options}
          particlesLoaded={particlesLoaded}
          className="absolute inset-0 z-0"
        />
      )}

      {/* ── Ambient glow blobs ──────────────────────────────── */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-accent-green/5 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-[400px] w-[400px] rounded-full bg-accent-blue/5 blur-[100px]" />

      {/* ── Content ─────────────────────────────────────────── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="section-padding relative z-10 grid w-full grid-cols-1 items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16"
      >
        {/* ──────── Left column: text ──────── */}
        <div className="flex flex-col gap-6">
          {/* Available badge */}
          <motion.div variants={leftSlide} className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent-green/30 bg-accent-green/5 px-4 py-1.5 text-xs font-medium text-accent-green">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-green opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-green" />
              </span>
              Available for Work
            </span>
          </motion.div>

          {/* Name */}
          <motion.div variants={leftSlide}>
            <p className="text-base text-text-muted sm:text-lg md:text-xl">Hi, I'm</p>
            <h1 className="hero-glitch mt-1 text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
                data-text="Javaid Iqbal">
              <span className="gradient-text">Javaid Iqbal</span>
            </h1>
          </motion.div>

          {/* Typing animation */}
          <motion.div variants={leftSlide} className="code-font text-sm text-accent-green sm:text-base md:text-lg">
            <span className="text-text-muted mr-2">{'>'}</span>
            <TypeAnimation
              sequence={[
                'Full Stack Web Developer', 2000,
                'Python Developer', 2000,
                'AI & Machine Learning Engineer', 2000,
                'Cybersecurity & Ethical Hacker', 2000,
                'React & Node.js Developer', 2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              cursor={true}
            />
          </motion.div>

          {/* CTA buttons */}
          <motion.div variants={leftSlide} className="mt-2 flex flex-wrap items-center gap-3 sm:gap-4">
            <Link
              to="projects"
              smooth
              offset={-80}
              duration={600}
              className="btn-primary cursor-pointer"
            >
              View My Projects
            </Link>

            <Link
              to="contact"
              smooth
              offset={-80}
              duration={600}
              className="btn-secondary cursor-pointer"
            >
              Contact Me
            </Link>

            <a
              href="/cv.pdf"
              download
              className="btn-secondary cursor-pointer inline-flex items-center gap-2"
            >
              <FiDownload className="text-lg" />
              Download CV
            </a>
          </motion.div>
        </div>

        {/* ──────── Right column: terminal ──────── */}
        <motion.div variants={rightSlide} className="w-full lg:pl-4">
          <TerminalWidget />
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ────────────────────────────────── */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-xs text-text-muted tracking-wide">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FiChevronDown className="text-xl text-accent-green" />
        </motion.div>
      </motion.div>

      {/* ═══════════════════════════════════════════════════════
         Glitch CSS (scoped)
         ═══════════════════════════════════════════════════════ */}
      <style>{`
        .hero-glitch {
          position: relative;
        }
        .hero-glitch::before,
        .hero-glitch::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: var(--bg-primary);
          overflow: hidden;
          clip-path: inset(0);
        }
        .hero-glitch::before {
          left: 2px;
          text-shadow: -2px 0 #00ff88;
          animation: hero-glitch-1 3s infinite linear alternate-reverse;
        }
        .hero-glitch::after {
          left: -2px;
          text-shadow: 2px 0 #00b4d8;
          animation: hero-glitch-2 3s infinite linear alternate-reverse;
        }
        @keyframes hero-glitch-1 {
          0%, 93% { clip-path: inset(0 0 100% 0); }
          94%     { clip-path: inset(20% 0 50% 0); }
          95%     { clip-path: inset(60% 0 10% 0); }
          96%     { clip-path: inset(40% 0 30% 0); }
          97%     { clip-path: inset(80% 0 5% 0); }
          98%     { clip-path: inset(10% 0 70% 0); }
          100%    { clip-path: inset(0 0 100% 0); }
        }
        @keyframes hero-glitch-2 {
          0%, 93% { clip-path: inset(100% 0 0 0); }
          94%     { clip-path: inset(50% 0 20% 0); }
          95%     { clip-path: inset(10% 0 60% 0); }
          96%     { clip-path: inset(30% 0 40% 0); }
          97%     { clip-path: inset(5% 0 80% 0); }
          98%     { clip-path: inset(70% 0 10% 0); }
          100%    { clip-path: inset(100% 0 0 0); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
