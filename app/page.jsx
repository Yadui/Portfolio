"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { BsArrowDown } from "react-icons/bs";
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

    if (introHello && headerHello && introBg) {
      // Animate the intro "Hello!" to the position of the header "Hello!"
      Flip.fit(introHello, headerHello, {
        duration: 1.2,
        ease: "power4.inOut",
        scale: true,
        absolute: true,
        color: "#1c1c22", // Animate color during the flip
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
        },
      });
    }
  }, { scope: containerRef, revertOnUpdate: true });

  return (
    <div ref={containerRef} className="h-full">
      {/* INTRO LAYERS */}
      <div id="intro-bg" className="fixed inset-0 bg-black z-40" />
      <div id="intro-container" className="fixed inset-0 z-50 flex justify-center items-center pointer-events-none">
        <h1 id="intro-hello" className="text-[25vw] font-bold text-white leading-none tracking-tighter">
          Hello!
        </h1>
      </div>

      <section className="h-screen relative flex flex-col">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full z-0">
            <Image 
                src="/assets/backgrounds/header-fractal.jpg"
                alt="Fractal Background"
                fill
                className="object-cover"
                priority
            />
            {/* Optional: Subtle gradient overlay for bottom half readability if needed */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20"></div>
        </div>

        {/* Top Half - White Background */}
        <div className="h-1/2 w-full flex flex-col justify-center px-4 md:px-0 relative z-10">
            <div className="container mr-auto ml-8">
                <div className="flex flex-col items-start justify-center">
                    <h1 id="header-hello" className="text-7xl md:text-9xl font-bold text-white tracking-tighter leading-none opacity-0 m-0 p-0">
                        Hello!
                    </h1>
                    <motion.h2 
                      initial={{ opacity: 0, y: 20 }}
                      animate={animationComplete ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.8 }}
                      className="mt-2 text-5xl md:text-7xl font-medium text-white tracking-tight"
                    >
                        I'm Abhinav.
                    </motion.h2>
                </div>
            </div>
        </div>

        {/* Bottom Half - Transparent to show Background Image */}
        <div className="h-1/2 w-full relative z-10">
            {/* Bottom Arrow */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={animationComplete ? { opacity: 1 } : {}}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
            >
                <BsArrowDown className="text-4xl text-white animate-bounce" />
            </motion.div>
        </div>
      </section>
      
      <Services />
      <Timeline />
      <Skills />
      <Contact />
    </div>
  );
};

export default Home;
