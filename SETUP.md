# 🚀 Portfolio Setup Guide

Quick instructions to run and deploy the portfolio locally.

---

## Local Development

```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## Production Build

```bash
cd frontend
npm run build
```

The optimised output is placed in `frontend/dist/`.

---

## Deployment

Pushing to the `main` branch triggers the GitHub Actions workflow
(`.github/workflows/deploy.yml`) which automatically builds and deploys
the site to GitHub Pages under the custom domain **javaidiqbaldev.me**.

No third-party services or environment secrets are required — contact
details (email, LinkedIn, GitHub, Facebook) are displayed publicly on
the site.
