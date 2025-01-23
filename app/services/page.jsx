"use client";

import { useState, useEffect } from "react";
import { BsArrowDownRight } from "react-icons/bs";
import Link from "next/link";
import { motion } from "framer-motion";

const services = [
  {
    num: "01",
    title: "Data Analyst",
    description:
      "Specializing in data analysis and visualization using Python, SQL, and Tableau. I transform complex datasets into actionable insights and build data-driven solutions.",
    href: "/",
  },
  {
    num: "02",
    title: "Web Development",
    description:
      "Expert in building modern web applications using React, Next.js, and Node.js. I create responsive, high-performance websites with clean, maintainable code.",
    href: "/",
  },
  {
    num: "03",
    title: "UI/UX Design",
    description:
      "Crafting intuitive user interfaces and experiences using Figma and Adobe XD. I focus on creating designs that are both beautiful and functional.",
    href: "/",
  },
  {
    num: "04",
    title: "Prompt Engg & AI Training",
    description:
      "Specializing in crafting effective prompts and training AI models. I optimize language models for specific tasks and create AI solutions that understand and respond to complex queries.",
    href: "/",
  },
];

const Services = () => {
  const [transitionsComplete, setTransitionsComplete] = useState(false);

  // Simulate transitions (stair effect + page transition)
  useEffect(() => {
    const timer = setTimeout(() => {
      setTransitionsComplete(true); // Set this to true after transitions are complete
    }, 1000); // Adjust this duration to match your transitions (e.g., 3 seconds)

    return () => clearTimeout(timer); // Cleanup timeout
  }, []);

  return (
    <section className="min-h-[80vh] flex flex-col justify-center py-12 xl:py-8">
      <div className="container mx-auto">
        {/* Only animate services after transitions are complete */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={
            transitionsComplete
              ? {
                  opacity: 1,
                  transition: { delay: 0.4, duration: 0.8, ease: "easeInOut" },
                }
              : {}
          }
          className="grid grid-col-1 md:grid-cols-2 gap-[60px]"
        >
          {services.map((service, index) => {
            const delayBase = index * 0.8; // Delay based on the index for sequential animations

            return (
              <motion.div
                key={index}
                initial="hidden"
                animate={transitionsComplete ? "visible" : "hidden"}
                viewport={{ once: true, amount: 0.5 }}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.6,
                      ease: "easeOut",
                      delay: delayBase,
                    },
                  },
                }}
                className="flex-1 flex flex-col justify-center gap-6 group"
              >
                {/* Number */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={
                    transitionsComplete
                      ? {
                          scale: 1,
                          transition: {
                            delay: delayBase + 0.2,
                            duration: 0.4,
                            ease: "easeOut",
                          },
                        }
                      : {}
                  }
                  className="w-full flex justify-between items-center"
                >
                  <div className="text-5xl font-extrabold text-outline text-transparent group-hover:text-outline-hover transition-all duration-500">
                    {service.num}
                  </div>
                  {/* Link */}
                  <motion.div
                    whileHover={{ rotate: -45, scale: 1.1 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <Link
                      href={service.href}
                      className="w-[70px] h-[70px] rounded-full bg-white group-hover:bg-accent transition-all duration-500 flex justify-center items-center"
                    >
                      <BsArrowDownRight className="text-primary text-3xl" />
                    </Link>
                  </motion.div>
                </motion.div>
                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, x: -30 }}
                  animate={
                    transitionsComplete
                      ? {
                          opacity: 1,
                          x: 0,
                          transition: { delay: delayBase + 0.4, duration: 0.5 },
                        }
                      : {}
                  }
                  className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500"
                >
                  {service.title}
                </motion.h2>
                {/* Description */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={
                    transitionsComplete
                      ? {
                          opacity: 1,
                          transition: { delay: delayBase + 0.6, duration: 0.4 },
                        }
                      : {}
                  }
                  className="text-white/60"
                >
                  {service.description}
                </motion.p>
                {/* Border */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={
                    transitionsComplete
                      ? {
                          scaleX: 1,
                          transition: {
                            delay: delayBase + 0.8,
                            duration: 0.5,
                            ease: "easeInOut",
                          },
                        }
                      : {}
                  }
                  className="border-b border-white/20 w-full"
                ></motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
