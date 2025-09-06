"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";

// Icons
import { FiDownload, FiChevronDown, FiChevronUp } from "react-icons/fi";
import {
  FaHtml5,
  FaCss3,
  FaJs,
  FaReact,
  FaGithub,
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
} from "react-icons/si";
import { TbBrandCursor, TbNetwork } from "react-icons/tb";
import { GrNetwork } from "react-icons/gr";
import { VscJson } from "react-icons/vsc";
import { SiLeetcode, SiOpenai } from "react-icons/si";

// about data
const about = {
  title: "About me",
  description:
    "I am a passionate software developer and AI enthusiast with a strong foundation in both frontend and backend development. My journey in tech has equipped me with diverse skills in web development, data science, and AI integration.",
  info: [
    {
      fieldname: "Name",
      fieldValue: "Abhinav Yadav",
    },

    {
      fieldname: "Experience",
      fieldValue: "1yr",
    },
    {
      fieldname: "Nationality",
      fieldValue: "Indian",
    },
    {
      fieldname: "Email",
      fieldValue: "abhinavyadav8+port@gmail.com",
    },
    {
      fieldname: "Freelance",
      fieldValue: "Available",
    },
    {
      fieldname: "Languages",
      fieldValue: "English, Hindi",
    },
  ],
};

//education data
const education = {
  title: "My Education",
  description:
    "My academic journey has provided me with a strong foundation in computer engineering, focusing on both theoretical knowledge and practical applications.",
  items: [
    {
      institution: "JC bose uni, YMCA",
      degree: "Computer engineering",
      duration: "2020-24",
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
      position: "Data and AI engineer",
      duration: "Ongoing",
    },
    {
      company: "Outlier AI - freelancing",
      position: "Prompt engineering and AI review",
      duration: "Ongoing",
    },
    {
      company: "VMCoders",
      position: "Web design and development",
      duration: "Jan'24-July'24",
    },
  ],
};

const colorMap = {
  html: "#E44D26",
  css: "#1572B6",
  javascript: "#f5b60a",
  react: "#61DBFB",
  python: "#3776AB",
  cpp: "#00599C",
  azure: "#0078D4",
  vscode: "#007ACC",
  cursor: "#000000",
  nextjs: "#000000",
  tailwind: "#38BDF8",
  framer: "#DD0031",
  database: "#336791",
  network: "#4B5563",
  microsoft: "#00A4EF",
  leetcode: "#FFA116",
  openai: "#00A67E",
  copilot: "#000000",
  powerapps: "#742774",
  copilotStudio: "#0078D4",
};

//skills data
const skills = {
  title: "My skills",
  description:
    "My technical expertise spans across multiple domains including software development, data engineering, and AI integration. Here's a comprehensive overview of my skill set.",
  skillList: [
    // IT Skills
    {
      iconName: "SiCplusplus",
      name: "C++",
      bgHoverColor: colorMap.cpp,
      category: "IT",
    },
    {
      iconName: "FaPython",
      name: "Python",
      bgHoverColor: colorMap.python,
      category: "IT",
    },
    {
      iconName: "FaDatabase",
      name: "DBMS",
      bgHoverColor: colorMap.database,
      category: "IT",
    },
    {
      iconName: "TbNetwork",
      name: "Networks",
      bgHoverColor: colorMap.network,
      category: "IT",
    },
    {
      iconName: "SiLeetcode",
      name: "DSA",
      bgHoverColor: colorMap.leetcode,
      category: "IT",
    },
    // Dev Skills
    {
      iconName: "FaHtml5",
      name: "HTML/CSS",
      bgHoverColor: colorMap.html,
      category: "Dev",
    },
    {
      iconName: "SiTailwindcss",
      name: "Tailwind CSS",
      bgHoverColor: colorMap.tailwind,
      category: "Dev",
    },
    {
      iconName: "FaJs",
      name: "JavaScript",
      bgHoverColor: colorMap.javascript,
      category: "Dev",
    },
    {
      iconName: "FaReact",
      name: "React",
      bgHoverColor: colorMap.react,
      category: "Dev",
    },
    {
      iconName: "SiNextdotjs",
      name: "Next.js",
      bgHoverColor: colorMap.nextjs,
      category: "Dev",
    },
    {
      iconName: "SiFramer",
      name: "Framer",
      bgHoverColor: colorMap.framer,
      category: "Dev",
    },
    // Data Skills
    {
      iconName: "FaPython",
      name: "Python",
      bgHoverColor: colorMap.python,
      category: "Data",
    },
    {
      iconName: "VscJson",
      name: "NumPy",
      bgHoverColor: colorMap.javascript,
      category: "Data",
    },
    {
      iconName: "VscJson",
      name: "Pandas",
      bgHoverColor: colorMap.javascript,
      category: "Data",
    },
    {
      iconName: "SiMicrosoftazure",
      name: "Azure",
      bgHoverColor: colorMap.azure,
      category: "Data",
    },
    {
      iconName: "FaDatabase",
      name: "SQL",
      bgHoverColor: colorMap.database,
      category: "Data",
    },
    // Tools
    {
      iconName: "FaMicrosoft",
      name: "MS 365",
      bgHoverColor: colorMap.microsoft,
      category: "Tools",
    },
    {
      iconName: "FaGithub",
      name: "Git/GitHub",
      bgHoverColor: colorMap.nextjs,
      category: "Tools",
    },
    {
      iconName: "SiVisualstudiocode",
      name: "VS Code",
      bgHoverColor: colorMap.vscode,
      category: "Tools",
    },
    {
      iconName: "TbBrandCursor",
      name: "Cursor",
      bgHoverColor: colorMap.cursor,
      category: "Tools",
    },
    {
      iconName: "SiOpenai",
      name: "ChatGPT",
      bgHoverColor: colorMap.openai,
      category: "Tools",
    },
    {
      iconName: "SiGithubcopilot",
      name: "GitHub Copilot",
      bgHoverColor: colorMap.copilot,
      category: "Tools",
    },
    {
      iconName: "SiPowerautomate",
      name: "Power Apps",
      bgHoverColor: colorMap.powerapps,
      category: "Tools",
    },
    {
      iconName: "SiGithubcopilot",
      name: "Copilot Studio",
      bgHoverColor: colorMap.copilotStudio,
      category: "Tools",
    },
  ],
};

