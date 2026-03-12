import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-scroll';
import {
  FiDownload,
  FiArrowRight,
} from 'react-icons/fi';
import AnimatedSection from './AnimatedSection';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import timeline from '../data/timeline';

/* ═══════════════════════════════════════════════════════════════
   Bio data (VS Code syntax-highlighted)
   ═══════════════════════════════════════════════════════════════ */
const bioCode = [
  { key: 'name', value: '"Javaid Iqbal"', color: 'text-accent-green' },
  { key: 'title', value: '"Full Stack Developer & AI Engineer"', color: 'text-accent-blue' },
  { key: 'location', value: '"Pakistan 🇵🇰"', color: 'text-accent-orange' },
  { key: 'experience', value: '"Passionate & Self-Driven"', color: 'text-accent-purple' },
  {
    key: 'passions',
    value: '["Clean Code", "AI/ML", "Cybersecurity", "Innovation"]',
    color: 'text-accent-green',
  },
  { key: 'currentFocus', value: '"Building intelligent web applications"', color: 'text-accent-blue' },
  { key: 'available', value: 'true', color: 'text-accent-green' },
  { key: 'coffee', value: '"required ☕"', color: 'text-accent-orange' },
];

/* ── Quick facts ───────────────────────────────────────────── */
const quickFacts = [
  { emoji: '🎓', text: 'Self-taught & Passionate Developer' },
  { emoji: '💼', text: 'Available for Freelance & Full-time' },
  { emoji: '🌍', text: 'Based in Pakistan' },
  { emoji: '🚀', text: 'Always learning new technologies' },
];

/* ── Floating badges on profile image ──────────────────────── */
const imageBadges = [
  { label: '5+ Years', x: '-12%', y: '18%' },
  { label: '50+ Projects', x: '78%', y: '10%' },
  { label: 'Pro Dev', x: '80%', y: '75%' },
];

/* ═══════════════════════════════════════════════════════════════
   Timeline icon map
   ═══════════════════════════════════════════════════════════════ */
const iconColors = {
  education: { bg: '#00b4d8', shadow: 'rgba(0,180,216,0.35)' },
  work: { bg: '#00ff88', shadow: 'rgba(0,255,136,0.35)' },
  milestone: { bg: '#bd93f9', shadow: 'rgba(189,147,249,0.35)' },
  project: { bg: '#ff9500', shadow: 'rgba(255,149,0,0.35)' },
};

/* ═══════════════════════════════════════════════════════════════
   Framer Motion variants
   ═══════════════════════════════════════════════════════════════ */
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

/* ═══════════════════════════════════════════════════════════════
   About Component
   ═══════════════════════════════════════════════════════════════ */
