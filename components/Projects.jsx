"use client";

import { useRef } from "react";
import Image from "next/image";
import { BsArrowUpRight, BsGithub } from "react-icons/bs";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Flip);

const projects = [
  {
    id: 1,
    title: "VirtuAI",
    category: "AI",
    summary:
      "A comprehensive suite of Generative AI tools wrapped in a modern web interface.",
    description:
      "VirtuAI is a cutting-edge SaaS platform that aggregates multiple generative AI models into a single, user-friendly interface. It offers features like AI conversation, image generation, music creation, and code generation. Built with scalability and user experience in mind, it leverages the latest in web technologies.",
    stack: ["Next.js", "TypeScript", "Clerk", "OpenAI API"],
    image: "/assets/work/virtuai/landing.png",
    links: {
      github: "https://github.com/Yadui/ProdigyAI",
      live: "https://virtuai.vercel.app/",
    },
    color: "#18181b",
  },
  {
    id: 2,
    title: "Automify",
    category: "Web",
    summary:
      "Workflow automation platform designed to streamline business processes.",
    description:
      "Automify empowers businesses to automate repetitive tasks through a visual workflow builder. It connects various services and triggers actions based on specific events, significantly reducing manual workload and increasing operational efficiency.",
    stack: ["Next.js", "NeonDB", "Tailwind", "Framer Motion"],
    image: "/assets/work/automify/landing.png",
    links: {
      github: "https://github.com/Yadui/automify",
      live: "https://automify.vercel.app/",
    },
    color: "#1c1c22",
  },
  {
    id: 3,
    title: "Enterprise Migration",
    category: "Cloud",
    summary:
      "Migrated a legacy monolithic application to a microservices architecture on AWS.",
    description:
      "This project involved a complete re-architecture of a mission-critical legacy system. We decomposed the monolith into microservices, containerized them using Docker, and orchestrated deployment via Kubernetes on AWS EKS. The result was a 99% reduction in downtime and improved scalability.",
    stack: ["AWS", "Docker", "Kubernetes", "Terraform"],
    image: null,
    links: { github: "", live: "" },
    color: "#27272a",
  },
  {
    id: 4,
    title: "Serverless Pipeline",
    category: "Cloud",
    summary:
      "Real-time data processing pipeline using Azure Functions and Event Hubs.",
    description:
      "Designed and implemented a serverless data ingestion and processing pipeline for a fintech client. The solution utilizes Azure Event Hubs for high-throughput data streaming and Azure Functions for real-time processing, ensuring low latency and high availability.",
    stack: ["Azure", "Serverless", "Python", "Event Hubs"],
    image: null,
    links: { github: "", live: "" },
    color: "#18181b",
  },
  {
    id: 5,
    title: "AI Model Training",
    category: "AI",
    summary:
      "Training and fine-tuning LLMs (RLHF & SFT) for reasoning and coding.",
    description:
      "Focused on enhancing Large Language Models through Reinforcement Learning from Human Feedback (RLHF) and Supervised Fine-Tuning (SFT). This work involved creating high-quality datasets, evaluating model outputs, and optimizing for specific reasoning and coding tasks.",
    stack: ["RLHF", "Python", "PyTorch", "Transformers"],
    image: null,
    links: { github: "", live: "" },
    color: "#1c1c22",
  },
];

