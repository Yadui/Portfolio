"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import { BsArrowUpRight, BsGithub } from "react-icons/bs";
import { CgMediaLive } from "react-icons/cg";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

import Link from "next/link";
import Image from "next/image";
import { Description } from "@radix-ui/react-dialog";
import WorkSliderBtns from "@/components/WorkSliderBtns";

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
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [projects, setProjects] = useState(project[0]);

  const handleProjectChange = (direction) => {
    let newIndex;
    if (direction === "next") {
      newIndex = (currentProjectIndex + 1) % project.length;
    } else {
      newIndex = (currentProjectIndex - 1 + project.length) % project.length;
    }
    setCurrentProjectIndex(newIndex);
    setProjects(project[newIndex]);
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
        <div className="flex flex-col xl:flex-row xl:gap-[30px] items-start">
          {/* Mobile-only title */}
          <div className="xl:hidden w-full mb-6 text-center">
            <h2 className="text-3xl font-bold text-white bg-[#27272c]/50 py-4 rounded-xl">
              {projects.title}
            </h2>
          </div>

          {/* Image Section - First on mobile */}
          <div className="w-full xl:w-[60%] order-1 xl:order-2">
            <div className="relative">
              <Swiper
                modules={[Autoplay, EffectFade]}
                spaceBetween={0}
                slidesPerView={1}
                effect="fade"
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: false,
                }}
                className="h-[400px] sm:h-[500px] xl:h-[650px] gallery-swiper"
                loop={true}
              >
                {project[currentProjectIndex].images.map(
                  (image, imageIndex) => (
                    <SwiperSlide
                      key={`${currentProjectIndex}-${imageIndex}`}
                      className="w-full"
                    >
                      <div className="h-full relative group flex justify-center items-center bg-[#27272c] rounded-xl overflow-hidden">
                        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                          <div className="relative w-full aspect-[16/9]">
                            <Image
                              src={image}
                              fill
                              alt={`${
                                project[currentProjectIndex].title
                              } - View ${imageIndex + 1}`}
                              className="object-contain"
                              priority={imageIndex === 0}
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 800px"
                              quality={100}
                            />
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  )
                )}
              </Swiper>
              {/* Custom navigation buttons */}
              <div className="flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)] xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none">
                <button
                  onClick={() => handleProjectChange("prev")}
                  className="bg-accent hover:bg-accent-hover text-primary text-[22px] w-[44px] h-[44px] flex justify-center items-center transition-all rounded-full"
                >
                  ←
                </button>
                <button
                  onClick={() => handleProjectChange("next")}
                  className="bg-accent hover:bg-accent-hover text-primary text-[22px] w-[44px] h-[44px] flex justify-center items-center transition-all rounded-full"
                >
                  →
                </button>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="w-full xl:w-[35%] flex flex-col order-2 xl:order-1">
            {/* Desktop-only content */}
            <div className="hidden xl:flex flex-col gap-[30px]">
              <div className="text-8xl leading-none font-extrabold text-transparent text-outline">
                {projects.num}
              </div>
              <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500 capitalize">
                {projects.category} project
              </h2>
              <p className="text-white/60">{projects.description}</p>
            </div>

            {/* Mobile and Desktop content */}
            <div className="flex flex-col gap-6 mt-6 xl:mt-0">
              {/* Stack */}
              <ul className="flex flex-wrap justify-center xl:justify-start gap-4">
                {projects.stack.map((item, index) => (
                  <li
                    key={index}
                    className="text-xl text-accent bg-[#27272c]/50 px-4 py-2 rounded-full"
                  >
                    {item.name}
                  </li>
                ))}
              </ul>

              {/* Buttons */}
              <div className="flex justify-center xl:justify-start items-center gap-4">
                <Link href={projects.github}>
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group hover:bg-accent/20 transition-all">
                        <BsGithub className="text-white text-3xl group-hover:text-accent transition-all" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="bg-white text-black">Git repo</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>

                <Link href={projects.live}>
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group hover:bg-accent/20 transition-all">
                        <CgMediaLive className="text-white text-3xl group-hover:text-accent transition-all" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="bg-white text-black">Live Project</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx global>{`
        .gallery-swiper .swiper-pagination-bullet {
          background: white;
          opacity: 0.5;
        }
        .gallery-swiper .swiper-pagination-bullet-active {
          background: var(--accent);
          opacity: 1;
        }
      `}</style>
    </motion.div>
  );
};

export default Work;
