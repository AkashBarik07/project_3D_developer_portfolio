import heroPortrait from "../assets/ProfilePic.jpeg";
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
/*  Profile card — white card floating on the hero, styled like a      */
/*  professional profile block: gradient photo panel with status pill, */
/*  name/role/description, social icons, and a stat row.                */
/*  Falls back to a labeled placeholder so a missing image never         */
/*  breaks layout.                                                       */
/* ------------------------------------------------------------------ */


function PortraitCard({ reducedMotion, loaded }) {
  const [failed, setFailed] = useState(false);

  const socials = [
    {
      label: "GitHub",
      href: "https://github.com/akashbarik_07",
      icon: (
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.57.1.79-.25.79-.55 0-.27-.01-1.15-.02-2.09-3.2.7-3.87-1.36-3.87-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.8 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.42.36.78 1.08.78 2.18 0 1.57-.01 2.84-.01 3.23 0 .3.21.66.8.55A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
      ),
    },
    {
      label: "LeetCode",
      href: "https://leetcode.com/Akash__07",
      icon: (
        <path d="M13.5 2.5 6.7 9.4a2.3 2.3 0 0 0 0 3.2l4.6 4.6a2.3 2.3 0 0 0 3.2 0l2-2a1.1 1.1 0 0 0-1.6-1.6l-1.9 1.9-4.2-4.2 6.1-6.1a1.1 1.1 0 1 0-1.6-1.7zm-.4 14.6L11 19.2a2.3 2.3 0 0 0 0 3.2c.9.9 2.3.9 3.2 0l2.1-2.1a1.1 1.1 0 1 0-1.6-1.6l-1.6 1.6zm7.4-5.4H10a1.1 1.1 0 1 0 0 2.2h10.5a1.1 1.1 0 1 0 0-2.2z" />
      ),
    },
    {
      label: "CodeChef",
      href: "https://www.codechef.com/users/AkashBarik07",
      icon: (
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zM7 10.5c.55 0 1 .45 1 1v3.5c1.1 1.4 2.9 2.3 4.9 2.3s3.8-.9 4.9-2.3V11.5c0-.55.45-1 1-1s1 .45 1 1v3.8c-1.4 2-3.7 3.2-6.9 3.2s-5.5-1.2-6.9-3.2V11.5c0-.55.45-1 1-1z" />
      ),
    },
  ];

  return (
    <><div className="profile-card">
      <div className="profile-photo-frame">
        {/* <span className="pill-status">
          <span className="pill-dot" />
          open to work
        </span> */}

        <div className="profile-photo">
          {heroPortrait && !failed ? (
            <img
              src={heroPortrait}
              alt="Akash Barik"
              onError={() => setFailed(true)} />
          ) : (
            <div className="portrait-placeholder">
              <span>// add src/assets/hero-portrait.jpg</span>
            </div>
          )}
          {loaded && <span className="scan-sweep" />}
        </div>
      </div>

      <div className="profile-body">
        <h3 className="profile-name">Akash Barik</h3>
        <p className="profile-role">Software Engineer</p>
        <p className="profile-desc">
          Building full-stack products with clean architecture and
          immersive 3D interfaces.
        </p>

        <div className="social-row">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              className="social-icon"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                {s.icon}
              </svg>
            </a>
          ))}
        </div>
      </div>
    </div>
    <div className="stats-row">
        <div className="stat">
          <span className="stat-num">1+</span>
          <span className="stat-label">Years Exp</span>
        </div>
        <div className="stat">
          <span className="stat-num">10+</span>
          <span className="stat-label">Projects</span>
        </div>
        <div className="stat">
          <span className="stat-num">4</span>
          <span className="stat-label">Core Stacks</span>
        </div>
      </div>
    </>
  );
}
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
    <div ref={wrapRef} aria-hidden="true" className="hero-scene-layer">
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
          color: ${COLORS.text};
          font-family: 'Inter', sans-serif;
          display: flex;
          align-items: center;
        }

        .hero-inner {
          position: relative;
          z-index: 3;
          width: 100%;
          max-width: 1180px;
          margin: 0 auto;
          padding: 7rem 1.5rem 5rem;
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 3rem;
          align-items: center;
        }

        .hero-copy { min-width: 0; }

        /* ---- profile card: white card w/ gradient photo panel ---- */
        .profile-card {
          position: relative;
          z-index: 1;
          width: min(300px, 100%);
          margin: 0 auto;
          background: #ffffff;
          border-radius: 24px;
          padding: 14px 14px 20px;
          box-shadow: 0 30px 70px -20px rgba(0, 0, 0, 0.55);
          transition: transform 0.3s ease;
        }
        .profile-card:hover {
          transform: translateY(-4px);
        }

        .profile-photo-frame {
          position: relative;
          border-radius: 18px;
          overflow: hidden;
          aspect-ratio: 4 / 4.4;
          background: linear-gradient(160deg, ${COLORS.violet} 0%, #6d3fd6 45%, ${COLORS.teal} 130%);
        }

        .pill-status {
          position: absolute;
          top: 10px;
          left: 10px;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.62rem;
          letter-spacing: 0.04em;
          color: #fff;
          background: rgba(5, 8, 15, 0.4);
          backdrop-filter: blur(6px);
          padding: 4px 9px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .pill-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: ${COLORS.teal};
          box-shadow: 0 0 6px ${COLORS.teal};
        }
        .loaded .pill-dot {
          animation: pulse 2.2s ease-in-out infinite;
        }

        .profile-photo {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .profile-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: 50% 15%;
          filter: saturate(1.05) contrast(1.05);
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .profile-card:hover .profile-photo img {
          transform: scale(1.05);
        }
        .portrait-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 1.5rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.72rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.8);
        }
        .scan-sweep {
          position: absolute;
          left: 0;
          right: 0;
          height: 45%;
          top: -45%;
          background: linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0) 100%);
          pointer-events: none;
          animation: sweep 1.3s cubic-bezier(0.4, 0, 0.2, 1) 0.9s 1;
        }
        @keyframes sweep {
          to { top: 100%; }
        }

        .profile-body {
          padding: 16px 6px 4px;
        }
        .profile-name {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 1.15rem;
          color: #0a0d14;
          margin: 0;
        }
        .profile-role {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          color: ${COLORS.violet};
          margin: 2px 0 0;
          font-weight: 500;
        }
        .profile-desc {
          font-size: 0.82rem;
          line-height: 1.5;
          color: #555b6b;
          margin: 8px 0 0;
        }

        .social-row {
          display: flex;
          gap: 8px;
          margin-top: 12px;
        }
        .social-icon {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f2f1f6;
          color: #0a0d14;
          transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
        }
        .social-icon:hover {
          background: ${COLORS.violet};
          color: #fff;
          transform: translateY(-2px);
        }

        .stats-row {
          display: flex;
          justify-content: space-between;
          margin-top: 16px;
          padding-top: 14px;
          border-top: 1px solid #eceef3;
        }
        .stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1px;
        }
        .stat-num {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 1.05rem;
          color: #0a0d14;
        }
        .stat-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.03em;
          color: #8a8fa0;
          text-transform: uppercase;
        }

        .hero-scene-layer {
          position: absolute;
          inset: 0;
          z-index: 1;
          width: 100%;
          height: 100%;
        }

        .hero-scene-fade {
          position: absolute;
          inset: 0;
          z-index: 2;
          background: linear-gradient(180deg, rgba(10,13,20,0) 0%, rgba(10,13,20,0.35) 60%, ${COLORS.bg} 100%);
          pointer-events: none;
        }

        .hero-vignette {
          position: absolute;
          inset: 0;
          z-index: 2;
          background:
            radial-gradient(ellipse 60% 55% at 18% 45%, rgba(10,13,20,0.6) 0%, rgba(10,13,20,0) 60%),
            linear-gradient(90deg, rgba(10,13,20,0) 45%, rgba(5,8,15,0.5) 62%, rgba(5,8,15,0.72) 100%);
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
        .headline .accent::after {
          content: '';
          position: absolute;
          left: 2%;
          right: 2%;
          bottom: -0.08em;
          height: 0.11em;
          border-radius: 999px;
          background: linear-gradient(90deg, ${COLORS.violet}, ${COLORS.teal});
          transform-origin: left center;
          transform: scaleX(0);
        }
        .loaded .headline .accent::after {
          animation: underlineIn 0.7s cubic-bezier(0.65, 0, 0.35, 1) 1.05s forwards;
        }
        @keyframes underlineIn {
          to { transform: scaleX(1); }
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
          z-index: 3;
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
          .cursor, .eyebrow .dot, .scroll-cue .stem::after, .scan-sweep, .pill-dot {
            animation: none !important;
          }
          .headline .accent::after { transform: scaleX(1); }
          .profile-card { transform: none !important; }
        }

        @media (max-width: 900px) {
          .hero-inner {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .hero-vignette {
            background: radial-gradient(ellipse 70% 50% at 50% 60%, rgba(10,13,20,0.6) 0%, rgba(10,13,20,0) 65%);
          }
          .profile-card { order: -1; }
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
        <div className="hero-copy">
          <div className="fx fx-1 eyebrow">
            <span className="dot" />
            <span>$ whoami</span>
          </div>

          <p className="fx fx-2 kicker">
            Hi, I'm <span className="name">Akash</span> — an engineer who
          </p>

          <h1 className="fx fx-3 headline">
            Ships code that{" "}
            <span className="accent">scales</span>.
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
            <strong>Software Engineer</strong> at{" "}
            <strong>Microbase Infotech</strong>, self-taught and shipping in
            production for <strong>2+ years</strong>. I build full-stack
            products with clean architecture and immersive 3D interfaces — the
            kind that make users stop scrolling. If you need something built
            right and built beautifully, that's what I do.
          </p>

          <div className="fx fx-5 tags">
            <span className="tag">full-stack</span>
            <span className="tag">1+ yrs experience</span>
          </div>
        </div>

        <div className="fx fx-4">
          <PortraitCard reducedMotion={reducedMotion} loaded={loaded} />
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