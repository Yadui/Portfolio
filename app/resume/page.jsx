"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  FiDownload,
  FiArrowUpRight,
  FiBriefcase,
  FiUser,
  FiCpu,
  FiFileText,
  FiAward,
} from "react-icons/fi";
import { FaGithub, FaLinkedin } from "react-icons/fa"; // Added FaLinkedin
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
} from "react-icons/si";
import { TbNetwork } from "react-icons/tb";
import { VscJson } from "react-icons/vsc";

// --- DATA (Keep your original data objects) ---

// about data
const about = {
  title: "About me",
  description:
    "I am a passionate software developer and AI enthusiast with a strong foundation in both frontend and backend development. My journey in tech has equipped me with diverse skills in web development, data science, and AI integration.",
  info: [
    { fieldname: "Name", fieldValue: "Abhinav Yadav" },
    { fieldname: "Experience", fieldValue: "1yr" },
    { fieldname: "Nationality", fieldValue: "Indian" },
    { fieldname: "Email", fieldValue: "abhinavyadav8+port@gmail.com" },
    { fieldname: "Freelance", fieldValue: "Available" },
    { fieldname: "Languages", fieldValue: "English, Hindi" },
  ],
};

//education data
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

//experience data
const experience = {
  title: "My Experience",
  description:
    "Through my professional journey, I've gained hands-on experience in various aspects of software development, AI integration, and data engineering.",
  items: [
    {
      company: "Foetron Consulting",
      position: "Data and AI Engineer",
      duration: "Ongoing",
    },
    {
      company: "Outlier AI - Freelance",
      position: "Prompt Engineering & AI Review",
      duration: "Ongoing",
    },
    {
      company: "VMCoders",
      position: "Web Design and Development",
      duration: "Jan 2024 - July 2024",
    },
  ],
};

// skills data
const skills = {
  title: "My skills",
  description:
    "My technical expertise spans multiple domains including software development, data engineering, and AI integration. Here's a comprehensive overview of my skill set.",
  skillList: [
    // IT Skills
    { icon: <SiCplusplus />, name: "C++", category: "IT" },
    { icon: <FaPython />, name: "Python", category: "IT" },
    { icon: <FaDatabase />, name: "DBMS", category: "IT" },
    { icon: <TbNetwork />, name: "Networks", category: "IT" },
    { icon: <SiLeetcode />, name: "DSA", category: "IT" },
    // Dev Skills
    { icon: <FaHtml5 />, name: "HTML/CSS", category: "Dev" },
    { icon: <SiTailwindcss />, name: "Tailwind CSS", category: "Dev" },
    { icon: <FaJs />, name: "JavaScript", category: "Dev" },
    { icon: <FaReact />, name: "React.js", category: "Dev" },
    { icon: <SiNextdotjs />, name: "Next.js", category: "Dev" },
    { icon: <SiFramer />, name: "Framer Motion", category: "Dev" },
    // Data Skills
    { icon: <FaPython />, name: "Python", category: "Data" },
    { icon: <VscJson />, name: "NumPy", category: "Data" },
    { icon: <VscJson />, name: "Pandas", category: "Data" },
    { icon: <SiMicrosoftazure />, name: "Azure", category: "Data" },
    { icon: <FaDatabase />, name: "SQL", category: "Data" },
    // Tools
    { icon: <FaMicrosoft />, name: "MS 365", category: "Tools" },
    { icon: <FaGithub />, name: "Git/GitHub", category: "Tools" },
    { icon: <SiVisualstudiocode />, name: "VS Code", category: "Tools" },
    { icon: <SiVisualstudiocode />, name: "Cursor", category: "Tools" },
    { icon: <SiOpenai />, name: "ChatGPT", category: "Tools" },
    { icon: <SiGithubcopilot />, name: "GitHub Copilot", category: "Tools" },
    { icon: <SiPowerautomate />, name: "Power Apps", category: "Tools" },
    { icon: <SiGithubcopilot />, name: "Copilot Studio", category: "Tools" },
  ],
};

