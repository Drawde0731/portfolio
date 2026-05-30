# John Edward D. Complido — Portfolio

Personal portfolio website built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion.

**Live:** [jecomplido.dev](https://jecomplido.dev)

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v3
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod
- **Email:** Resend
- **Deployment:** Vercel

## Getting Started

### 1. Clone and Install

```bash
git clone <repo-url>
cd portfolio
npm install
```

### 2. Environment Variables

Copy the example env file and add your keys:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```
RESEND_API_KEY=your_resend_api_key_here
```

Get your Resend API key at [resend.com](https://resend.com).

### 3. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
portfolio/
├── app/
│   ├── api/contact/route.ts   # Contact form API
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout + metadata
│   ├── page.tsx               # Home page
│   ├── sitemap.ts             # SEO sitemap
│   └── robots.ts              # SEO robots
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── AutomationSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   └── ContactSection.tsx
│   └── ui/
│       ├── GlowCard.tsx
│       └── SectionHeader.tsx
└── lib/
    ├── constants.ts
    └── utils.ts
```

## Deployment on Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo>
git push -u origin main
```

### 2. Import to Vercel

1. Go to [vercel.com](https://vercel.com) → New Project
2. Import your GitHub repository
3. Add environment variables:
   - `RESEND_API_KEY` = your Resend API key
4. Deploy

### 3. Custom Domain

In Vercel project settings → Domains → Add `jecomplido.dev`

## Contact Form Setup

The contact form uses [Resend](https://resend.com) to send emails.

1. Create a free account at resend.com
2. Create an API key
3. Add to `RESEND_API_KEY` in environment variables
4. (Optional) Verify your domain in Resend for production use

For testing without a domain, the `from` field uses `onboarding@resend.dev` which works on Resend's free tier.

## Customization

All content is centralized in `lib/constants.ts`:
- `NAV_LINKS` — Navigation items
- `SKILLS` — Technical skills by category
- `PROJECTS` — Portfolio projects
- `SERVICES` — Service offerings
- `EXPERIENCE` — Work history
- `CERTIFICATIONS` — Certifications

## License

MIT — Free to use and modify for your own portfolio.
