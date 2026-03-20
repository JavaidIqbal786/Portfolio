import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import toast from 'react-hot-toast';
import AnimatedSection from './AnimatedSection';
import {
  HiOutlineEnvelope,
  HiOutlineMapPin,
  HiOutlineClock,
  HiOutlineBriefcase,
  HiOutlinePaperAirplane,
} from 'react-icons/hi2';
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaGithub,
} from 'react-icons/fa6';

/* ═══════════════════════════════════════════════════════════════
   Static Data
   ═══════════════════════════════════════════════════════════════ */
const contactInfo = [
  {
    icon: HiOutlineEnvelope,
    label: 'Email',
    value: 'Send me a message via the form',
    color: 'var(--accent-green)',
  },
  {
    icon: HiOutlineMapPin,
    label: 'Location',
    value: 'Dubai, United Arab Emirates',
    color: 'var(--accent-blue)',
  },
  {
    icon: HiOutlineClock,
    label: 'Response Time',
    value: 'Usually within 24 hours',
    color: 'var(--accent-purple)',
  },
  {
    icon: HiOutlineBriefcase,
    label: 'Availability',
    value: 'Open to projects & collaborations',
    color: 'var(--accent-yellow)',
  },
];

const socials = [
  { name: 'Facebook',  icon: FaFacebookF,  url: 'https://www.facebook.com/javaid.iqbal.14268', color: '#1877F2' },
  { name: 'LinkedIn',  icon: FaLinkedinIn, url: 'https://www.linkedin.com/in/javaidiqbaldev/',  color: '#0A66C2' },
  { name: 'Instagram', icon: FaInstagram,  url: 'https://www.instagram.com/javaid.iqbal.786/',  color: '#E4405F' },
  { name: 'GitHub',    icon: FaGithub,     url: 'https://github.com/JavaidIqbal786',           color: '#e6edf3' },
];

/* ═══════════════════════════════════════════════════════════════
   Validation helpers
   ═══════════════════════════════════════════════════════════════ */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validate = (values) => {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Name is required';
  if (!values.email.trim()) errors.email = 'Email is required';
  else if (!emailRegex.test(values.email)) errors.email = 'Enter a valid email address';
  if (!values.subject.trim()) errors.subject = 'Subject is required';
  if (!values.message.trim()) errors.message = 'Message is required';
  else if (values.message.trim().length < 20)
    errors.message = `At least 20 characters (${values.message.trim().length}/20)`;
  return errors;
};

/* Mailto builder */
const buildMailto = ({ name, email, subject, message }) => {
  const params = new URLSearchParams({
    subject: `${subject || 'Portfolio contact'} — ${name || 'Someone'}`,
    body: `From: ${name || 'N/A'} <${email || 'N/A'}>\n\n${message || ''}`,
  });
  return `mailto:javaidiqbaldev@gmail.com?${params.toString()}`;
};

/* ═══════════════════════════════════════════════════════════════
   Social Link
   ═══════════════════════════════════════════════════════════════ */
