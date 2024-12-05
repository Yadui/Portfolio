"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const Photo = () => {
  return (
    <div className="relative w-full h-full flex justify-center items-center">
      {/* Animation and Image Wrapper */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 2, duration: 0.4, ease: "easeIn" },
        }}
        className="relative flex justify-center items-center"
      >
        {/* Circle Animation */}
        <motion.svg
          className="absolute w-[300px] xl:w-[550px] h-[300px] xl:h-[550px]"
          fill="transparent"
          viewBox="0 0 506 506" // Adjusted to fit larger circle
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.circle
            cx="253" // Half of the viewBox width/height
            cy="253"
            r="250" // Radius slightly smaller than viewBox size
            stroke="#00ff99"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ strokeDasharray: "24 10 0 0" }}
            animate={{
              strokeDasharray: ["15 120 25 25", "16 25 92 72", "4 250 22 22"],
              rotate: [120, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </motion.svg>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 2, duration: 0.4, ease: "easeInOut" },
          }}
          className="w-[298px] h-[298px] xl:w-[498px] xl:h-[498px] relative mix-blend-lighten"
        >
          <Image
            src="/assets-1/abhinav.jpeg"
            // src="/assets-1/photo.png"
            priority
            quality={100}
            fill
            alt=""
            className="object-contain rounded-full"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Photo;
