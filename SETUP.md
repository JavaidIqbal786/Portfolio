# 📧 EmailJS Setup Guide

Complete step-by-step instructions to enable the contact form on your portfolio.

---

## Step 1 — Create a Free EmailJS Account

1. Go to **[emailjs.com](https://www.emailjs.com/)** and click **"Sign Up Free"**
2. Verify your email address
3. The **free tier** includes **200 emails/month** — more than enough for a portfolio contact form

---

## Step 2 — Add an Email Service

1. In the [EmailJS dashboard](https://dashboard.emailjs.com/admin), click **"Add New Service"**
2. Choose your email provider:
   - **Gmail** (recommended) — click "Connect Account"
   - Outlook, Yahoo, or any SMTP provider also work
3. Sign in with your Google account and **grant EmailJS permission** to send emails on your behalf
4. Give the service a name: `Portfolio Contact`
5. Click **"Create Service"**

> ✅ **Copy your Service ID** — it looks like `service_abc1234`

---

## Step 3 — Create an Email Template

1. Go to **"Email Templates"** → **"Create New Template"**
2. Configure the template fields:

| Field        | Value                                        |
| ------------ | -------------------------------------------- |
| **To Email** | `your-actual-email@gmail.com`                |
| **Subject**  | `Portfolio Contact: {{subject}}`             |
| **Reply To** | `{{from_email}}`                             |

3. Set the **template body** to:

```
New message from your portfolio contact form

From:    {{from_name}} ({{from_email}})
Subject: {{subject}}

Message:
{{message}}

---
Sent via your portfolio at yourdomain.com
```

4. Click **"Save"**

> ✅ **Copy your Template ID** — it looks like `template_xyz7890`

### Template Variables Reference

| Variable        | Source in Contact Form | Description          |
| --------------- | ---------------------- | -------------------- |
| `{{from_name}}` | Name input field       | Visitor's name       |
| `{{from_email}}`| Email input field      | Visitor's email      |
| `{{subject}}`   | Subject input field    | Message subject      |
| `{{message}}`   | Message textarea       | Full message body    |
| `{{to_name}}`   | Hidden field           | "Javaid Iqbal"       |

---

## Step 4 — Get Your Public Key

1. Go to **"Account"** → **"API Keys"**
2. Copy the **Public Key** (e.g. `aBcDeFgHiJkLmNo`)

> ⚠️ This key is **safe to expose in frontend code** — it can only be used to send emails through YOUR EmailJS templates. Your email address stays private inside the EmailJS dashboard.

---

## Step 5 — Local Development Setup

1. In the `frontend/` directory, copy the example env file:

```bash
cp .env.example .env
```

2. Fill in your credentials:

```env
VITE_EMAILJS_SERVICE_ID=service_abc1234
VITE_EMAILJS_TEMPLATE_ID=template_xyz7890
VITE_EMAILJS_PUBLIC_KEY=aBcDeFgHiJkLmNo
```

3. **Restart the dev server** — Vite only reads `.env` at startup:

```bash
npm run dev
```

4. Test the form by filling it out and submitting. You should:
   - See a ✅ success toast notification
   - Receive the email at the address you set in the template

---

## Step 6 — GitHub Pages Deployment (GitHub Secrets)

The `.env` file is **not committed to Git** (it's in `.gitignore`). For the deployed site to work, you need to add the same values as **GitHub repository secrets**.

### 6a. Add Repository Secrets

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"** and add each one:

| Secret Name                  | Value                    |
| ---------------------------- | ------------------------ |
| `VITE_EMAILJS_SERVICE_ID`   | `service_abc1234`        |
| `VITE_EMAILJS_TEMPLATE_ID`  | `template_xyz7890`       |
| `VITE_EMAILJS_PUBLIC_KEY`    | `aBcDeFgHiJkLmNo`       |

### 6b. How It Works

The GitHub Actions workflow (`.github/workflows/deploy.yml`) injects these secrets as **environment variables** during the build step:

```yaml
- name: Build production bundle
  env:
    VITE_EMAILJS_SERVICE_ID: ${{ secrets.VITE_EMAILJS_SERVICE_ID }}
    VITE_EMAILJS_TEMPLATE_ID: ${{ secrets.VITE_EMAILJS_TEMPLATE_ID }}
    VITE_EMAILJS_PUBLIC_KEY: ${{ secrets.VITE_EMAILJS_PUBLIC_KEY }}
  run: cd frontend && npm run build
```

Vite replaces all `import.meta.env.VITE_*` references with the actual values at build time, so they get baked into the JavaScript bundle. This is the standard approach for deploying Vite apps with secrets.

### 6c. Verify It Works

1. Push your code to the `main` branch
2. Go to the **Actions** tab to watch the deployment
3. Once deployed, visit your site and test the contact form
4. If emails aren't arriving, check:
   - The GitHub Actions build log for warnings
   - The EmailJS dashboard → **"Email History"** for failed sends
   - Browser DevTools Console for errors

---

## Troubleshooting

| Problem                         | Solution                                                   |
| ------------------------------- | ---------------------------------------------------------- |
| Form submits but no email       | Check EmailJS dashboard → Email History for error details  |
| `YOUR_SERVICE_ID` in console    | `.env` not created or dev server not restarted             |
| Works locally but not deployed  | GitHub Secrets not set, or secret names have typos         |
| Gmail blocks the connection     | In EmailJS dashboard, reconnect the Gmail service          |
| 429 Too Many Requests           | Free tier limit (200/month) reached — upgrade or wait      |
| Template variables show `{{}}`  | Variable names in template don't match form field `name`s  |

---

## Security Notes

- ✅ **Public Key** is safe to expose — it's designed for frontend use
- ✅ **Your email address** stays in the EmailJS dashboard, never in code
- ✅ **GitHub Secrets** are encrypted and never shown in logs
- ⚠️ **Never commit `.env`** to Git — it's already in `.gitignore`
- ⚠️ **Rate limiting** — EmailJS free tier is 200 emails/month, 2 emails/second

---

*For more details, see the [EmailJS documentation](https://www.emailjs.com/docs/).*