const SocialLink = ({ social }) => {
  const Icon = social.icon;
  return (
    <div className="relative group">
      {/* tooltip */}
      <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2
                       whitespace-nowrap rounded-md bg-[var(--bg-card)] border
                       border-[var(--border)] px-2.5 py-1 text-xs text-[var(--text-primary)]
                       opacity-0 group-hover:opacity-100 transition-opacity duration-200
                       shadow-lg z-10">
        {social.name}
      </span>
      {/* icon button */}
      <a
        href={social.url}
        target="_blank"
        rel="noreferrer"
        className="h-10 w-10 rounded-full bg-[var(--bg-card)] border border-[var(--border)]
                   flex items-center justify-center text-[var(--text-muted)]
                   hover:text-[var(--text-primary)] hover:border-transparent
                   hover:scale-105 transition-all duration-200"
        style={{ '--hover-color': social.color }}
      >
        <Icon className="text-lg group-hover:text-[var(--hover-color)]" />
      </a>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   Contact Component
   ═══════════════════════════════════════════════════════════════ */
const Contact = () => {
  const formRef = useRef(null);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const [values, setValues] = useState({ name: '', email: '', subject: '', message: '' });
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  /* ── handlers ── */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => {
        const next = validate({ ...values, [name]: value });
        return { ...prev, [name]: next[name] || undefined };
      });
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    const next = validate(values);
    setErrors((prev) => ({ ...prev, [name]: next[name] || undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate(values);
    setErrors(newErrors);
    setTouched({ name: true, email: true, subject: true, message: true });

    if (Object.keys(newErrors).length > 0) {
      toast.error('Please fix the errors above');
      return;
    }

    window.location.href = buildMailto(values);
    toast.success('Opening your email app…');
  };

  /* ── animation variants ── */
  const slideLeft  = { hidden: { opacity: 0, x: -50 }, show: { opacity: 1, x: 0 } };
  const slideRight = { hidden: { opacity: 0, x: 50 },  show: { opacity: 1, x: 0 } };

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      {/* ambient glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px]
                      bg-[var(--accent-green)]/5 rounded-full blur-[160px]
                      pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px]
                      bg-[var(--accent-blue)]/5 rounded-full blur-[140px]
                      pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-4 rounded-full text-xs font-mono
                         tracking-widest uppercase border border-[var(--accent-green)]/30
                         text-[var(--accent-green)] bg-[var(--accent-green)]/5">
            &lt; Contact /&gt;
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4">
            Let&apos;s Build Something Great
          </h2>
          <p className="max-w-2xl mx-auto text-[var(--text-muted)]">
            Have a project in mind or just want to connect? Drop me a line and I&apos;ll get back to you soon.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* ─────── LEFT — Info ─────── */}
          <AnimatedSection direction="left" delay={0.1} className="lg:col-span-2">
            <motion.div
              variants={slideLeft}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="glass-card p-6 sm:p-8 flex flex-col gap-6 h-full"
            >
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-3">
                  Get In Touch
                </h3>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                  Whether you have a question, a potential collaboration, or an exciting
                  project — don&apos;t hesitate to reach out. I&apos;m always open to new
                  opportunities and meaningful connections.
                </p>
              </div>

              {/* info cards */}
              <div className="flex flex-col gap-4">
                {contactInfo.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                      className="flex items-center gap-4 p-4 rounded-xl
                                 bg-[var(--bg-card)] border border-[var(--border)]"
                    >
                      <div className="h-11 w-11 rounded-xl bg-[var(--bg-secondary)]
                                      flex items-center justify-center text-lg"
                           style={{ color: item.color }}>
                        <Icon />
                      </div>
                      <div className="flex-1">
                        <p className="text-[var(--text-muted)] text-xs uppercase tracking-wider">
                          {item.label}
                        </p>
                        <p className="text-[var(--text-primary)] font-medium">
                          {item.value}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* socials */}
              <div className="pt-4 border-t border-[var(--border)]">
                <p className="text-[var(--text-muted)] text-sm mb-3">
                  Let&apos;s connect
                </p>
                <div className="flex gap-3">
                  {socials.map((social) => (
                    <SocialLink key={social.name} social={social} />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatedSection>

          {/* ─────── RIGHT — Form ─────── */}
          <AnimatedSection direction="right" delay={0.2} className="lg:col-span-3">
            <motion.div
              variants={slideRight}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-3"
            >
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                noValidate
                className="glass-card p-6 sm:p-8 flex flex-col gap-5"
              >
                {/* hidden field to keep the same template variables if ever needed */}
                <input type="hidden" name="to_name" value="Javaid Iqbal" />

                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-xs text-[var(--text-muted)]
                                                    uppercase tracking-wider mb-1.5">
                    Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${fieldBase} ${fieldBorder(touched.name, errors.name)}`}
                  />
                  {touched.name && errors.name && (
                    <p className="mt-1 text-xs text-red-400">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-xs text-[var(--text-muted)]
                                                     uppercase tracking-wider mb-1.5">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${fieldBase} ${fieldBorder(touched.email, errors.email)}`}
                  />
                  {touched.email && errors.email && (
                    <p className="mt-1 text-xs text-red-400">{errors.email}</p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-xs text-[var(--text-muted)]
                                                       uppercase tracking-wider mb-1.5">
                    Subject <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="Project Inquiry"
                    value={values.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${fieldBase} ${fieldBorder(touched.subject, errors.subject)}`}
                  />
                  {touched.subject && errors.subject && (
                    <p className="mt-1 text-xs text-red-400">{errors.subject}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label htmlFor="message" className="text-xs text-[var(--text-muted)]
                                                         uppercase tracking-wider">
                      Message <span className="text-red-400">*</span>
                    </label>
                    <span className={`text-xs font-mono ${
                      values.message.trim().length >= 20
                        ? 'text-[var(--accent-green)]'
                        : 'text-[var(--text-muted)]'
                    }`}>
                      {values.message.trim().length} / 20 min
                    </span>
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tell me about your project or idea..."
                    value={values.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${fieldBase} resize-none
                      ${fieldBorder(touched.message, errors.message)}`}
                  />
                  {touched.message && errors.message && (
                    <p className="mt-1 text-xs text-red-400">{errors.message}</p>
                  )}
                </div>

                {/* Hidden fields (kept for compatibility; harmless) */}
                <input type="hidden" name="from_name"  value={values.name} />
                <input type="hidden" name="from_email" value={values.email} />

                {/* Submit */}
                <button
                  type="submit"
                  className="btn-primary w-full flex items-center justify-center gap-2.5 mt-2"
                >
                  <HiOutlinePaperAirplane className="text-lg -rotate-12" />
                  Send Message
                </button>
              </form>
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Contact;

/* ═══════════════════════════════════════════════════════════════
   Styled helpers
   ═══════════════════════════════════════════════════════════════ */
const fieldBase = `w-full rounded-lg bg-[var(--bg-secondary)] border border-[var(--border)]
                    px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)]
                    focus:outline-none focus:border-[var(--accent-green)] focus:ring-2
                    focus:ring-[var(--accent-green)]/20 transition`;

const fieldBorder = (touched, error) => {
  if (!touched) return '';
  if (error) return 'border-red-400/70 focus:border-red-400 focus:ring-red-400/20';
  return 'border-[var(--accent-green)]/60';
};