const About = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const tlRef = useRef(null);
  const tlInView = useInView(tlRef, { once: true, margin: '-60px' });

  return (
    <section
      id="about"
      className="relative overflow-hidden"
      style={{ background: 'var(--bg-secondary)' }}
    >
      {/* subtle top divider */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-green/20 to-transparent" />

      {/* ═══════════════ ABOUT ME SECTION ═══════════════ */}
      <div ref={ref} className="section-padding">
        {/* ── Section header ──────────────────────────────────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-16 text-center"
        >
          <span className="code-font text-sm tracking-widest text-accent-green">
            {'< About Me />'}
          </span>
          <h2 className="section-title mt-3">
            Get to know me{' '}
            <span className="gradient-text">better</span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-accent-green to-accent-blue" />
        </motion.div>

        {/* ── Two-column grid ─────────────────────────────────── */}
        <div className="grid grid-cols-1 items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-20">
          {/* ════════ Left — Profile image ════════ */}
          <AnimatedSection direction="left" delay={0.1}>
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="relative mx-auto w-full max-w-md"
          >
            {/* rotating border ring */}
            <div className="about-rotate-border relative mx-auto aspect-square w-52 sm:w-72 md:w-80">
              {/* hexagonal clip image */}
              <div
                className="absolute inset-3 overflow-hidden"
                style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
              >
                <img
                  src="https://placehold.co/600x600/0d1117/00ff88?text=JI&font=source-sans-pro"
                  alt="Javaid Iqbal"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* floating badges */}
            {imageBadges.map((badge, i) => (
              <motion.span
                key={badge.label}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={
                  inView
                    ? { opacity: 1, scale: 1, transition: { delay: 0.6 + i * 0.15 } }
                    : {}
                }
                className="absolute z-10 hidden whitespace-nowrap rounded-full border border-accent-green/30 bg-card/80 px-3 py-1 text-xs font-semibold text-accent-green shadow-lg shadow-accent-green/10 backdrop-blur-md sm:block"
                style={{ left: badge.x, top: badge.y }}
              >
                {badge.label}
              </motion.span>
            ))}
          </motion.div>
          </AnimatedSection>

          {/* ════════ Right — Bio content ════════ */}
          <AnimatedSection direction="right" delay={0.2}>
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="flex flex-col gap-6"
          >
            {/* ── VS Code–style code block ─────────────────────── */}
            <motion.div
              variants={fadeRight}
              className="overflow-hidden rounded-xl border border-border"
            >
              {/* title bar */}
              <div
                className="flex items-center gap-2 border-b border-border px-4 py-2"
                style={{ background: 'var(--bg-card)' }}
              >
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                <span className="ml-3 code-font text-[11px] text-text-muted">about.js</span>
                <span className="ml-auto code-font text-[10px] text-text-muted/50">
                  JavaScript
                </span>
              </div>

              {/* code body with line numbers */}
              <div
                className="code-font flex text-[13px] leading-[1.7]"
                style={{ background: '#0d1117' }}
              >
                {/* line numbers */}
                <div className="select-none border-r border-border/40 px-3 py-4 text-right text-text-muted/30">
                  {Array.from({ length: bioCode.length + 3 }, (_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>

                {/* actual code */}
                <div className="overflow-x-auto px-4 py-4">
                  {/* line 1: const javaid = { */}
                  <p>
                    <span className="text-accent-purple">const</span>{' '}
                    <span className="text-accent-blue">javaid</span>{' '}
                    <span className="text-text-muted">{'='}</span>{' '}
                    <span className="text-[#ffd700]">{'{'}</span>
                  </p>

                  {/* property lines */}
                  {bioCode.map((line, i) => (
                    <motion.p
                      key={line.key}
                      initial={{ opacity: 0, x: 12 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.4 + i * 0.08 }}
                      className="pl-6"
                    >
                      <span className="text-[#79c0ff]">{line.key}</span>
                      <span className="text-text-muted">: </span>
                      <span className={line.color}>{line.value}</span>
                      <span className="text-text-muted">,</span>
                    </motion.p>
                  ))}

                  {/* closing brace */}
                  <p>
                    <span className="text-[#ffd700]">{'}'}</span>
                    <span className="text-text-muted">;</span>
                  </p>

                  {/* blank + export line */}
                  <p className="mt-1">
                    <span className="text-accent-purple">export default</span>{' '}
                    <span className="text-accent-blue">javaid</span>
                    <span className="text-text-muted">;</span>
                  </p>
                </div>
              </div>
            </motion.div>

            {/* ── Bio paragraph ────────────────────────────────── */}
            <motion.p variants={fadeRight} className="text-text-muted leading-relaxed">
              I'm a passionate Full Stack Developer with expertise spanning from
              crafting pixel-perfect frontends to architecting robust backends. My
              journey in tech has led me deep into the worlds of{' '}
              <span className="font-medium text-accent-green">Artificial Intelligence</span>,{' '}
              <span className="font-medium text-accent-blue">Machine Learning</span>, and{' '}
              <span className="font-medium text-accent-purple">Cybersecurity</span>.
              I love turning complex problems into elegant, scalable solutions.
            </motion.p>

            {/* ── Quick facts (2-column) ───────────────────────── */}
            <motion.div
              variants={fadeRight}
              className="grid grid-cols-1 gap-3 sm:grid-cols-2"
            >
              {quickFacts.map((fact) => (
                <div
                  key={fact.text}
                  className="flex items-start gap-3 rounded-lg border border-border/60 bg-card/40 px-4 py-3 transition-colors hover:border-accent-green/30"
                >
                  <span className="mt-0.5 text-lg">{fact.emoji}</span>
                  <span className="text-sm text-text-muted">{fact.text}</span>
                </div>
              ))}
            </motion.div>

            {/* ── CTA row ──────────────────────────────────────── */}
            <motion.div variants={fadeRight} className="mt-2 flex flex-wrap items-center gap-4">
              <Link
                to="contact"
                smooth
                offset={-80}
                duration={600}
                className="btn-primary cursor-pointer"
              >
                Let's Work Together
                <FiArrowRight />
              </Link>

              <a
                href="/cv.pdf"
                download
                className="btn-secondary inline-flex items-center gap-2"
              >
                <FiDownload />
                Download CV
              </a>
            </motion.div>
          </motion.div>
          </AnimatedSection>
        </div>
      </div>

      {/* ═══════════════ MY JOURNEY TIMELINE ═══════════════ */}
      <div ref={tlRef} className="section-padding !pt-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={tlInView ? 'visible' : 'hidden'}
          className="mb-14 text-center"
        >
          <span className="code-font text-sm tracking-widest text-accent-green">
            {'< My Journey />'}
          </span>
          <h2 className="section-title mt-3">
            Experience &{' '}
            <span className="gradient-text">Education</span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-accent-green to-accent-blue" />
        </motion.div>

        <VerticalTimeline lineColor="var(--border)" animate={true}>
          {timeline.map((item) => {
            const palette = iconColors[item.type] || iconColors.work;
            return (
              <VerticalTimelineElement
                key={item.id}
                date={item.date}
                dateClassName="!text-text-muted !font-medium timeline-date"
                contentStyle={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: '16px',
                  boxShadow: 'none',
                  padding: '1.5rem',
                }}
                contentArrowStyle={{ borderRight: '8px solid var(--border)' }}
                iconStyle={{
                  background: palette.bg,
                  boxShadow: `0 0 0 4px var(--bg-secondary), 0 0 20px ${palette.shadow}`,
                }}
                icon={
                  <span className="flex h-full w-full items-center justify-center text-sm">
                    {item.icon}
                  </span>
                }
              >
                <h3 className="text-base font-semibold text-text-primary">
                  {item.title}
                </h3>
                <h4 className="mt-0.5 code-font text-xs text-accent-green">
                  {item.location}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {item.description}
                </p>
                {item.tags && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-border bg-primary/50 px-2.5 py-0.5 text-[11px] font-medium text-text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </VerticalTimelineElement>
            );
          })}
        </VerticalTimeline>
      </div>

      {/* ═══════════════════════════════════════════════════════
         Scoped CSS
         ═══════════════════════════════════════════════════════ */}
      <style>{`
        /* ── rotating image border ───────────────────────────── */
        .about-rotate-border {
          position: relative;
        }
        .about-rotate-border::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          padding: 3px;
          background: conic-gradient(
            from 0deg,
            var(--accent-green),
            var(--accent-blue),
            var(--accent-purple),
            transparent,
            var(--accent-green)
          );
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: about-ring-spin 6s linear infinite;
        }
        .about-rotate-border::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          box-shadow:
            0 0 30px rgba(0, 255, 136, 0.15),
            inset 0 0 30px rgba(0, 255, 136, 0.05);
          pointer-events: none;
        }
        @keyframes about-ring-spin {
          to { transform: rotate(360deg); }
        }

        /* ── timeline overrides ──────────────────────────────── */
        .vertical-timeline::before {
          background: var(--border) !important;
          width: 2px !important;
        }
        /* Force single-column left-aligned on mobile */
        @media (max-width: 1169px) {
          .vertical-timeline.vertical-timeline--two-columns .vertical-timeline-element-content {
            margin-left: 60px !important;
            margin-right: 0 !important;
          }
          .vertical-timeline.vertical-timeline--two-columns .vertical-timeline-element-content .vertical-timeline-element-date {
            float: none !important;
            padding: 0 !important;
            margin-top: 8px !important;
          }
          .vertical-timeline.vertical-timeline--two-columns .vertical-timeline-element-content-arrow {
            left: -8px !important;
            right: auto !important;
            border-right: 8px solid var(--border) !important;
            border-left: none !important;
          }
          .vertical-timeline.vertical-timeline--two-columns .vertical-timeline-element-icon {
            left: 0 !important;
            margin-left: 0 !important;
          }
          .vertical-timeline.vertical-timeline--two-columns::before {
            left: 18px !important;
          }
        }
        .vertical-timeline-element-content {
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .vertical-timeline-element-content:hover {
          border-color: rgba(0, 255, 136, 0.3) !important;
          box-shadow: 0 0 25px rgba(0, 255, 136, 0.08) !important;
        }
        .timeline-date {
          font-family: 'JetBrains Mono', monospace !important;
          font-size: 13px !important;
        }
        .vertical-timeline-element-content p {
          margin: 0 !important;
        }
      `}</style>
    </section>
  );
};

export default About;
