import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Lightbox from 'yet-another-react-lightbox';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import {
  FiExternalLink,
  FiGithub,
  FiX,
  FiCalendar,
  FiGrid,
  FiImage,
} from 'react-icons/fi';
import { HiOutlineStatusOnline } from 'react-icons/hi';
import AnimatedSection from './AnimatedSection';

import projects from '../data/projects';

/* ═══════════════════════════════════════════════════════════════
   Constants
   ═══════════════════════════════════════════════════════════════ */
const CATEGORIES = ['All', 'Web', 'AI/ML', 'Security', 'Python', 'Full Stack'];

const statusColor = {
  Live: 'bg-accent-green/20 text-accent-green border-accent-green/30',
  'In Progress': 'bg-accent-orange/20 text-accent-orange border-accent-orange/30',
  'Open Source': 'bg-accent-blue/20 text-accent-blue border-accent-blue/30',
};

/* ═══════════════════════════════════════════════════════════════
   Framer variants
   ═══════════════════════════════════════════════════════════════ */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
  }),
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.25 } },
};

const modalVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: 40, scale: 0.97, transition: { duration: 0.25 } },
};

/* ═══════════════════════════════════════════════════════════════
   Featured Project Card (full-width)
   ═══════════════════════════════════════════════════════════════ */
const FeaturedCard = ({ project, index, onDetails, onLightbox }) => (
  <motion.div
    layout
    custom={index}
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    className="group col-span-full grid grid-cols-1 overflow-hidden rounded-2xl border border-border bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-accent-green/30 hover:shadow-glow-green md:grid-cols-2"
  >
    {/* image */}
    <div className="relative h-64 overflow-hidden md:h-auto">
      <img
        src={project.images[0]}
        alt={project.title}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <button
          onClick={() => onLightbox(project)}
          className="flex items-center gap-1.5 rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-white/20"
        >
          <FiImage /> View Gallery
        </button>
      </div>
      <span className={`absolute right-3 top-3 rounded-full border px-2.5 py-0.5 text-[11px] font-medium backdrop-blur-md ${statusColor[project.status]}`}>
        {project.status}
      </span>
      <span className="absolute left-3 top-3 rounded-full bg-accent-green/15 px-2.5 py-0.5 text-[11px] font-semibold text-accent-green backdrop-blur-md border border-accent-green/30">
        ★ Featured
      </span>
    </div>

    {/* body */}
    <div className="flex flex-col justify-center gap-4 p-6 md:p-8">
      <div className="flex items-center gap-2 text-xs text-text-muted">
        <FiCalendar className="text-accent-green" /> {project.year}
        <span className="mx-1 text-border">|</span>
        <FiGrid className="text-accent-blue" /> {project.category}
      </div>
      <h3 className="text-xl font-bold text-text-primary sm:text-2xl">{project.title}</h3>
      <p className="text-sm leading-relaxed text-text-muted">{project.description}</p>
      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-border bg-primary/50 px-2.5 py-0.5 text-[11px] font-medium text-text-muted">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-2 flex items-center gap-3">
        <button onClick={() => onDetails(project)} className="btn-primary !px-5 !py-2 text-sm">
          View Details
        </button>
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} source code on GitHub`} className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-muted transition-all hover:border-accent-green/40 hover:text-accent-green">
          <FiGithub />
        </a>
        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} live demo`} className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-muted transition-all hover:border-accent-blue/40 hover:text-accent-blue">
          <FiExternalLink />
        </a>
      </div>
    </div>
  </motion.div>
);

/* ═══════════════════════════════════════════════════════════════
   Regular Project Card
   ═══════════════════════════════════════════════════════════════ */
