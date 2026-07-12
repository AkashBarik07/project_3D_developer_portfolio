import { useState, useEffect, useRef, useMemo } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";

/* ------------------------------------------------------------------ */
/*  Config                                                             */
/* ------------------------------------------------------------------ */

const ROLES = ["Software Engineer", "Full-Stack Developer", "Web Developer"];

const COLORS = {
  bg: "#0a0d14",
  bgSoft: "#10141f",
  edge: "#2a3142",
  text: "#eef0f6",
  textDim: "#838ca3",
  violet: "#915eff",
  violetSoft: "rgba(145, 94, 255, 0.16)",
  teal: "#3fe8c9",
};

/* ------------------------------------------------------------------ */
/*  Typewriter hook                                                    */
/* ------------------------------------------------------------------ */

const useTypewriter = (
  words,
  typingSpeed = 90,
  deletingSpeed = 45,
  pauseTime = 1600,
) => {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex % words.length];
    let timeout;

    if (!isDeleting && text === currentWord) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setWordIndex((prev) => prev + 1);
    } else {
      timeout = setTimeout(
        () => {
          setText((prev) =>
            isDeleting
              ? currentWord.substring(0, prev.length - 1)
              : currentWord.substring(0, prev.length + 1),
          );
        },
        isDeleting ? deletingSpeed : typingSpeed,
      );
    }
    return () => clearTimeout(timeout);
  }, [
    text,
    isDeleting,
    wordIndex,
    words,
    typingSpeed,
    deletingSpeed,
    pauseTime,
  ]);

  return text;
};

/* ------------------------------------------------------------------ */
/*  Reduced-motion hook                                                */
/* ------------------------------------------------------------------ */

const useReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
};

/* ------------------------------------------------------------------ */
/*  Signature element: rotating dependency-graph sphere                */
/*  (built on @react-three/fiber so it shares one WebGL context budget  */
/*   with the rest of the app instead of opening a raw renderer)        */
/* ------------------------------------------------------------------ */

// soft round sprite, built once and reused (avoids re-creating a canvas
// texture on every mount, which is what throws off resource limits when
// this component mounts/unmounts under StrictMode or scroll gating)
let sharedSpriteTexture = null;
function getSpriteTexture() {
  if (sharedSpriteTexture) return sharedSpriteTexture;
  const c = document.createElement("canvas");
  c.width = 64;
  c.height = 64;
  const ctx = c.getContext("2d");
  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);
  sharedSpriteTexture = new THREE.CanvasTexture(c);
  return sharedSpriteTexture;
}

