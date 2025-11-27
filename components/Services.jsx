"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsArrowUpRight, BsGithub, BsX } from "react-icons/bs";
import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "VirtuAI",
    category: "AI",
    summary: "A comprehensive suite of Generative AI tools wrapped in a modern web interface.",
    description: "VirtuAI is a cutting-edge SaaS platform that aggregates multiple generative AI models into a single, user-friendly interface. It offers features like AI conversation, image generation, music creation, and code generation. Built with scalability and user experience in mind, it leverages the latest in web technologies.",
    stack: ["Next.js", "TypeScript", "Clerk", "OpenAI API"],
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
    summary: "Workflow automation platform designed to streamline business processes.",
    description: "Automify empowers businesses to automate repetitive tasks through a visual workflow builder. It connects various services and triggers actions based on specific events, significantly reducing manual workload and increasing operational efficiency.",
    stack: ["Next.js", "NeonDB", "Tailwind", "Framer Motion"],
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
    summary: "Migrated a legacy monolithic application to a microservices architecture on AWS.",
    description: "This project involved a complete re-architecture of a mission-critical legacy system. We decomposed the monolith into microservices, containerized them using Docker, and orchestrated deployment via Kubernetes on AWS EKS. The result was a 99% reduction in downtime and improved scalability.",
    stack: ["AWS", "Docker", "Kubernetes", "Terraform"],
    image: null,
    links: { github: "", live: "" },
  },
  {
    id: 4,
    title: "Serverless Pipeline",
    category: "Cloud",
    summary: "Real-time data processing pipeline using Azure Functions and Event Hubs.",
    description: "Designed and implemented a serverless data ingestion and processing pipeline for a fintech client. The solution utilizes Azure Event Hubs for high-throughput data streaming and Azure Functions for real-time processing, ensuring low latency and high availability.",
    stack: ["Azure", "Serverless", "Python", "Event Hubs"],
    image: null,
    links: { github: "", live: "" },
  },
  {
    id: 5,
    title: "AI Model Training",
    category: "AI",
    summary: "Training and fine-tuning LLMs (RLHF & SFT) for reasoning and coding.",
    description: "Focused on enhancing Large Language Models through Reinforcement Learning from Human Feedback (RLHF) and Supervised Fine-Tuning (SFT). This work involved creating high-quality datasets, evaluating model outputs, and optimizing for specific reasoning and coding tasks.",
    stack: ["RLHF", "Python", "PyTorch", "Transformers"],
    image: null,
    links: { github: "", live: "" },
  },
];

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-[#18181b] border border-white/10 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors z-10"
        >
          <BsX className="text-2xl text-white" />
        </button>

        {/* Image / Header */}
        <div className="relative h-64 md:h-80 w-full bg-black/50">
           {project.image ? (
               <Image 
                   src={project.image} 
                   alt={project.title} 
                   fill 
                   className="object-cover"
               />
           ) : (
               <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent/10 to-transparent">
                   <h3 className="text-5xl font-bold text-white/10">{project.category}</h3>
               </div>
           )}
           <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 bg-gradient-to-t from-[#18181b] to-transparent">
               <div className="flex items-center gap-3 mb-2">
                   <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-accent text-primary">
                       {project.category}
                   </span>
               </div>
               <h2 className="text-3xl md:text-4xl font-bold text-white">{project.title}</h2>
           </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-6">
            <div>
                <h3 className="text-xl font-bold text-white mb-3">About the Project</h3>
                <p className="text-white/70 leading-relaxed text-lg">
                    {project.description}
                </p>
            </div>

            <div>
                <h3 className="text-xl font-bold text-white mb-3">Technologies Used</h3>
                <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech, index) => (
                        <span key={index} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/80 text-sm font-medium">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex gap-4 pt-4 border-t border-white/10">
                {project.links.github && (
                    <a 
                        href={project.links.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-primary font-bold hover:bg-accent transition-colors"
                    >
                        <BsGithub className="text-xl" />
                        GitHub
                    </a>
                )}
                {project.links.live && (
                    <a 
                        href={project.links.live} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 rounded-full bg-transparent border border-white/20 text-white font-bold hover:border-accent hover:text-accent transition-colors"
                    >
                        <BsArrowUpRight className="text-xl" />
                        Live Demo
                    </a>
                )}
            </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Services = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="services" className="min-h-screen py-24 bg-primary/50 relative">
      <div className="container mx-auto px-4">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              What I Do
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-xl">
            A showcase of my technical projects and professional work.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group bg-[#18181b] border border-white/10 rounded-2xl overflow-hidden hover:border-accent/50 transition-all duration-300 flex flex-col cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                >
                    {/* Card Header / Image Placeholder */}
                    <div className="h-48 bg-white/5 relative overflow-hidden">
                        {project.image ? (
                            <Image 
                                src={project.image} 
                                alt={project.title} 
                                fill 
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-white/5 to-transparent">
                                <span className="text-4xl font-bold text-white/10 group-hover:text-accent/20 transition-colors">
                                    {project.category}
                                </span>
                            </div>
                        )}
                        
                        {/* Overlay Icon */}
                        <div className="absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <BsArrowUpRight className="text-white" />
                        </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-accent text-sm font-bold uppercase tracking-wider">
                                {project.category}
                            </span>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-accent transition-colors">
                            {project.title}
                        </h3>
                        
                        <p className="text-white/60 mb-6 line-clamp-3">
                            {project.summary}
                        </p>

                        <div className="mt-auto flex items-center gap-2 text-white/40 text-sm font-medium group-hover:text-white transition-colors">
                            <span>View Details</span>
                            <BsArrowUpRight className="text-accent" />
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
            <ProjectModal 
                project={selectedProject} 
                onClose={() => setSelectedProject(null)} 
            />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Services;
