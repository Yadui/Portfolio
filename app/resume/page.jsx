"use client";

import {
  FaHtml5,
  FaCss3,
  FaJs,
  FaReact,
  FaFigma,
  FaNodeJs,
  FaPython,
} from "react-icons/fa";
import { SiTailwindcss, SiNextdotjs } from "react-icons/si";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FiDownload } from "react-icons/fi";

// about data
const about = {
  title: "About me",
  description: "lorem ipsum",
  info: [
    {
      fieldname: "Name",
      fieldValue: "Abhinav Yadav",
    },
    {
      fieldname: "Phone",
      fieldValue: "(+91) 9971208044",
    },
    {
      fieldname: "Experience",
      fieldValue: "1-2 years",
    },
    {
      fieldname: "Email",
      fieldValue: "abhinavyadav8@gmail.com",
    },
    {
      fieldname: "Nationality",
      fieldValue: "Indian",
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
  icon: "assets/resume/cap.svg",
  title: "My Education",
  description: "Lorem ipsum",
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
  icon: "assets/resume/badge.svg",
  title: "My Experience",
  description: "Lorem ipsum",
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
  html: "#E44D26", // Orange for HTML5
  css: "#1572B6", // Blue for CSS3
  javascript: "#f5b60a", // Yellow for JavaScript
  react: "#61DBFB", // Cyan for React
  figma: "#F24E1E", // Red for Figma
  nodejs: "#68A063", // Green for Node.js
  python: "linear-gradient(to right, #3776AB 50%, #FFD43B 50%)", // Blue for Python
  tailwindcss: "#38BDF8", // Light Blue for TailwindCSS
  nextjs: "#000000", // Black for Next.js
};
//skills data
const skills = {
  title: "My skills",
  description:
    "These are the skills I have used to create and deliver amazing websites and projects.",
  skillList: [
    {
      icon: <FaHtml5 />,
      name: "html 5",
      bgHoverColor: colorMap.html, // Orange
    },
    {
      icon: <FaCss3 />,
      name: "Css 3",
      bgHoverColor: colorMap.css, // Blue
    },
    {
      icon: <FaJs />,
      name: "Javascript",
      bgHoverColor: colorMap.javascript, // Yellow
    },
    {
      icon: <FaReact />,
      name: "React.JS",
      bgHoverColor: colorMap.react, // Cyan
    },
    {
      icon: <FaFigma />,
      name: "Figma",
      bgHoverColor: colorMap.figma, // Red
    },
    {
      icon: <FaNodeJs />,
      name: "Node.JS",
      bgHoverColor: colorMap.nodejs, // Green
    },
    {
      icon: <FaPython />,
      name: "Python",
      bgHoverColor: colorMap.python, // Blue
    },
    {
      icon: <SiTailwindcss />,
      name: "TailwindCSS",
      bgHoverColor: colorMap.tailwindcss, // Light Blue
    },
    {
      icon: <SiNextdotjs />,
      name: "Next.JS",
      bgHoverColor: colorMap.nextjs, // Black
    },
  ],
};

//resume link
// const file_path = "public/abhinav-cv.pdf";
//components
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { ScrollArea } from "@/components/ui/scroll-area";

const Resume = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
      className="min-h-[80vh] flex items-center justify-center py-12 "
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
                        <p className="text-white/60"> {item.company} </p>
                      </div>
                    </motion.li>
                  ))}
                </motion.ul>
              </ScrollArea>
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
            </TabsContent>

            {/* skills */}
            {/* <TabsContent value="skills" className="w-full h-full">
              <div className="flex flex-col gap-[30px]">
                <div className="flex flex-col gap-[30px] text-center xl:text-left">
                  <h3 className="text-4xl font-bold">{skills.title}</h3>
                  <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                    {skills.description}
                  </p>
                </div>
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 xl:gap-[30px]">
                  {skills.skillList.map((skill, index) => {
                    return (
                      <li key={index}>
                        <TooltipProvider delayDuration={50}>
                          <Tooltip className="w-full h-[150px] bg-[#232329] rounded-xl flex justify-center items-center group">
                            <TooltipTrigger className="w-full h-[150px] bg-[#232329] rounded-xl flex justify-center items-center group">
                              <div className="text-6xl group-hover:text-accent transition-all duration-300">
                                {skill.icon}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>{skill.name}</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </TabsContent> */}
            <TabsContent value="skills" className="w-full h-full">
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

                {/* Skill List */}
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
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 xl:gap-[30px]"
                >
                  {skills.skillList.map((skill, index) => (
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
                    >
                      <TooltipProvider delayDuration={50}>
                        <Tooltip>
                          <TooltipTrigger className="group  relative flex justify-center items-center p-4 w-36 h-36 bg-[#232329] rounded-xl overflow-hidden transition-all duration-300">
                            <div
                              style={{ background: skill.bgHoverColor }}
                              className="absolute inset-0 z-0 transition-all duration-300 group-hover:opacity-100 opacity-0"
                            ></div>

                            {/* Icon Layer */}
                            <div
                              className={`relative z-10 text-white text-6xl ${
                                skill.name === "React.JS"
                                  ? "group-hover:slow-spin"
                                  : ""
                              }`}
                              // style={{
                              //   transition:
                              //     skill.name === "React.JS"
                              //       ? "transform 0.3s ease"
                              //       : "none",
                              // }}
                            >
                              {skill.icon}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>{skill.name}</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </TabsContent>

            {/* About Me */}
            <TabsContent
              value="about"
              className="w-full text-center xl:text-left"
            >
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
            </TabsContent>

            {/* resume download */}
            <TabsContent
              value="file"
              className="container mx-auto h-full flex flex-col items-center justify-start gap-4"
            >
              {/* Download Button */}
              <Button
                variant="outline"
                size="lg"
                className="uppercase flex items-center gap-2 mt-6"
              >
                <span>Download CV</span>
                <FiDownload className="text-xl" />
              </Button>
              {/* PDF Viewer */}
              <div className="w-full h-[85vh] flex justify-center items-center">
                <iframe
                  src="abhinav-cv.pdf#zoom=page-width" // Ensure this path is correct
                  className="w-[90%] h-full border-none"
                />
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default Resume;
