/* ═══════════════════════════════════════════════════════════════
   Performance Audit Checklist — run before every deploy
   ═══════════════════════════════════════════════════════════════
   □  Lighthouse Performance  ≥ 90   (mobile & desktop)
   □  Lighthouse Accessibility ≥ 95
   □  Lighthouse Best Practices ≥ 95
   □  Lighthouse SEO           ≥ 95
   □  First Contentful Paint   < 1.5 s
   □  Largest Contentful Paint < 2.5 s
   □  Total Blocking Time      < 200 ms
   □  Cumulative Layout Shift  < 0.1
   □  Bundle: no chunk > 400 KB (gzipped < 150 KB)
   □  Images: all have alt, width/height, lazy loading
   □  Fonts: preconnect to Google Fonts, display=swap
   □  HTTPS enforced, HSTS header via GitHub Pages
   □  Open Graph preview works (use https://metatags.io)
   □  robots.txt & sitemap.xml accessible
   ═══════════════════════════════════════════════════════════════ */

import { useState, useEffect, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';

/* ── Lazy-loaded heavy sections ────────────────────────────── */
const Projects = lazy(() => import('./components/Projects'));
const Stats = lazy(() => import('./components/Stats'));
const Certifications = lazy(() => import('./components/Certifications'));
const Contact = lazy(() => import('./components/Contact'));
import Footer from './components/Footer';

/* ── Suspense fallback (minimal spinner) ───────────────────── */
const SectionFallback = () => (
  <div className="flex items-center justify-center py-32" role="status" aria-label="Loading section">
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent-green/30 border-t-accent-green" />
  </div>
);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  /* ── GitHub Pages SPA redirect handler ───────────────────── */
  useEffect(() => {
    const { search } = window.location;
    if (search.startsWith('?/')) {
      const decoded = search
        .slice(2)
        .split('&')
        .map((s) => s.replace(/~and~/g, '&'))
        .join('?');
      window.history.replaceState(null, '', '/' + decoded + window.location.hash);
    }
  }, []);

  return (
    <>
      {/* Toast notifications */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'var(--bg-card)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            fontSize: '14px',
          },
          success: {
            iconTheme: {
              primary: 'var(--accent-green)',
              secondary: 'var(--bg-card)',
            },
          },
          error: {
            iconTheme: {
              primary: '#ff4757',
              secondary: 'var(--bg-card)',
            },
          },
        }}
      />

      {/* Loader overlay */}
      <AnimatePresence mode="wait">
        {isLoading && <Loader key="loader" />}
      </AnimatePresence>

      {/* Main site content — fades in after loader */}
      <AnimatePresence>
        {!isLoading && (
          <motion.div
            key="site"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative min-h-screen bg-primary text-text-primary"
          >
            {/* ── Skip to main content (a11y) ──────────────── */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999]
                         focus:rounded-lg focus:bg-accent-green focus:px-4 focus:py-2
                         focus:text-sm focus:font-semibold focus:text-primary focus:outline-none"
            >
              Skip to main content
            </a>

            <CustomCursor />
            <ScrollProgress />
            <Navbar />
            <main id="main-content">
              <Hero />
              <About />
              <Skills />
              <Suspense fallback={<SectionFallback />}>
                <Projects />
              </Suspense>
              <Suspense fallback={<SectionFallback />}>
                <Stats />
              </Suspense>
              <Suspense fallback={<SectionFallback />}>
                <Certifications />
              </Suspense>
              <Suspense fallback={<SectionFallback />}>
                <Contact />
              </Suspense>
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
