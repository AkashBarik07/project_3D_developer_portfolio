import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { textVariant } from "../utils/motion";
import { TECH_ICONS } from "./TechIcons";

/* -------------------------------------------------------------------------
   ORBIT ENGINE
   Each tech node lives on a "pivot" div anchored at dead-center of the
   container. The pivot itself spins (CSS animation) — since a circle is
   rotationally symmetric, whatever radius we push the node out to will
   always sit exactly on its orbit ring, no manual position math needed.
   A nested "counter" spin cancels the parent's rotation so icons stay
   upright, while the connector trace (a sibling of the node, inside the
   same pivot) is left un-countered so it always points from core -> node.

   Icons come from ./TechIcons — a small custom monoline SVG set keyed by
   technology id, so the ring never depends on external logo image assets.
   `technologies` in ../constants should provide { name, id } per entry,
   where `id` maps to a key in TECH_ICONS (falls back to a lettermark).
------------------------------------------------------------------------- */

const RING_CONFIG = [
  { fraction: 0.34, duration: 26, direction: "normal" },
  { fraction: 0.62, duration: 38, direction: "reverse" },
  { fraction: 0.9, duration: 50, direction: "normal" },
];

const HUD_LINES = {
  idle: ["SYSTEM READY_", "AWAITING TARGET SELECTION..."],
};

const buildFlavorLines = (name) => [
  `> LOCATING MODULE :: ${name.toUpperCase()}`,
  `STATUS ......... ACTIVE`,
  `CLEARANCE ...... GRANTED`,
];

const resolveIcon = (tech) => {
  const key = tech.id || tech.name?.toLowerCase().replace(/[^a-z0-9]/g, "");
  return TECH_ICONS[key] || null;
};

const OrbitNode = ({ tech, radius, ring, delay, onFocus, onBlur, focused }) => {
  const entry = resolveIcon(tech);
  const accent = entry?.color || "#8892a0";
  const Icon = entry?.Icon;

  return (
    <div
      className="tech-orbit-pivot"
      style={{
        "--dur": `${ring.duration}s`,
        "--dir": ring.direction,
        animationDelay: `${delay}s`,
      }}
    >
      {/* connector trace — rotates WITH the pivot, always points at the node */}
      <span
        className="tech-orbit-trace"
        style={{
          width: radius,
          background: `linear-gradient(90deg, ${accent}00, ${accent}77)`,
        }}
      />

      <div className="tech-orbit-anchor" style={{ transform: `translateX(${radius}px)` }}>
        <div
          className="tech-orbit-counter"
          style={{
            "--dur": `${ring.duration}s`,
            "--dir": ring.direction === "normal" ? "reverse" : "normal",
            animationDelay: `${delay}s`,
          }}
        >
          <motion.button
            type="button"
            onFocus={() => onFocus(tech)}
            onMouseEnter={() => onFocus(tech)}
            onMouseLeave={onBlur}
            onBlur={onBlur}
            whileHover={{ scale: 1.16, y: -2 }}
            whileFocus={{ scale: 1.16, y: -2 }}
            whileTap={{ scale: 1.02 }}
            className="tech-node"
            style={{
              "--glow": accent,
              boxShadow: focused
                ? `0 0 0 1px ${accent}aa, 0 0 30px 6px ${accent}4d`
                : `0 0 0 1px ${accent}33`,
            }}
            aria-label={tech.name}
          >
            <span className="tech-node-sheen" />
            {Icon ? (
              <Icon className="tech-node-icon" style={{ color: accent }} />
            ) : (
              <span className="tech-node-fallback" style={{ color: accent }}>
                {tech.name?.slice(0, 2).toUpperCase()}
              </span>
            )}
          </motion.button>

          <span className="tech-node-tag" style={{ "--glow": accent }}>
            {tech.name}
          </span>
        </div>
      </div>
    </div>
  );
};

