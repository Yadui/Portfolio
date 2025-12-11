"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { BsArrowDown } from "react-icons/bs";
import { FiToggleLeft, FiToggleRight } from "react-icons/fi";
import { motion } from "framer-motion";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(Flip);

const Header = ({ initialAnimEnabled = true }) => {
  const containerRef = useRef(null);
  const introHelloRef = useRef(null);
  const headerHelloRef = useRef(null);
  const introBgRef = useRef(null);
  const introContainerRef = useRef(null);
  
  const [animationComplete, setAnimationComplete] = useState(false);
  const [animEnabled, setAnimEnabled] = useState(initialAnimEnabled);
  const [mounted, setMounted] = useState(false);
  const [introSkipped, setIntroSkipped] = useState(!initialAnimEnabled);

  useEffect(() => {
    setMounted(true);
    // Sync state with localStorage if needed, but prop (cookie) is source of truth for initial render
    const localDisabled = localStorage.getItem("animationDisabled") === "true";
    if (localDisabled !== !initialAnimEnabled) {
        // If mismatch, we could sync one way or the other. 
        // Let's trust the prop for this session to avoid flash.
    }
  }, [initialAnimEnabled]);

  const toggleAnim = () => {
    const newState = !animEnabled;
    setAnimEnabled(newState);
    setIntroSkipped(!newState);
    
    // Update both storages
    localStorage.setItem("animationDisabled", (!newState).toString());
    document.cookie = `animationDisabled=${!newState}; path=/; max-age=31536000`; // 1 year
  };

  useGSAP(() => {
    const introHello = introHelloRef.current;
    const headerHello = headerHelloRef.current;
    const introBg = introBgRef.current;
    const introContainer = introContainerRef.current;

    if (animEnabled) {
        // PLAY ANIMATION
        if (introHello && headerHello && introBg && introContainer) {
            // Ensure intro is visible (remove hidden class via state, but also ensure GSAP visibility)
            gsap.set([introBg, introContainer], { autoAlpha: 1, display: "flex" });

            Flip.fit(introHello, headerHello, {
                duration: 1.2,
                ease: "power4.inOut",
                scale: true,
                absolute: true,
                onComplete: () => {
                    gsap.to(introBg, {
                        opacity: 0,
                        duration: 0.8,
                        ease: "power2.inOut",
                        onComplete: () => {
                            gsap.set(headerHello, { opacity: 1 });
                            gsap.set(introContainer, { display: "none" });
                            gsap.set(introBg, { display: "none" });
                            setAnimationComplete(true);
                        }
                    });
                },
            });
        }
    } else {
        // SKIP ANIMATION
        // Layers are hidden by default via JSX className when animEnabled is false
        if (headerHello) gsap.set(headerHello, { opacity: 1 });
        setAnimationComplete(true);
    }
  }, { scope: containerRef, revertOnUpdate: true, dependencies: [] }); // Run once on mount

  const navItems = [
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
    { label: "Blog", href: "/blog" },
  ];

  return (
    <div ref={containerRef} className="h-full">
      {/* Animation Toggle */}
      {mounted && (
        <button 
            onClick={toggleAnim} 
            className="fixed top-6 right-6 z-[60] text-white/50 hover:text-white flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors"
        >
            <span>Intro</span>
            {animEnabled ? <FiToggleRight size={24} className="text-accent" /> : <FiToggleLeft size={24} />}
        </button>
      )}

      {/* INTRO LAYERS */}
      {/* If animEnabled is false, we hide these immediately with CSS to prevent flash */}
      <div 
        ref={introBgRef} 
        id="intro-bg" 
        className={`fixed inset-0 bg-black z-40 ${animEnabled ? "" : "hidden"}`} 
      />
      <div 
        ref={introContainerRef} 
        id="intro-container" 
        className={`fixed inset-0 z-50 flex justify-center items-center pointer-events-none ${animEnabled ? "" : "hidden"}`}
      >
        <h1 ref={introHelloRef} id="intro-hello" className="text-[25vw] font-bold text-white leading-none tracking-tighter">
          Hello!
        </h1>
      </div>

      <section className="h-screen relative flex flex-col overflow-hidden">
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
        <div className="h-1/2 w-full flex flex-col justify-center px-4 md:px-0 relative z-1">
            <div className="container mr-auto ml-8">
                <div className="flex flex-col items-start justify-center">
                    <h1 ref={headerHelloRef} id="header-hello" className="text-7xl md:text-9xl font-bold text-white tracking-tighter leading-none opacity-0 m-0 p-0">
                        Hello!
                    </h1>
                    <motion.h2 
                      initial={{ opacity: 0, y: 20 }}
                      animate={animationComplete ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: introSkipped ? 0 : 0.8 }}
                      className="mt-2 text-5xl md:text-7xl font-medium text-white/ tracking-tight"
                    >
                        I'm Abhinav.
                    </motion.h2>
                </div>
            </div>
        </div>

        {/* Navigation Branches (Right Side) */}
        <div className="absolute left-12 top-32 h-full w-[300px] md:w-[400px] z-10 flex flex-col justify-center items-start pr-8 md:pr-16 gap-12 md:gap-16">
           {navItems.map((item, index) => {
              return (
                  <a
                    key={index}
                    href={item.href}
                    className="ml-2 text-3xl md:text-4xl tracking-wide text-white hover:text-accent"
                  >
                    {item.label}
                  </a>
              );
            })}
        </div>

        {/* Bottom Half - Transparent to show Background Image */}
        <div className="h-1/2 w-full relative z-1">
            {/* Bottom Arrow */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={animationComplete ? { opacity: 1 } : {}}
                transition={{ delay: introSkipped ? 0 : 0.5, duration: introSkipped ? 0 : 0.5 }}
                className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
            >
              <a href="#projects">
                <BsArrowDown className="text-4xl text-white animate-bounce" />
              </a>
            </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Header;
