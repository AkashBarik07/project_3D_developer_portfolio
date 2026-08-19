/**
 * TechIcons.jsx
 * -----------------------------------------------------------------------
 * A small, dependency-free icon set built specifically for the orbit HUD.
 * Each icon is a single-stroke monoline glyph (not a literal reproduction
 * of any brand's registered logo) tuned to sit inside a 40px circular
 * badge and read clearly at that size. Colors are the accepted brand
 * accent for each technology so the set still feels "correct" at a glance.
 *
 * Usage:
 *   import { TECH_ICONS } from "./TechIcons";
 *   const { Icon, color } = TECH_ICONS.react;
 *   <Icon />
 * -----------------------------------------------------------------------
 */
import React from "react";

const base = (children, viewBox = "0 0 24 24") => (props) => (
  <svg
    viewBox={viewBox}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {children}
  </svg>
);

/* ---- glyphs ------------------------------------------------------- */

const JavaScript = base(
  <>
    <rect x="2" y="2" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M8.2 15.4c.25.55.66.98 1.4.98.86 0 1.3-.5 1.3-1.28V9.4"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <path
      d="M14.1 15.6c.35.5.9.85 1.65.85.95 0 1.55-.5 1.55-1.15 0-.8-.7-1.05-1.6-1.4-.9-.35-1.6-.65-1.6-1.5 0-.65.6-1.1 1.45-1.1.7 0 1.15.3 1.5.75"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </>
);

const TypeScript = base(
  <>
    <rect x="2" y="2" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="1.6" />
    <path d="M7 9.2h5.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M9.7 9.2v7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path
      d="M15 15.4c.32.5.85.85 1.55.85.9 0 1.5-.48 1.5-1.12 0-.78-.68-1.02-1.5-1.35-.85-.34-1.5-.63-1.5-1.44 0-.63.57-1.06 1.38-1.06.66 0 1.08.28 1.4.72"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </>
);

const React_ = base(
  <>
    <circle cx="12" cy="12" r="2.1" fill="currentColor" />
    <ellipse cx="12" cy="12" rx="9" ry="3.6" stroke="currentColor" strokeWidth="1.4" />
    <ellipse cx="12" cy="12" rx="9" ry="3.6" stroke="currentColor" strokeWidth="1.4" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="9" ry="3.6" stroke="currentColor" strokeWidth="1.4" transform="rotate(120 12 12)" />
  </>
);

const Redux = base(
  <>
    <path
      d="M14.7 13.4c1.6-.18 2.8-.8 2.8-1.9 0-1.05-1.35-1.68-2.8-1.9M9.3 13.4c-1.6-.18-2.8-.8-2.8-1.9 0-1.05 1.35-1.68 2.8-1.9M11.9 5.6c1 1.25 1.8 2.55 2.4 3.85M12.1 18.4c-1-1.25-1.8-2.55-2.4-3.85"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    <circle cx="17.4" cy="8.6" r="1.4" fill="currentColor" />
    <circle cx="6.6" cy="15.4" r="1.4" fill="currentColor" />
    <circle cx="12" cy="19" r="1.4" fill="currentColor" />
  </>
);

const Tailwind = base(
  <path
    d="M6 10.5c.6-2.4 2-3.6 4.2-3.6 3.3 0 3.7 2.4 5.4 2.7 1.1.2 2-.25 2.7-1.35-.6 2.4-2 3.6-4.2 3.6-3.3 0-3.7-2.4-5.4-2.7-1.1-.2-2 .25-2.7 1.35zM3 15.9c.6-2.4 2-3.6 4.2-3.6 3.3 0 3.7 2.4 5.4 2.7 1.1.2 2-.25 2.7-1.35-.6 2.4-2 3.6-4.2 3.6-3.3 0-3.7-2.4-5.4-2.7-1.1-.2-2 .25-2.7 1.35z"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinejoin="round"
  />
);

const NodeJs = base(
  <>
    <path
      d="M12 2.6 20.4 7.3v9.4L12 21.4 3.6 16.7V7.3z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
    <path d="M9.4 12c0-1.5 1.2-2.6 2.6-2.6s2.6 1.1 2.6 2.6-1.2 2.6-2.6 2.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </>
);

