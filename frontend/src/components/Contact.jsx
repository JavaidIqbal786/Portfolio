import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import AnimatedSection from './AnimatedSection';

// Initialize EmailJS with public key at module load
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY');
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
   EmailJS Setup Guide (step-by-step)
   ═══════════════════════════════════════════════════════════════

   STEP 1 — Create a free EmailJS account
   ────────────────────────────────────────
   • Go to https://www.emailjs.com/ and click "Sign Up Free"
   • The free tier gives you 200 emails/month — plenty for a
     portfolio contact form.

   STEP 2 — Add an Email Service
   ────────────────────────────────────────
   • In the EmailJS dashboard, click  "Add New Service"
   • Choose your email provider (Gmail recommended)
   • Click "Connect Account" and sign in with your Google account
   • Grant EmailJS permission to send on your behalf
   • Give the service a name (e.g. "Portfolio Contact")
   • Click "Create Service"
   • ✅ Note down your  Service ID  (e.g. "service_abc1234")

   STEP 3 — Create an Email Template
   ────────────────────────────────────────
   • Go to "Email Templates" → "Create New Template"
   • Set these fields:
       To Email :  your-actual-email@gmail.com
       Subject  :  Portfolio Contact: {{subject}}
       Body     :
         ┌──────────────────────────────────────────────┐
         │  From:    {{from_name}} ({{from_email}})     │
         │  Subject: {{subject}}                        │
         │                                              │
         │  Message:                                    │
         │  {{message}}                                 │
         └──────────────────────────────────────────────┘
   • The  Reply To  field should be:  {{from_email}}
   • Click "Save"
   • ✅ Note down your  Template ID  (e.g. "template_xyz7890")

   STEP 4 — Get your Public Key
   ────────────────────────────────────────
   • Go to "Account" → "API Keys"
   • Copy the  Public Key  (e.g. "aBcDeFgHiJkLmNo")
   • ⚠️ This key is safe to expose in frontend code — it can
     only be used to send emails through YOUR templates.

   STEP 5 — Local development (.env file)
   ────────────────────────────────────────
   • Copy  .env.example  to  .env  in the frontend/ folder
   • Fill in your values:
       VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
       VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
       VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
   • Restart the dev server (npm run dev)

   STEP 6 — GitHub Pages deployment (GitHub Secrets)
   ────────────────────────────────────────
   • .env is NOT committed to Git (it's in .gitignore)
   • Go to your GitHub repo → Settings → Secrets and variables
     → Actions → "New repository secret"
   • Add these three secrets:
       Name: VITE_EMAILJS_SERVICE_ID    Value: service_xxxxxxx
       Name: VITE_EMAILJS_TEMPLATE_ID   Value: template_xxxxxxx
       Name: VITE_EMAILJS_PUBLIC_KEY     Value: xxxxxxxxxxxxxxx
   • The deploy.yml workflow injects them as env vars at build
     time so Vite can inline them into the bundle.

   ═══════════════════════════════════════════════════════════════ */
const EMAILJS_CONFIG = {
  serviceId:  import.meta.env.VITE_EMAILJS_SERVICE_ID  || 'YOUR_SERVICE_ID',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
  publicKey:  import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || 'YOUR_PUBLIC_KEY',
};

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
    value: 'Pakistan 🇵🇰',
    color: 'var(--accent-blue)',
  },
  {
    icon: HiOutlineClock,
    label: 'Response Time',
    value: 'Within 24 hours',
    color: 'var(--accent-purple)',
  },
  {
    icon: HiOutlineBriefcase,
    label: 'Status',
    value: 'Available for projects',
    color: 'var(--accent-green)',
    showDot: true,
  },
];

