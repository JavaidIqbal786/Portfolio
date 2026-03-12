<div align="center">

# 🚀 Javaid Iqbal — Developer Portfolio

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-00ff88?style=for-the-badge&logoColor=black)](https://yourdomain.com)
[![GitHub Pages](https://img.shields.io/badge/Deployed_on-GitHub_Pages-222?style=for-the-badge&logo=githubpages&logoColor=white)](https://pages.github.com/)

A modern, dark-themed developer portfolio built with React, Vite, and Tailwind CSS. Features smooth animations, particle effects, and a fully responsive design.

<!-- Replace with an actual screenshot -->
![Portfolio Screenshot](https://placehold.co/1200x630/0a0e17/00ff88?text=Portfolio+Screenshot)

</div>

---

## ⚡ Tech Stack

| Category        | Technologies                                                                                                                                                                                                                                                                                                           |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Framework**   | ![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black) ![Vite](https://img.shields.io/badge/Vite_7-646CFF?style=flat-square&logo=vite&logoColor=white)                                                                                                                   |
| **Styling**     | ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)                                                                                                   |
| **Animations**  | ![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white) ![tsParticles](https://img.shields.io/badge/tsParticles-000?style=flat-square)                                                                                                                       |
| **Email**       | ![EmailJS](https://img.shields.io/badge/EmailJS-FF6B6B?style=flat-square) |
| **Deployment**  | ![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-222?style=flat-square&logo=githubpages&logoColor=white) ![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat-square&logo=githubactions&logoColor=white)                                                                             |

## ✨ Features

- **Particle Background** — Interactive code-character particles in the hero section
- **Terminal Widget** — Animated typing terminal showcasing skills
- **VS Code Code Block** — Syntax-highlighted bio in the About section
- **Circular Progress Rings** — SVG skill visualizations with animated fill
- **Project Showcase** — Filterable grid with featured cards, modals & lightbox
- **GitHub Stats** — Live GitHub activity cards & streak counter
- **Marquee Tech Strip** — Auto-scrolling technology icon banner
- **Contact Form** — EmailJS-powered form with validation & toast notifications
- **Custom Cursor** — Dot + ring cursor with hover effects (desktop only)
- **Scroll Progress** — Gradient progress bar at the top of the viewport
- **Fully Responsive** — Optimized for 320px–2560px+ across all breakpoints
- **Smooth Animations** — Framer Motion entrance, exit & layout animations

## 🛠️ Setup & Development

### Prerequisites

- **Node.js** ≥ 20.19 (recommended) or 22.12+
- **npm** ≥ 10

### Installation

```bash
# Clone the repository
git clone https://github.com/JavaidIqbal786/portfolio.git
cd portfolio/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The dev server will start at `http://localhost:5173`.

### Build for Production

```bash
npm run build    # Output → dist/
npm run preview  # Preview the production build locally
```

## 📧 EmailJS Setup

The contact form uses [EmailJS](https://www.emailjs.com/) to send emails without a backend.

1. **Create an account** at [emailjs.com](https://www.emailjs.com/)
2. **Add an Email Service** (Gmail, Outlook, etc.)
3. **Create an Email Template** with these variables:
   - `{{from_name}}` — Sender's name
   - `{{from_email}}` — Sender's email
   - `{{subject}}` — Message subject
   - `{{message}}` — Message body
   - `{{to_name}}` — Your name (auto-filled)
4. **Copy your credentials** and create a `.env` file:

```bash
cp .env.example .env
```

```env
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
VITE_EMAILJS_PUBLIC_KEY=user_ABCdef123
```

> **Note:** `VITE_` prefixed variables are exposed to the browser — this is safe for EmailJS public keys. Your actual email address stays private inside your EmailJS dashboard.

## 🚀 Deployment (GitHub Pages)

Deployment is **fully automated** via GitHub Actions.

### Automatic Deployment

1. Push code to the `main` branch
2. GitHub Actions builds the project and deploys to the `gh-pages` branch
3. The site goes live at your custom domain (or `username.github.io/portfolio`)

### Custom Domain Setup (Namecheap)

1. **In your Namecheap DNS settings**, add these records:

   | Type  | Host | Value                  |
   | ----- | ---- | ---------------------- |
   | A     | @    | 185.199.108.153        |
   | A     | @    | 185.199.109.153        |
   | A     | @    | 185.199.110.153        |
   | A     | @    | 185.199.111.153        |
   | CNAME | www  | yourusername.github.io |

2. **In GitHub repo settings** → Pages → Custom domain → enter `yourdomain.com`
3. **Enable "Enforce HTTPS"** once the DNS propagates (may take up to 24 hours)
4. **Update these files** with your actual domain:
   - `frontend/public/CNAME`
   - `.github/workflows/deploy.yml` (the `cname:` field)

### Manual Deployment (optional)

```bash
cd frontend
npm run deploy
```

## 📁 Project Structure

```
portfolio/
├── .github/workflows/deploy.yml   # GitHub Actions CI/CD
├── .gitignore
├── README.md
└── frontend/
    ├── public/
    │   ├── CNAME                   # Custom domain file
    │   └── vite.svg
    ├── src/
    │   ├── components/
    │   │   ├── About.jsx
    │   │   ├── AnimatedSection.jsx
    │   │   ├── Certifications.jsx
    │   │   ├── Contact.jsx
    │   │   ├── CustomCursor.jsx
    │   │   ├── Footer.jsx
    │   │   ├── Hero.jsx
    │   │   ├── Loader.jsx
    │   │   ├── Navbar.jsx
    │   │   ├── Projects.jsx
    │   │   ├── ScrollProgress.jsx
    │   │   ├── Skills.jsx
    │   │   └── Stats.jsx
    │   ├── data/
    │   │   ├── projects.js
    │   │   ├── skills.js
    │   │   └── timeline.js
    │   ├── styles/
    │   │   └── globals.css
    │   ├── App.jsx
    │   └── main.jsx
    ├── .env.example
    ├── index.html
    ├── package.json
    ├── tailwind.config.js
    └── vite.config.js
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**Built with ❤️ and ☕ by [Javaid Iqbal](https://github.com/JavaidIqbal786)**

</div>