const Tech = () => {
  const containerRef = useRef(null);
  const [box, setBox] = useState({ width: 900, height: 520 });
  const [focused, setFocused] = useState(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const rect = entries[0]?.contentRect;
      if (rect) setBox({ width: rect.width, height: rect.height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // distribute technologies round-robin across the three rings
  const rings = useMemo(() => {
    const buckets = [[], [], []];
    technologies.forEach((t, i) => buckets[i % 3].push(t));
    return buckets;
  }, []);

  // orbits stay true circles sized to the constrained (shorter) dimension,
  // centered inside the wider rectangular viewport
  const size = Math.min(box.width, box.height);
  const halfSize = size / 2;
  const centerX = box.width / 2;
  const centerY = box.height / 2;

  return (
    <>
      <motion.div variants={textVariant()} className="text-center mb-6">
        <p className="text-secondary text-[17px] tracking-wider uppercase font-mono">
          // What I work with
        </p>
        <h2 className="text-white font-black text-[60px] mt-2">Technologies</h2>
      </motion.div>

      <div className="relative w-full flex flex-col items-center">
        {/* ORBIT VIEWPORT */}
        <div
          ref={containerRef}
          className="tech-viewport relative w-full max-w-[1100px] h-[380px] sm:h-[440px] md:h-[520px] lg:h-[600px] xl:h-[680px] mt-6"
        >
          {/* HUD corner brackets */}
          <span className="tech-corner tl" />
          <span className="tech-corner tr" />
          <span className="tech-corner bl" />
          <span className="tech-corner br" />

          {/* scanline sweep */}
          <div className="tech-scanline" />

          {/* faint grid backdrop */}
          <div className="tech-grid" />

          {/* orbit guide rings (rotationally symmetric, no sync needed) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox={`0 0 ${box.width} ${box.height}`}>
            {RING_CONFIG.map((ring, i) => (
              <circle
                key={i}
                cx={centerX}
                cy={centerY}
                r={halfSize * ring.fraction}
                fill="none"
                stroke="#ffffff"
                strokeOpacity={0.12}
                strokeWidth={1}
                strokeDasharray="2 8"
              />
            ))}
          </svg>

          {/* central core */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="tech-core">
              <motion.span
                className="tech-core-ring"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              />
              <motion.span
                className="tech-core-ring tech-core-ring--outer"
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 16, ease: "linear" }}
              />
              <div className="tech-core-dot" />
              <span className="tech-core-label">CORE</span>
            </div>
          </div>

          {/* orbiting nodes */}
          {rings.map((bucket, ringIndex) => {
            const ring = RING_CONFIG[ringIndex];
            const radius = halfSize * ring.fraction;
            return bucket.map((tech, i) => {
              const angle = (360 / bucket.length) * i;
              const delay = -((ring.duration / 360) * angle); // phase offset via negative delay
              return (
                <OrbitNode
                  key={tech.name}
                  tech={tech}
                  radius={radius}
                  ring={ring}
                  delay={delay}
                  focused={focused?.name === tech.name}
                  onFocus={setFocused}
                  onBlur={() => setFocused(null)}
                />
              );
            });
          })}
        </div>

        {/* HUD readout panel */}
        <div className="tech-readout mt-8 w-full max-w-[460px]">
          <div className="tech-readout-bar">
            <span className="tech-readout-dot" />
            <span>DIAGNOSTICS</span>
          </div>
          <div className="tech-readout-body font-mono" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={focused ? focused.name : "idle"}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
              >
                {(focused ? buildFlavorLines(focused.name) : HUD_LINES.idle).map((line, i) => (
                  <p key={i} className="tech-readout-line">
                    {line}
                  </p>
                ))}
              </motion.div>
            </AnimatePresence>
            <span className="tech-cursor" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes tech-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes tech-scan {
          0% { transform: translateY(-10%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(110%); opacity: 0; }
        }
        @keyframes tech-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .tech-viewport {
          border-radius: 1.5rem;
          background: radial-gradient(circle at 50% 50%, rgba(124,58,237,0.06), transparent 70%);
          overflow: hidden;
        }

        .tech-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 28px 28px;
          mask-image: radial-gradient(circle at center, black 55%, transparent 85%);
          pointer-events: none;
        }

        .tech-scanline {
          position: absolute;
          left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(34,211,238,0.7), transparent);
          animation: tech-scan 5s linear infinite;
          pointer-events: none;
        }

        .tech-corner {
          position: absolute;
          width: 22px;
          height: 22px;
          border: 1.5px solid rgba(34,211,238,0.5);
          z-index: 2;
        }
        .tech-corner.tl { top: 10px; left: 10px; border-right: none; border-bottom: none; }
        .tech-corner.tr { top: 10px; right: 10px; border-left: none; border-bottom: none; }
        .tech-corner.bl { bottom: 10px; left: 10px; border-right: none; border-top: none; }
        .tech-corner.br { bottom: 10px; right: 10px; border-left: none; border-top: none; }

        .tech-core {
          position: relative;
          width: 96px;
          height: 96px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .tech-core-ring {
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          border: 1px solid rgba(168,85,247,0.5);
          border-top-color: rgba(34,211,238,0.9);
        }
        .tech-core-ring--outer {
          inset: -14px;
          border-color: rgba(244,114,182,0.25);
          border-top-color: rgba(244,114,182,0.8);
        }
        .tech-core-dot {
          width: 10px;
          height: 10px;
          border-radius: 9999px;
          background: #fff;
          box-shadow: 0 0 14px 4px rgba(34,211,238,0.8);
        }
        .tech-core-label {
          position: absolute;
          bottom: -22px;
          font-family: "JetBrains Mono", monospace;
          font-size: 10px;
          letter-spacing: 0.2em;
          color: rgba(255,255,255,0.55);
        }

        .tech-orbit-pivot {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          animation-name: tech-spin;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          animation-direction: var(--dir);
          animation-duration: var(--dur);
        }

        .tech-orbit-trace {
          position: absolute;
          top: 0;
          left: 0;
          height: 1px;
          transform-origin: left center;
        }

        .tech-orbit-anchor {
          position: absolute;
          top: 0;
          left: 0;
        }

        .tech-orbit-counter {
          position: absolute;
          top: 0;
          left: 0;
          transform: translate(-50%, -50%);
          animation-name: tech-spin;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          animation-direction: var(--dir);
          animation-duration: var(--dur);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }

        .tech-node {
          position: relative;
          width: 64px;
          height: 64px;
          border-radius: 9999px;
          background: rgba(13,17,23,0.9);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          overflow: hidden;
          transition: box-shadow 0.25s ease;
        }
        .tech-node-sheen {
          position: absolute;
          inset: 0;
          background: linear-gradient(150deg, rgba(255,255,255,0.14), transparent 45%);
          pointer-events: none;
        }
        .tech-node-icon {
          width: 30px;
          height: 30px;
          position: relative;
          z-index: 1;
        }
        .tech-node-fallback {
          font-family: "JetBrains Mono", monospace;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.05em;
          position: relative;
          z-index: 1;
        }

        .tech-node-tag {
          font-family: "JetBrains Mono", monospace;
          font-size: 10px;
          letter-spacing: 0.04em;
          color: rgba(226,232,240,0.65);
          background: rgba(8,10,14,0.75);
          border: 1px solid color-mix(in srgb, var(--glow) 45%, transparent);
          padding: 2px 7px;
          border-radius: 999px;
          white-space: nowrap;
          opacity: 0;
          transform: translateY(-2px);
          transition: opacity 0.18s ease, transform 0.18s ease;
          pointer-events: none;
        }
        .tech-node:hover ~ .tech-node-tag,
        .tech-node:focus-visible ~ .tech-node-tag {
          opacity: 1;
          transform: translateY(0);
        }

        .tech-readout {
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 0.75rem;
          background: rgba(13,17,23,0.6);
          overflow: hidden;
        }
        .tech-readout-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          font-family: "JetBrains Mono", monospace;
          font-size: 11px;
          letter-spacing: 0.15em;
          color: rgba(255,255,255,0.45);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .tech-readout-dot {
          width: 6px;
          height: 6px;
          border-radius: 9999px;
          background: #22d3ee;
          box-shadow: 0 0 8px 2px rgba(34,211,238,0.7);
        }
        .tech-readout-body {
          position: relative;
          padding: 14px 16px 18px;
          min-height: 78px;
        }
        .tech-readout-line {
          font-size: 12.5px;
          line-height: 1.6;
          color: rgba(226,232,240,0.85);
        }
        .tech-cursor {
          display: inline-block;
          width: 7px;
          height: 14px;
          background: #a855f7;
          margin-left: 2px;
          animation: tech-blink 1s step-end infinite;
          vertical-align: -2px;
        }

        @media (prefers-reduced-motion: reduce) {
          .tech-orbit-pivot,
          .tech-orbit-counter,
          .tech-scanline,
          .tech-core-ring {
            animation: none !important;
          }
        }

        @media (max-width: 480px) {
          .tech-node { width: 46px; height: 46px; }
          .tech-node-icon { width: 22px; height: 22px; }
          .tech-core { width: 70px; height: 70px; }
          .tech-node-tag { display: none; }
        }
      `}</style>
    </>
  );
};

export default SectionWrapper(Tech, "");