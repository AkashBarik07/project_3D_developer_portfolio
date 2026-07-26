import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Menu, X } from "lucide-react";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo } from "../assets";

/* ---------------------------------------------------------------------
   Design notes (kept as comments so future-you remembers the intent):
   - Palette: near-black ink (#0A0D12) + warm brass accent (#E8B563)
     + a semantic "available" green (#4ADE80) for the status dot only.
   - Signature element: a single pill that physically slides between
     nav items (layoutId), riding inside a hairline track — like a
     focus ring on a terminal tab strip.
   - Secondary detail: a 2px scroll-progress bar along the very top,
     because a portfolio nav can double as a reading-progress cue.
   - Logo is treated as a code symbol: <AkashBarik /> in a mono face,
     not a generic wordmark.
--------------------------------------------------------------------- */

const handleResumeDownload = async () => {
  try {
    const response = await fetch("/resume.pdf");
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "Akash_Barik_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Resume download failed:", error);
  }
};

const ResumeButton = ({ compact = false }) => (
  <motion.button
    onClick={handleResumeDownload}
    whileHover={{ y: -1 }}
    whileTap={{ scale: 0.96 }}
    className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/15 
      ${compact ? "w-full justify-center px-4 py-3" : "px-4 py-1.5"} 
      text-[13px] font-medium text-white/80 transition-colors duration-300 hover:text-[#0A0D12]`}
  >
    <span className="absolute inset-0 -translate-x-full bg-purple-500 transition-transform duration-300 ease-out group-hover:translate-x-0" />
    <Download size={14} className="relative z-10" />
    <span className="relative z-10">Resume</span>
  </motion.button>
);

const StatusDot = () => (
  <span className="relative ml-2 hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] font-mono tracking-wide text-white/50 sm:inline-flex">
    <span className="relative flex h-1.5 w-1.5">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4ADE80] opacity-60" />
      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#4ADE80]" />
    </span>
    open to work
  </span>
);

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight =
            document.documentElement.scrollHeight - window.innerHeight;
          setScrolled(scrollTop > 60);
          setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Scroll progress hairline */}
      <div className="fixed top-0 left-0 z-30 h-[2px] w-full bg-white/5">
        <div
          className="h-full bg-gradient-to-r bg-purple-500 to-[#f3d29a] transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <nav
        className={`${styles.paddingX} fixed top-0 z-20 w-full py-4 transition-all duration-500 ${
          scrolled
            ? "border-b border-white/10 bg-[#0A0D12]/75 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
          {/* Logo + status */}
          <div className="flex items-center">
            <Link
              to="/"
              className="group flex items-center gap-2.5"
              onClick={() => {
                setActive("");
                window.scrollTo(0, 0);
              }}
            >
              <img
                src={logo}
                alt="logo"
                className="h-8 w-8 object-contain transition-transform duration-300 group-hover:rotate-[-8deg]"
              />
              <p className="whitespace-nowrap font-mono text-[16px] text-white">
                <span className="text-white/30">&lt;</span>
                Akash Barik
                <span className="text-[#E8B563]"> /</span>
                <span className="text-white/30">&gt;</span>
              </p>
            </Link>
            <StatusDot />
          </div>

          {/* Desktop links — sliding pill track */}
          <ul className="relative hidden list-none items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1 sm:flex">
            {navLinks.map((nav) => {
              const isActive = active === nav.title;
              return (
                <li key={nav.id} className="relative">
                  <a
                    href={`#${nav.id}`}
                    onClick={() => setActive(nav.title)}
                    className={`relative z-10 block rounded-full px-4 py-1.5 text-[14px] font-medium transition-colors duration-300 ${
                      isActive ? "text-[#0A0D12]" : "text-white/60 hover:text-white"
                    }`}
                  >
                    {nav.title}
                  </a>
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      className="absolute inset-0 rounded-full bg-purple-500"
                    />
                  )}
                </li>
              );
            })}
          </ul>

          <div className="hidden sm:block  ">
            <ResumeButton />
          </div>

          {/* Mobile trigger */}
          <button
            onClick={() => setToggle((t) => !t)}
            aria-label={toggle ? "Close menu" : "Open menu"}
            className="relative z-30 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/80 sm:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={toggle ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex"
              >
                {toggle ? <X size={18} /> : <Menu size={18} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile panel */}
        <AnimatePresence>
          {toggle && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute left-4 right-4 top-[calc(100%+8px)] z-20 rounded-2xl border border-white/10 bg-[#0A0D12]/95 p-5 backdrop-blur-xl sm:hidden"
            >
              <ul className="flex list-none flex-col gap-1">
                {navLinks.map((nav, i) => (
                  <motion.li
                    key={nav.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <a
                      href={`#${nav.id}`}
                      onClick={() => {
                        setToggle(false);
                        setActive(nav.title);
                      }}
                      className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-[15px] font-medium transition-colors ${
                        active === nav.title
                          ? "bg-[#E8B563]/10 text-[#E8B563]"
                          : "text-white/70 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {nav.title}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-4 border-t border-white/10 pt-4">
                <ResumeButton compact />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;