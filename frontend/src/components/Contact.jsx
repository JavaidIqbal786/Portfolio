import { motion } from 'framer-motion';
import { Mail, Linkedin, Facebook, Github } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="relative py-20">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur"
        >
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Contact Information</h2>
          <p className="mb-8 text-white/70">
            I’m open to projects, collaborations, and opportunities. Reach out directly:
          </p>

          {/* Public contact details */}
          <div className="grid gap-4 text-white/90">
            <p>
              <span className="font-semibold text-white">Email: </span>
              <a
                href="mailto:javaidiqbaldev@gmail.com"
                className="text-emerald-400 hover:underline"
              >
                javaidiqbaldev@gmail.com
              </a>
            </p>

            <p>
              <span className="font-semibold text-white">LinkedIn: </span>
              <a
                href="https://www.linkedin.com/in/javaidiqbalawan/"
                target="_blank"
                rel="noopener noreferrer"
                className="break-all text-emerald-400 hover:underline"
              >
                https://www.linkedin.com/in/javaidiqbalawan/
              </a>
            </p>

            <p>
              <span className="font-semibold text-white">Facebook: </span>
              <a
                href="https://web.facebook.com/IJavaidIqbal1"
                target="_blank"
                rel="noopener noreferrer"
                className="break-all text-emerald-400 hover:underline"
              >
                https://web.facebook.com/IJavaidIqbal1
              </a>
            </p>

            <p>
              <span className="font-semibold text-white">GitHub: </span>
              <a
                href="https://github.com/JavaidIqbal786"
                target="_blank"
                rel="noopener noreferrer"
                className="break-all text-emerald-400 hover:underline"
              >
                https://github.com/JavaidIqbal786
              </a>
            </p>
          </div>

          {/* Social icons */}
          <div className="mt-8 flex items-center gap-4">
            <a
              href="mailto:javaidiqbaldev@gmail.com"
              aria-label="Email"
              className="rounded-lg border border-white/10 p-3 text-white transition hover:border-emerald-400 hover:text-emerald-400"
            >
              <Mail size={20} />
            </a>

            <a
              href="https://www.linkedin.com/in/javaidiqbalawan/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="rounded-lg border border-white/10 p-3 text-white transition hover:border-emerald-400 hover:text-emerald-400"
            >
              <Linkedin size={20} />
            </a>

            <a
              href="https://web.facebook.com/IJavaidIqbal1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="rounded-lg border border-white/10 p-3 text-white transition hover:border-emerald-400 hover:text-emerald-400"
            >
              <Facebook size={20} />
            </a>

            <a
              href="https://github.com/JavaidIqbal786"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="rounded-lg border border-white/10 p-3 text-white transition hover:border-emerald-400 hover:text-emerald-400"
            >
              <Github size={20} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
