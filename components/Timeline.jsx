"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiBriefcase, FiAward, FiCalendar } from "react-icons/fi";

const experience = [
  {
    company: "Foetron Consultancy Services ",
    position: "Cloud and AI Architect",
    duration: "Present",
    type: "Internship",
    description: "Leading AI integration projects and cloud architecture.",
  },
  {
    company: "Outlier AI",
    position: "Prompt Engineering & AI Review",
    duration: "Freelance",
    type: "Freelance",
    description: "Expert review and optimization of AI model outputs and prompts.",
  },
  {
    company: "VMCoders",
    position: "Web Design and Development",
    duration: "Jan 2024 - July 2024",
    type: "Internship",
    description: "Developed responsive web applications and user interfaces.",
  },
];

const education = [
  {
    institution: "JC Bose University, YMCA",
    degree: "Computer Engineering",
    duration: "2020 - 2024",
    type: "Degree",
    description: "Focused on software engineering, algorithms, and system design.",
  },
];

const TimelineItem = ({ item, index, icon }) => {
  const isEven = index % 2 === 0;

  return (
    <div className={`relative flex items-center justify-between w-full mb-8 ${isEven ? "flex-row-reverse" : ""}`}>
      {/* Spacer for opposite side */}
      <div className="w-5/12" />

      {/* Center Dot */}
      <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center z-10">
        <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4, type: "spring" }}
            className="w-4 h-4 rounded-full bg-accent shadow-[0_0_10px_#00ff99]"
        >
            <div className="absolute inset-0 rounded-full bg-accent/20 animate-pulse"></div>
        </motion.div>
      </div>

      {/* Content Card */}
      <motion.div 
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-5/12"
      >
        <div className="bg-[#18181b] border border-white/10 p-6 md:p-8 rounded-2xl hover:border-accent/50 transition-all duration-300 shadow-lg group relative overflow-hidden">
          {/* Hover Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative z-10 flex flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
                <div className="flex items-center gap-3">
                    <span className="text-2xl text-accent bg-accent/10 p-2 rounded-lg">
                        {icon}
                    </span>
                    <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors">
                        {item.position || item.degree}
                    </h3>
                </div>
                
                {/* Type Badge */}
                {item.type && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/5 text-white/80 border border-white/10">
                        {item.type}
                    </span>
                )}
            </div>

            <div className="flex items-center gap-2 text-accent font-medium text-sm">
                <FiCalendar />
                {item.duration}
            </div>

            <h4 className="text-white/90 font-semibold text-lg">
                {item.company || item.institution}
            </h4>
            
            <p className="text-white/60 text-base leading-relaxed mt-2">
                {item.description}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Timeline = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="timeline" className="py-24 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Section Header */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
        >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">My Journey</h2>
        </motion.div>

        <div ref={containerRef} className="relative">
            {/* Main Vertical Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/10 h-full">
                <motion.div 
                    style={{ height: lineHeight }}
                    className="w-full bg-accent shadow-[0_0_20px_#00ff99]"
                />
            </div>

            <div className="flex flex-col gap-12 pb-12">
                
                {/* Experience Label */}
                <div className="relative flex items-center justify-center z-20 mb-8">
                    <div className="bg-black border border-accent/50 text-accent px-6 py-2 rounded-full font-bold text-sm uppercase tracking-widest shadow-[0_0_15px_rgba(0,255,153,0.3)]">
                        Experience
                    </div>
                </div>

                {/* Experience Section */}
                <div className="space-y-12">
                    {experience.map((item, index) => (
                        <TimelineItem key={`exp-${index}`} item={item} index={index} icon={<FiBriefcase />} />
                    ))}
                </div>

                {/* Education Label */}
                <div className="relative flex items-center justify-center z-20 my-8">
                    <div className="bg-black border border-accent/50 text-accent px-6 py-2 rounded-full font-bold text-sm uppercase tracking-widest shadow-[0_0_15px_rgba(0,255,153,0.3)]">
                        Education
                    </div>
                </div>

                {/* Education Section */}
                <div className="space-y-12">
                    {education.map((item, index) => (
                        <TimelineItem key={`edu-${index}`} item={item} index={index + experience.length} icon={<FiAward />} />
                    ))}
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
