"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { 
  FaHtml5, FaJs, FaReact, FaPython, FaDatabase, FaGithub 
} from "react-icons/fa";
import { 
  SiTailwindcss, SiNextdotjs, SiFramer, SiMicrosoftazure, SiNumpy, SiPandas, SiOpenai, SiVisualstudiocode, SiGithubcopilot 
} from "react-icons/si";
import { TbNetwork } from "react-icons/tb";

const skillCategories = [
  {
    title: "Cloud & DevOps",
    skills: [
      { icon: <SiMicrosoftazure />, name: "Azure", color: "#0078D4" },
      { icon: <FaGithub />, name: "GitHub", color: "#ffffff" },
      { icon: <SiVisualstudiocode />, name: "VS Code", color: "#007ACC" },
      { icon: <TbNetwork />, name: "Networks", color: "#ffffff" },
      { icon: <FaDatabase />, name: "DBMS", color: "#ffffff" },
      { icon: <SiGithubcopilot />, name: "Copilot", color: "#ffffff" },
    ]
  },
  {
    title: "AI & Data",
    skills: [
      { icon: <FaPython />, name: "Python", color: "#3776AB" },
      { icon: <SiNumpy />, name: "NumPy", color: "#4DABCF" },
      { icon: <SiPandas />, name: "Pandas", color: "#FFFFFF" },
      { icon: <SiOpenai />, name: "OpenAI", color: "#74AA9C" },
      { icon: <Image src="/icons/PowerBI_scalable.svg" alt="Power BI" width={32} height={32} className="object-contain" />, name: "Power BI", color: "#F2C811" },
      { icon: <Image src="/icons/CopilotStudio_scalable.svg" alt="Copilot Studio" width={32} height={32} className="object-contain" />, name: "Copilot Studio", color: "#FFFFFF" },
    ]
  },
  {
    title: "Web & App",
    skills: [
      { icon: <FaHtml5 />, name: "HTML5", color: "#E34F26" },
      { icon: <SiTailwindcss />, name: "Tailwind", color: "#06B6D4" },
      { icon: <FaJs />, name: "JavaScript", color: "#F7DF1E" },
      { icon: <FaReact />, name: "React", color: "#61DAFB" },
      { icon: <SiNextdotjs />, name: "Next.js", color: "#FFFFFF" },
      { icon: <SiFramer />, name: "Framer", color: "#FFFFFF" },
    ]
  }
];

const SkillRow = ({ category, index }) => {
  return (
    <div className="relative w-full h-48 mb-8 last:mb-0">
      <h3 className="absolute -top-6 left-0 text-xl font-bold text-white/40 uppercase tracking-widest">
        {category.title}
      </h3>
      
      {/* The Wire - Simple CSS Arc */}
      {/* We use a wide div with a bottom border and border-radius to simulate the hanging wire */}
      <div className="absolute top-0 left-0 w-full h-[60px] border-b border-white/20 rounded-[50%]"></div>

      {/* Icons */}
      <div className="absolute top-0 left-0 w-full h-full">
        {category.skills.map((skill, i) => {
          // Calculate position
          // Distribute 6 items evenly: 14%, 28%, 42%, 57%, 71%, 85%
          const count = category.skills.length;
          const left = (i + 1) * (100 / (count + 1));
          
          // Calculate Y offset based on the curve (Parabola approximation)
          // The wire is 60px deep at 50%.
          // y = 60 * (1 - ((x - 50) / 50)^2)
          const x = left;
          const normalizedX = (x - 50) / 50; // -1 to 1
          const y = 60 * (1 - normalizedX * normalizedX);
          
          return (
            <div 
              key={i}
              className="absolute transform -translate-x-1/2 flex flex-col items-center group"
              style={{ left: `${left}%`, top: `${y}px` }}
            >
              {/* String connecting to wire */}
              <div className="h-8 w-[1px] bg-white/20 origin-top group-hover:animate-swing"></div>
              
              {/* Icon Container */}
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ 
                    delay: i * 0.1 + index * 0.2, 
                    type: "spring",
                    stiffness: 200,
                    damping: 10
                }}
                className="relative"
              >
                {/* Glow Effect */}
                <div 
                    className="absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ backgroundColor: skill.color }}
                ></div>
                
                <div 
                    className="w-14 h-14 bg-[#18181b] border border-white/10 rounded-full flex items-center justify-center text-3xl relative z-10 shadow-lg group-hover:border-white/50 transition-colors"
                    style={{ color: skill.color }}
                >
                    {skill.icon}
                </div>
                
                {/* Tooltip */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold text-white whitespace-nowrap bg-black/80 px-2 py-1 rounded pointer-events-none">
                    {skill.name}
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Skills = () => {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
        >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Technical Skills</h2>
            <p className="text-white/60 max-w-2xl mx-auto text-lg">
                Tools and technologies I use to bring ideas to life.
            </p>
        </motion.div>

        <div className="flex flex-col gap-16 max-w-5xl mx-auto">
            {skillCategories.map((category, index) => (
                <SkillRow key={index} category={category} index={index} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
