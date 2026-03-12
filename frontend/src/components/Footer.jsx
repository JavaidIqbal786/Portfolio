import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link as ScrollLink } from 'react-scroll';
import {
  HiOutlineChevronUp,
  HiOutlineArrowSmallRight,
} from 'react-icons/hi2';
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaGithub,
  FaHeart,
  FaMugHot,
} from 'react-icons/fa6';
import {
  SiReact,
  SiVite,
  SiTailwindcss,
  SiFramer,
  SiGithubpages,
} from 'react-icons/si';
import { MdOutlineAlternateEmail } from 'react-icons/md';

/* ═══════════════════════════════════════════════════════════════
   Data
   ═══════════════════════════════════════════════════════════════ */
const socials = [
  { name: 'Facebook',  icon: FaFacebookF,  url: '#',                                    color: '#1877F2' },
  { name: 'LinkedIn',  icon: FaLinkedinIn, url: '#',                                    color: '#0A66C2' },
  { name: 'Instagram', icon: FaInstagram,  url: '#',                                    color: '#E4405F' },
  { name: 'GitHub',    icon: FaGithub,     url: 'https://github.com/JavaidIqbal786',    color: '#e6edf3' },
];

const quickLinks = [
  { label: 'Home',           to: 'hero' },
  { label: 'About',          to: 'about' },
  { label: 'Skills',         to: 'skills' },
  { label: 'Projects',       to: 'projects' },
  { label: 'Certifications', to: 'certifications' },
  { label: 'Contact',        to: 'contact' },
];

const techStack = [
  { name: 'React',         icon: SiReact,              color: '#61DAFB' },
  { name: 'Vite',          icon: SiVite,               color: '#646CFF' },
  { name: 'Tailwind CSS',  icon: SiTailwindcss,        color: '#06B6D4' },
  { name: 'Framer Motion', icon: SiFramer,             color: '#0055FF' },
  { name: 'EmailJS',       icon: MdOutlineAlternateEmail, color: '#FF6B6B' },
  { name: 'GitHub Pages',  icon: SiGithubpages,        color: '#00ff88' },
];

/* ═══════════════════════════════════════════════════════════════
   Footer Component
   ═══════════════════════════════════════════════════════════════ */
const Footer = () => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      <footer className="relative bg-[var(--bg-secondary)] overflow-hidden">
        {/* ── animated gradient top line ── */}
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent
                        via-[var(--accent-green)] to-transparent animate-pulse-glow" />

        {/* ═══════ TOP SECTION ═══════ */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">

            {/* ── Column 1: Brand ── */}
            <div className="flex flex-col items-center gap-5 text-center sm:items-start sm:text-left">
              {/* logo */}
              <span className="text-2xl font-bold font-mono tracking-tighter
                             bg-gradient-to-r from-[var(--accent-green)] to-[var(--accent-blue)]
                             bg-clip-text text-transparent select-none">
                &lt;/JI&gt;
              </span>

              <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-xs">
                Building digital experiences with code &amp; creativity.
              </p>

              {/* socials */}
              <div className="flex justify-center gap-3 mt-1 sm:justify-start">
                {socials.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.name}
                      className="flex h-9 w-9 items-center justify-center rounded-lg
                                 bg-[var(--bg-card)] border border-[var(--border)]
                                 text-[var(--text-muted)] transition-all duration-300
                                 hover:scale-110"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = s.color;
                        e.currentTarget.style.borderColor = `${s.color}55`;
                        e.currentTarget.style.boxShadow = `0 0 14px ${s.color}33`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '';
                        e.currentTarget.style.borderColor = '';
                        e.currentTarget.style.boxShadow = '';
                      }}
                    >
                      <Icon className="text-sm" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* ── Column 2: Quick Links ── */}
            <nav aria-label="Footer navigation" className="text-center sm:text-left">
              <h4 className="text-sm font-semibold text-[var(--text-primary)] uppercase
                           tracking-widest mb-5">
                Quick Links
              </h4>
              <ul className="flex flex-col gap-2.5">
                {quickLinks.map((link) => (
                  <li key={link.to}>
                    <ScrollLink
                      to={link.to}
                      smooth
                      duration={600}
                      offset={-80}
                      className="group flex items-center gap-1.5 text-sm text-[var(--text-muted)]
                                 cursor-pointer transition-colors duration-200
                                 hover:text-[var(--accent-green)]"
                    >
                      <HiOutlineArrowSmallRight
                        className="text-xs opacity-0 -translate-x-2
                                   group-hover:opacity-100 group-hover:translate-x-0
                                   transition-all duration-200 text-[var(--accent-green)]"
                      />
                      {link.label}
                    </ScrollLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* ── Column 3: Tech Stack ── */}
            <div className="text-center sm:text-left">
              <h4 className="text-sm font-semibold text-[var(--text-primary)] uppercase
                           tracking-widest mb-5">
                Built With
              </h4>
              <ul className="flex flex-col gap-2.5">
                {techStack.map((tech) => {
                  const Icon = tech.icon;
                  return (
                    <li
                      key={tech.name}
                      className="flex items-center gap-2.5 text-sm text-[var(--text-muted)]"
                    >
                      <Icon className="text-base shrink-0" style={{ color: tech.color }} />
                      {tech.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* ═══════ DIVIDER ═══════ */}
        <div className="border-t border-[var(--border)]" />

        {/* ═══════ BOTTOM SECTION ═══════ */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4
                          text-xs text-[var(--text-muted)]">
            <p>&copy; {new Date().getFullYear()} Javaid Iqbal. All rights reserved.</p>

            <p className="flex items-center gap-1.5">
              Designed &amp; Built with{' '}
              <FaHeart className="text-red-500 text-[10px]" /> and{' '}
              <FaMugHot className="text-amber-500 text-[10px]" />
            </p>

            <p className="flex items-center gap-1.5">
              Made with{' '}
              <SiReact className="text-[#61DAFB] text-[10px]" /> React +{' '}
              <SiVite className="text-[#646CFF] text-[10px]" /> Vite
            </p>
          </div>
        </div>
      </footer>

      {/* ═══════ BACK TO TOP BUTTON ═══════ */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onClick={scrollToTop}
            aria-label="Back to top"
            className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center
                       justify-center rounded-full bg-[var(--accent-green)]
                       text-[var(--bg-primary)] shadow-[var(--glow-green)]
                       hover:shadow-glow-green-lg transition-shadow duration-300
                       cursor-pointer"
          >
            <HiOutlineChevronUp className="text-lg font-bold" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default Footer;