const resumeSections = [
  { value: "experience", label: "Experience", icon: <FiBriefcase /> },
  { value: "education", label: "Education", icon: <FiAward /> },
  { value: "skills", label: "Skills", icon: <FiCpu /> },
  { value: "about", label: "About Me", icon: <FiUser /> },
  { value: "file", label: "Resume File", icon: <FiFileText /> },
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
        type: "spring",
        stiffness: 260,
        damping: 20,
        staggerChildren: 0.1,
      },
    },
  };

  const renderContent = () => {
    if (!isClient) return null;

    return (
      <motion.div
        key={activeTab} // Key changes to re-trigger animation on tab change
        variants={contentVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="w-full h-full p-6 xl:p-8 bg-zinc-900/40 rounded-xl border border-white/10 shadow-lg flex flex-col"
      >
        {activeTab === "experience" && (
          <>
            <div className="flex flex-col gap-2 text-center xl:text-left mb-8">
              <h3 className="text-4xl font-bold">{experience.title}</h3>
              <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                {experience.description}
              </p>
            </div>
            <ScrollArea className="flex-1 max-h-[calc(100%-100px)]">
              {" "}
              {/* Adjusted max-h */}
              <ul className="grid grid-cols-1 gap-6">
                {experience.items.map((item, index) => (
                  <motion.li
                    key={index}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    className="bg-zinc-800/60 p-5 rounded-lg flex items-start gap-5 border border-white/10 transition-all duration-300 hover:border-accent"
                  >
                    <div className="text-accent text-3xl mt-1">
                      <FiBriefcase />
                    </div>
                    <div className="flex-1 flex flex-col gap-1">
                      <p className="text-white/70 text-sm">{item.duration}</p>
                      <h4 className="text-xl font-semibold text-white">
                        {item.position}
                      </h4>
                      <p className="text-white/60">{item.company}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </ScrollArea>
          </>
        )}

        {activeTab === "education" && (
          <>
            <div className="flex flex-col gap-2 text-center xl:text-left mb-8">
              <h3 className="text-4xl font-bold">{education.title}</h3>
              <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                {education.description}
              </p>
            </div>
            <ScrollArea className="flex-1 max-h-[calc(100%-100px)]">
              <ul className="grid grid-cols-1 gap-6">
                {education.items.map((item, index) => (
                  <motion.li
                    key={index}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    className="bg-zinc-800/60 p-5 rounded-lg flex items-start gap-5 border border-white/10 transition-all duration-300 hover:border-accent"
                  >
                    <div className="text-accent text-3xl mt-1">
                      <FiAward />
                    </div>
                    <div className="flex-1 flex flex-col gap-1">
                      <p className="text-white/70 text-sm">{item.duration}</p>
                      <h4 className="text-xl font-semibold text-white">
                        {item.degree}
                      </h4>
                      <p className="text-white/60">{item.institution}</p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </ScrollArea>
          </>
        )}

        {activeTab === "skills" && (
          <>
            <div className="flex flex-col gap-2 text-center xl:text-left mb-8 ">
              <h3 className="text-4xl font-bold">{skills.title}</h3>
              <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                {skills.description}
              </p>
            </div>
            <ScrollArea className="flex-1 max-h-[calc(100%-100px)]">
              <div className="flex flex-col gap-8">
                {["IT", "Dev", "Data", "Tools"].map((category) => (
                  <div key={category}>
                    <h4 className="text-xl font-semibold mb-4 text-white/90">
                      {category}
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                      {skills.skillList
                        .filter((skill) => skill.category === category)
                        .map((skill, index) => (
                          <motion.div
                            key={index}
                            variants={{
                              hidden: { opacity: 0, scale: 0.8 },
                              visible: { opacity: 1, scale: 1 },
                            }}
                            className="group bg-zinc-800/60 p-4 rounded-lg flex flex-col items-center justify-center gap-2 border border-white/10 hover:border-accent transition-all duration-300 cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                          >
                            <div className="text-4xl text-white/80 group-hover:text-accent transition-all duration-300">
                              {skill.icon}
                            </div>
                            <span className="text-sm text-center text-white/70 group-hover:text-white transition-all duration-300">
                              {skill.name}
                            </span>
                          </motion.div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </>
        )}

        {activeTab === "about" && (
          <>
            <div className="flex flex-col gap-2 text-center xl:text-left mb-8">
              <h3 className="text-4xl font-bold">{about.title}</h3>
              <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                {about.description}
              </p>
            </div>
            <ScrollArea className="flex-1 max-h-[calc(100%-100px)]">
              <ul className="grid grid-cols-1 xl:grid-cols-2 gap-y-4 gap-x-8 max-w-[700px] mx-auto xl:mx-0">
                {about.info.map((item, index) => (
                  <motion.li
                    key={index}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    className="flex items-center gap-4 bg-zinc-800/60 p-4 rounded-lg border border-white/10"
                  >
                    <span className="text-white/60 font-medium">
                      {item.fieldname}:
                    </span>
                    <span className="font-semibold text-white">
                      {item.fieldValue}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </ScrollArea>
          </>
        )}

        {activeTab === "file" && (
          <>
            <div className="flex flex-col gap-2 text-center xl:text-left mb-8">
              <h3 className="text-4xl font-bold">My Resume</h3>
              <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                Feel free to download my resume or check out my professional
                profiles.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center xl:justify-start mb-8">
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent/90 text-primary flex items-center gap-2"
              >
                <a
                  href="https://drive.google.com/uc?export=download&id=1n4fiA99cs-kgsVu1q70QPPe6-1Zgb36f"
                  download="Abhinav_Yadav_Resume.pdf"
                >
                  <span>Download Resume</span>
                  <FiDownload className="text-xl" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-accent text-accent hover:bg-accent hover:text-primary flex items-center gap-2"
              >
                <a
                  href="https://www.linkedin.com/in/abhinavyadav8/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>LinkedIn</span>
                  <FaLinkedin className="text-xl" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-accent text-accent hover:bg-accent hover:text-primary flex items-center gap-2"
              >
                <a
                  href="https://github.com/abhinavyadav"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>GitHub</span>
                  <FaGithub className="text-xl" />
                </a>
              </Button>
            </div>
            <div className="relative flex-1 rounded-xl overflow-hidden border border-white/10 shadow-xl">
              <iframe
                src="https://drive.google.com/file/d/1n4fiA99cs-kgsVu1q70QPPe6-1Zgb36f/preview"
                width="100%"
                height="100%"
                style={{ border: "none" }}
                title="Abhinav Yadav's Resume"
                className="absolute inset-0 w-full h-full"
              ></iframe>
            </div>
          </>
        )}
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
      className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row gap-12">
          {/* Navigation */}
          <aside className="flex flex-col w-full xl:w-[380px] shrink-0">
            <h3 className="text-4xl font-bold text-center xl:text-left mb-8">
              Why hire me?
            </h3>
            <div className="flex flex-row xl:flex-col gap-4 overflow-x-auto pb-4 xl:pb-0 hide-scrollbar">
              {resumeSections.map((section) => (
                <button
                  key={section.value}
                  onClick={() => setActiveTab(section.value)}
                  className={`
                    w-full shrink-0 xl:w-full p-4 rounded-lg flex items-center justify-start gap-4 transition-all duration-300
                    ${
                      activeTab === section.value
                        ? "bg-accent text-primary shadow-lg"
                        : "bg-zinc-800/50 hover:bg-zinc-700/50 border border-white/10 text-white/80 hover:text-white"
                    }
                  `}
                >
                  <span className="text-2xl">{section.icon}</span>
                  <span className="font-medium">{section.label}</span>
                </button>
              ))}
            </div>
          </aside>

          {/* Content */}
          <main className="flex-1 min-h-[70vh] flex">
            <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
          </main>
        </div>
      </div>
    </motion.div>
  );
};

export default Resume;
