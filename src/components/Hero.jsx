import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";

const ROLES = ["Software Engineer", "Full Stack Developer", "Web Developer"];

const useTypewriter = (
  words,
  typingSpeed = 100,
  deletingSpeed = 60,
  pauseTime = 1500,
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

const Hero = () => {
  const typedRole = useTypewriter(ROLES);

  return (
    <section
      className="relative w-full min-h-screen mx-auto bg-primary overflow-hidden flex items-center justify-center"
      style={{ backgroundImage: "url('/src/assets/herobg.png')" }}
    >
      <div
        className={`max-w-7xl mx-auto w-full ${styles.paddingX} pt-32 pb-16`}
      >
        {/* ---------- Top block: avatar + greeting + headline, all in one row ---------- */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">
          {/* Avatar with glow — fixed, contained size */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex-shrink-0 w-[180px] h-[180px] sm:w-[220px] sm:h-[220px]"
          >
            <div className="absolute inset-0 m-auto w-full h-full rounded-full bg-[#915EFF]/25 blur-[70px]" />
            <img
              src="/Avatar_icon.png"
              alt="Akash"
              className="relative w-full h-full object-contain z-10"
            />
          </motion.div>

          {/* Text column — greeting, small heading, headline, all constrained to remaining width */}
          <div className="flex-1 min-w-0 flex flex-col mt-2">
            {/* Greeting with arrow, sits above the headline */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="flex items-center gap-2 mb-2"
            >
              <motion.svg
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.9, ease: "easeInOut" }}
                width="60"
                height="45"
                viewBox="0 0 60 45"
                className="hidden md:block flex-shrink-0"
              >
                <motion.path
                  d="M50 38 C 35 12, 15 5, 6 10"
                  stroke="#a78bfa"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d="M6 10 L14 8 M6 10 L9 18"
                  stroke="#a78bfa"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </motion.svg>

              <p className="text-white text-base sm:text-lg">
                Hello! I Am{" "}
                <span className="violet-text-gradient font-semibold">
                  Akash
                </span>
              </p>
            </motion.div>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.7 }}
              className="text-secondary text-sm underline underline-offset-4 mb-1"
            >
              An Engineer who
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.9 }}
              className="text-white font-bold text-4xl sm:text-5xl md:text-6xl leading-tight"
            >
              Ships code that{" "}
              <span className="relative inline-block violet-text-gradient">
                scales
                <motion.svg
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 2.4,
                    ease: "easeInOut",
                  }}
                  className="absolute -inset-x-2 -inset-y-1 w-[calc(100%+16px)] h-[calc(100%+8px)]"
                  viewBox="0 0 120 50"
                  preserveAspectRatio="none"
                >
                  <motion.ellipse
                    cx="60"
                    cy="25"
                    rx="58"
                    ry="22"
                    fill="none"
                    stroke="#915EFF"
                    strokeWidth="2"
                  />
                </motion.svg>
              </span>
              ...
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 2.8 }}
              className="text-secondary text-sm mt-3 max-w-md"
            >
              Because if it breaks in production, nothing else matters.
            </motion.p>
          </div>
        </div>

        {/* ---------- Bottom block: role typewriter + bio ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 3.2 }}
          className="mt-16 
            "
        >
          <h2 className="text-white text-3xl sm:text-4xl font-semibold">
            I'm a {typedRole}
            <span className="inline-block w-[2px] h-[1em] bg-white ml-1 animate-pulse align-middle" />
          </h2>

          <p className="text-white-100 text-lg mt-4">
            Currently, I'm a Software Engineer at{" "}
            <span className="text-[#1877F2] font-medium">
              Microbase Infotech
            </span>
            ,
          </p>

          <p className="text-secondary text-lg mt-10 max-w-3xl leading-relaxed">
            A self-taught developer, working in the industry for{" "}
            <span className="text-white">1+ years</span> now. I build
            meaningful and delightful digital products — blending 3D visuals
            with clean, functional interfaces that balance user needs and
            business goals.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