const Resume = () => {
  const [isClient, setIsClient] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("experience");

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  // Function to handle tab changes
  const handleTabChange = (value) => {
    setActiveTab(value);
    setIsMenuOpen(false);
  };

  const getIcon = (iconName) => {
    const icons = {
      SiCplusplus,
      FaPython,
      FaDatabase,
      TbNetwork,
      SiLeetcode,
      FaHtml5,
      SiTailwindcss,
      FaJs,
      FaReact,
      SiNextdotjs,
      SiFramer,
      SiMicrosoftazure,
      FaMicrosoft,
      FaGithub,
      SiVisualstudiocode,
      TbBrandCursor,
      SiOpenai,
      SiGithubcopilot,
      VscJson,
      SiPowerautomate,
    };
    const IconComponent = icons[iconName];
    return IconComponent ? <IconComponent className="w-8 h-8" /> : null;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
      className="min-h-[80vh] flex items-center justify-center py-12"
      suppressHydrationWarning
    >
      <div className="container mx-auto">
        <Tabs
          defaultValue="experience"
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex flex-col xl:flex-row gap-[60px]"
        >
          {/* Mobile dropdown for sm screens */}
          <div className="xl:hidden w-full mb-8">
            <div className="mb-4">
              <h3 className="text-3xl font-bold text-left">Why hire me?</h3>
              <p className="text-white/70 mt-2">
                Check out my details, maybe you will find something interesting!
              </p>
            </div>

            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center justify-between w-full bg-[#232329] p-4 rounded-xl text-white"
              >
                <span className="text-lg font-medium">
                  {activeTab === "experience" && "Experience"}
                  {activeTab === "education" && "Education"}
                  {activeTab === "skills" && "Skills"}
                  {activeTab === "about" && "About me"}
                  {activeTab === "file" && "Resume File"}
                </span>
                {isMenuOpen ? (
                  <FiChevronUp className="text-xl" />
                ) : (
                  <FiChevronDown className="text-xl" />
                )}
              </button>

              {isMenuOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#1c1c21] p-4 rounded-xl z-10 shadow-lg border border-[#232329]">
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => handleTabChange("experience")}
                      className={`text-left p-2 hover:bg-[#232329] rounded transition-colors ${
                        activeTab === "experience"
                          ? "bg-[#232329] text-accent"
                          : ""
                      }`}
                    >
                      Experience
                    </button>
                    <button
                      onClick={() => handleTabChange("education")}
                      className={`text-left p-2 hover:bg-[#232329] rounded transition-colors ${
                        activeTab === "education"
                          ? "bg-[#232329] text-accent"
                          : ""
                      }`}
                    >
                      Education
                    </button>
                    <button
                      onClick={() => handleTabChange("skills")}
                      className={`text-left p-2 hover:bg-[#232329] rounded transition-colors ${
                        activeTab === "skills" ? "bg-[#232329] text-accent" : ""
                      }`}
                    >
                      Skills
                    </button>
                    <button
                      onClick={() => handleTabChange("about")}
                      className={`text-left p-2 hover:bg-[#232329] rounded transition-colors ${
                        activeTab === "about" ? "bg-[#232329] text-accent" : ""
                      }`}
                    >
                      About me
                    </button>
                    <button
                      onClick={() => handleTabChange("file")}
                      className={`text-left p-2 hover:bg-[#232329] rounded transition-colors ${
                        activeTab === "file" ? "bg-[#232329] text-accent" : ""
                      }`}
                    >
                      Resume File
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Desktop TabsList - hide on small screens */}
          <TabsList className="hidden xl:flex flex-col w-full max-w-[380px] mx-auto xl:mx-0 gap-6 text-white">
            <div className="flex flex-col gap-8">
              <h3 className="text-5xl text-left"> Why hire me?</h3>
              <p>Check out my deta im abhinav</p>
            </div>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="about">About me</TabsTrigger>
            <TabsTrigger value="file">Resume File</TabsTrigger>
          </TabsList>

          {/* content */}
          <div className="min-h-[70vh] w-full flex flex-col xl:flex-row gap-[60px]">
            <div className="flex-1 flex flex-col gap-8 w-full items-center xl:items-start">
              {/* experience */}
              <TabsContent value="experience" className="w-full">
                {isClient && (
                  <div className="flex flex-col gap-8 w-full">
                    {/* Title and Description */}
                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.5 }}
                      variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.6, ease: "easeOut" },
                        },
                      }}
                      className="flex flex-col gap-4 text-center xl:text-left"
                    >
                      <h3 className="text-4xl font-bold">{experience.title}</h3>
                      <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                        {experience.description}
                      </p>
                    </motion.div>

                    <ScrollArea className="h-[400px] w-full">
                      <motion.ul
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={{
                          hidden: {},
                          visible: {
                            transition: {
                              staggerChildren: 0.1,
                            },
                          },
                        }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                      >
                        {experience.items.map((item, index) => (
                          <motion.li
                            key={index}
                            variants={{
                              hidden: { opacity: 0, scale: 0.8 },
                              visible: {
                                opacity: 1,
                                scale: 1,
                                transition: { duration: 0.4, ease: "easeOut" },
                              },
                            }}
                            className="bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-start gap-2"
                          >
                            <span className="text-accent">{item.duration}</span>
                            <h3 className="text-xl max-w-[260px] min-h-[60px] text-left">
                              {item.position}
                            </h3>
                            <div className="flex items-center gap-3">
                              <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                              <p className="text-white/60">{item.company}</p>
                            </div>
                          </motion.li>
                        ))}
                      </motion.ul>
                    </ScrollArea>
                  </div>
                )}
              </TabsContent>

              {/* Education */}
              <TabsContent value="education" className="w-full">
                {isClient && (
                  <div className="flex flex-col gap-8 w-full">
                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.5 }}
                      variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.6, ease: "easeOut" },
                        },
                      }}
                      className="flex flex-col gap-4 text-center xl:text-left"
                    >
                      <h3 className="text-4xl font-bold">{education.title}</h3>
                      <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                        {education.description}
                      </p>
                    </motion.div>
                    <ScrollArea className="h-[400px] w-full">
                      <motion.ul
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={{
                          hidden: {},
                          visible: {
                            transition: {
                              staggerChildren: 0.1, // Stagger child animations
                            },
                          },
                        }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                      >
                        {education.items.map((item, index) => (
                          <motion.li
                            key={index}
                            variants={{
                              hidden: { opacity: 0, scale: 0.8 },
                              visible: {
                                opacity: 1,
                                scale: 1,
                                transition: { duration: 0.4, ease: "easeOut" },
                              },
                            }}
                            className="bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-start gap-2"
                          >
                            <span className="text-accent">{item.duration}</span>
                            <h3 className="text-xl max-w-[260px] min-h-[60px] text-left">
                              {item.degree}
                            </h3>
                            <div className="flex items-center gap-3">
                              <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                              <p className="text-white/60"> {item.institution}</p>
                            </div>
                          </motion.li>
                        ))}
                      </motion.ul>
                    </ScrollArea>
                  </div>
                )}
              </TabsContent>

              {/* skills */}
              <TabsContent value="skills" className="w-full">
                {isClient && (
                  <div className="flex flex-col gap-8 w-full">
                    {/* Title and Description */}
                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.5 }}
                      variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.6, ease: "easeOut" },
                        },
                      }}
                      className="flex flex-col gap-4 text-center xl:text-left"
                    >
                      <h3 className="text-4xl font-bold">{skills.title}</h3>
                      <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                        {skills.description}
                      </p>
                    </motion.div>

                    {/* Skills Categories */}
                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.2 }}
                      variants={{
                        hidden: {},
                        visible: {
                          transition: {
                            staggerChildren: 0.1,
                          },
                        },
                      }}
                      className="flex flex-col gap-8"
                    >
                      {["IT", "Dev", "Data", "Tools"].map((category) => (
                        <motion.div
                          key={category}
                          variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: {
                              opacity: 1,
                              y: 0,
                              transition: { duration: 0.4, ease: "easeOut" },
                            },
                          }}
                          className="bg-[#232329] p-6 rounded-xl"
                        >
                          <h4 className="text-xl font-semibold mb-6 text-accent">
                            {category}
                          </h4>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4 justify-items-center">
                            {skills.skillList
                              .filter((skill) => skill.category === category)
                              .map((skill, index) => (
                                <motion.div
                                  key={index}
                                  variants={{
                                    hidden: { opacity: 0, scale: 0.8 },
                                    visible: {
                                      opacity: 1,
                                      scale: 1,
                                      transition: {
                                        duration: 0.4,
                                        ease: "easeOut",
                                      },
                                    },
                                  }}
                                  className="group relative flex flex-col justify-center items-center p-4 h-[100px] bg-[#1c1c21] rounded-xl overflow-hidden gap-2"
                                >
                                  <div
                                    style={{ background: skill.bgHoverColor }}
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                  />
                                  <div className="relative z-10 flex items-center justify-center w-12 h-12">
                                    {getIcon(skill.iconName)}
                                  </div>
                                  <span className="absolute bottom-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    {skill.name}
                                  </span>
                                </motion.div>
                              ))}
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                )}
              </TabsContent>

              {/* About Me */}
              <TabsContent value="about" className="w-full">
                {isClient && (
                  <div className="flex flex-col gap-8 w-full">
                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.5 }}
                      variants={{
                        hidden: { opacity: 0, y: 30 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.6, ease: "easeOut" },
                        },
                      }}
                      className="flex flex-col gap-4 text-center xl:text-left"
                    >
                      <h3 className="text-4xl font-bold">{about.title}</h3>
                      <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                        {about.description}
                      </p>
                    </motion.div>
                    <motion.ul
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.2 }}
                      variants={{
                        hidden: {},
                        visible: {
                          transition: {
                            staggerChildren: 0.1,
                          },
                        },
                      }}
                      className="grid grid-cols-1 xl:grid-cols-2 gap-y-6 max-w-[620px] mx-auto xl:mx-0"
                    >
                      {about.info.map((item, index) => (
                        <motion.li
                          key={index}
                          variants={{
                            hidden: { opacity: 0, scale: 0.8 },
                            visible: {
                              opacity: 1,
                              scale: 1,
                              transition: { duration: 0.4, ease: "easeOut" },
                            },
                          }}
                          className="flex items-start justify-start gap-4"
                        >
                          <span className="text-white/60">{item.fieldname} </span>
                          <span className="text-xl text-accent">
                            {item.fieldValue}
                          </span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>
                )}
              </TabsContent>

              {/* resume download */}
              <TabsContent value="file" className="w-full">
                <div className="flex flex-col gap-8 w-full">
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.6, ease: "easeOut" },
                      },
                    }}
                    className="flex flex-col gap-4 text-center xl:text-left"
                  >
                    <h3 className="text-4xl font-bold">Resume</h3>
                  </motion.div>

                  <div className="flex gap-4 justify-center xl:justify-start">
                    <Button
                      variant="outline"
                      size="lg"
                      className="uppercase flex items-center gap-2"
                    >
                      <a href="https://drive.google.com/uc?export=download&id=1n4fiA99cs-kgsVu1q70QPPe6-1Zgb36f">
                        <span>Download Resume</span>
                        <FiDownload className="text-xl" />
                      </a>
                    </Button>
                  </div>
                  <div className="flex flex-col gap-4 w-full">
                    <Image
                      src="/assets-1/resume/resume-screenshot.png"
                      alt="Resume"
                      width={1200}
                      height={1600}
                      className="rounded-xl shadow-lg"
                    />
                    <div className="flex flex-wrap gap-4 mt-4">
                      <a
                        href="https://www.linkedin.com/in/abhinavyadav8/"
                        target="_blank"
                        className="px-4 py-2 rounded-lg uppercase text-sm text-accent border border-accent hover:bg-accent/10 transition-colors"
                      >
                        LinkedIn
                      </a>
                      <a
                        href="https://github.com/abhinavyadav"
                        target="_blank"
                        className="px-4 py-2 rounded-lg uppercase text-sm text-accent border border-accent hover:bg-accent/10 transition-colors"
                      >
                        GitHub
                      </a>
                      <a
                        href="https://drive.google.com/drive/folders/.../certificates"
                        target="_blank"
                        className="px-4 py-2 rounded-lg uppercase text-sm text-accent border border-accent hover:bg-accent/10 transition-colors"
                      >
                        Certificates
                      </a>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default Resume;
