"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiAward, FiCalendar, FiMapPin } from "react-icons/fi";

const achievements = [
  {
    id: 1,
    title: "Midnight Summit Hackathon",
    rank: "1st Place",
    emoji: "🥇",
    organization: "Midnight Foundation",
    type: "In-Person",
    year: "2025",
    color: "#FFD700", // Gold
  },
  {
    id: 2,
    title: "Microsoft Hackathon & Ideathon",
    rank: "1st Place",
    emoji: "🥇",
    organization: "Microsoft",
    type: "Hackathon",
    year: "2025",
    color: "#FFD700", // Gold
  },
  {
    id: 3,
    title: "Smart India Hackathon",
    rank: "2nd Place",
    emoji: "🥈",
    organization: "Indian Institute of Technology Bombay",
    type: "National",
    year: "2023",
    color: "#C0C0C0", // Silver
  },
];

const AchievementCard = ({ achievement, index }) => {
  const cardRef = useRef(null);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group relative"
    >
      {/* Main Card */}
      <div className="relative bg-[#18181b] border border-white/10 rounded-3xl p-8 overflow-hidden transition-all duration-500 hover:border-accent/50 hover:shadow-[0_0_60px_rgba(0,255,153,0.1)]">
        {/* Animated Gradient Background */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${achievement.color}15, transparent 70%)`,
          }}
        />

        {/* Floating Particles Effect */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-accent/30"
              animate={{
                y: [100, -20],
                x: [Math.random() * 100, Math.random() * 100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
              style={{
                left: `${20 + i * 30}%`,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Top Row: Rank Badge & Year */}
          <div className="flex items-start justify-between mb-6">
            {/* Rank Badge with Glow */}
            <div className="relative">
              <motion.div
                animate={{
                  boxShadow: [
                    `0 0 20px ${achievement.color}40`,
                    `0 0 40px ${achievement.color}60`,
                    `0 0 20px ${achievement.color}40`,
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex items-center gap-2 px-4 py-2 rounded-full border"
                style={{
                  backgroundColor: `${achievement.color}15`,
                  borderColor: `${achievement.color}40`,
                }}
              >
                <span className="text-2xl">{achievement.emoji}</span>
                <span
                  className="font-bold text-sm uppercase tracking-wider"
                  style={{ color: achievement.color }}
                >
                  {achievement.rank}
                </span>
              </motion.div>
            </div>

            {/* Year Badge */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <FiCalendar className="text-accent text-sm" />
              <span className="text-white/70 text-sm font-medium">
                {achievement.year}
              </span>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-accent transition-colors duration-300">
            {achievement.title}
          </h3>

          {/* Organization */}
          <div className="flex items-center gap-2 mb-4">
            <FiMapPin className="text-accent/70" />
            <span className="text-white/60 text-sm">
              {achievement.organization}
            </span>
          </div>

          {/* Type Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/20">
            <FiAward className="text-accent text-sm" />
            <span className="text-accent text-xs font-semibold uppercase tracking-wider">
              {achievement.type}
            </span>
          </div>
        </div>

        {/* Decorative Corner Accent */}
        <div
          className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"
          style={{ backgroundColor: achievement.color }}
        />
      </div>
    </motion.div>
  );
};

const Achievements = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      id="achievements"
      className="py-24 bg-black relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-yellow-500/5 rounded-full blur-3xl" />
      </motion.div>

      <div
        ref={containerRef}
        className="container mx-auto px-4 max-w-6xl relative z-10"
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Trophy Icon with Animation */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.2,
            }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-accent/20 to-yellow-500/20 border border-accent/30 mb-6"
          >
            <span className="text-4xl">🏆</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Achievements
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Recognition and awards earned through hackathons and competitions
          </p>
        </motion.div>

        {/* Achievement Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              index={index}
            />
          ))}
        </div>

        {/* Bottom Decorative Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
        />
      </div>
    </section>
  );
};

export default Achievements;
