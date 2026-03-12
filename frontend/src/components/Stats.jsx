import { useRef } from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import AnimatedSection from './AnimatedSection';
import {
  HiOutlineCodeBracket,
  HiOutlineCpuChip,
  HiOutlineClock,
  HiOutlineHeart,
} from 'react-icons/hi2';
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiPython,
  SiMysql,
  SiMongodb,
  SiTailwindcss,
  SiGit,
  SiDocker,
  SiLinux,
  SiTypescript,
  SiNextdotjs,
  SiFlask,
  SiTensorflow,
  SiFigma,
  SiFirebase,
  SiRedux,
  SiPostgresql,
} from 'react-icons/si';

/* ═══════════════════════════════════════════════════════════════
   Data
   ═══════════════════════════════════════════════════════════════ */
const counters = [
  { id: 1, end: 50,  suffix: '+', label: 'Projects Completed', icon: HiOutlineCodeBracket },
  { id: 2, end: 15,  suffix: '+', label: 'Technologies Mastered', icon: HiOutlineCpuChip },
  { id: 3, end: 3,   suffix: '+', label: 'Years of Experience', icon: HiOutlineClock },
  { id: 4, end: 100, suffix: '%', label: 'Dedication & Passion', icon: HiOutlineHeart },
];

const techStrip = [
  { name: 'HTML',        icon: SiHtml5,       color: '#E34F26' },
  { name: 'CSS',         icon: SiCss,         color: '#1572B6' },
  { name: 'JavaScript',  icon: SiJavascript,  color: '#F7DF1E' },
  { name: 'TypeScript',  icon: SiTypescript,   color: '#3178C6' },
  { name: 'React',       icon: SiReact,       color: '#61DAFB' },
  { name: 'Redux',       icon: SiRedux,       color: '#764ABC' },
  { name: 'Next.js',     icon: SiNextdotjs,   color: '#ffffff' },
  { name: 'Node.js',     icon: SiNodedotjs,   color: '#339933' },
  { name: 'Python',      icon: SiPython,      color: '#3776AB' },
  { name: 'Flask',       icon: SiFlask,       color: '#ffffff' },
  { name: 'MySQL',       icon: SiMysql,       color: '#4479A1' },
  { name: 'MongoDB',     icon: SiMongodb,     color: '#47A248' },
  { name: 'PostgreSQL',  icon: SiPostgresql,  color: '#4169E1' },
  { name: 'Tailwind',    icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'TensorFlow',  icon: SiTensorflow,  color: '#FF6F00' },
  { name: 'Git',         icon: SiGit,         color: '#F05032' },
  { name: 'Docker',      icon: SiDocker,      color: '#2496ED' },
  { name: 'Linux',       icon: SiLinux,       color: '#FCC624' },
  { name: 'Firebase',    icon: SiFirebase,    color: '#FFCA28' },
  { name: 'Figma',       icon: SiFigma,       color: '#F24E1E' },
];

/* ═══════════════════════════════════════════════════════════════
   Counter Card
   ═══════════════════════════════════════════════════════════════ */