const Card = ({
  i,
  title,
  description,
  stack,
  image,
  links,
  category,
  progress,
  range,
  targetScale,
}) => {
  const container = useRef(null);
  const cardInner = useRef(null);

  useGSAP(() => {}, { scope: container });

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0"
    >
      <div
        ref={cardInner}
        className="relative flex flex-col md:flex-row gap-8 w-full max-w-[1000px] h-[600px] rounded-[30px] p-8 md:p-12 overflow-hidden origin-top before:absolute before:inset-0 before:rounded-[30px]
before:bg-gradient-to-br before:from-white/[0.08] before:to-transparent
before:pointer-events-none
after:absolute after:inset-0 after:rounded-[30px]
after:bg-black/40 after:opacity-0 hover:after:opacity-100
after:transition-opacity after:duration-500"
        style={{
          backgroundColor: "#18181b",
          top: `calc(-5% + ${i * 25}px)`, // Offset slightly so we can see the stack
        }}
      >
        {/* Left Content */}
        <div className="flex flex-col justify-between w-full md:w-1/2 h-full z-10">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-6xl font-bold text-white/10 font-outline-2">
                {`0${i + 1}`}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-accent/10 text-accent border border-accent/20">
                {category}
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {title}
            </h2>

            <p className="text-white/70 text-[17px] leading-[1.7] max-w-[90%] text-lg mb-8">
              {description}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {stack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-md bg-white/5 text-white/50 text-sm border border-white/5"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            {links.github && (
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-primary font-bold hover:bg-accent transition-colors"
              >
                <BsGithub className="text-xl" />
                GitHub
              </a>
            )}
            {links.live && (
              <a
                href={links.live}
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

        {/* Right Image/Graphic */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden md:block overflow-hidden rounded-r-[30px]">
          {image ? (
            <div className="relative w-full h-full group">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#18181b] via-[#18181b]/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-accent/5 to-transparent flex items-center justify-center border-l border-white/5">
              <span className="text-9xl font-bold text-white/5 select-none">
                {category}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Projects = ({ arrowRef, whatIDoRef }) => {
  const container = useRef(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".sticky-card");

      // Optional: Add a small scale effect to the previous card as the new one enters
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;

        const nextCard = cards[i + 1];
        const cardInner = card.querySelector(".card-inner");

        gsap.to(cardInner, {
          scale: 0.9,
          scrollTrigger: {
            trigger: nextCard,
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });
      });
    },
    { scope: container }
  );

  // Arrow to "What I Do" morph animation
  useGSAP(
    () => {
      if (!arrowRef.current || !whatIDoRef.current) return;

      const arrowContainer = arrowRef.current;
      const arrowIcon = arrowContainer.querySelector(".arrow-icon");
      const arrowText = arrowContainer.querySelector(".arrow-text");
      const targetHeading = whatIDoRef.current;

      // Set initial states explicitly to ensure GSAP has control
      gsap.set(arrowText, { opacity: 0, scale: 0.5 });
      gsap.set(targetHeading, { opacity: 0 });

      // Create a timeline for the morph animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top 100%", // Start when section bottom enters
          end: "top 0%", // End exactly when section top reaches viewport top
          scrub: 1, // Slower, smoother scrub
          once: true,
          invalidateOnRefresh: true,
          onEnter: () => {
            arrowIcon.classList.remove("animate-bounce");
          },
          onLeave: () => {
            gsap.set(arrowContainer, { autoAlpha: 0 });
            gsap.set(targetHeading, { opacity: 1 });
          },
        },
      });

      // Deterministic top-anchored landing calculation
      // This calculates the viewport center of the sticky header at top 0%
      const getTargetCoords = () => {
        const targetRect = targetHeading.getBoundingClientRect();
        const containerRect = arrowContainer.getBoundingClientRect();

        // Vertical landing:
        // When at top 0%, the sticky wrapper (py-12) will be at the very top of the viewport.
        // py-12 is 48px. So the heading center is 48px + (headingHeight / 2).
        const headingHeight = targetRect.height;
        const targetCenterY = 48 + headingHeight / 2;

        // Current center of the fixed arrow container
        const currentCenterY = containerRect.top + containerRect.height / 2;

        return {
          x: 0, // Already centered via left-1/2 -translate-x-1/2 on the fixed container
          y: targetCenterY - currentCenterY,
        };
      };

      // Animation: Arrow → Text → Move to heading
      tl
        // Phase 1: Slow arrow fade/shrink and text reveal
        .to(
          arrowIcon,
          {
            scale: 0.3,
            opacity: 0,
            duration: 0.4,
            ease: "power2.inOut",
          },
          0
        )
        .to(
          arrowText,
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
          },
          0.1
        )
        // Phase 2: Steady move to the top-anchored position
        .to(
          arrowContainer,
          {
            y: () => getTargetCoords().y,
            duration: 0.8,
            ease: "power2.inOut",
          },
          0.2
        )
        // Phase 3: Final handoff
        .to(
          arrowText,
          {
            opacity: 0,
            scale: 1.1, // Subtle grow before disappearing
            duration: 0.3,
          },
          0.9
        )
        .to(
          targetHeading,
          {
            opacity: 1,
            duration: 0.3,
          },
          0.9
        );
    },
    { scope: container, dependencies: [] }
  );

  return (
    <section id="projects" ref={container} className="bg-black relative">
      <div className="container mx-auto px-4 py-24">
        {/* Sticky Header Wrapper */}
        <div className="sticky top-0 z-30 flex justify-center py-12 bg-black/80 backdrop-blur-md -mx-4 px-4 mb-8">
          <h2
            ref={whatIDoRef}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            What I Do
          </h2>
        </div>

        {projects.map((project, index) => {
          return (
            <div
              key={index}
              className="sticky-card h-[75vh] flex items-start justify-center sticky top-32 md:top-48"
            >
              <div
                className="card-inner relative flex flex-col md:flex-row gap-8 w-full max-w-[1100px] h-full md:h-[650px] rounded-[30px] p-8 md:p-12 border border-white/10 overflow-hidden shadow-2xl bg-[#18181b] origin-top"
                style={{
                  // Slight offset for visual stacking depth
                  marginTop: `${index * 10}px`,
                }}
              >
                {/* Left Content */}
                <div className="flex flex-col justify-between w-full md:w-1/2 h-full z-10 relative">
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-6xl font-bold text-white/10 font-outline-2">
                        {`0${index + 1}`}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-accent/10 text-accent border border-accent/20">
                        {project.category}
                      </span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                      {project.title}
                    </h2>

                    <p className="text-white/70 text-[17px] leading-[1.7] max-w-[90%] mb-8">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.stack.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-md bg-white/5 text-white/50 text-sm border border-white/5"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
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

                {/* Right Image/Graphic */}
                <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden md:block overflow-hidden">
                  {project.image ? (
                    <div className="relative w-full h-full group">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Gradient Overlay to blend with card bg */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[#18181b] via-[#18181b]/20 to-transparent"></div>
                    </div>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-accent/5 to-transparent flex items-center justify-center border-l border-white/5">
                      <span className="text-9xl font-bold text-white/5 select-none">
                        {project.category}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
