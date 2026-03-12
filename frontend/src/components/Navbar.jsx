import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3 } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';

/* ── nav link data ──────────────────────────────────────────── */
const navLinks = [
  { to: 'hero', label: 'Home' },
  { to: 'about', label: 'About' },
  { to: 'skills', label: 'Skills' },
  { to: 'projects', label: 'Projects' },
  { to: 'certifications', label: 'Certifications' },
  { to: 'contact', label: 'Contact' },
];

/* ── framer variants ────────────────────────────────────────── */
const navbarVariants = {
  hidden: { y: -80, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const mobileMenuVariants = {
  closed: {
    x: '100%',
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
  open: {
    x: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

const mobileLinkVariants = {
  closed: { opacity: 0, x: 30 },
  open: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.1 + i * 0.08, duration: 0.35 },
  }),
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  /* ── scroll listener ─────────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── IntersectionObserver for active link ────────────────── */
  useEffect(() => {
    const ids = navLinks.map((l) => l.to);
    const observers = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  /* ── lock body scroll when mobile menu open ──────────────── */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <motion.header
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
        scrolled
          ? 'bg-secondary/90 backdrop-blur-xl border-b border-border shadow-lg shadow-black/10'
          : 'bg-transparent'
      }`}
    >
      <nav aria-label="Main navigation" className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* ── Logo ───────────────────────────────────────────── */}
        <Link
          to="hero"
          smooth
          duration={600}
          className="cursor-pointer select-none"
        >
          <span className="gradient-text code-font text-2xl font-bold tracking-tight">
            {'</JI>'}
          </span>
        </Link>

        {/* ── Desktop links ──────────────────────────────────── */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                spy
                smooth
                offset={-80}
                duration={600}
                className={`group relative cursor-pointer px-3 py-2 text-sm font-medium transition-colors duration-300 ${
                  activeSection === link.to
                    ? 'text-accent-green'
                    : 'text-text-muted hover:text-text-primary'
                }`}
              >
                {link.label}

                {/* animated underline */}
                <span
                  className={`absolute bottom-0 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-accent-green transition-all duration-300 ${
                    activeSection === link.to
                      ? 'w-3/4'
                      : 'w-0 group-hover:w-1/2'
                  }`}
                />
              </Link>
            </li>
          ))}
        </ul>

        {/* ── CTA + hamburger ────────────────────────────────── */}
        <div className="flex items-center gap-3">
          <Link
            to="contact"
            smooth
            offset={-80}
            duration={600}
            className="btn-primary hidden cursor-pointer !px-5 !py-2 text-sm md:inline-flex"
          >
            Hire Me
          </Link>

          {/* hamburger / close */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="relative z-[1100] flex h-10 w-10 items-center justify-center rounded-lg text-2xl text-text-primary transition-colors hover:text-accent-green md:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <IoClose />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <HiMenuAlt3 />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* ── Mobile menu overlay ─────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeMobile}
              className="fixed inset-0 z-[1050] bg-black/60 backdrop-blur-sm md:hidden"
            />

            {/* slide-in panel */}
            <motion.div
              key="panel"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed right-0 top-0 z-[1060] flex h-screen w-[75vw] max-w-xs flex-col bg-secondary/95 backdrop-blur-2xl border-l border-border md:hidden"
            >
              <div className="flex flex-1 flex-col justify-center gap-2 px-8">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.to}
                    custom={i}
                    variants={mobileLinkVariants}
                    initial="closed"
                    animate="open"
                  >
                    <Link
                      to={link.to}
                      spy
                      smooth
                      offset={-80}
                      duration={600}
                      onClick={closeMobile}
                      className={`block rounded-lg px-4 py-3 text-lg font-medium transition-colors duration-200 ${
                        activeSection === link.to
                          ? 'text-accent-green bg-accent-green/5'
                          : 'text-text-muted hover:text-text-primary hover:bg-white/5'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile CTA */}
                <motion.div
                  custom={navLinks.length}
                  variants={mobileLinkVariants}
                  initial="closed"
                  animate="open"
                  className="mt-6"
                >
                  <Link
                    to="contact"
                    smooth
                    offset={-80}
                    duration={600}
                    onClick={closeMobile}
                    className="btn-primary w-full cursor-pointer justify-center text-center"
                  >
                    Hire Me
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
