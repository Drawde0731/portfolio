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
    id: "insurance-platform",
    title: "Insurance Management Platform",
    category: "Web Application",
    description:
      "End-to-end insurance management system with policy tracking, claims processing, and real-time dashboards for administrators and clients.",
    problem:
      "Manual insurance workflows causing delays in policy management and claims processing.",
    solution:
      "Built a full-stack web application with role-based access, real-time data, and automated workflow triggers.",
    tech: ["React", "Next.js", "Node.js", "MongoDB", "REST APIs"],
    highlight: "Production system handling real insurance workflows at scale",
  },
  {
    id: "hris-system",
    title: "HRIS",
    category: "Enterprise Web App",
    description:
      "Human Resource Information System featuring employee management, attendance tracking, payroll processing, and multi-role access control.",
    problem:
      "Manual HR processes across spreadsheets leading to data inconsistency and slow reporting.",
    solution:
      "Developed a centralized HRIS with role-based dashboards, automated payroll logic, and real-time attendance tracking.",
    tech: ["Vue.js", "Node.js", "MongoDB", "Firebase"],
    highlight: "Multi-role enterprise system managing employee lifecycle",
  },
  {
    id: "ai-chatbot",
    title: "AI Chatbot Hackathon",
    category: "AI / Web App",
    description:
      "Conversational AI chatbot built and shipped in 72 hours during a company hackathon. Integrated NLP APIs with a custom React frontend.",
    problem:
      "Customer support overloaded with repetitive queries requiring fast automated responses.",
    solution:
      "Rapidly built an NLP-powered chatbot with a clean chat interface, context tracking, and seamless API integration.",
    tech: ["React", "Node.js", "REST APIs", "TypeScript"],
    highlight: "Built in 72 hours. Shipped to production.",
  },
  {
    id: "queue-management",
    title: "Queue Management System",
    category: "Real-Time Application",
    description:
      "Real-time queue and ticketing system managing customer flow with live status boards, ticket generation, and admin controls.",
    problem:
      "Physical queues creating poor customer experience and inefficient staff allocation.",
    solution:
      "Built a real-time queue system with Firebase live sync, digital ticket generation, and a staff management dashboard.",
    tech: ["React Native", "Firebase", "Node.js"],
    highlight: "Real-time sync across all devices with zero latency",
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
  { title: "RPA Fundamentals", issuer: "UIPath", icon: "Bot" },
  { title: "RPA Fundamentals", issuer: "IBM", icon: "Bot" },
  { title: "Oracle Partner Network Solution", issuer: "Oracle", icon: "Database" },
  { title: "Informatica MDM SaaS", issuer: "Informatica", icon: "Server" },
  { title: "Blockchain Foundation", issuer: "Various", icon: "Link" },
  {
    title: "Programming & Technology Fundamentals",
    issuer: "Coursera",
    icon: "GraduationCap",
  },
];