const ProjectCard = ({ project, index, onDetails, onLightbox }) => (
  <motion.div
    layout
    custom={index}
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-accent-green/30 hover:shadow-glow-green"
  >
    {/* image */}
    <div className="relative h-48 overflow-hidden">
      <img
        src={project.images[0]}
        alt={project.title}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />
      <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <button
          onClick={() => onLightbox(project)}
          className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md transition-colors hover:bg-white/20"
        >
          <FiImage /> Gallery
        </button>
        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} live demo`} className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20">
          <FiExternalLink className="text-sm" />
        </a>
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} source code on GitHub`} className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20">
          <FiGithub className="text-sm" />
        </a>
      </div>
      <span className={`absolute right-3 top-3 rounded-full border px-2.5 py-0.5 text-[11px] font-medium backdrop-blur-md ${statusColor[project.status]}`}>
        {project.status}
      </span>
    </div>

    {/* body */}
    <div className="flex flex-1 flex-col gap-3 p-5">
      <div className="flex items-center justify-between text-xs text-text-muted">
        <span className="flex items-center gap-1"><FiCalendar className="text-accent-green" /> {project.year}</span>
        <span className="rounded-full bg-primary/60 px-2 py-0.5 text-[10px]">{project.category}</span>
      </div>
      <h3 className="text-base font-semibold text-text-primary line-clamp-1">{project.title}</h3>
      <p className="text-sm leading-relaxed text-text-muted line-clamp-2">{project.description}</p>
      <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
        {project.tags.slice(0, 4).map((tag) => (
          <span key={tag} className="rounded-full border border-border bg-primary/50 px-2 py-0.5 text-[10px] font-medium text-text-muted">
            {tag}
          </span>
        ))}
        {project.tags.length > 4 && (
          <span className="rounded-full border border-border bg-primary/50 px-2 py-0.5 text-[10px] font-medium text-text-muted">
            +{project.tags.length - 4}
          </span>
        )}
      </div>
    </div>

    {/* footer */}
    <div className="flex items-center justify-between border-t border-border px-5 py-3">
      <button onClick={() => onDetails(project)} className="text-xs font-medium text-accent-green transition-colors hover:text-accent-blue">
        View Details →
      </button>
      <div className="flex items-center gap-2">
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} source code`} className="text-text-muted transition-colors hover:text-accent-green">
          <FiGithub className="text-sm" />
        </a>
        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} live site`} className="text-text-muted transition-colors hover:text-accent-blue">
          <FiExternalLink className="text-sm" />
        </a>
      </div>
    </div>
  </motion.div>
);

/* ═══════════════════════════════════════════════════════════════
   Project Detail Modal
   ═══════════════════════════════════════════════════════════════ */
