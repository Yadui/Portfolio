"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { FiDownload } from "react-icons/fi";
import Stats from "@/components/Stats";
import Socials from "@/components/Socials";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Timeline from "@/components/Timeline";
import Skills from "@/components/Skills";
import { motion } from "framer-motion";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(Flip);

const Home = () => {
  const containerRef = useRef();
  const [animationComplete, setAnimationComplete] = useState(false);

  useGSAP(() => {
    const introHello = document.querySelector("#intro-hello");
    const headerHello = document.querySelector("#header-hello");
    const introBg = document.querySelector("#intro-bg");
    const introContainer = document.querySelector("#intro-container");
    const heroContentElements = gsap.utils.toArray(".hero-content");
    const nameChars = gsap.utils.toArray(".name-char");

    if (introHello && headerHello && introBg) {
      // Animate the intro "Hello!" to the position of the header "Hello!"
      Flip.fit(introHello, headerHello, {
        duration: 1.5,
        ease: "power4.inOut",
        scale: true,
        absolute: true,
        onComplete: () => {
          // 1. Fade out the black background
          gsap.to(introBg, {
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: () => {
              // 2. Swap text and hide intro layer
              gsap.set(headerHello, { opacity: 1 });
              gsap.set(introContainer, { display: "none" });
              gsap.set(introBg, { display: "none" });
              
              setAnimationComplete(true);
            }
          });

          // 3. Animate name characters with a stagger effect
          gsap.to(nameChars, {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1,
            stagger: 0.05,
            ease: "back.out(1.7)",
            delay: 0.1
          });

          // 4. Animate other hero content (Socials, CV, Stats)
          gsap.to(heroContentElements, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.5, // Wait a bit for name to start appearing
            stagger: 0.15,
            ease: "power3.out"
          });
        },
      });
    }
  }, { scope: containerRef, revertOnUpdate: true });

  return (
    <div ref={containerRef} className="h-full">
      {/* INTRO LAYERS */}
      <div id="intro-bg" className="fixed inset-0 bg-black z-40" />
      <div id="intro-container" className="fixed inset-0 z-50 flex justify-center items-center pointer-events-none">
        <h1 id="intro-hello" className="text-[25vw] font-bold text-white leading-none">
          Hello!
        </h1>
      </div>

      <section className="h-screen relative flex items-center justify-center bg-gradient-to-b from-gray-900 via-gray-900 to-black overflow-hidden">
        
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
           {/* Code Bracket */}
           <svg className="absolute top-[15%] left-[5%] w-24 h-24 text-accent/20 animate-float-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
             <path d="M16 18L22 12L16 6" strokeLinecap="round" strokeLinejoin="round"/>
             <path d="M8 6L2 12L8 18" strokeLinecap="round" strokeLinejoin="round"/>
           </svg>
           
           {/* Hexagon */}
           <svg className="absolute bottom-[20%] right-[5%] w-32 h-32 text-accent/20 animate-float-medium" viewBox="0 0 24 24" fill="currentColor">
             <path d="M12 2L21 7V17L12 22L3 17V7L12 2Z" />
           </svg>
           
           {/* Binary/Data Dots */}
           <svg className="absolute top-[20%] right-[15%] w-20 h-20 text-accent/20 animate-float-fast" viewBox="0 0 24 24" fill="currentColor">
             <circle cx="4" cy="4" r="2" />
             <circle cx="12" cy="4" r="2" />
             <circle cx="20" cy="4" r="2" />
             <circle cx="4" cy="12" r="2" />
             <circle cx="12" cy="12" r="2" />
             <circle cx="20" cy="12" r="2" />
             <circle cx="4" cy="20" r="2" />
             <circle cx="12" cy="20" r="2" />
             <circle cx="20" cy="20" r="2" />
           </svg>

           {/* Abstract Circle */}
           <svg className="absolute bottom-[10%] left-[15%] w-16 h-16 text-accent/20 animate-float-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
             <circle cx="12" cy="12" r="10" strokeDasharray="4 4"/>
           </svg>
        </div>

        {/* Main Content */}
        <div className="container mx-auto flex flex-col items-center justify-center h-full pb-40 gap-16">
          <div className="flex flex-col items-center text-center space-y-8">
            
            {/* Header Text */}
            <div className="space-y-4 flex flex-col items-center">
               {/* Target Hello for Flip Animation */}
               <h1 id="header-hello" className="h1 mb-0 text-white font-bold leading-none opacity-0">
                  Hello!
               </h1>
               
               {/* Name with GSAP Stagger Effect */}
               <div className="translate-y-4">
                 <h2 className="text-6xl font-semibold text-accent">
                   {"I'm Abhinav Yadav".split("").map((char, index) => (
                     <span 
                       key={index} 
                       className="name-char inline-block opacity-0 translate-y-5 rotate-x-90"
                       style={{ transformStyle: "preserve-3d" }}
                     >
                       {char === " " ? "\u00A0" : char}
                     </span>
                   ))}
                 </h2>
               </div>
            </div>

            {/* Socials */}
            <div className="hero-content opacity-0 translate-y-4 flex justify-center">
                <Socials
                  containerStyles="flex gap-6"
                  iconStyles="w-12 h-12 border border-accent/50 bg-accent/5 rounded-full flex justify-center items-center text-accent text-lg hover:bg-accent hover:text-primary hover:shadow-[0_0_20px_#00ff99] transition-all duration-500"
                />
            </div>

            {/* Download CV */}
            <div className="hero-content opacity-0 translate-y-4">
              <Button
                variant="outline"
                size="lg"
                className="uppercase flex items-center gap-2 backdrop-blur-lg bg-white/10 border border-white/20 transition-colors duration-200"
                asChild
              >
                <a
                  href="https://docs.google.com/document/d/1AdOwjtfyZGP8NImdYoWigDVsk14vhPl4/edit?usp=sharing&ouid=102577994594751216788&rtpof=true&sd=true"
                  download="Abhinav_Yadav_CV.pdf"
                >
                  <span>Download CV</span>
                  <FiDownload className="text-xl" />
                </a>
              </Button>
            </div>
            
          </div>
        </div>
      </section>
      <Timeline />
      <Skills />
      <Services />
      <Contact />
    </div>
  );
};

export default Home;
