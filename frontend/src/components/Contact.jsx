import { Github, Linkedin, Mail, Facebook } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-16">
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="text-3xl font-bold mb-8">Contact Information</h2>

        <div className="space-y-3 mb-8">
          <p>
            Email:{" "}
            <a
              href="mailto:javaidiqbaldev@gmail.com"
              className="text-emerald-400 hover:underline"
            >
              javaidiqbaldev@gmail.com
            </a>
          </p>

          <p>
            LinkedIn:{" "}
            <a
              href="https://www.linkedin.com/in/javaidiqbalawan/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline break-all"
            >
              https://www.linkedin.com/in/javaidiqbalawan/
            </a>
          </p>

          <p>
            Facebook:{" "}
            <a
              href="https://web.facebook.com/IJavaidIqbal1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline break-all"
            >
              https://web.facebook.com/IJavaidIqbal1
            </a>
          </p>

          <p>
            GitHub:{" "}
            <a
              href="https://github.com/JavaidIqbal786"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline break-all"
            >
              https://github.com/JavaidIqbal786
            </a>
          </p>
        </div>

        <div className="flex items-center gap-4 text-white">
          <a
            href="mailto:javaidiqbaldev@gmail.com"
            aria-label="Email"
            className="hover:text-emerald-400 transition-colors"
          >
            <Mail />
          </a>

          <a
            href="https://www.linkedin.com/in/javaidiqbalawan/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-emerald-400 transition-colors"
          >
            <Linkedin />
          </a>

          <a
            href="https://web.facebook.com/IJavaidIqbal1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:text-emerald-400 transition-colors"
          >
            <Facebook />
          </a>

          <a
            href="https://github.com/JavaidIqbal786"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-emerald-400 transition-colors"
          >
            <Github />
          </a>
        </div>
      </div>
    </section>
  );
}
