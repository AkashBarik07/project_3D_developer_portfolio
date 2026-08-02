import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const ServiceCard = ({ index, title, icon }) => (
  <motion.div
    className="xs:w-[250px] w-full"
    style={{ perspective: 1200 }}
    initial={{ opacity: 0, rotateY: -270, scale: 0.4 }}
    whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{
      duration: 1.1,
      delay: index * 0.25,
      type: "spring",
      stiffness: 55,
      damping: 12,
    }}
  >
    <Tilt
      options={{
        max: 25,
        scale: 1.04,
        speed: 400,
        glare: true,
        "max-glare": 0.4,
      }}
      className="service-card-tilt w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card group"
    >
      <div className="service-card-inner relative overflow-hidden bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col transition-all duration-500 group-hover:shadow-[0_0_45px_rgba(145,94,255,0.55)]">
        {/* animated border glow */}
        <span className="glow-ring" />

        {/* shine sweep on hover */}
        <span className="shine" />

        <motion.img
          src={icon}
          alt="web-development"
          className="w-16 h-16 object-contain relative z-10"
          whileHover={{
            rotate: [0, -18, 18, -10, 10, 0],
            scale: 1.22,
          }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        />

        <h3 className="relative z-10 text-white text-[20px] font-bold text-center transition-all duration-300 group-hover:scale-110 group-hover:text-[#c5a3ff]">
          {title}
        </h3>
      </div>
    </Tilt>

    <style>{`
      .service-card-tilt {
        position: relative;
      }
      .service-card-inner {
        position: relative;
        isolation: isolate;
      }

      /* Sweeping light shine */
      .shine {
        position: absolute;
        top: 0;
        left: -75%;
        width: 45%;
        height: 100%;
        background: linear-gradient(
          120deg,
          transparent,
          rgba(255, 255, 255, 0.28),
          transparent
        );
        transform: skewX(-20deg);
        transition: left 0.8s ease;
        z-index: 5;
        pointer-events: none;
      }
      .group:hover .shine {
        left: 130%;
      }

      /* Rotating conic gradient ring that appears behind the content on hover */
      .glow-ring {
        position: absolute;
        inset: -2px;
        border-radius: 20px;
        z-index: 0;
        opacity: 0;
        background: conic-gradient(
          from 0deg,
          #915eff,
          #ff5ec4,
          #5ecbff,
          #915eff
        );
        filter: blur(10px);
        animation: spin-ring 3s linear infinite;
        transition: opacity 0.4s ease;
      }
      .group:hover .glow-ring {
        opacity: 0.55;
      }

      @keyframes spin-ring {
        to {
          transform: rotate(360deg);
        }
      }
    `}</style>
  </motion.div>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        Great products aren't built by writing code alone they're built by
        solving real problems at scale. I've developed production ready web
        applications, CMS driven platforms, and backend services that power
        seamless user experiences. From designing responsive interfaces to
        building scalable APIs, integrating third party services, and optimizing
        application performance, I enjoy delivering solutions that are reliable,
        maintainable, and built for growth. I thrive on tackling complex
        challenges, learning continuously, and turning ideas into products that
        create real impact.
      </motion.p>

      <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");