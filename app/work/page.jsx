"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";

import { BsArrowLeft, BsArrowRight, BsGithub } from "react-icons/bs";
import { CgMediaLive } from "react-icons/cg";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

import Link from "next/link";
import Image from "next/image";

const project = [
  {
    num: "01",
    category: "Gen AI tools",
    title: "VirtuAI",
    description: "A virtual gen ai tools for all your needs",
    stack: [
      { name: "NextJS" },
      { name: "Typescript" },
      { name: "Tailwind" },
      { name: "Clerk" },
    ],
    images: [
      "/assets-1/work/virtuai/landing.png",
      "/assets-1/work/virtuai/dashboard.png",
      "/assets-1/work/virtuai/workflow.png",
    ],
    live: "https://virtuai.vercel.app/",
    github: "https://github.com/Yadui/ProdigyAI",
  },
  {
    num: "02",
    category: "Create work flows",
    title: "Automify",
    description: "Create workflows and automate your work",
    stack: [
      { name: "Next JS" },
      { name: "Typescript" },
      { name: "TailwindCss" },
      { name: "Neontech" },
    ],
    images: [
      "/assets-1/work/automify/landing.png",
      "/assets-1/work/automify/dashboard.png",
      "/assets-1/work/automify/workflow.png",
    ],
    live: "https://automify.vercel.app/",
    github: "https://github.com/Yadui/automify",
  },
];

const Work = () => {
  // Track image index per card
  const [imageIndexes, setImageIndexes] = useState(Array(project.length).fill(0));

  const handlePrev = (cardIdx) => {
    setImageIndexes((prev) =>
      prev.map((idx, i) =>
        i === cardIdx
          ? (idx - 1 + project[cardIdx].images.length) % project[cardIdx].images.length
          : idx
      )
    );
  };
  const handleNext = (cardIdx) => {
    setImageIndexes((prev) =>
      prev.map((idx, i) =>
        i === cardIdx
          ? (idx + 1) % project[cardIdx].images.length
          : idx
      )
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
      className="min-h-[80vh] flex flex-col justify-center py-12 xl:px-0"
    >
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">My Projects</h2>
        <div className="grid gap-8" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
          {project.map((proj, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-[#27272c] rounded-xl overflow-hidden shadow-lg relative group"
            >
              <div className="relative h-56">
                <Image
                  src={proj.images[imageIndexes[index]]}
                  alt={`${proj.title} screenshot ${imageIndexes[index] + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={100}
                  priority={index === 0}
                />
                {/* Removed hover overlay with GitHub and Live buttons */}
              </div>
              {/* Arrows below image, centered */}
              <div className="flex justify-center items-center gap-4 mt-2">
                <button
                  aria-label="Previous image"
                  type="button"
                  className="w-8 h-8 flex items-center justify-center border border-white/20 rounded-full text-white/70 hover:text-accent hover:border-accent transition"
                  onClick={() => handlePrev(index)}
                  tabIndex={0}
                >
                  <BsArrowLeft />
                </button>
                <span className="text-xs text-white/40 select-none">
                  {imageIndexes[index] + 1}/{proj.images.length}
                </span>
                <button
                  aria-label="Next image"
                  type="button"
                  className="w-8 h-8 flex items-center justify-center border border-white/20 rounded-full text-white/70 hover:text-accent hover:border-accent transition"
                  onClick={() => handleNext(index)}
                  tabIndex={0}
                >
                  <BsArrowRight />
                </button>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-white mb-2">{proj.title}</h3>
                <p className="text-white/70 mb-4">{proj.description}</p>
                <ul className="flex flex-wrap gap-2">
                  {proj.stack.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-accent bg-[#3a3a3a] px-3 py-1 rounded-full"
                    >
                      {item.name}
                    </li>
                  ))}
                </ul>
                {/* Always visible GitHub and Live buttons below the card */}
                <div className="flex gap-4 mt-4">
                  <Link href={proj.github} target="_blank" rel="noopener noreferrer">
                    <button
                      type="button"
                      className="w-10 h-10 flex items-center justify-center border border-white/20 rounded-full text-white/70 hover:text-accent hover:border-accent transition"
                      aria-label="GitHub Repository"
                    >
                      <BsGithub className="text-xl" />
                    </button>
                  </Link>
                  <Link href={proj.live} target="_blank" rel="noopener noreferrer">
                    <button
                      type="button"
                      className="w-10 h-10 flex items-center justify-center border border-white/20 rounded-full text-white/70 hover:text-accent hover:border-accent transition"
                      aria-label="Live Project"
                    >
                      <CgMediaLive className="text-xl" />
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Work;