const CounterCard = ({ data, index, inView }) => {
  const Icon = data.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="glass-card group flex flex-col items-center gap-3 p-4 text-center
                 hover:border-[var(--accent-green)]/40 transition-all duration-300
                 sm:gap-4 sm:p-6 lg:p-8"
    >
      {/* Icon */}
      <div className="flex h-11 w-11 items-center justify-center rounded-xl
                      bg-[var(--accent-green)]/10 text-[var(--accent-green)]
                      group-hover:shadow-[var(--glow-green)] transition-shadow duration-300
                      sm:h-14 sm:w-14">
        <Icon className="text-xl sm:text-2xl" />
      </div>

      {/* Number */}
      <span className="text-3xl font-bold bg-gradient-to-r
                       from-[var(--accent-green)] to-[var(--accent-blue)]
                       bg-clip-text text-transparent
                       sm:text-4xl md:text-5xl">
        {inView ? (
          <CountUp end={data.end} duration={2.5} suffix={data.suffix} />
        ) : (
          `0${data.suffix}`
        )}
      </span>

      {/* Label */}
      <p className="text-[var(--text-muted)] text-sm tracking-wide">
        {data.label}
      </p>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   GitHub Card Wrapper
   ═══════════════════════════════════════════════════════════════ */
const GitHubCard = ({ src, alt, index, inView }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
    className="glass-card overflow-hidden p-3 hover:border-[var(--accent-blue)]/40
               transition-all duration-300"
  >
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className="w-full rounded-lg"
    />
  </motion.div>
);

/* ═══════════════════════════════════════════════════════════════
   Marquee Row
   ═══════════════════════════════════════════════════════════════ */
const MarqueeRow = ({ items, reverse = false }) => {
  // duplicate items for seamless loop
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden py-3">
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24
                      bg-gradient-to-r from-[var(--bg-primary)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24
                      bg-gradient-to-l from-[var(--bg-primary)] to-transparent" />

      <div
        className={`flex w-max gap-8 ${
          reverse ? 'animate-marquee-reverse' : 'animate-marquee'
        }`}
      >
        {doubled.map((tech, i) => {
          const Icon = tech.icon;
          return (
            <div
              key={`${tech.name}-${i}`}
              className="flex flex-col items-center gap-2 min-w-[80px]
                         group cursor-default"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl
                              bg-[var(--bg-card)] border border-[var(--border)]
                              group-hover:border-[var(--accent-green)]/50
                              group-hover:shadow-[var(--glow-green)]
                              transition-all duration-300">
                <Icon className="text-xl" style={{ color: tech.color }} />
              </div>
              <span className="text-xs text-[var(--text-muted)]
                              group-hover:text-[var(--text-primary)]
                              transition-colors duration-300">
                {tech.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   Stats Section
   ═══════════════════════════════════════════════════════════════ */
const Stats = () => {
  const [counterRef, counterInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [githubRef, githubInView]   = useInView({ triggerOnce: true, threshold: 0.15 });

  const ghBase =
    'https://github-readme-stats.vercel.app/api?username=JavaidIqbal786' +
    '&theme=github_dark&show_icons=true&bg_color=161b22&border_color=30363d' +
    '&title_color=00ff88&icon_color=00b4d8&text_color=e6edf3';

  const ghLangs =
    'https://github-readme-stats.vercel.app/api/top-langs/?username=JavaidIqbal786' +
    '&theme=github_dark&layout=compact&bg_color=161b22&border_color=30363d' +
    '&title_color=00ff88&text_color=e6edf3';

  const ghStreak =
    'https://streak-stats.demolab.com?user=JavaidIqbal786' +
    '&theme=github-dark&background=161b22&border=30363d' +
    '&ring=00ff88&fire=00b4d8&currStreakLabel=00ff88';

  const row1 = techStrip.slice(0, 10);
  const row2 = techStrip.slice(10);

  return (
    <section id="stats" className="relative py-24 overflow-hidden">
      {/* ── ambient glow ── */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px]
                      bg-[var(--accent-green)]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ─────────── COUNTER SECTION ─────────── */}
        <AnimatedSection direction="up">
        <div ref={counterRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={counterInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <span className="inline-block px-4 py-1.5 mb-4 rounded-full text-xs font-mono
                           tracking-widest uppercase border border-[var(--accent-green)]/30
                           text-[var(--accent-green)] bg-[var(--accent-green)]/5">
              Numbers Speak
            </span>
            <h2 className="section-title">
              Stats &amp; <span className="gradient-text">Impact</span>
            </h2>
            <p className="section-subtitle max-w-xl mx-auto">
              A quick snapshot of my journey so far — the projects, the stack, and the
              commitment behind every line of code.
            </p>
          </motion.div>

          {/* counters grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {counters.map((c, i) => (
              <CounterCard key={c.id} data={c} index={i} inView={counterInView} />
            ))}
          </div>
        </div>
        </AnimatedSection>

        {/* ─────────── GITHUB ACTIVITY ─────────── */}
        <div ref={githubRef} className="mt-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={githubInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="inline-block px-4 py-1.5 mb-4 rounded-full text-xs font-mono
                           tracking-widest uppercase border border-[var(--accent-blue)]/30
                           text-[var(--accent-blue)] bg-[var(--accent-blue)]/5">
              Open Source
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
              GitHub <span className="gradient-text">Activity</span>
            </h3>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5">
            <GitHubCard src={ghBase}   alt="GitHub Stats"    index={0} inView={githubInView} />
            <GitHubCard src={ghStreak} alt="GitHub Streak"   index={1} inView={githubInView} />
          </div>
          <div className="mt-5">
            <GitHubCard src={ghLangs} alt="Top Languages" index={2} inView={githubInView} />
          </div>
        </div>

        {/* ─────────── MARQUEE TECH STRIP ─────────── */}
        <div className="mt-28">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
              Tech <span className="gradient-text">Arsenal</span>
            </h3>
            <p className="text-[var(--text-muted)] text-sm mt-2">
              Tools &amp; technologies I work with daily
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <MarqueeRow items={row1} />
            <MarqueeRow items={row2} reverse />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
