"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  AppleHelloEnglishEffect,
  AppleHelloVietnameseEffect,
} from "@/components/ui/shadcn-io/apple-hello-effect";
import AnimatedPathText from "@/components/fancy/text/text-along-path";

gsap.registerPlugin(ScrollTrigger);

const Header = () => {
  const containerRef = useRef(null);
  const pillRef = useRef(null);
  const nameRef = useRef(null);
  const textPathRef = useRef(null);

  // State to track sequence progress
  const [stage, setStage] = useState(0);
  // 0: Init, 1: Pill, 2: Hello, 3: Name, 4: Ring
  const [helloComplete, setHelloComplete] = useState(false);
  const [greetingIndex, setGreetingIndex] = useState(0); // 0: English, 1: Vietnamese

  const navItems = [
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
    { label: "Blog", href: "/blog" },
  ];

  const nameText = "I'm Abhinav";
  // Repeat for full path coverage - 8x for dual textPath seamless loop
  const ringTextBase =
    "Cloud Architect · AI Solutions · Data Engineering · UI/UX · Platform Engineering · Automation · DevOps · Cloud Security · Product Systems · Integrations · Scalable APIs ·";
  const ringText = ringTextBase.repeat(1);

  // Initial pill animation - fade in only, no scale (preserves pill shape)
  useGSAP(
    () => {
      gsap.fromTo(
        pillRef.current,
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: 0.8,
          ease: "power2.out",
          onStart: () => setStage(1),
          onComplete: () => setStage(2),
        }
      );
    },
    { scope: containerRef }
  );

  // Animation AFTER hello animation completes
  useGSAP(
    () => {
      if (!helloComplete) return;

      const tl = gsap.timeline({
        onComplete: () => {
          setStage(4);
        },
      });

      // Name container expands + letters enter
      tl.to(nameRef.current, {
        width: "auto",
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
        onStart: () => setStage(3),
      })
        .fromTo(
          ".char",
          { x: 15, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            stagger: 0.025,
            duration: 0.35,
            ease: "power2.out",
          },
          "-=0.3"
        )
        .fromTo(
          "#header-pill-ring",
          { opacity: 0 },
          { opacity: 1, duration: 0.8, ease: "power2.out" }
        )
        // Nav Links reveal (Curtain from top to bottom)
        .to(
          ".nav-curtain",
          {
            scaleY: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.inOut",
          },
          "-=0.8"
        );
    },
    { scope: containerRef, dependencies: [helloComplete] }
  );

  // Callback when hello animation finishes
  const handleHelloComplete = () => {
    // First ever completion triggers the rest of the intro
    if (!helloComplete) {
      setHelloComplete(true);
    }

    // Cycle to next language after a short pause
    setTimeout(() => {
      setGreetingIndex((prev) => (prev === 0 ? 1 : 0));
    }, 2000);
  };

  return (
    <div
      ref={containerRef}
      className="h-screen w-full bg-black relative overflow-hidden flex items-center justify-center"
    >
      {/* --- CENTRAL STAGE --- */}
      <div className="relative transform-gpu">
        {/* Animated Pill Container */}
        <div
          ref={pillRef}
          className="pill-container relative bg-white text-black h-[120px] md:h-[160px] min-w-[280px] md:min-w-[400px] rounded-full flex items-center justify-center overflow-hidden z-20 origin-center opacity-0 shadow-2xl px-10 md:px-16"
        >
          {/* Content container - flexbox for side-by-side layout */}
          <div className="flex items-center justify-center gap-3 md:gap-5">
            {/* Greeting Area - Cycled infinitely with AnimatePresence */}
            <div className="hello-container flex-shrink-0 min-h-[40px] md:min-h-[56px] min-w-[100px] md:min-w-[140px] flex items-center justify-center">
              {stage >= 2 && (
                <AnimatePresence mode="wait">
                  {/* {greetingIndex === 0 ? ( */}
                    <motion.div
                      key="en"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1 }}
                    >
                      <AppleHelloEnglishEffect
                        className="h-10 md:h-14 text-black"
                        speed={0.8}
                        onAnimationComplete={handleHelloComplete}
                      />
                    </motion.div>
                  {/* // ) : (
                  //   <motion.div
                  //     key="vi"
                  //     initial={{ opacity: 0 }}
                  //     animate={{ opacity: 1 }}
                  //     exit={{ opacity: 0 }}
                  //     transition={{ duration: 1 }}
                  //   >
                  //     <AppleHelloVietnameseEffect
                  //       className="h-10 md:h-14 text-black"
                  //       speed={0.}
                  //       onAnimationComplete={handleHelloComplete}
                  //     />
                  //   </motion.div> */}
                </AnimatePresence>
              )}
            </div>

            {/* "I'm Abhinav" text - hidden initially, enters from right */}
            <div
              ref={nameRef}
              className="name-container flex items-center opacity-0"
              style={{ width: 0, overflow: "hidden" }}
            >
              <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-black flex items-center whitespace-nowrap">
                {nameText.split("").map((char, i) => (
                  <span
                    key={i}
                    className="char inline-block"
                    style={{ minWidth: char === " " ? "0.2em" : "auto" }}
                  >
                    {char}
                  </span>
                ))}
              </h1>
            </div>
          </div>
        </div>

        <div
          id="header-pill-ring"
          className="absolute inset-[-80px] pointer-events-none opacity-0 z-10"
        >
          <AnimatedPathText
            path="M 170, 30 L 590, 30 A 140,140 0 0 1 590, 310 L 170, 310 A 140,140 0 0 1 170, 30 Z"
            viewBox="0 0 760 340"
            text={ringText}
            textClassName="text-[14px] font-semibold tracking-[0.12em] uppercase"
            duration={25}
            svgClassName="w-full h-full text-white/40"
            preserveAspectRatio="xMidYMid meet"
            textAnchor="start"
          />
        </div>
      </div>

      {/* --- NAV LINKS (Right Side) --- */}
      <div className="fixed right-12 top-1/2 -translate-y-1/2 flex flex-col items-end gap-6 z-50 mix-blend-difference text-white">
        {navItems.map((item, index) => (
          <ScrollMaskLink key={index} label={item.label} href={item.href} />
        ))}
      </div>
    </div>
  );
};

// Component for Link with Scroll-Curtain Effect
const ScrollMaskLink = ({ label, href }) => {
  const linkRef = useRef(null);
  const curtainRef = useRef(null);

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "500px top",
        scrub: true,
        onUpdate: (self) => {
          if (curtainRef.current) {
            gsap.set(curtainRef.current, {
              scaleY: self.progress,
              transformOrigin: "bottom",
            });
          }
        },
      });
    },
    { scope: linkRef }
  );

  return (
    <a
      ref={linkRef}
      href={href}
      className="relative block text-lg font-light tracking-wide hover:text-white/80 transition-colors overflow-hidden group"
    >
      <span className="block relative z-10">{label}</span>
      <div
        ref={curtainRef}
        className="nav-curtain absolute inset-0 bg-black z-20 scale-y-100 origin-bottom"
      />
    </a>
  );
};

export default Header;
