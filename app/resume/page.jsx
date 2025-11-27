"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  FiDownload,
  FiBriefcase,
  FiUser,
  FiCpu,
  FiAward,
} from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import {
  FaHtml5,
  FaCss3,
  FaJs,
  FaReact,
  FaPython,
  FaDatabase,
  FaMicrosoft,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiNextdotjs,
  SiFramer,
  SiCplusplus,
  SiVisualstudiocode,
  SiMicrosoftazure,
  SiPowerautomate,
  SiGithubcopilot,
  SiLeetcode,
  SiOpenai,
  SiNumpy,
  SiPandas,
} from "react-icons/si";
import { TbNetwork } from "react-icons/tb";
import { VscJson } from "react-icons/vsc";


// --- DATA ---
const about = {
  title: "About me",
  description:
    "I am a passionate software developer and AI enthusiast with a strong foundation in both frontend and backend development. My journey in tech has equipped me with diverse skills in web development, data science, and AI integration.",
  info: [
    { fieldname: "Name", fieldValue: "Abhinav Yadav" },
    { fieldname: "Experience", fieldValue: "1+ Years" },
    { fieldname: "Nationality", fieldValue: "Indian" },
    { fieldname: "Email", fieldValue: "abhinavyadav8+port@gmail.com" },
    { fieldname: "Freelance", fieldValue: "Available" },
    { fieldname: "Languages", fieldValue: "English, Hindi" },
  ],
};

const education = {
  title: "My Education",
  description:
    "My academic journey has provided me with a strong foundation in computer engineering, focusing on both theoretical knowledge and practical applications.",
  items: [
    {
      institution: "JC Bose University, YMCA",
      degree: "Computer Engineering",
      duration: "2020 - 2024",
    },
  ],
};

const experience = {
  title: "My Experience",
  description:
    "Through my professional journey, I've gained hands-on experience in various aspects of software development, AI integration, and data engineering.",
  items: [
    {
      company: "Foetron Consulting",
      position: "Data and AI Engineer",
      duration: "Present",
    },
    {
      company: "Outlier AI",
      position: "Prompt Engineering & AI Review",
      duration: "Freelance",
    },
    {
      company: "VMCoders",
      position: "Web Design and Development",
      duration: "Jan 2024 - July 2024",
    },
  ],
};


const skills = {
  title: "My Skills",
  description:
    "My technical expertise spans multiple domains including software development, data engineering, and AI integration.",
  skillList: [
    // IT Skills
    { icon: <SiCplusplus />, name: "C++", category: "IT", color: "#00599C" },
    { icon: <FaPython />, name: "Python", category: "IT", color: "#3776AB" },
    { icon: <FaDatabase />, name: "DBMS", category: "IT" },
    { icon: <TbNetwork />, name: "Networks", category: "IT" },
    { icon: <SiLeetcode />, name: "DSA", category: "IT", color: "#FFA116" },
    // Dev Skills
    { icon: <FaHtml5 />, name: "HTML/CSS", category: "Dev", color: "#E34F26" },
    { icon: <SiTailwindcss />, name: "Tailwind CSS", category: "Dev", color: "#06B6D4" },
    { icon: <FaJs />, name: "JavaScript", category: "Dev", color: "#F7DF1E" },
    { icon: <FaReact />, name: "React.js", category: "Dev", color: "#61DAFB" },
    { icon: <SiNextdotjs />, name: "Next.js", category: "Dev", color: "#FFFFFF" },
    { icon: <SiFramer />, name: "Framer Motion", category: "Dev", color: "#FFFFFF" },
    // Data Skills
    { icon: <FaPython />, name: "Python", category: "Data", color: "#3776AB" },
    { icon: <SiNumpy />, name: "NumPy", category: "Data", color: "#4DABCF" },
    { icon: <SiPandas />, name: "Pandas", category: "Data", color: "#FFFFFF" },
    { icon: <SiMicrosoftazure />, name: "Azure", category: "Data", color: "#0078D4" },
    { icon: <FaDatabase />, name: "SQL", category: "Data" },
    // Tools
    { icon: <Image src="/icons/PowerBI_scalable.svg" alt="Power BI" width={40} height={40} className="object-contain" />, name: "Power BI", category: "Tools", color: "#FFFFFF" },
    { icon: <FaGithub />, name: "Git/GitHub", category: "Tools", color: "#FFFFFF" },
    { icon: <SiVisualstudiocode />, name: "VS Code", category: "Tools", color: "#007ACC" },
    { icon: <Image src="/icons/AVATAR_CIRCLE_LIGHT.png" alt="Cursor" width={100} height={100} className="object-contain" />, name: "Cursor", category: "Tools", color: "#FFFFFF" },
    { icon: <SiOpenai />, name: "ChatGPT", category: "Tools", color: "#74AA9C" },
    { icon: <SiGithubcopilot />, name: "GitHub Copilot", category: "Tools", color: "#FFFFFF" },
    { icon: <SiPowerautomate />, name: "Power Apps", category: "Tools", color: "#742774" },
    { icon: <Image src="/icons/CopilotStudio_scalable.svg" alt="Copilot Studio" width={40} height={40} className="object-contain" />, name: "Copilot Studio", category: "Tools", color: "#FFFFFF" },
  ],
};

