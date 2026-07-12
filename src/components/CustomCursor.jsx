import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const ringX = useSpring(mouseX, { damping: 25, stiffness: 300, mass: 0.5 });
  const ringY = useSpring(mouseY, { damping: 25, stiffness: 300, mass: 0.5 });

  const canvasRef = useRef(null);
  const pointsRef = useRef([]);
  const lastPoint = useRef(null);
  const animationRef = useRef(null);

  // Matches your Experience.jsx timeline: purple-500 (#a855f7 / rgb(168,85,247))
  const GLOW_COLOR = "168, 85, 247";

  useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const addPoint = (x, y) => {
      if (lastPoint.current) {
        const dx = x - lastPoint.current.x;
        const dy = y - lastPoint.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const steps = Math.min(Math.floor(dist / 6), 12);

        for (let i = 1; i <= steps; i++) {
          pointsRef.current.push({
            x: lastPoint.current.x + (dx * i) / (steps + 1),
            y: lastPoint.current.y + (dy * i) / (steps + 1),
            time: Date.now(),
          });
        }
      }

      pointsRef.current.push({ x, y, time: Date.now() });
      lastPoint.current = { x, y };

      if (pointsRef.current.length > 60) {
        pointsRef.current.splice(0, pointsRef.current.length - 60);
      }
    };

    const moveCursor = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      addPoint(e.clientX, e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const isInteractive =
        e.target.closest("a, button, input, textarea, [data-cursor-hover]") !==
        null;
      setIsHovering(isInteractive);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    const drawSmoothTrail = (points) => {
      if (points.length < 3) return;

      const head = points[points.length - 1];
      const tail = points[0];

      const buildPath = () => {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length - 1; i++) {
          const midX = (points[i].x + points[i + 1].x) / 2;
          const midY = (points[i].y + points[i + 1].y) / 2;
          ctx.quadraticCurveTo(points[i].x, points[i].y, midX, midY);
        }
      };

      // Outer soft glow — mirrors the shadow-[0_0_20px_8px_rgba(168,85,247,0.8)]
      // treatment used on the Experience timeline's traveling dot
      const outerGradient = ctx.createLinearGradient(
        tail.x,
        tail.y,
        head.x,
        head.y,
      );
      outerGradient.addColorStop(0, `rgba(${GLOW_COLOR}, 0)`);
      outerGradient.addColorStop(0.6, `rgba(${GLOW_COLOR}, 0.4)`);
      outerGradient.addColorStop(1, `rgba(${GLOW_COLOR}, 0.9)`);

      buildPath();
      ctx.strokeStyle = outerGradient;
      ctx.lineWidth = 26;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.shadowBlur = 28;
      ctx.shadowColor = `rgba(${GLOW_COLOR}, 0.8)`;
      ctx.globalAlpha = 0.5;
      ctx.stroke();
      ctx.globalAlpha = 1;

      // Mid pass — solid purple core, like the timeline's line itself
      const midGradient = ctx.createLinearGradient(
        tail.x,
        tail.y,
        head.x,
        head.y,
      );
      midGradient.addColorStop(0, `rgba(${GLOW_COLOR}, 0)`);
      midGradient.addColorStop(0.7, `rgba(${GLOW_COLOR}, 0.7)`);
      midGradient.addColorStop(1, `rgba(${GLOW_COLOR}, 1)`);

      buildPath();
      ctx.strokeStyle = midGradient;
      ctx.lineWidth = 8;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.shadowBlur = 15;
      ctx.shadowColor = `rgba(${GLOW_COLOR}, 1)`;
      ctx.stroke();

      // Bright white core, like the little dot at the head of your timeline
      const coreGradient = ctx.createLinearGradient(
        tail.x,
        tail.y,
        head.x,
        head.y,
      );
      coreGradient.addColorStop(0, "rgba(255, 255, 255, 0)");
      coreGradient.addColorStop(0.8, "rgba(255, 255, 255, 0.6)");
      coreGradient.addColorStop(1, "rgba(255, 255, 255, 1)");

      buildPath();
      ctx.strokeStyle = coreGradient;
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();

      // Glowing head dot — same visual language as the traveling timeline dot
      ctx.beginPath();
      ctx.arc(head.x, head.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.shadowBlur = 20;
      ctx.shadowColor = `rgba(${GLOW_COLOR}, 1)`;
      ctx.fill();
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const now = Date.now();
      pointsRef.current = pointsRef.current.filter((p) => now - p.time < 350);

      drawSmoothTrail(pointsRef.current);

      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("resize", resize);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(animationRef.current);
    };
  }, [isVisible, mouseX, mouseY]);

  const isTouchDevice =
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0);

  if (isTouchDevice) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
      />

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: mouseX, y: mouseY, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: isVisible ? 1 : 0, scale: isHovering ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      >
        <div className="w-2 h-2 rounded-full bg-white" />
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: isVisible ? 1 : 0, scale: isHovering ? 1.8 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-8 h-8 rounded-full border border-white" />
      </motion.div>
    </>
  );
};

export default CustomCursor;
