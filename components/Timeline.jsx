"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiBriefcase, FiAward, FiCalendar, FiPlus, FiArrowDownRight } from "react-icons/fi";
import WorkDetailModal from "./WorkDetailModal";
import { workDetails } from "@/data/workDetails";

const experience = [
  {
    company: "Foetron",
    slug: "foetron",
    position: "Cloud and AI Engineer",
    duration: "Sep 2024 - Present",
    type: "Full-Time",
    description: "Cloud & AI Engineer — architected Azure infrastructure, built AI pipelines, and led hybrid-cloud deployments.",
    skills: "Microsoft Azure, Azure OpenAI, Azure Cognitive Services, Data Engineering, SQL Server, Sophos Firewall"
  },
  {
    company: "Outlier",
    slug: "outlier",
    position: "Prompt Engineer",
    duration: "Jun 2024 - Present",
    type: "Freelance",
    description: "Prompt Engineer — designed multi-modal AI prompts for Google Genesis project (VTT, ATT, ITT).",
    skills: "Prompt Engineering, Prompt Design, Multi-modal AI, NLP, Conversational AI, Machine Learning"
  },
  {
    company: "Vm Coders",
    slug: "vmcoders",
    position: "Frontend Developer",
    duration: "Jan 2024 - Jun 2024",
    type: "Internship",
    description: "Frontend Developer — built marketing websites with React, TailwindCSS, and Figma designs.",
    skills: "ReactJS, TailwindCSS, Figma, Web Design, SEO, Responsive Design, JavaScript"
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

const TimelineLabel = ({ title, containerRef, scrollYProgress, className = "" }) => {
  const labelRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const calculateThreshold = () => {
      if (!labelRef.current || !containerRef.current) return 0;
      const labelRect = labelRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      
      // Calculate position relative to container top
      const relativeTop = labelRect.top - containerRect.top;
      // Trigger when line reaches the center of the label
      const threshold = (relativeTop + labelRect.height / 2) / containerRect.height;
      return threshold;
    };

    let threshold = calculateThreshold();

    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (typeof threshold === "number") {
        setIsActive(latest >= threshold);
      }
    });

    const handleResize = () => {
      threshold = calculateThreshold();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      unsubscribe();
      window.removeEventListener("resize", handleResize);
    };
  }, [containerRef, scrollYProgress]);

  return (
    <div ref={labelRef} className={`relative flex items-center justify-center z-20 ${className}`}>
      <motion.div
        animate={{
          boxShadow: isActive ? "0 0 20px rgba(0,255,153,0.5)" : "none",
          scale: isActive ? 1.1 : 1,
        }}
        transition={{ duration: 0.3 }}
        className="bg-black border border-accent text-accent px-6 py-2 rounded-full font-bold text-sm uppercase tracking-widest transition-all duration-300"
      >
        {title}
      </motion.div>
    </div>
  );
};

const TimelineItem = ({ item, index, icon, containerRef, scrollYProgress, onOpenModal }) => {
  const isEven = index % 2 === 0;
  const itemRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const calculateThreshold = () => {
      if (!itemRef.current || !containerRef.current) return 0;
      const itemRect = itemRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      
      const relativeTop = itemRect.top - containerRect.top;
      const threshold = (relativeTop + itemRect.height / 2) / containerRect.height;
      return threshold;
    };

    let threshold = calculateThreshold();

    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (typeof threshold === "number") {
        setIsActive(latest >= threshold);
      }
    });

    const handleResize = () => {
      threshold = calculateThreshold();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      unsubscribe();
      window.removeEventListener("resize", handleResize);
    };
  }, [containerRef, scrollYProgress]);

  return (
    <div 
        ref={itemRef} 
        className={`relative flex items-center justify-between w-full mb-8 ${isEven ? "flex-row-reverse" : ""}`}
    >
      {/* Spacer for opposite side */}
      <div className="w-5/12" />

      {/* Center Dot */}
      <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center z-10">
        <motion.div 
            animate={{
                boxShadow: isActive ? "0 0 15px #00ff99" : "none",
            }}
            transition={{ duration: 0.4 }}
            className="w-4 h-4 rounded-full bg-accent"
            style={{ backgroundColor: '#00ff99' }}
        >
            {isActive && <div className="absolute -inset-2 rounded-full bg-accent/20 animate-pulse"></div>}
        </motion.div>
      </div>

      {/* Content Card */}
      <motion.div 
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-5/12 relative"
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
            
            {/* One-line Description */}
            <p className="text-white/60 text-base leading-relaxed mt-2">
                {item.description}
            </p>

            {item.skills && (
                <div className="mt-3 pt-3 border-t border-white/5">
                    <div className="flex flex-wrap gap-2">
                        {item.skills.split(', ').map((skill, idx) => (
                            <span 
                                key={idx}
                                className="px-2.5 py-1 bg-accent/10 border border-accent/30 rounded-md text-accent text-xs font-medium"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* View Full Work Button */}
            {item.slug && (
                <button 
                    onClick={() => onOpenModal(item.slug)}
                    className="mt-4 inline-flex items-center gap-2 text-accent hover:text-white text-sm font-semibold group/link transition-colors"
                >
                    View full work
                    <FiArrowDownRight className="group-hover/link:translate-x-0.5 group-hover/link:translate-y-0.5 transition-transform" />
                </button>
            )}
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
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);

  const handleOpenModal = (slug) => {
    const work = workDetails[slug];
    if (work) {
      setSelectedWork(work);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedWork(null), 300); // Clear after animation
  };

  return (
    <>
      <section id="timeline" className="py-24 bg-black relative z-20">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* Section Header */}
          <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="sticky top-0 z-30 flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm py-10 mb-10 origin-top"
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
                  <TimelineLabel 
                      title="Experience" 
                      containerRef={containerRef} 
                      scrollYProgress={scrollYProgress} 
                      className="mb-8"
                  />

                  {/* Experience Section */}
                  <div className="space-y-12">
                      {experience.map((item, index) => (
                          <TimelineItem 
                              key={`exp-${index}`} 
                              item={item} 
                              index={index} 
                              icon={<FiBriefcase />} 
                              containerRef={containerRef}
                              scrollYProgress={scrollYProgress}
                              onOpenModal={handleOpenModal}
                          />
                      ))}
                  </div>

                  {/* Education Label */}
                  <TimelineLabel 
                      title="Education" 
                      containerRef={containerRef} 
                      scrollYProgress={scrollYProgress} 
                      className="my-8"
                  />

                  {/* Education Section */}
                  <div className="space-y-12">
                      {education.map((item, index) => (
                          <TimelineItem 
                              key={`edu-${index}`} 
                              item={item} 
                              index={index + experience.length} 
                              icon={<FiAward />} 
                              containerRef={containerRef}
                              scrollYProgress={scrollYProgress}
                              onOpenModal={handleOpenModal}
                          />
                      ))}
                  </div>
              </div>
          </div>
        </div>
      </section>

      {/* Work Detail Modal */}
      <WorkDetailModal 
        work={selectedWork}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default Timeline;