const ProjectModal = ({ project, onClose, onLightbox }) => {
  if (!project) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[2000] flex items-center justify-center overflow-y-auto bg-black/70 p-2 backdrop-blur-sm sm:p-4"
    >
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
        className="relative my-0 w-full max-w-full overflow-hidden rounded-none border-0 bg-secondary shadow-2xl sm:my-8 sm:max-w-3xl sm:rounded-2xl sm:border sm:border-border"
      >
        {/* close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-card/80 text-text-muted backdrop-blur-md transition-colors hover:bg-accent-green/20 hover:text-accent-green"
        >
          <FiX />
        </button>

        {/* gallery image */}
        <div
          className="group relative h-64 cursor-pointer overflow-hidden sm:h-80"
          onClick={() => onLightbox(project)}
        >
          <img
            src={project.images[0]}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
            <span className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
              <FiImage /> View All {project.images.length} Images
            </span>
          </div>
          <span className={`absolute right-4 top-4 rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-md ${statusColor[project.status]}`}>
            {project.status}
          </span>
        </div>

        {/* content */}
        <div className="space-y-5 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">{project.title}</h2>

          {/* stats row */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted">
            <span className="flex items-center gap-1.5">
              <FiCalendar className="text-accent-green" /> {project.year}
            </span>
            <span className="flex items-center gap-1.5">
              <HiOutlineStatusOnline className="text-accent-blue" /> {project.status}
            </span>
            <span className="flex items-center gap-1.5">
              <FiGrid className="text-accent-purple" /> {project.category}
            </span>
          </div>

          {/* description */}
          <p className="leading-relaxed text-text-muted">{project.longDescription}</p>

          {/* tech stack */}
          <div>
            <h4 className="mb-2 text-sm font-semibold text-text-primary">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-text-muted transition-colors hover:border-accent-green/30 hover:text-accent-green">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary !px-6 !py-2.5 text-sm">
              <FiExternalLink /> Live Demo
            </a>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary !px-6 !py-2.5 text-sm">
              <FiGithub /> View Code
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   Projects Component
   ═══════════════════════════════════════════════════════════════ */
const Projects = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [lightboxProject, setLightboxProject] = useState(null);

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  /* counts per category */
  const counts = useMemo(() => {
    const map = { All: projects.length };
    CATEGORIES.slice(1).forEach((cat) => {
      map[cat] = projects.filter((p) => p.category === cat).length;
    });
    return map;
  }, []);

  /* filtered */
  const filtered = useMemo(() => {
    if (activeTab === 'All') return projects;
    return projects.filter((p) => p.category === activeTab);
  }, [activeTab]);

  const featured = filtered.filter((p) => p.featured);
  const regular = filtered.filter((p) => !p.featured);

  /* handlers */
  const openDetails = useCallback((p) => {
    setSelectedProject(p);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeDetails = useCallback(() => {
    setSelectedProject(null);
    document.body.style.overflow = '';
  }, []);

  const openLightbox = useCallback((p) => setLightboxProject(p), []);
  const closeLightbox = useCallback(() => setLightboxProject(null), []);

  return (
    <section id="projects" style={{ background: 'var(--bg-secondary)' }}>
      <div className="h-px bg-gradient-to-r from-transparent via-accent-green/20 to-transparent" />

      <div className="section-padding" ref={ref}>
        {/* ── Header ──────────────────────────────────────────── */}
        <AnimatedSection direction="fade">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mb-14 text-center"
        >
          <span className="code-font text-sm tracking-widest text-accent-green">
            {'< Projects />'}
          </span>
          <h2 className="section-title mt-3">
            Things I've{' '}
            <span className="gradient-text">built</span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-accent-green to-accent-blue" />
          <span className="mt-4 inline-block rounded-full border border-accent-green/30 bg-accent-green/5 px-4 py-1 text-xs font-medium text-accent-green">
            {projects.length}+ Projects
          </span>
        </motion.div>
        </AnimatedSection>

        {/* ── Filter tabs ─────────────────────────────────────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="scrollbar-hide mb-10 flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center sm:overflow-x-visible sm:pb-0"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`relative whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 ${
                activeTab === cat
                  ? 'bg-accent-green text-primary shadow-glow-green'
                  : 'border border-border bg-card/40 text-text-muted hover:border-accent-green/30 hover:text-text-primary'
              }`}
            >
              {cat}
              <span className={`ml-1.5 text-[10px] ${activeTab === cat ? 'text-primary/70' : 'text-text-muted/50'}`}>
                {counts[cat]}
              </span>
            </button>
          ))}
        </motion.div>

        {/* ── Project grid ────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {/* featured cards (full width) */}
            {featured.map((p, i) => (
              <FeaturedCard
                key={p.id}
                project={p}
                index={i}
                onDetails={openDetails}
                onLightbox={openLightbox}
              />
            ))}

            {/* regular cards */}
            {regular.map((p, i) => (
              <ProjectCard
                key={p.id}
                project={p}
                index={featured.length + i}
                onDetails={openDetails}
                onLightbox={openLightbox}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Detail modal ──────────────────────────────────────── */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            key="modal"
            project={selectedProject}
            onClose={closeDetails}
            onLightbox={(p) => {
              closeDetails();
              setTimeout(() => openLightbox(p), 300);
            }}
          />
        )}
      </AnimatePresence>

      {/* ── Lightbox ──────────────────────────────────────────── */}
      {lightboxProject && (
        <Lightbox
          open={!!lightboxProject}
          close={closeLightbox}
          slides={lightboxProject.images.map((src) => ({ src }))}
          plugins={[Thumbnails]}
          styles={{
            container: { backgroundColor: 'rgba(10,14,23,0.95)' },
          }}
        />
      )}
    </section>
  );
};

export default Projects;