const resumeSections = [
  { value: "experience", label: "Experience", icon: <FiBriefcase /> },
  { value: "education", label: "Education", icon: <FiAward /> },
  { value: "skills", label: "Skills", icon: <FiCpu /> },
  { value: "about", label: "About Me", icon: <FiUser /> },
];


const Resume = () => {
  const [activeTab, setActiveTab] = useState("experience");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const renderContent = () => {
    if (!isClient) return null;

    return (
      <motion.div
        key={activeTab}
        variants={contentVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="w-full min-h-[600px]"
      >
        {activeTab === "experience" && (
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2 text-center xl:text-left">
              <h3 className="text-4xl font-bold text-white">{experience.title}</h3>
              <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                {experience.description}
              </p>
            </div>
            <ScrollArea className="h-[520px]">
              <ul className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {experience.items.map((item, index) => (
                  <li
                    key={index}
                    className="bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1 border border-white/5 hover:border-accent transition-all duration-300 shadow-lg"
                  >
                    <span className="text-accent">{item.duration}</span>
                    <h3 className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left font-bold text-white">
                      {item.position}
                    </h3>
                    <div className="flex items-center gap-3">
                      <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                      <p className="text-white/60">{item.company}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </div>
        )}

        {activeTab === "education" && (
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2 text-center xl:text-left">
              <h3 className="text-4xl font-bold text-white">{education.title}</h3>
              <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                {education.description}
              </p>
            </div>
            <ScrollArea className="h-[520px]">
              <ul className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {education.items.map((item, index) => (
                  <li
                    key={index}
                    className="bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1 border border-white/5 hover:border-accent transition-all duration-300 shadow-lg"
                  >
                    <span className="text-accent">{item.duration}</span>
                    <h3 className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left font-bold text-white">
                      {item.degree}
                    </h3>
                    <div className="flex items-center gap-3">
                      <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                      <p className="text-white/60">{item.institution}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </div>
        )}

        {activeTab === "skills" && (
          <div className="flex flex-col gap-8 h-full">
            <div className="relative flex h-[800px] w-full flex-col items-center justify-center overflow-hidden">
                <TooltipProvider>
                  {/* Inner Orbit: IT */}
                  <OrbitingCircles className="size-[30px] border-none bg-transparent" duration={20} delay={20} radius={70}>
                      {skills.skillList.filter(skill => skill.category === "IT").map((skill, index) => (
                        <Tooltip key={index}>
                          <TooltipTrigger className="text-3xl transition-colors text-accent" style={{ color: skill.color }}>{skill.icon}</TooltipTrigger>
                          <TooltipContent>{skill.name}</TooltipContent>
                        </Tooltip>
                      ))}
                  </OrbitingCircles>

                  {/* Middle Orbit 1: Dev */}
                  <OrbitingCircles className="size-[40px] border-none bg-transparent" radius={140} duration={30} reverse>
                      {skills.skillList.filter(skill => skill.category === "Dev").map((skill, index) => (
                        <Tooltip key={index}>
                          <TooltipTrigger className="text-4xl transition-colors text-accent" style={{ color: skill.color }}>{skill.icon}</TooltipTrigger>
                          <TooltipContent>{skill.name}</TooltipContent>
                        </Tooltip>
                      ))}
                  </OrbitingCircles>

                   {/* Middle Orbit 2: Data */}
                   <OrbitingCircles className="size-[45px] border-none bg-transparent" radius={210} duration={35}>
                      {skills.skillList.filter(skill => skill.category === "Data").map((skill, index) => (
                        <Tooltip key={index}>
                          <TooltipTrigger className="text-4xl transition-colors text-accent" style={{ color: skill.color }}>{skill.icon}</TooltipTrigger>
                          <TooltipContent>{skill.name}</TooltipContent>
                        </Tooltip>
                      ))}
                  </OrbitingCircles>

                   {/* Outer Orbit: Tools */}
                  <OrbitingCircles className="size-[50px] border-none bg-transparent" radius={280} duration={40} reverse>
                      {skills.skillList.filter(skill => skill.category === "Tools").map((skill, index) => (
                        <Tooltip key={index}>
                          <TooltipTrigger className="text-5xl transition-colors text-accent" style={{ color: skill.color }}>{skill.icon}</TooltipTrigger>
                          <TooltipContent>{skill.name}</TooltipContent>
                        </Tooltip>
                      ))}
                  </OrbitingCircles>
                </TooltipProvider>
            </div>
          </div>
        )}

        {activeTab === "about" && (
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2 text-center xl:text-left">
              <h3 className="text-4xl font-bold text-white">{about.title}</h3>
              <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                {about.description}
              </p>
            </div>
            <ul className="grid grid-cols-1 xl:grid-cols-2 gap-y-6 max-w-[620px] mx-auto xl:mx-0">
              {about.info.map((item, index) => (
                <li key={index} className="flex items-center justify-center xl:justify-start gap-4">
                  <span className="text-white/60">{item.fieldname}</span>
                  <span className="text-xl font-bold text-white">{item.fieldValue}</span>
                </li>
              ))}
            </ul>
             <div className="flex flex-col gap-4 mt-4">
                <div className="flex flex-col sm:flex-row gap-4 justify-center xl:justify-start">
                    <Button
                        asChild
                        size="lg"
                        className="uppercase flex items-center gap-2 bg-accent text-primary hover:bg-accent/90 transition-all duration-300"
                    >
                        <a
                        href="https://docs.google.com/document/d/1AdOwjtfyZGP8NImdYoWigDVsk14vhPl4/edit?usp=sharing&ouid=102577994594751216788&rtpof=true&sd=true"
                        download="Abhinav_Yadav_CV.pdf"
                        >
                        <span>Download CV</span>
                        <FiDownload className="text-xl" />
                        </a>
                    </Button>
                    <div className="flex gap-4 justify-center xl:justify-start">
                        <a href="https://www.linkedin.com/in/abhinavyadav88" target="_blank" className="w-12 h-12 bg-[#232329] text-accent rounded-full flex justify-center items-center hover:bg-accent hover:text-primary transition-all duration-300 border border-white/5 hover:border-accent">
                            <FaLinkedin className="text-xl" />
                        </a>
                        <a href="https://github.com/Yadui" target="_blank" className="w-12 h-12 bg-[#232329] text-accent rounded-full flex justify-center items-center hover:bg-accent hover:text-primary transition-all duration-300 border border-white/5 hover:border-accent">
                            <FaGithub className="text-xl" />
                        </a>
                    </div>
                </div>
            </div>
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0, duration: 0.4, ease: "easeIn" },
      }}
      className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0"
    >
      <div className="container mx-auto">
        <div className={`flex flex-col xl:flex-row gap-[60px] ${activeTab === "skills" ? "xl:items-center" : ""}`}>
          <div className="flex flex-col w-full max-w-[380px] mx-auto xl:mx-0 gap-6">
            <h3 className="text-4xl font-bold text-white text-center xl:text-left">Why hire me?</h3>
            <p className="text-white/60 text-center xl:text-left">
                I deliver high-quality code, scalable solutions, and innovative AI integrations.
            </p>
            <div className="flex flex-col gap-4">
                {resumeSections.map((section) => (
                    <button
                        key={section.value}
                        onClick={() => setActiveTab(section.value)}
                        className={`p-4 rounded-xl flex items-center gap-3 text-lg font-medium transition-all duration-300 border ${activeTab === section.value ? "bg-accent text-primary border-accent font-bold shadow-lg scale-105" : "bg-[#232329] text-white/60 border-white/5 hover:bg-[#2e2e36] hover:text-white"}`}
                    >
                        <span className="text-2xl">{section.icon}</span>
                        {section.label}
                    </button>
                ))}
            </div>
          </div>

          <div className="w-full h-full">
            <AnimatePresence mode="wait">
                {renderContent()}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Resume;