const MongoDB = base(
  <>
    <path
      d="M12 3c2.6 2.7 4 5.6 4 8.6 0 3.3-1.8 6-4 7.9-2.2-1.9-4-4.6-4-7.9C8 8.6 9.4 5.7 12 3z"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
    <path d="M12 14v6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </>
);

const ThreeJs = base(
  <>
    <path d="M12 3 20 7.5v9L12 21 4 16.5v-9z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M4 7.5 12 12l8-4.5M12 12v9" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
  </>
);

const Git = base(
  <>
    <circle cx="7" cy="6" r="1.7" stroke="currentColor" strokeWidth="1.4" />
    <circle cx="7" cy="18" r="1.7" stroke="currentColor" strokeWidth="1.4" />
    <circle cx="17" cy="12" r="1.7" stroke="currentColor" strokeWidth="1.4" />
    <path d="M7 7.7V16.3" stroke="currentColor" strokeWidth="1.4" />
    <path d="M8.4 6.9c2.9.6 5.2 2.3 7 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </>
);

const Figma = base(
  <>
    <path d="M9 3h4v5H9a2.5 2.5 0 0 1 0-5z" stroke="currentColor" strokeWidth="1.4" />
    <path d="M9 8h4v5H9a2.5 2.5 0 0 1 0-5z" stroke="currentColor" strokeWidth="1.4" />
    <path d="M9 13h2.5a2.5 2.5 0 1 1 0 5H9v-5z" stroke="currentColor" strokeWidth="1.4" />
    <circle cx="15.5" cy="10.5" r="2.5" stroke="currentColor" strokeWidth="1.4" />
  </>
);

const Docker = base(
  <>
    <rect x="3" y="11" width="3" height="3" stroke="currentColor" strokeWidth="1.3" />
    <rect x="7" y="11" width="3" height="3" stroke="currentColor" strokeWidth="1.3" />
    <rect x="11" y="11" width="3" height="3" stroke="currentColor" strokeWidth="1.3" />
    <rect x="7" y="7" width="3" height="3" stroke="currentColor" strokeWidth="1.3" />
    <rect x="11" y="7" width="3" height="3" stroke="currentColor" strokeWidth="1.3" />
    <path
      d="M2.5 14c1.5 4.2 5 5.6 9.5 5.6 5.4 0 8.8-2.6 10-6.2-1-.3-2-.1-2.7.4-.4-.9-1.3-1.4-1.3-1.4s-.9 1-.6 2.2c-.5.3-1.6.6-3 .6H2.5z"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
  </>
);

const Flutter = base(
  <>
    <path d="M15.5 2 4 13.5 8 17.5 20 5.5h-4.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M11 14.5 8 17.5l4 4 4.5-4.5H12z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
  </>
);

const Aws = base(
  <>
    <path
      d="M5 9.5c0-2 1.6-3.5 3.6-3.5 1.8 0 3 1.1 3.4 2.6.3-.9 1.2-1.6 2.4-1.6 1.6 0 2.9 1.2 2.9 2.9 0 .3 0 .5-.1.7 1.4.2 2.3 1.3 2.3 2.6 0 1.5-1.3 2.7-3 2.7H7c-1.9 0-3.2-1.3-3.2-3 0-1.5 1-2.6 2.4-2.9-.1-.2-.2-.4-.2-.5z"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
    <path d="M6 18.5c3.6 1.6 8.4 1.6 12 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    <path d="M17 17.6l1.4.5-.3 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </>
);

/* ---- registry ------------------------------------------------------ */

export const TECH_ICONS = {
  javascript: { Icon: JavaScript, color: "#F7DF1E" },
  typescript: { Icon: TypeScript, color: "#3178C6" },
  react: { Icon: React_, color: "#61DAFB" },
  redux: { Icon: Redux, color: "#764ABC" },
  tailwind: { Icon: Tailwind, color: "#38BDF8" },
  nodejs: { Icon: NodeJs, color: "#3C873A" },
  mongodb: { Icon: MongoDB, color: "#47A248" },
  threejs: { Icon: ThreeJs, color: "#F5F5F5" },
  git: { Icon: Git, color: "#F05032" },
  figma: { Icon: Figma, color: "#A259FF" },
  docker: { Icon: Docker, color: "#2496ED" },
  flutter: { Icon: Flutter, color: "#02569B" },
  aws: { Icon: Aws, color: "#FF9900" },
};