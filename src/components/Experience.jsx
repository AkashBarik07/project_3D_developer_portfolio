import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const ExperienceCard = ({ experience, index }) => {
  const isLeft = index % 2 === 0;

  return (
    <div
      className={`relative flex items-center mb-28 ${
        isLeft ? "md:justify-start" : "md:justify-end"
      }`}
    >
      {/* Card */}
      <div className={`w-full md:w-[50%] ${isLeft ? "md:pr-14" : "md:pl-14"}`}>
        <div className="relative bg-[#1d1836] rounded-[10px] overflow-hidden shadow-lg">
          {/* Arrow */}
          <div
            className={`hidden md:block absolute top-10 w-4 h-4 bg-[#1d1836] rotate-45 ${
              isLeft ? "-right-2" : "-left-2"
            }`}
          />

          {/* Content */}
          <div className="p-8">
            <h3 className="text-white text-[24px] font-bold">
              {experience.title}
            </h3>

            <p className="text-secondary text-[16px] font-semibold mt-1">
              {experience.company_name}
            </p>

            <ul className="mt-5 ml-5 list-disc space-y-2">
              {experience.points.map((point, i) => (
                <li
                  key={i}
                  className="text-white-100 text-[14px] tracking-wider leading-7"
                >
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom white border like original */}
          <div className="h-[3px] bg-white/80 w-full"></div>
        </div>
      </div>

      {/* Center icon */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-30">
        <div
          className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center"
          style={{ background: experience.iconBg }}
        >
          <img
            src={experience.icon}
            className="w-[60%] h-[60%] object-contain"
          />
        </div>
      </div>

      {/* Date */}
      <div
        className={`hidden md:block absolute top-1/2 -translate-y-1/2 text-gray-300 font-semibold ${
          isLeft ? "left-[54%] ml-6" : "right-[54%] mr-6 text-right"
        }`}
      >
        {experience.date}
      </div>
    </div>
  );
};

const Experience = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Height of the glowing traveling segment, tied to scroll progress
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const dotTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          What I have done so far
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Work Experience.
        </h2>
      </motion.div>

      <div ref={containerRef} className="relative mt-20 max-w-5xl mx-auto px-4">
        {/* Static base line */}
        <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/10" />

        {/* Glowing progress line */}
        <motion.div
          style={{ height: lineHeight }}
          className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 w-[2px] bg-purple-500 shadow-[0_0_12px_4px_rgba(168,85,247,0.7)]"
        />

        {/* Traveling glowing dot */}
        <motion.div
          style={{ top: dotTop }}
          className="absolute left-4 md:left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-purple-500 shadow-[0_0_20px_8px_rgba(168,85,247,0.8)] z-20"
        />

        {experiences.map((experience, index) => (
          <ExperienceCard
            key={`experience-${index}`}
            experience={experience}
            index={index}
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "work");
