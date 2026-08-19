import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  flutter,
  aws,
  meta,
  itjobxs,
  microbaseInfotech,
  tesla,
  shopify,
  carrent,
  jobit,
  tripguide,
  threejs,
  dnakeyai,
  culminatehai,
  whitedrop
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "React Native Developer",
    icon: mobile,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Flutter Developer",
    icon: creator,
  },
];


export const experiences = [
  {
    title: "Full Stack Developer",
    company_name: "ITJOBXS",
    icon: itjobxs,
    iconBg: "#383E56",
    date: "Jan 2025 - Sep 2025", // ⚠ check this — was "Sep 2026", likely meant to be Present or an earlier end date
    points: [
      "Built and maintained full stack features across React, Node.js, Express, and MongoDB for a production web app.",
      "Shipped role-based access control and enterprise user management used across multiple client accounts.",
      "Cut URL file scan response time by ~40% by moving scan operations to async/queue based processing.",
      "Worked directly with design and product to scope features from spec to release.",
    ],
  },
  {
    title: "React Native Developer",
    company_name: "Microbase Infotech Pvt. Ltd.",
    icon: microbaseInfotech,
    iconBg: "#E6DEDD",
    date: "Sep 2025 - Dec 2025", // sequential with the promotion below, not overlapping
    points: [
      "Built and shipped cross platform features in React Native for iOS and Android from a single codebase.",
      "Fixed performance and rendering issues causing lag on lower end Android devices.",
      "Reviewed PRs from teammates and flagged issues before they hit QA.",
      "Promoted to Full Stack Developer after 4 months based on delivery on the mobile team.",
    ],
  },
  {
    title: "Full Stack Developer",
    company_name: "Microbase Infotech Pvt. Ltd.",
    icon: microbaseInfotech,
    iconBg: "#E6DEDD",
    date: "Jan 2026 - Present",
    points: [
      "Own features end to end requirements, system design, build, deploy, and post release fixes for enterprise web apps.",
      "Designed backend architecture and database schemas handling content management, auth, and third party integrations at scale.",
      "Set API design and state management conventions the team now follows, cutting onboarding time for new features.",
      "Stack: React.js, Node.js, Express.js, PostgreSQL, Prisma, Tailwind CSS, AWS, CI/CD.",
    ],
  },
];

export const technologies = [
  { name: "JavaScript", id: "javascript" },
  { name: "TypeScript", id: "typescript" },
  { name: "React JS", id: "react" },
  { name: "Redux Toolkit", id: "redux" },
  { name: "Tailwind CSS", id: "tailwind" },
  { name: "Node JS", id: "nodejs" },
  { name: "MongoDB", id: "mongodb" },
  { name: "Three JS", id: "threejs" },
  { name: "git", id: "git" },
  { name: "figma", id: "figma" },
  { name: "docker", id: "docker" },
  { name: "flutter", id: "flutter" },
  { name: "AWS", id: "aws" },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "DNAKEY.ai",
    description:
      "Designed and developed a full featured e-commerce website for DNA Key, a premium health and wellness supplement brand. The platform showcases a clean, conversion focused shop experience built for a science driven, DTC (direct to consumer) supplement business with Advanced Product Filtering, Product Grid & Quick View.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "postgresql",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
      {
        name: "nodejs",
        color: "green-text-gradient",
      },
      {
        name: "zustand",
        color: "blue-text-gradient",
      },
      {
        name: "stripe",
        color: "green-text-gradient",
      },
      {
        name: "prisma",
        color: "pink-text-gradient",
      },
    ],
    image: dnakeyai,
    source_code_link: "https://github.com/",
    url: "https://dnakey.ai",
  },
  {
    name: "CULMINATEH.ai",
    description:
      "Designed and developed the corporate website for Culminate Health, an advanced health science company blending 10+ years of biotech research with AI driven personalized wellness. The site presents a sophisticated, science first brand across multiple application verticals dietary supplements, skincare, oral rehydration, superfoods, low carcinogen coffee, and precision health.                                  ",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "nodejs",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
      {
        name: "postgresql",
        color: "green-text-gradient",
      },
    ],
    image: culminatehai,
    source_code_link: "https://github.com/",
    url:"https://www.culminateh.ai"
  },
  {
    name: "whitedrop.co.in",
    description: "Designed and developed the e-commerce website for White Drop, a farm-to-doorstep dairy brand delivering pure A2 cow milk and dairy staples fresh every morning. The site combines a warm, editorial brand feel with a functional online store, built to reflect the brand's promise of daily freshness and traditional quality.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
      {
        name: "prisma",
        color: "pink-text-gradient",
      },
      {
        name: "postgresql",
        color: "blue-text-gradient",
      },
      {
        name: "nodejs",
        color: "green-text-gradient",
      },
      {
        name: "firebase authentication",
        color: "green-text-gradient",
      },
    ],
    image: whitedrop,
    source_code_link: "https://github.com/",
    url:"https://whitedrop.co.in"
  },
];

export { services, testimonials, projects };