const socials = [
  { name: 'Facebook',  icon: FaFacebookF,  url: '#', hoverColor: '#1877F2' },
  { name: 'LinkedIn',  icon: FaLinkedinIn, url: '#', hoverColor: '#0A66C2' },
  { name: 'Instagram', icon: FaInstagram,  url: '#', hoverColor: '#E4405F' },
  { name: 'GitHub',    icon: FaGithub,     url: 'https://github.com/JavaidIqbal786', hoverColor: '#e6edf3' },
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
      <a
        href={social.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={social.name}
        className="flex h-11 w-11 items-center justify-center rounded-xl
                   bg-[var(--bg-card)] border border-[var(--border)]
                   text-[var(--text-muted)] transition-all duration-300
                   hover:scale-110 hover:border-transparent"
        onMouseEnter={(e) => {
          e.currentTarget.style.color = social.hoverColor;
          e.currentTarget.style.boxShadow = `0 0 18px ${social.hoverColor}44`;
          e.currentTarget.style.borderColor = `${social.hoverColor}55`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = '';
          e.currentTarget.style.boxShadow = '';
          e.currentTarget.style.borderColor = '';
        }}
      >
        <Icon className="text-lg" />
      </a>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   Form Field
   ═══════════════════════════════════════════════════════════════ */
const fieldBase =
  `w-full rounded-lg bg-[var(--bg-primary)] border px-4 py-3 text-sm
   text-[var(--text-primary)] placeholder:text-[var(--text-muted)]/50
   outline-none transition-all duration-300 font-body`;

const fieldBorder = (touched, error) => {
  if (!touched) return 'border-[var(--border)] focus:border-[var(--accent-green)]';
  if (error) return 'border-red-500/60 focus:border-red-500';
  return 'border-[var(--accent-green)]/50 focus:border-[var(--accent-green)]';
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
  const [sending, setSending] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate(values);
    setErrors(newErrors);
    setTouched({ name: true, email: true, subject: true, message: true });

    if (Object.keys(newErrors).length > 0) {
      toast.error('Please fix the errors above');
      return;
    }

    setSending(true);
    try {
      await emailjs.sendForm(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        formRef.current,
        EMAILJS_CONFIG.publicKey,
      );
      toast.success('Message sent successfully! I\'ll get back to you soon.', {
        duration: 5000,
        icon: '🚀',
      });
      setValues({ name: '', email: '', subject: '', message: '' });
      setTouched({});
      setErrors({});
    } catch (err) {
      console.error('EmailJS Error:', err);
      toast.error('Failed to send message. Please try again later.');
    } finally {
      setSending(false);
    }
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
          <h2 className="section-title">
            Let's Work <span className="gradient-text">Together</span>
          </h2>
          <p className="section-subtitle max-w-xl mx-auto">
            Have a project in mind or just want to say hello?
            I'd love to hear from you.
          </p>
        </motion.div>

        {/* ── Two-column layout ── */}
        <div className="grid gap-8 lg:grid-cols-5 lg:gap-14">

          {/* ─────── LEFT — Info ─────── */}
          <AnimatedSection direction="left" delay={0.1} className="lg:col-span-2">
          <motion.div
            variants={slideLeft}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 flex flex-col gap-8"
          >
            {/* headline */}
            <div>
              <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-3">
                Get In Touch
              </h3>
              <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                Whether you have a question, a potential collaboration, or an exciting
                project — don't hesitate to reach out. I'm always open to new
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
                               bg-[var(--bg-card)]/60 border border-[var(--border)]
                               hover:border-[var(--accent-green)]/30 transition-colors
                               duration-300"
                  >
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center
                                 rounded-lg"
                      style={{
                        backgroundColor: `${item.color}12`,
                        color: item.color,
                      }}
                    >
                      <Icon className="text-lg" />
                    </div>
                    <div>
                      <p className="text-xs text-[var(--text-muted)] mb-0.5">
                        {item.label}
                      </p>
                      <p className="text-sm text-[var(--text-primary)] font-medium flex items-center gap-2">
                        {item.showDot && (
                          <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping
                                           rounded-full bg-[var(--accent-green)] opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full
                                           bg-[var(--accent-green)]" />
                          </span>
                        )}
                        {item.value}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* social links */}
            <div>
              <p className="text-xs text-[var(--text-muted)] uppercase tracking-widest mb-3">
                Find me on
              </p>
              <div className="flex gap-3">
                {socials.map((s) => (
                  <SocialLink key={s.name} social={s} />
                ))}
              </div>
            </div>

            {/* decorative terminal */}
            <div className="hidden lg:block mt-2">
              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)]
                              overflow-hidden">
                {/* title bar */}
                <div className="flex items-center gap-2 px-4 py-2.5 border-b
                                border-[var(--border)] bg-[var(--bg-secondary)]">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                  <span className="ml-2 text-xs text-[var(--text-muted)] font-mono">
                    contact
                  </span>
                </div>
                <div className="p-4 font-mono text-xs leading-relaxed">
                  <p className="text-[var(--text-muted)]">
                    <span className="text-[var(--accent-green)]">javaid</span>
                    <span className="text-[var(--text-muted)]">@</span>
                    <span className="text-[var(--accent-blue)]">contact</span>
                    <span className="text-[var(--text-muted)]">:~$ </span>
                    <span className="text-[var(--text-primary)]">
                      ready to collaborate...
                    </span>
                    <span className="inline-block w-2 h-4 ml-0.5 bg-[var(--accent-green)]
                                   animate-pulse align-middle" />
                  </p>
                </div>
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
              {/* hidden field for EmailJS template */}
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

              {/* ── Hidden EmailJS fields (mapped from visible fields) ── */}
              <input type="hidden" name="from_name"  value={values.name} />
              <input type="hidden" name="from_email" value={values.email} />

              {/* Submit */}
              <button
                type="submit"
                disabled={sending}
                className="btn-primary w-full flex items-center justify-center gap-2.5
                           disabled:opacity-60 disabled:cursor-not-allowed
                           mt-2"
              >
                {sending ? (
                  <>
                    <svg
                      className="h-4 w-4 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12" cy="12" r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <HiOutlinePaperAirplane className="text-lg -rotate-12" />
                    Send Message
                  </>
                )}
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
