"use client";

import React from "react";
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
import { FiDownload } from "react-icons/fi";
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

  React.useEffect(() => {
    setIsClient(true);
  }, []);

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
          className="flex flex-col xl:flex-row gap-[60px]"
        >
          <TabsList className="flex flex-col w-full max-w-[380px] mx-auto xl:mx-0 gap-6 text-white">
            <div className="flex flex-col gap-8">
              <h3 className="text-5xl text-left"> Why hire me?</h3>
              <p>
                Check out my details, maybe you will find something intresting!
              </p>
            </div>
            {/* <TabsTrigger value="text">why hire me?</TabsTrigger> */}
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="about">About me</TabsTrigger>
            <TabsTrigger value="file">Resume File</TabsTrigger>
            {/* <TabsTrigger value="download"> */}
            {/* Download Button
              <Button
                variant="outline"
                size="lg"
                className="uppercase flex justify-center items-center gap-2 mt-4"
              >
                <span>Download CV</span>
                <FiDownload className="text-xl" />
              </Button> */}
            {/* </TabsTrigger> */}
          </TabsList>
          {/* content */}
          <div className="min-h-[70vh] w-full">
            {/* experience */}
            <TabsContent value="experience" className="w-full">
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
                className="flex flex-col gap-[30px] p-10 pl-0 text-center xl:text-left"
              >
                <h3 className="text-4xl font-bold">{experience.title}</h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                  {experience.description}
                </p>
              </motion.div>
              {isClient && (
                <ScrollArea className="h-[400px]">
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
                    className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]"
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
                        className="bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1"
                      >
                        <span className="text-accent">{item.duration}</span>
                        <h3 className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left">
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
              )}
            </TabsContent>

            {/* Education */}
            <TabsContent value="education" className="w-full">
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
                className="flex flex-col gap-[30px] p-10 pl-0 text-center xl:text-left"
              >
                <h3 className="text-4xl font-bold">{education.title}</h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                  {education.description}
                </p>
              </motion.div>
              {isClient && (
                <ScrollArea className="h-[400px]">
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
                    className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]"
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
                        className="bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1"
                      >
                        <span className="text-accent">{item.duration}</span>
                        <h3 className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left">
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
              )}
            </TabsContent>

            {/* skills */}
            <TabsContent value="skills" className="w-full h-full">
              {isClient && (
                <div className="flex flex-col gap-[30px]">
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
                    className="flex flex-col gap-[30px] text-center xl:text-left"
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
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
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
                                className="group relative flex flex-col justify-center items-center p-4 h-[100px] bg-[#1c1c21] rounded-xl overflow-hidden"
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
            <TabsContent
              value="about"
              className="w-full text-center xl:text-left"
            >
              {isClient && (
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
                  className="flex flex-col gap-[30px] p-10 pl-0"
                >
                  <h3 className="text-4xl font-bold">{about.title}</h3>
                  <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                    {about.description}
                  </p>
                </motion.div>
              )}
              {isClient && (
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
                      className="flex items-center justify-center xl:justify-start gap-4"
                    >
                      <span className="text-white/60">{item.fieldname} </span>
                      <span className="text-xl text-accent">
                        {item.fieldValue}
                      </span>
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </TabsContent>

            {/* resume download */}
            <TabsContent
              value="file"
              className="container mx-auto h-full flex flex-col items-center justify-start gap-4"
            >
              {isClient && (
                <>
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      size="lg"
                      className="uppercase flex items-center gap-2 mt-6"
                    >
                      <a
                        href="https://drive.google.com/file/d/1n4fiA99cs-kgsVu1q70QPPe6-1Zgb36f/view?usp=drive_link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span>View Resume</span>
                        <FiDownload className="text-xl" />
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="uppercase flex items-center gap-2 mt-6"
                    >
                      <a href="https://drive.google.com/uc?export=download&id=1n4fiA99cs-kgsVu1q70QPPe6-1Zgb36f">
                        <span>Download Resume</span>
                        <FiDownload className="text-xl" />
                      </a>
                    </Button>
                  </div>
                  <div className="w-full h-[85vh] flex justify-center items-center">
                    <iframe
                      src="https://drive.google.com/file/d/1n4fiA99cs-kgsVu1q70QPPe6-1Zgb36f/preview"
                      className="w-[90%] h-full border-none"
                      allow="autoplay"
                    />
                  </div>
                </>
              )}
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default Resume;
