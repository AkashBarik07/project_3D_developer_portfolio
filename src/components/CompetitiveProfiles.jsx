import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { textVariant, fadeIn } from "../utils/motion";

// Add these two logo files to src/assets/
import leetcodeLogo from "../assets/leetcodebg.png";
import codechefLogo from "../assets/cc-logo.svg";

const profiles = [
  {
    name: "LeetCode",
    logo: leetcodeLogo,
    link: "https://leetcode.com/Akash__07",
  },
  {
    name: "CodeChef",
    logo: codechefLogo,
    link: "https://www.codechef.com/users/akashbarik_07",
  },
];

const ProfileCard = ({ name, logo, link, glow, index }) => (
  <motion.a
    variants={fadeIn("up", "spring", index * 0.15, 0.75)}
    href={link}
    target="_blank"
    rel="noreferrer"
    className="group relative flex-1 min-w-[320px] max-w-[280px] aspect-square rounded-2xl overflow-hidden shadow-lg bg-[#1d1836] transition-all duration-300 hover:-translate-y-3"
  >
    {/* Brand-colored glow, fades in behind the card on hover */}
    <div
      className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-60 blur-xl transition-opacity duration-500 -z-10"
      style={{ backgroundColor: glow }}
    />

    {/* Logo centered at 90% of card size, zooms in slightly on hover */}
    <img
      src={logo}
      alt={`${name} logo`}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] object-cover rounded-xl transition-transform duration-500 ease-out group-hover:scale-110"
    />

    {/* Gradient scrim, deepens slightly on hover for extra contrast */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent transition-opacity duration-300 group-hover:from-black/90" />

    {/* Name label, centered at bottom, nudges up + brightens on hover */}
    <div className="absolute inset-x-0 bottom-0 flex justify-center mb-5 transition-transform duration-300 group-hover:-translate-y-1">
      <h3 className="text-white text-[22px] font-bold tracking-wide">{name}</h3>
    </div>

    {/* Border ring, brightens on hover */}
    <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10 group-hover:ring-white/40 transition-all duration-300" />
  </motion.a>
);
const CompetitiveProfiles = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          Problem Solving
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Competitive Programming.
        </h2>
      </motion.div>

      <div className="mt-10 flex flex-wrap gap-6 justify-center">
        {profiles.map((profile, index) => (
          <ProfileCard key={profile.name} {...profile} index={index} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(CompetitiveProfiles, "competitive");
