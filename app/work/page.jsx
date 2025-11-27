"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsGithub, BsArrowUpRight } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "VirtuAI",
    category: "AI",
    description: "A comprehensive suite of Generative AI tools wrapped in a modern web interface.",
    stack: ["Next.js", "TypeScript", "Clerk"],
    image: "/assets/work/virtuai/landing.png",
    links: {
      github: "https://github.com/Yadui/ProdigyAI",
      live: "https://virtuai.vercel.app/",
    },
  },
  {
    id: 2,
    title: "Automify",
    category: "Web",
    description: "Workflow automation platform designed to streamline business processes.",
    stack: ["Next.js", "NeonDB", "Tailwind"],
    image: "/assets/work/automify/landing.png",
    links: {
      github: "https://github.com/Yadui/automify",
      live: "https://automify.vercel.app/",
    },
  },
  {
    id: 3,
    title: "Enterprise Migration",
    category: "Cloud",
    description: "Migrated a legacy monolithic application to a microservices architecture on AWS, reducing downtime by 99%.",
    stack: ["AWS", "Docker", "Kubernetes"],
    image: null,
    links: { github: "", live: "" },
  },
  {
    id: 4,
    title: "Serverless Pipeline",
    category: "Cloud",
    description: "Built a real-time data processing pipeline using Azure Functions and Event Hubs for a fintech client.",
    stack: ["Azure", "Serverless", "Python"],
    image: null,
    links: { github: "", live: "" },
  },
  {
    id: 5,
    title: "AI Model Training",
    category: "AI",
    description: "Extensive work on training and fine-tuning LLMs (RLHF & SFT) to improve reasoning and coding capabilities.",
    stack: ["RLHF", "Python", "PyTorch"],
    image: null,
    links: { github: "", live: "" },
  },
];

const Work = () => {
  const [filter, setFilter] = useState("all");

  const filteredProjects = projects.filter((project) => 
    filter === "all" ? true : project.category.toLowerCase() === filter
  );

  const tabs = ["all", "cloud", "web", "ai"];

  return (
    <section className="min-h-screen py-24 bg-primary/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-16 space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white">My Projects</h2>
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-4">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setFilter(tab)}
                        className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 border ${
                            filter === tab 
                            ? "bg-accent text-primary border-accent shadow-[0_0_20px_rgba(0,255,153,0.4)]" 
                            : "bg-[#27272c] text-white/60 border-white/10 hover:border-accent hover:text-white"
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </div>

        <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
            <AnimatePresence>
                {filteredProjects.map((project) => (
                    <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        key={project.id}
                        className="bg-[#27272c] rounded-2xl overflow-hidden border border-white/5 hover:border-accent/50 transition-all duration-300 group flex flex-col"
                    >
                        {/* Image / Visual */}
                        <div className="relative h-[240px] w-full bg-black/50 overflow-hidden">
                            {project.image ? (
                                <Image 
                                    src={project.image} 
                                    alt={project.title} 
                                    fill 
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-white/5 to-transparent">
                                    <h3 className="text-4xl font-bold text-white/10 group-hover:text-accent/20 transition-colors">
                                        {project.category}
                                    </h3>
                                </div>
                            )}
                            
                            {/* Overlay Links */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                                {project.links.github && (
                                    <Link href={project.links.github} target="_blank" className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-accent hover:text-primary transition-colors">
                                        <BsGithub className="text-2xl" />
                                    </Link>
                                )}
                                {project.links.live && (
                                    <Link href={project.links.live} target="_blank" className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-accent hover:text-primary transition-colors">
                                        <BsArrowUpRight className="text-2xl" />
                                    </Link>
                                )}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex flex-col flex-1">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-2xl font-bold text-white group-hover:text-accent transition-colors">
                                    {project.title}
                                </h3>
                                <span className="text-xs font-bold px-2 py-1 rounded bg-white/5 text-white/60 uppercase">
                                    {project.category}
                                </span>
                            </div>
                            
                            <p className="text-white/60 mb-6 flex-1">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-auto">
                                {project.stack.map((tech, index) => (
                                    <span key={index} className="text-xs font-bold text-accent bg-accent/10 px-3 py-1 rounded-full">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Work;
