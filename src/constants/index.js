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

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
  {
    name: "flutter",
    icon: flutter,
  },
  {
    name: "AWS",
    icon: aws,
  },
];

const experiences = [
  {
    title: "Full Stack Developer",
    company_name: "ITJOBXS",
    icon: itjobxs,
    iconBg: "#383E56",
    date: "Jan 2025 - Sep 2026",
    points: [
      "Developed and maintained full stack web applications using React.js, Node.js, Express.js, and MongoDB.",
      "Contributed to the development and implementation of features such as user authentication, role based access control, and enterprise user management.",
      "Reduced the response time for URL file scanning by approximately 40% through the implementation of asynchronous operations.",
      "Collaborated with cross functional teams including designers, product managers, and other developers to build and ship high quality products.",
    ],
  },
  {
    title: "React Native Developer",
    company_name: "Microbase Infotech Pvt. Ltd.",
    icon: microbaseInfotech,
    iconBg: "#E6DEDD",
    date: "Sep 2025 - Feb 2026",
    points: [
      "Developing and maintaining cross platform mobile applications using React Native and related technologies.",
      "Collaborating with cross functional teams including designers, product managers, and other developers to create high quality products.",
      "Implementing responsive UI and ensuring smooth performance across both iOS and Android platforms.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
  // {
  //   title: "Web Developer",
  //   company_name: "Microbase Infotech Pvt. Ltd.",
  //   icon: microbaseInfotech,
  //   iconBg: "#383E56",
  //   date: "Jan 2022 - Jan 2023",
  //   points: [
  //     "Developing and maintaining web applications using React.js and other related technologies.",
  //     "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
  //     "Implementing responsive design and ensuring cross-browser compatibility.",
  //     "Participating in code reviews and providing constructive feedback to other developers.",
  //   ],
  // },
  {
    title: "Full Stack Developer",
    company_name: "Microbase Infotech Pvt. Ltd.",
    icon: microbaseInfotech,
    iconBg: "#E6DEDD",
    date: "Sep 2025 - Present",
    points: [
      "Owned the complete software development lifecycle, from requirements gathering and system design to deployment, monitoring, and post release maintenance of enterprise web applications.",
      "Designed scalable backend architectures and database schemas capable of supporting high volume content management, user authentication, and third party service integrations.",
      "Established best practices for code quality, API design, state management, and application architecture, significantly improving maintainability and development velocity.",
      "Technologies: React.js, Node.js, Express.js, PostgreSQL, Prisma ORM, TailwindCSS, AWS, CI/CD.",
    ],
  },
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

export { services, technologies, experiences, testimonials, projects };
