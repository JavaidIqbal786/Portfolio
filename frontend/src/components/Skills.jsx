import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AnimatedSection from './AnimatedSection';

import skills, { topSkills } from '../data/skills';

/* ═══════════════════════════════════════════════════════════════
   Helpers
   ═══════════════════════════════════════════════════════════════ */
const profLabel = (level) => {
  if (level >= 90) return 'Expert';
  if (level >= 75) return 'Advanced';
  if (level >= 55) return 'Intermediate';
  return 'Beginner';
};

const TABS = ['All', ...skills.map((s) => s.category)];

/* ═══════════════════════════════════════════════════════════════
   Circular progress ring (SVG)
   ═══════════════════════════════════════════════════════════════ */
const RADIUS = 38;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const CircularProgress = ({ level, inView }) => {
  const offset = CIRCUMFERENCE - (level / 100) * CIRCUMFERENCE;
  return (
    <svg width="90" height="90" viewBox="0 0 90 90" className="mx-auto">
      {/* track */}
      <circle
        cx="45"
        cy="45"
        r={RADIUS}
        fill="none"
        stroke="var(--border)"
        strokeWidth="5"
      />
      {/* progress */}
      <motion.circle
        cx="45"
        cy="45"
        r={RADIUS}
        fill="none"
        stroke="url(#ring-gradient)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray={CIRCUMFERENCE}
        initial={{ strokeDashoffset: CIRCUMFERENCE }}
        animate={inView ? { strokeDashoffset: offset } : { strokeDashoffset: CIRCUMFERENCE }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
      />
      {/* percentage text */}
      <text
        x="45"
        y="45"
        textAnchor="middle"
        dominantBaseline="central"
        className="text-sm font-semibold"
        fill="var(--text-primary)"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        {level}%
      </text>
      <defs>
        <linearGradient id="ring-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--accent-green)" />
          <stop offset="100%" stopColor="var(--accent-blue)" />
        </linearGradient>
      </defs>
    </svg>
  );
};

/* ═══════════════════════════════════════════════════════════════
   Skill Card
   ═══════════════════════════════════════════════════════════════ */
const SkillCard = ({ skill, inView, index }) => {
  const Icon = skill.icon;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="group flex flex-col items-center gap-2 rounded-2xl border border-border bg-card/50 p-3 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-accent-green/40 hover:shadow-glow-green sm:gap-3 sm:p-5"
    >
      <CircularProgress level={skill.level} inView={inView} />
      <Icon
        className="text-3xl transition-colors duration-300"
        style={{ color: skill.color || 'var(--accent-green)' }}
      />
      <span className="text-sm font-semibold text-text-primary">{skill.name}</span>
      <span
        className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium tracking-wide ${
          skill.level >= 90
            ? 'bg-accent-green/10 text-accent-green'
            : skill.level >= 75
              ? 'bg-accent-blue/10 text-accent-blue'
              : skill.level >= 55
                ? 'bg-accent-purple/10 text-accent-purple'
                : 'bg-accent-orange/10 text-accent-orange'
        }`}
      >
        {profLabel(skill.level)}
      </span>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   Proficiency Bar
   ═══════════════════════════════════════════════════════════════ */
const ProficiencyBar = ({ name, level, inView, delay }) => (
  <div className="space-y-1.5">
    <div className="flex items-center justify-between text-sm">
      <span className="font-medium text-text-primary">{name}</span>
      <span className="code-font text-xs text-text-muted">{level}%</span>
    </div>
    <div className="h-2.5 w-full overflow-hidden rounded-full bg-border/40">
      <motion.div
        className="h-full rounded-full"
        style={{
          background: 'linear-gradient(90deg, var(--accent-green), var(--accent-blue))',
        }}
        initial={{ width: 0 }}
        animate={inView ? { width: `${level}%` } : { width: 0 }}
        transition={{ duration: 1.2, delay, ease: 'easeOut' }}
      />
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   Framer variants
   ═══════════════════════════════════════════════════════════════ */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

/* ═══════════════════════════════════════════════════════════════
   Skills Component
   ═══════════════════════════════════════════════════════════════ */
const Skills = () => {
  const [activeTab, setActiveTab] = useState('All');

  /* intersection observers */
  const { ref: gridRef, inView: gridInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: barRef, inView: barInView } = useInView({ triggerOnce: true, threshold: 0.15 });

  /* filtered items */
  const filteredSkills = useMemo(() => {
    if (activeTab === 'All') return skills.flatMap((c) => c.items);
    return skills.find((c) => c.category === activeTab)?.items || [];
  }, [activeTab]);

  return (
    <section id="skills" style={{ background: 'var(--bg-primary)' }}>
      {/* divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-accent-green/20 to-transparent" />

      <div className="section-padding">
        {/* ── Section header ──────────────────────────────────── */}
        <AnimatedSection direction="fade">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="mb-14 text-center"
          >
            <span className="code-font text-sm tracking-widest text-accent-green">
              {'< Skills />'}
            </span>
            <h2 className="section-title mt-3">
              Technologies I{' '}
              <span className="gradient-text">work with</span>
            </h2>
            <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-accent-green to-accent-blue" />
          </motion.div>
        </AnimatedSection>

        {/* ── Category tabs ───────────────────────────────────── */}
        <div className="scrollbar-hide mb-10 flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center sm:overflow-x-visible sm:pb-0">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-accent-green text-primary shadow-glow-green'
                  : 'border border-border bg-card/40 text-text-muted hover:border-accent-green/30 hover:text-text-primary'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── Skills grid ─────────────────────────────────────── */}        <AnimatedSection direction="up" delay={0.15}>        <div ref={gridRef}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
            >
              {filteredSkills.map((skill, i) => (
                <SkillCard
                  key={skill.name}
                  skill={skill}
                  inView={gridInView}
                  index={i}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
        </AnimatedSection>

        {/* ══════════════════════════════════════════════════════
           Proficiency bars — top 8 skills
           ══════════════════════════════════════════════════════ */}
        <div ref={barRef} className="mt-20">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="mb-10 text-center"
          >
            <span className="code-font text-sm tracking-widest text-accent-green">
              {'< Proficiency />'}
            </span>
            <h3 className="mt-3 text-2xl font-bold sm:text-3xl">
              Top <span className="gradient-text">Skills</span>
            </h3>
          </motion.div>

          <div className="mx-auto grid max-w-3xl grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-5">
            {topSkills.map((skill, i) => (
              <ProficiencyBar
                key={skill.name}
                name={skill.name}
                level={skill.level}
                inView={barInView}
                delay={0.1 + i * 0.1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
