export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

export const SKILLS = {
  frontend: [
    "React",
    "Next.js",
    "Vue.js",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "Bootstrap",
    "HTML",
    "CSS",
  ],
  mobile: ["Flutter", "React Native", "Expo"],
  backend: ["Node.js", "Django", "FastAPI", "REST APIs"],
  database: ["MongoDB", "MySQL", "MS SQL", "Firebase"],
  tools: ["Git", "GitHub", "Figma", "Adobe XD", "Oracle APEX", "VS Code"],
  ai: ["Dify", "Deep Learning", "n8n", "UIPath", "IBM RPA"],
};

export const PROJECTS = [
  {
    id: "snap-and-pose",
    title: "Snap and Pose",
    category: "Photo / Web App",
    description:
      "Open your browser, hit the shutter, and walk away with a photo strip and animated GIFs from your webcam. No installs, no sign-ups. Timestamped downloads and a retry button if the first take wasn't the one.",
    highlight: "Photo strips and GIF export, straight from the browser",
    tech: ["Next.js", "Tailwind CSS", "ShadCN UI"],
    liveUrl: "https://photobooth-app-delta.vercel.app/",
    repoUrl: "https://github.com/Drawde0731/photobooth-app",
  },
  {
    id: "next-day",
    title: "Next Day",
    category: "Fun / Web App",
    description:
      "A little fun app that predicts what tomorrow looks like for you, riding off the TikTok trend wave. The real highlight is the loader and the overall feel of it. Light and dark mode, clean ShadCN components, and an intro that actually makes you want to stick around.",
    highlight: "Built for the vibe. The loader alone is worth the visit.",
    tech: ["Next.js", "ShadCN UI", "Tailwind CSS", "TypeScript"],
    liveUrl: "https://next-day-peach.vercel.app/",
    repoUrl: "https://github.com/Drawde0731/next-day",
  },
  {
    id: "jeepney-fare-calculator",
    title: "Jeepney Fare Calculator",
    category: "Non Official Guide / Web App",
    description:
      "Pulls today's national average diesel price and runs it through LTFRB fare structures to give you a live fare matrix for Philippine jeepneys. Drag the fuel slider and everything recalculates on the spot. Export as PDF or install it as a PWA and use it offline.",
    highlight: "Real diesel prices, real LTFRB math, works offline as a PWA",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Chart.js"],
    liveUrl: "https://jeepney-fare-calculator.vercel.app/",
    repoUrl: "https://github.com/Drawde0731/jeepney-fare-calculator",
  },
  {
    id: "brewde",
    title: "Brewde",
    category: "Retail & POS Management System",
    description:
      "Built this for a friend who was starting a coffee brand and needed a way to manage orders and track sales. Ended up building a full multi-tenant system with merchant onboarding, a POS with cart and checkout, PWD/Senior discounts, a sales dashboard, and separate roles for Admins, Owners, and Cashiers.",
    highlight: "Multi-tenant cafe system built for a real, growing coffee brand",
    tech: ["Next.js", "Supabase", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://brewde.vercel.app/",
    repoUrl: "https://github.com/Drawde0731/Brewde",
  },
];

export const SERVICES = [
  {
    icon: "Code2",
    title: "Full Stack Web Development",
    description:
      "Custom web applications built with React, Next.js, and Node.js. From landing pages to complex SaaS dashboards — production-ready from day one.",
    features: [
      "UI/UX implementation from Figma",
      "REST API development & integration",
      "Database design & management",
      "Performance & SEO optimization",
    ],
  },
  {
    icon: "Smartphone",
    title: "Cross-Platform Mobile Apps",
    description:
      "Native-quality mobile applications using Flutter and React Native. One codebase. iOS and Android. Real performance.",
    features: [
      "Flutter app development",
      "React Native apps",
      "API & backend integration",
      "App Store & Play Store deployment",
    ],
  },
  {
    icon: "Layout",
    title: "Frontend Engineering",
    description:
      "Pixel-perfect UI implementation from any design file. Every component, every interaction, every breakpoint — exactly as designed.",
    features: [
      "Figma / Adobe XD to code",
      "Component library development",
      "Animation & micro-interactions",
      "Responsive & accessible design",
    ],
  },
  {
    icon: "Zap",
    title: "API Integration & Automation",
    description:
      "Connect your frontend to any backend, third-party service, or automated workflow. Clean integrations that just work.",
    features: [
      "Third-party API integration",
      "Node.js / Django backend",
      "RPA automation (UIPath, IBM)",
      "Real-time data & WebSockets",
    ],
  },
];

export const EXPERIENCE = [
  {
    company: "Qymera",
    role: "Software Engineer",
    period: "June 2024 – Present",
    current: true,
    bullets: [
      "Developed web and mobile applications using Flutter, React, Vue.js, Next.js, and React Native, focusing on UI-to-code implementation and API integration.",
      "Built frontend solutions for event, insurance, weather, admin, chatbot, HRIS, blockchain, and queue management systems.",
      "Integrated REST and third-party APIs to support real-time data and user workflows.",
      "Contributed to backend development using Node.js, MongoDB, and Django when needed.",
      "Participated in code reviews, ticket management, and agile collaboration via GitHub.",
      "Delivered features under tight deadlines, including a 3-day hackathon chatbot project.",
    ],
    tech: [
      "Flutter",
      "React",
      "Vue.js",
      "Next.js",
      "React Native",
      "Node.js",
      "MongoDB",
      "Django",
    ],
  },
  {
    company: "Expand Enterprises Inc.",
    role: "Frontend Developer Intern",
    period: "March 2023 – July 2023",
    current: false,
    bullets: [
      "Collaborated with cross-functional teams to strategize and plan project workflows, ensuring efficient execution.",
      "Utilized Adobe XD to create visually appealing mockups and wireframes for project stakeholders.",
      "Developed dynamic web applications using Angular Framework, resulting in enhanced user experiences.",
      "Integrated RESTful APIs connecting MS SQL databases and Firebase for seamless data management.",
      "Contributed to mobile app development projects in Flutter, enhancing mobile presence and user engagement.",
    ],
    tech: ["Angular", "Flutter", "Firebase", "MS SQL", "Adobe XD", "REST APIs"],
  },
];

export const CERTIFICATIONS = [
  { title: "RPA Fundamentals", issuer: "UIPath", icon: "Bot", href: "https://drive.google.com/drive/folders/18Xk9NpqbkwWwBGflUk8A-wxOk509ow_p?usp=sharing" },
  { title: "RPA Fundamentals", issuer: "IBM",    icon: "Bot", href: "https://drive.google.com/drive/folders/16pdHf5wGCL1-WOGmT3VgxOHmylFeavmc?usp=sharing" },
  { title: "Oracle Partner Network Solution", issuer: "Oracle", icon: "Database", href: "https://drive.google.com/drive/folders/1NC1AoRm9QWZaTQSxnK1oGuG_l28xJw6R?usp=sharing" },
  { title: "Informatica MDM SaaS", issuer: "Informatica", icon: "Server", href: "https://drive.google.com/drive/folders/1IduNErLeoqvvvBrv_sAJhckhhRjrJvof?usp=sharing" },
  { title: "Blockchain Foundation", issuer: "Various", icon: "Link", href: "https://drive.google.com/drive/folders/1Wos_lMQmEKCbIPm7v9MB3qkw_2IimBLf?usp=sharing" },
  { title: "Programming & Technology Fundamentals", issuer: "Coursera", icon: "GraduationCap", href: "https://drive.google.com/drive/folders/1bcVRMPz7EkGpjwdLOW-POQ-r3brDmH2P?usp=sharing" },
];