function GraphMesh({ reducedMotion }) {
  const coreRef = useRef(null);
  const particlesRef = useRef(null);
  const target = useRef({ x: 0, y: 0 });
  const spriteTexture = useMemo(() => getSpriteTexture(), []);

  const icoGeo = useMemo(() => new THREE.IcosahedronGeometry(2.35, 1), []);
  const edgesGeo = useMemo(() => new THREE.EdgesGeometry(icoGeo), [icoGeo]);
  const nodeGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", icoGeo.attributes.position.clone());
    return g;
  }, [icoGeo]);

  const particleGeo = useMemo(() => {
    const count = window.innerWidth < 640 ? 220 : 420;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 4.2 + Math.random() * 5.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, []);

  // dispose geometries when this mesh unmounts (e.g. scrolled out of view)
  useEffect(() => {
    return () => {
      icoGeo.dispose();
      edgesGeo.dispose();
      nodeGeo.dispose();
      particleGeo.dispose();
    };
  }, [icoGeo, edgesGeo, nodeGeo, particleGeo]);

  useEffect(() => {
    const handleMove = (e) => {
      target.current.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useFrame((state) => {
    if (reducedMotion || !coreRef.current) return;
    const t = target.current;
    t.x += ((t.mouseY || 0) * 0.25 - t.x) * 0.04;
    t.y += ((t.mouseX || 0) * 0.25 - t.y) * 0.04;

    coreRef.current.rotation.x =
      t.x + Math.sin(state.clock.elapsedTime * 0.12) * 0.05;
    coreRef.current.rotation.y += 0.0016 + t.y * 0.0009;
    if (particlesRef.current) {
      particlesRef.current.rotation.y -= 0.0006;
      particlesRef.current.rotation.x += 0.00025;
    }
  });

  return (
    <>
      <group ref={coreRef}>
        <lineSegments geometry={edgesGeo}>
          <lineBasicMaterial color={COLORS.violet} transparent opacity={0.35} />
        </lineSegments>
        <points geometry={nodeGeo}>
          <pointsMaterial
            size={0.16}
            map={spriteTexture}
            transparent
            depthWrite={false}
            color={COLORS.teal}
            opacity={0.95}
          />
        </points>
      </group>
      <points ref={particlesRef} geometry={particleGeo}>
        <pointsMaterial
          size={0.045}
          map={spriteTexture}
          transparent
          depthWrite={false}
          color={COLORS.textDim}
          opacity={0.5}
        />
      </points>
    </>
  );
}

function GraphScene({ reducedMotion }) {
  const wrapRef = useRef(null);
  const [inView, setInView] = useState(false);

  // only hold a WebGL context while the hero is actually on screen —
  // this is what keeps the app under the browser's context limit
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.05 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", marginLeft:"18rem"}}
    >
      {inView && (
        <Canvas
          camera={{ position: [0, 0, 8.5], fov: 45 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
          frameloop={reducedMotion ? "demand" : "always"}
        >
          <GraphMesh reducedMotion={reducedMotion} />
        </Canvas>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                                */
/* ------------------------------------------------------------------ */

const Hero = () => {
  const typedRole = useTypewriter(ROLES);
  const reducedMotion = useReducedMotion();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="hero-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

        .hero-root {
          position: relative;
          width: 100%;
          min-height: 100vh;
          overflow: hidden;
          background: #050816;
          {/* background: radial-gradient(ellipse 120% 80% at 50% -10%, ${COLORS.bgSoft} 0%, ${COLORS.bg} 55%); */}
          color: ${COLORS.text};
          font-family: 'Inter', sans-serif;
          display: flex;
          align-items: center;
        }

        .hero-inner {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1180px;
          margin: 0 auto;
          padding: 7rem 1.5rem 5rem;
        }

        .hero-scene-fade {
          position: absolute;
          inset: 0;
          z-index: 1;
          {/* background: linear-gradient(180deg, rgba(10,13,20,0) 0%, rgba(10,13,20,0.35) 60%, ${COLORS.bg} 100%); */}
          pointer-events: none;
        }

        .hero-vignette {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: radial-gradient(ellipse 60% 55% at 18% 45%, rgba(10,13,20,0.55) 0%, rgba(10,13,20,0) 60%);
          pointer-events: none;
        }

        .fx {
          opacity: 0;
          transform: translateY(16px);
        }
        .loaded .fx {
          animation: fxIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .loaded .fx-1 { animation-delay: 0.05s; }
        .loaded .fx-2 { animation-delay: 0.18s; }
        .loaded .fx-3 { animation-delay: 0.32s; }
        .loaded .fx-4 { animation-delay: 0.5s; }
        .loaded .fx-5 { animation-delay: 0.68s; }
        .loaded .fx-6 { animation-delay: 0.86s; }

        @keyframes fxIn {
          to { opacity: 1; transform: translateY(0); }
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.82rem;
          letter-spacing: 0.02em;
          color: ${COLORS.teal};
          padding: 0.35rem 0.85rem;
          border: 1px solid rgba(63, 232, 201, 0.3);
          border-radius: 999px;
          background: rgba(63, 232, 201, 0.06);
        }
        .eyebrow .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: ${COLORS.teal};
          box-shadow: 0 0 8px ${COLORS.teal};
        }
        .loaded .eyebrow .dot {
          animation: pulse 2.2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }

        .kicker {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.95rem;
          color: ${COLORS.textDim};
          margin: 1.6rem 0 0.5rem;
          letter-spacing: 0.01em;
        }
        .kicker .name {
          color: ${COLORS.text};
          font-weight: 500;
        }

        .headline {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: clamp(2.4rem, 6vw, 4.4rem);
          line-height: 1.08;
          letter-spacing: -0.01em;
          margin: 0;
          max-width: 15ch;
        }
        .headline .accent {
          position: relative;
          display: inline-block;
          background: linear-gradient(90deg, ${COLORS.violet}, ${COLORS.teal});
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .headline .circle-svg {
          position: absolute;
          left: -6%;
          top: -18%;
          width: 112%;
          height: 140%;
          overflow: visible;
          pointer-events: none;
        }
        .headline .circle-path {
          fill: none;
          stroke: ${COLORS.violet};
          stroke-width: 2.5;
          stroke-linecap: round;
          stroke-dasharray: 300;
          stroke-dashoffset: 300;
        }
        .loaded .headline .circle-path {
          animation: draw 1s cubic-bezier(0.65, 0, 0.35, 1) 1.1s forwards;
        }
        @keyframes draw {
          to { stroke-dashoffset: 0; }
        }

        .lede {
          font-size: 1rem;
          color: ${COLORS.textDim};
          margin: 1.1rem 0 0;
          max-width: 40ch;
        }

        .role-line {
          font-family: 'JetBrains Mono', monospace;
          font-size: clamp(1.05rem, 2.4vw, 1.35rem);
          color: ${COLORS.text};
          margin: 2.6rem 0 0;
          display: flex;
          align-items: center;
          flex-wrap: wrap;
        }
        .role-line .prompt { 
          color: ${COLORS.violet}; 
          font-size: 2rem;
          font-weight: 700;
          margin-right: 8px;
        }
        .role-line .role-word { color: ${COLORS.teal}; }
        .cursor {
          display: inline-block;
          width: 2px;
          height: 1.05em;
          background: ${COLORS.teal};
          margin-left: 3px;
          vertical-align: text-bottom;
        }
        .loaded .cursor {
          animation: blink 1s step-end infinite;
        }
        @keyframes blink {
          50% { opacity: 0; }
        }

        .bio {
          font-size: 1.02rem;
          line-height: 1.75;
          color: ${COLORS.textDim};
          margin: 1.4rem 0 0;
          max-width: 52ch;
        }
        .bio strong { color: ${COLORS.text}; font-weight: 500; }

        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          margin: 1.6rem 0 0;
        }
        .tag {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.78rem;
          color: ${COLORS.textDim};
          border: 1px solid ${COLORS.edge};
          padding: 0.3rem 0.7rem;
          border-radius: 6px;
          background: rgba(255,255,255,0.02);
        }

        .cta-row {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          margin: 2.4rem 0 0;
        }
        .btn {
          font-family: 'Inter', sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          padding: 0.85rem 1.6rem;
          border-radius: 8px;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease, border-color 0.2s ease;
        }
        .btn-primary {
          background: ${COLORS.violet};
          color: #ffffff;
          border: 1px solid ${COLORS.violet};
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px -8px rgba(145, 94, 255, 0.55);
        }
        .btn-secondary {
          background: transparent;
          color: ${COLORS.text};
          border: 1px solid ${COLORS.edge};
        }
        .btn-secondary:hover {
          border-color: ${COLORS.teal};
          color: ${COLORS.teal};
          transform: translateY(-2px);
        }
        .btn:focus-visible {
          outline: 2px solid ${COLORS.teal};
          outline-offset: 3px;
        }

        .scroll-cue {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.6rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          color: ${COLORS.textDim};
          text-transform: uppercase;
        }
        .scroll-cue .stem {
          width: 1px;
          height: 34px;
          background: linear-gradient(180deg, ${COLORS.textDim}, transparent);
          position: relative;
          overflow: hidden;
        }
        .scroll-cue .stem::after {
          content: '';
          position: absolute;
          top: -100%;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, transparent, ${COLORS.teal});
        }
        .loaded .scroll-cue .stem::after {
          animation: drip 1.8s ease-in-out infinite;
        }
        @keyframes drip {
          0% { top: -100%; }
          100% { top: 100%; }
        }

        @media (prefers-reduced-motion: reduce) {
          .fx { opacity: 1 !important; transform: none !important; animation: none !important; }
          .cursor, .eyebrow .dot, .scroll-cue .stem::after, .headline .circle-path {
            animation: none !important;
          }
          .headline .circle-path { stroke-dashoffset: 0; }
        }

        @media (max-width: 640px) {
          .hero-inner { padding-top: 6rem; }
          .headline { max-width: 100%; }
        }
      `}</style>

      <GraphScene reducedMotion={reducedMotion} />
      <div className="hero-vignette" />
      <div className="hero-scene-fade" />

      <div className={`hero-inner ${loaded ? "loaded" : ""}`}>
        <div className="fx fx-1 eyebrow">
          <span className="dot" />
          <span>$ whoami</span>
        </div>

        <p className="fx fx-2 kicker font-weight:">
          Hi, I'm <span className="name">Akash</span> — an engineer who
        </p>

        <h1 className="fx fx-3 headline">
          Ships code that{" "}
          <span className="accent" style={{ position: "relative" }}>
            scales
            <svg className="circle-svg" viewBox="0 0 140 60">
              <path
                className="circle-path"
                d="M8,32 C8,10 40,4 70,4 C108,4 132,14 132,32 C132,52 100,56 70,56 C36,56 8,52 8,32"
              />
            </svg>
          </span>
          .
        </h1>

        <p className="fx fx-3 lede">
          Because if it breaks in production, nothing else matters.
        </p>

        <p className="fx fx-4 role-line">
          <span className="prompt">&gt;</span>
          I'm a&nbsp;
          <span className="role-word">{typedRole.toUpperCase()}</span>
          <span className="cursor" />
        </p>

        <p className="fx fx-5 bio">
          Currently a <strong>Software Engineer</strong> at{" "}
          <strong>Microbase Infotech</strong>. Self-taught, shipping product for{" "}
          <strong>1+ years</strong> in the industry — I build meaningful,
          delightful digital products, blending 3D visuals with clean,
          functional interfaces that balance user needs and business goals.
        </p>

        <div className="fx fx-5 tags">
          <span className="tag">full-stack</span>
          <span className="tag">1+ yrs experience</span>
        </div>
      </div>

      <div className="scroll-cue fx fx-6">
        <span>Scroll</span>
        <span className="stem" />
      </div>
    </section>
  );
};

export default Hero;
