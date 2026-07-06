import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const TechCard = ({ technology, index }) => {
  const cardRef = useRef(null);

  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setRotate({
      x: -((y - centerY) / centerY) * 12,
      y: ((x - centerX) / centerX) * 12,
    });

    setMouse({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleLeave = () => {
    setHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.1, 0.75)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="relative"
      style={{ perspective: "1500px" }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleLeave}
        animate={{
          rotateX: rotate.x,
          rotateY: rotate.y,
          scale: hovered ? 1.08 : 1,
          y: hovered ? -8 : [0, -6, 0],
        }}
        transition={{
          rotateX: { type: "spring", stiffness: 180 },
          rotateY: { type: "spring", stiffness: 180 },
          scale: { type: "spring", stiffness: 200 },
          y: hovered
            ? { type: "spring", stiffness: 200 }
            : {
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
              },
        }}
        style={{
          transformStyle: "preserve-3d",
        }}
        className="relative w-36 h-36 rounded-3xl overflow-hidden cursor-pointer"
      >
        {/* Animated Gradient Border */}

        <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-br from-cyan-400 via-violet-500 to-pink-500">
          {/* Card */}
          <div className="relative w-full h-full rounded-3xl bg-[#111827]/90 backdrop-blur-xl border border-white/10 overflow-hidden">
            {/* Mouse Glow */}

            <div
              className="absolute inset-0 transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at ${mouse.x}% ${mouse.y}%,
                rgba(255,255,255,.35),
                transparent 60%)`,
                opacity: hovered ? 1 : 0,
              }}
            />

            {/* Neon Glow */}

            <div
              className={`absolute -inset-6 blur-3xl transition-all duration-500 ${
                hovered ? "opacity-70" : "opacity-20"
              }`}
              style={{
                background: "radial-gradient(circle,#7c3aed55,transparent 70%)",
                transform: "translateZ(-30px)",
              }}
            />

            {/* Glass Reflection */}

            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              <div
                className="absolute -top-24 -left-12 w-56 h-56 rotate-12 bg-white/10 blur-2xl"
                style={{
                  transform: hovered
                    ? "translate(30px,-10px)"
                    : "translate(0px,0px)",
                  transition: "0.6s",
                }}
              />
            </div>

            {/* Ball */}

            <motion.div
              animate={{
                y: hovered ? -10 : [0, -6, 0],
                rotateZ: hovered ? 8 : 0,
              }}
              transition={{
                repeat: hovered ? 0 : Infinity,
                duration: 3,
              }}
              className="absolute inset-0 flex justify-center items-center"
              style={{
                transform: "translateZ(70px)",
              }}
            >
              <div className="w-[85px] h-[85px]">
                <BallCanvas icon={technology.icon} />
              </div>
            </motion.div>

            {/* Bottom Glow */}

            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-4 rounded-full blur-lg bg-violet-500/40"
              style={{
                transform: "translateZ(20px)",
              }}
            />
          </div>
        </div>

        {/* Name */}

        <motion.div
          animate={{
            opacity: hovered ? 1 : 0,
            y: hovered ? 0 : 10,
          }}
          className="absolute -bottom-8 w-full text-center text-white font-semibold tracking-wide"
        >
          {technology.name}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};


const Tech = () => {
  return (
    <>
      <motion.div variants={textVariant()} className="text-center mb-16">
        <p className="text-secondary text-[17px] tracking-wider uppercase">
          What I work with
        </p>
        <h2 className="text-white font-black text-[40px] mt-2">Technologies</h2>
      </motion.div>

      <div className="flex flex-row flex-wrap justify-center gap-14 mt-4">
        {technologies.map((technology, index) => (
          <TechCard
            key={technology.name}
            technology={technology}
            index={index}
          />
        ))}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </>
  );
};

export default SectionWrapper(Tech, "");
