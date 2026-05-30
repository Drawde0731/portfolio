# John Edward D. Complido — Portfolio

Personal portfolio website built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion.

**Live:** [[drawde-portfolio](https://drawde-portfolio)](https://drawde-portfolio.vercel.app/)

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

### 2. Run Locally

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
