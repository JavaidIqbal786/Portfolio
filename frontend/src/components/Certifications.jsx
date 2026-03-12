import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  HiOutlineAcademicCap,
  HiOutlineShieldCheck,
  HiOutlineArrowTopRightOnSquare,
  HiOutlineSparkles,
} from 'react-icons/hi2';
import {
  SiCoursera,
  SiUdemy,
} from 'react-icons/si';

/* ═══════════════════════════════════════════════════════════════
   Certifications Data
   ═══════════════════════════════════════════════════════════════ */
const certifications = [
  {
    id: 1,
    name: 'The Web Developer Bootcamp',
    issuer: 'Udemy',
    issuerIcon: SiUdemy,
    date: 'Jan 2023',
    credentialId: 'UC-WDB-2023',
    verifyUrl: '#',
    category: 'web',
  },
  {
    id: 2,
    name: 'Machine Learning Specialization',
    issuer: 'Coursera — Andrew Ng',
    issuerIcon: SiCoursera,
    date: 'Jun 2023',
    credentialId: 'CERT-ML-2023',
    verifyUrl: '#',
    category: 'ai',
  },
  {
    id: 3,
    name: 'Python for Everybody',
    issuer: 'Coursera',
    issuerIcon: SiCoursera,
    date: 'Mar 2022',
    credentialId: 'CERT-PY4E-2022',
    verifyUrl: '#',
    category: 'python',
  },
  {
    id: 4,
    name: 'Ethical Hacking',
    issuer: 'Udemy',
    issuerIcon: SiUdemy,
    date: 'Sep 2023',
    credentialId: 'UC-EH-2023',
    verifyUrl: '#',
    category: 'security',
  },
  {
    id: 5,
    name: 'React — The Complete Guide',
    issuer: 'Udemy',
    issuerIcon: SiUdemy,
    date: 'Nov 2023',
    credentialId: 'UC-REACT-2023',
    verifyUrl: '#',
    category: 'web',
  },
  {
    id: 6,
    name: 'Deep Learning Specialization',
    issuer: 'Coursera — deeplearning.ai',
    issuerIcon: SiCoursera,
    date: 'Feb 2024',
    credentialId: 'CERT-DL-2024',
    verifyUrl: '#',
    category: 'ai',
  },
];

/* ── Category theming ──────────────────────────────────────── */
const categoryTheme = {
  web: {
    label: 'Web Dev',
    color: '#00b4d8',
    bg: 'rgba(0, 180, 216, 0.08)',
    border: 'rgba(0, 180, 216, 0.25)',
    glow: '0 0 24px rgba(0, 180, 216, 0.35)',
  },
  ai: {
    label: 'AI / ML',
    color: '#bd93f9',
    bg: 'rgba(189, 147, 249, 0.08)',
    border: 'rgba(189, 147, 249, 0.25)',
    glow: '0 0 24px rgba(189, 147, 249, 0.35)',
  },
  security: {
    label: 'Security',
    color: '#ff6b6b',
    bg: 'rgba(255, 107, 107, 0.08)',
    border: 'rgba(255, 107, 107, 0.25)',
    glow: '0 0 24px rgba(255, 107, 107, 0.35)',
  },
  python: {
    label: 'Python',
    color: '#f7df1e',
    bg: 'rgba(247, 223, 30, 0.08)',
    border: 'rgba(247, 223, 30, 0.25)',
    glow: '0 0 24px rgba(247, 223, 30, 0.35)',
  },
};

/* ═══════════════════════════════════════════════════════════════
   Certification Card
   ═══════════════════════════════════════════════════════════════ */
const CertCard = ({ cert, index, inView }) => {
  const theme = categoryTheme[cert.category];
  const IssuerIcon = cert.issuerIcon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative glass-card p-6 flex flex-col gap-4
                 transition-all duration-300 hover:-translate-y-2"
      style={{
        '--card-glow': theme.glow,
        '--card-border': theme.border,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = theme.border;
        e.currentTarget.style.boxShadow = theme.glow;
        e.currentTarget.style.backgroundColor = theme.bg;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '';
        e.currentTarget.style.boxShadow = '';
        e.currentTarget.style.backgroundColor = '';
      }}
    >
      {/* Top row: badge + category tag */}
      <div className="flex items-start justify-between">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl shrink-0"
          style={{ backgroundColor: theme.bg, color: theme.color }}
        >
          <HiOutlineAcademicCap className="text-2xl" />
        </div>

        <span
          className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-1
                     rounded-full border"
          style={{
            color: theme.color,
            borderColor: theme.border,
            backgroundColor: theme.bg,
          }}
        >
          {theme.label}
        </span>
      </div>

      {/* Name */}
      <h3 className="text-lg font-bold text-[var(--text-primary)] leading-snug">
        {cert.name}
      </h3>

      {/* Issuer + date */}
      <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
        <IssuerIcon className="text-base shrink-0" />
        <span>{cert.issuer}</span>
      </div>
      <p className="text-xs text-[var(--text-muted)]">Issued {cert.date}</p>

      {/* Credential ID */}
      {cert.credentialId && (
        <p className="text-xs font-mono text-[var(--text-muted)]/60 truncate">
          ID: {cert.credentialId}
        </p>
      )}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Verify button */}
      <a
        href={cert.verifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 w-full py-2.5
                   rounded-lg text-sm font-medium border transition-all duration-300"
        style={{
          color: theme.color,
          borderColor: theme.border,
          backgroundColor: 'transparent',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = theme.bg;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        <HiOutlineShieldCheck className="text-base" />
        Verify Credential
        <HiOutlineArrowTopRightOnSquare className="text-sm" />
      </a>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   Certifications Section
   ═══════════════════════════════════════════════════════════════ */
const Certifications = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="certifications" className="relative py-24 overflow-hidden">
      {/* ambient glow */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px]
                      bg-[var(--accent-purple)]/5 rounded-full blur-[160px]
                      pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 mb-4 rounded-full text-xs font-mono
                         tracking-widest uppercase border border-[var(--accent-purple)]/30
                         text-[var(--accent-purple)] bg-[var(--accent-purple)]/5">
            &lt; Certifications /&gt;
          </span>
          <h2 className="section-title">
            Credentials &amp; <span className="gradient-text">Achievements</span>
          </h2>
          <p className="section-subtitle max-w-xl mx-auto">
            Industry-recognized certifications that validate my skills across
            web development, AI/ML, cybersecurity, and more.
          </p>
        </motion.div>

        {/* ── Grid ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certifications.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} index={i} inView={inView} />
          ))}
        </div>

        {/* ── Coming Soon ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 flex items-center justify-center gap-2 text-sm
                     text-[var(--text-muted)]"
        >
          <HiOutlineSparkles className="text-[var(--accent-green)]" />
          <span>More certifications coming soon...</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
