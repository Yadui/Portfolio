"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiBriefcase, FiAward, FiCalendar } from "react-icons/fi";

const experience = [
  {
    company: "Foetron",
    position: "Cloud and AI Engineer",
    duration: "Sep 2024 - Present",
    type: "Full-Time",
    description: [
      "Manage full Azure cloud infrastructure for own company, including 15+ VMs, storage, web apps, and AI services (OpenAI, Fabric, Foundry), ensuring secure, scalable, and cost-optimized deployments.",
      "Designed hybrid cloud architectures for clients, including site-to-site VPNs (Blob ↔ NAS via Sophos Firewall), SQL backup pipelines (on-prem → Blob), and licensed Active Directory setups, enhancing data continuity and identity management.",
      "Sized and provisioned Azure environments tailored to client workloads, using on-prem benchmarks and future growth projections to optimize cost-performance.",
      "Built AI-driven solutions using Azure Cognitive Services for call sentiment analysis and multilingual meeting video translation, enabling Indian language localization and scalable insights.",
      "Automated workshop data processing workflows, improving reporting efficiency by 20% and reducing manual attendee tracking effort across engagements.",
      "Led CRM migrations, data cleanup, and BOQ generation for 10+ SMBs and enterprises transitioning to cloud.",
      "Conducted technical R&D and POCs for Azure Face API attendance systems, multilingual media translation pipelines, and CMS/platform transitions (WordPress, Joomla).",
      "Resolved critical platform issues, including Azure E5 license misconfigurations and Tally accounting system troubleshooting.",
      "Participated in client workshops, Microsoft PRTs, and technical reviews, contributing to architecture design, onboarding, and cloud migration support."
    ],
    skills: "Data Engineering, Microsoft Azure, +3 skills"
  },
  {
    company: "Outlier",
    position: "Prompt Engineer",
    duration: "Jun 2024 - Present",
    type: "Freelance",
    description: [
      "Contributed to Google's Genesis project, focusing on multi-modal AI tools: Video-to-Text (VTT), Audio-to-Text (ATT), and Image-to-Text (ITT).",
      "Designed and refined AI prompts to enhance accuracy, coherence, and contextual relevance across diverse applications.",
      "Led iterative prompt testing cycles to optimize AI-generated outputs and improve response quality.",
      "Partnered with cross-functional teams to seamlessly integrate AI-driven features into end-user applications.",
      "Applied advanced prompting techniques to tailor model behavior for task-specific performance improvements.",
      "Created dynamic, context-sensitive prompts to support sophisticated conversational logic in chatbots and virtual assistants."
    ],
    skills: "Prompt Design, Prompt Engineering, +3 skills"
  },
  {
    company: "Vm Coders",
    position: "Frontend Developer",
    duration: "Jan 2024 - Jun 2024",
    type: "Internship",
    description: [
      "Developed website for digital marketing in ReactJS with TailwindCSS and design templates created in Figma.",
      "Deployed site has adopted design elements from the final design report submitted by me.",
      "Created a profile generator where user can generate their portfolio."
    ],
    skills: "SEO, Web Design, +4 skills"
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

const TimelineItem = ({ item, index, icon, containerRef, scrollYProgress }) => {
  const isEven = index % 2 === 0;
  const itemRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={{
            width: isHovered ? "55%" : "41.666667%", // 5/12 is ~41.66%
            zIndex: isHovered ? 50 : 10
        }}
        className="relative"
      >
        <div className="bg-[#18181b] border border-white/10 p-6 md:p-8 rounded-2xl hover:border-accent/50 transition-all duration-300 shadow-lg group relative overflow-hidden h-full">
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
            
            {/* Expandable Content */}
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                    height: isHovered ? "auto" : 0,
                    opacity: isHovered ? 1 : 0,
                    marginTop: isHovered ? 16 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
            >
                {Array.isArray(item.description) ? (
                    <ul className="list-disc list-outside ml-4 space-y-1">
                        {item.description.map((desc, i) => (
                            <li key={i} className="text-white/60 text-base leading-relaxed">
                                {desc}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-white/60 text-base leading-relaxed">
                        {item.description}
                    </p>
                )}

                {item.skills && (
                    <div className="mt-4 pt-3 border-t border-white/5">
                        <p className="text-accent text-sm font-medium">
                            {item.skills}
                        </p>
                    </div>
                )}
            </motion.div>
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
                        />
                    ))}
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
