"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, MotionValue, motionValue } from "framer-motion";
import {
  FaHtml5, FaJs, FaReact, FaPython, FaGithub, FaDocker, FaAws
} from "react-icons/fa";
import {
  SiTailwindcss, SiNextdotjs, SiMicrosoftazure, SiNumpy,
  SiPandas, SiOpenai, SiVisualstudiocode, SiGithubcopilot,
  SiKubernetes, SiTerraform, SiRedux, SiExpress, SiPostgresql,
  SiRedis, SiHuggingface, SiTensorflow, SiNotion, SiFigma
} from "react-icons/si";
import * as d3 from "d3-force";

// --- MAPPED TO SCREENSHOT LAYOUT ---
const initialSkills = [
  // --- TOP ROW ---
  { id: "js", name: "JS", icon: <FaJs />, color: "#F7DF1E", bx: 0, by: -50, group: "web", connections: ["react", "python"] }, // JS Yellow
  { id: "react", name: "React", icon: <FaReact />, color: "#61DAFB", bx: -30, by: -35, group: "web", connections: ["js", "next", "tailwind", "html"] }, // React Cyan
  { id: "python", name: "Python", icon: <FaPython />, color: "#3776AB", bx: 22, by: -32, group: "ai", connections: ["js", "openai", "pandas"] }, // Python Blue

  // --- LEFT FLANK ---
  { id: "tailwind", name: "Tailwind", icon: <SiTailwindcss />, color: "#06B6D4", bx: -45, by: 30, group: "web", connections: ["react", "html"] }, // Tailwind Cyan
  { id: "html", name: "HTML", icon: <FaHtml5 />, color: "#E34F26", bx: -50, by: 5, group: "web", connections: ["react", "tailwind"] }, // HTML Orange

  // --- CENTER CORE ---
  { id: "next", name: "Next.js", icon: <SiNextdotjs />, color: "#000000", bx: -15, by: -10, group: "web", connections: ["react", "azure"] }, // Next Black
  { id: "azure", name: "Azure", icon: <SiMicrosoftazure />, color: "#0078D4", bx: 3, by: -15, group: "cloud", connections: ["next", "docker", "openai"] }, // Azure Blue
  { id: "docker", name: "Docker", icon: <FaDocker />, color: "#2496ED", bx: -25, by: -5, group: "cloud", connections: ["azure", "aws", "k8s"] }, // Docker Blue
  { id: "aws", name: "AWS", icon: <FaAws />, color: "#FF9900", bx: 35, by: -25, group: "cloud", connections: ["docker", "terraform"] }, // AWS Orange

  // --- RIGHT FLANK ---
  { id: "openai", name: "OpenAI", icon: <SiOpenai />, color: "#10A37F", bx: 15, by: -15, group: "ai", connections: ["python", "azure", "copilot"] }, // OpenAI Green
  { id: "pandas", name: "Pandas", icon: <SiPandas />, color: "#150458", bx: 25, by: -10, group: "ai", connections: ["python", "numpy"] }, // Pandas Navy
  { id: "copilot", name: "Copilot", icon: <SiGithubcopilot />, color: "#000000", bx: 25, by: 5, group: "ai", connections: ["openai", "vscode", "numpy"] }, // Copilot Black
  { id: "numpy", name: "NumPy", icon: <SiNumpy />, color: "#013243", bx: 35, by: 10, group: "ai", connections: ["pandas", "copilot"] }, // NumPy Blue

  // --- BOTTOM ROW ---
  { id: "k8s", name: "K8s", icon: <SiKubernetes />, color: "#326CE5", bx: -10, by: 30, group: "cloud", connections: ["docker", "terraform"] }, // K8s Blue
  { id: "terraform", name: "Terraform", icon: <SiTerraform />, color: "#7B42BC", bx: 5, by: 35, group: "cloud", connections: ["aws", "k8s"] }, // Terraform Purple
  { id: "vscode", name: "VS Code", icon: <SiVisualstudiocode />, color: "#007ACC", bx: 30, by: 5, group: "tools", connections: ["copilot", "github"] }, // VS Code Blue

  // --- BRAIN STEM ---
  { id: "github", name: "GitHub", icon: <FaGithub />, color: "#181717", bx: -10, by: 50, group: "tools", connections: ["vscode"] }, // GitHub Black
  // --- EXTRA WEB TECH ---
  {
    id: "redux",
    name: "Redux",
    icon: <SiRedux />,
    color: "#764ABC",
    bx: -18, by: -18,
    group: "web",
    connections: ["react"]
  },

  {
    id: "express",
    name: "Express",
    icon: <SiExpress />,
    color: "#000000",
    bx: -15, by: -20,
    group: "web",
    connections: ["next"]
  },

  // --- EXTRA CLOUD/DB ---
  {
    id: "postgres",
    name: "Postgres",
    icon: <SiPostgresql />,
    color: "#336791",
    bx: -32, by: 12,
    group: "cloud",
    connections: ["docker"]
  },

  {
    id: "redis",
    name: "Redis",
    icon: <SiRedis />,
    color: "#DC382D",
    bx: -28, by: 20,
    group: "cloud",
    connections: ["docker"]
  },

  // --- EXTRA AI/ML ---
  {
    id: "huggingface",
    name: "HuggingFace",
    icon: <SiHuggingface />,
    color: "#FFCC00",
    bx: 22, by: -6,
    group: "ai",
    connections: ["openai"]
  },

  {
    id: "tensorflow",
    name: "TensorFlow",
    icon: <SiTensorflow />,
    color: "#FF6F00",
    bx: 25, by: 5,
    group: "ai",
    connections: ["numpy"]
  },

  // --- EXTRA TOOLS / DESIGN ---
  {
    id: "notion",
    name: "Notion",
    icon: <SiNotion />,
    color: "#000000",
    bx: -10, by: 30,
    group: "tools",
    connections: ["github"]
  },

  {
    id: "figma",
    name: "Figma",
    icon: <SiFigma />,
    color: "#F24E1E",
    bx: 45, by: 15,
    group: "tools",
    connections: ["vscode"]
  },
] as const;

type SkillNode = {
  id: string;
  x: number;
  y: number;
  fx?: number | null;
  fy?: number | null;
  targetX?: number;
  targetY?: number;
} & (typeof initialSkills)[number];

let nodes: SkillNode[] = [];

// Soft boundary force
function forceContainment(alpha: number) {
  const BRAIN_RADIUS_APPROX = 330;
  const CENTER_X = 0;
  const CENTER_Y = 0;

  nodes.forEach((node) => {
    let dx = node.x - CENTER_X;
    let dy = node.y - CENTER_Y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > BRAIN_RADIUS_APPROX) {
      let ratio = BRAIN_RADIUS_APPROX / distance;
      let targetX = CENTER_X + dx * ratio;
      let targetY = CENTER_Y + dy * ratio;
      node.x = node.x + (targetX - node.x) * alpha * 0.18;
      node.y = node.y + (targetY - node.y) * alpha * 0.18;
    }
  });
}

/**
 * Individual Connection Component
 * Handles its own random timing for the pulse animation to create an organic look.
 */
const SkillConnection = ({
  x1, y1, x2, y2,
  isRelated
}: {
  x1: MotionValue<number>, y1: MotionValue<number>,
  x2: MotionValue<number>, y2: MotionValue<number>,
  isRelated: boolean
}) => {
  // We use state to hold the random timing so it doesn't change on every render,
  // but only generates once on mount (client-side only to avoid hydration mismatch).
  const [timing, setTiming] = useState<{ duration: number; delay: number } | null>(null);

  useEffect(() => {
    // Random duration between 1.5s and 3.5s
    const duration = 1.5 + Math.random() * 3.0;
    // Random initial delay between 0s and 4s so they don't all start at once
    const delay = Math.random() * 4.0;
    setTiming({ duration, delay });
  }, []);

  return (
    <>
      {/* 1. Base Static Line (The wire) */}
      <motion.line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={isRelated ? "#00ff99" : "#cbd5e1"} // Bright Green if related, slate-300 if not
        strokeWidth={isRelated ? 3 : 1.5}
        strokeLinecap="round"
        opacity={isRelated ? 1 : 0.3}
        transition={{ duration: 0.2 }}
      />

      {/* 2. Pulse Animation (The data packet) 
          Only render if timing is set (client-side) to avoid hydration errors.
      */}
      {timing && (
        <motion.line
          x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={isRelated ? "#00ff99" : "#4ade80"} // Bright Green if related, Green pulse otherwise
          strokeWidth={isRelated ? 3 : 5}
          strokeLinecap="round"
          // Dash array: [Length of pulse, Length of gap]
          // Gap is huge (1000) to ensure only one pulse is visible at a time
          strokeDasharray="15 1000"
          // Animate offset to move the dash along the path
          animate={{
            strokeDashoffset: [-1015, 15] // Moves from "before start" to "after end"
          }}
          transition={{
            duration: timing.duration,
            repeat: Infinity,
            repeatDelay: Math.random() * 5, // Add random pause between pulses
            delay: timing.delay,
            ease: "linear",
          }}
          style={{ opacity: isRelated ? 1 : 0.6 }}
        />
      )}
    </>
  );
};

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const positionsRef = useRef<Record<string, { x: MotionValue<number>; y: MotionValue<number> }> | null>(null);
  if (!positionsRef.current) {
    positionsRef.current = initialSkills.reduce((acc, s) => {
      acc[s.id] = { x: motionValue(0), y: motionValue(0) };
      return acc;
    }, {} as Record<string, { x: MotionValue<number>; y: MotionValue<number> }>);
  }
  const positions = positionsRef.current;

  useEffect(() => {
    if (!containerRef.current) return;

    const COORDINATE_SCALE = 12;

    nodes = initialSkills.map((s) => {
      const tx = s.bx * COORDINATE_SCALE;
      const ty = s.by * COORDINATE_SCALE;
      return { ...s, x: tx, y: ty, targetX: tx, targetY: ty };
    });

    const links = initialSkills.flatMap((s) =>
      s.connections
        .map((targetId) => {
          const sourceNode = nodes.find(n => n.id === s.id);
          const targetNode = nodes.find(n => n.id === targetId);
          return sourceNode && targetNode ? { source: sourceNode, target: targetNode } : null;
        })
        .filter(Boolean)
    ) as { source: SkillNode; target: SkillNode }[];

    const simulation = d3.forceSimulation(nodes as any)
      .force("charge", d3.forceManyBody().strength(-120))
      .force("link", (d3.forceLink(links).distance(70)))
      .force("collide", d3.forceCollide(55).strength(1))
      .force("x", d3.forceX((d: any) => d.targetX).strength(0.08))
      .force("y", d3.forceY((d: any) => d.targetY).strength(0.08))
      .force("containment", forceContainment as any);

    simulation.on("tick", () => {
      nodes.forEach((node) => {
        positions[node.id].x.set(node.x);
        positions[node.id].y.set(node.y);
      });
    });

    (containerRef.current as any).__simulation = simulation;
    (containerRef.current as any).__nodes = nodes;

    return () => {
      simulation.stop();
    };
  }, [positions]);

  const handleDragStart = (id: string) => {
    setDraggingId(id);
    const simulation = (containerRef.current as any)?.__simulation;
    const nodes = (containerRef.current as any)?.__nodes as SkillNode[];
    const node = nodes?.find((n) => n.id === id);
    if (simulation && node) {
      simulation.alphaTarget(0.3).restart();
      node.fx = node.x;
      node.fy = node.y;
    }
  };

  const handleDrag = (id: string, info: any) => {
    const nodes = (containerRef.current as any)?.__nodes as SkillNode[];
    const node = nodes?.find((n) => n.id === id);
    if (node) {
      node.fx = positions[id].x.get();
      node.fy = positions[id].y.get();
    }
  };

  const handleDragEnd = (id: string) => {
    setDraggingId(null);
    const simulation = (containerRef.current as any)?.__simulation;
    const nodes = (containerRef.current as any)?.__nodes as SkillNode[];
    const node = nodes?.find((n) => n.id === id);
    if (simulation && node) {
      simulation.alphaTarget(0);
      node.fx = null;
      node.fy = null;
    }
  };

  return (
    <section className="py-28 bg-white overflow-hidden">
      <h2 className="text-center text-4xl font-bold max-h-full text-gray-900 mb-5">Technical Skills</h2>

      <div
        ref={containerRef}
        className="relative mx-auto w-full h-[1000px] flex items-center justify-center overflow-visible -mt-20"
        style={{ transform: "translateZ(0)" }}
      >
        {/* Background Decorative SVG */}
        <svg id="eFs69VwC5ck1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 300 300" shapeRendering="geometricPrecision" textRendering="geometricPrecision" project-id="9dd035939f82413b8dd7f743180e4a30" export-id="bc5e64b270314740b7ac8b8a4ec32bcc"
          className="absolute w-[1350px] h-[1350px] max-w-none opacity-20"
          style={{
            transform: 'translate(-50%, -45%)',
            top: '50%',
            left: '50%',
          }}
        >
          <path d="" fill="none" stroke="#3f5787" strokeWidth="0.6" />
          <path d="M92.4466,158.59289c-10.57235,0-23.37585,2.66875-33.4468-1.35963-14.59217-5.83687-25.3364-28.69193-17.40321-43.2361c5.49842-10.08043,14.19438-16.01631,22.56979-22.29787c7.0864-5.3148,7.438735-13.307333,15.964935-18.423053c6.46625-3.87975,23.721925-2.448447,29.990415-5.234437c23.51382-10.45058,30.43951-12.31519,54.65697-5.71043c7.63907,2.08338,18.31928.501,25.01712,5.71043c3.00741,2.33909,6.38445,8.430948,9.51738,10.310708c4.88749,2.9325,9.55501,2.246242,13.32433,7.092512c2.34617,3.0165,4.28835,13.63771,6.52621,15.46869c6.55855,5.36609,11.56941,3.65753,14.14011,13.08345c1.18386,4.34084-.89316,13.40258.27192,15.49974c3.57408,6.43334,6.683512,4.41089,7.868142,16.2572.88526,8.85261-2.805572,11.70347-3.245412,16.1019-.55452,5.54522-3.962324,8.753438-10.009294,12.381618-2.96507,1.77904-13.947476,5.864712-15.551676,7.468922-8.22022,8.22022,5.16793,4.31119-13.32433,11.7081-5.98571,2.39429-3.51594,5.26384-9.51738,4.06356-.44441-.08888-9.44114,3.78874-9.78931,4.07888-2.84329,2.36941,6.45936,17.45335,2.1754,20.66631-13.73537,10.30153-32.62569-13.53938-37.7976-24.74519-.8991-1.94805-4.21267-13.13355-6.52621-13.59626-9.95966-1.99194-15.94398,6.40088-27.73637-2.1754-4.87527-3.54565-9.95011-8.15188-12.23663-13.86818-.54541-1.36353-1.60167-5.97239-3.2631-6.52621-4.83879-1.61293,6.73016.84297-2.1754-2.71926" fill="none" stroke="#3f5787" strokeWidth="0.6" />
        </svg>

        {/* --- CONNECTIONS LAYER --- */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
          style={{ overflow: 'visible', transform: 'translate(50%, 50%)' }}
        >
          <g>
            {initialSkills.flatMap(a =>
              a.connections.map(cid => {
                const b = initialSkills.find(s => s.id === cid);
                if (!b) return null;

                const isRelated = draggingId !== null && (a.id === draggingId || b.id === draggingId);

                return (
                  <SkillConnection
                    key={`${a.id}-${b.id}`}
                    x1={positions[a.id].x}
                    y1={positions[a.id].y}
                    x2={positions[b.id].x}
                    y2={positions[b.id].y}
                    isRelated={isRelated}
                  />
                );
              })
            )}
          </g>
        </svg>

        {/* --- NODES LAYER --- */}
        {initialSkills.map(skill => {
          const isDragging = draggingId === skill.id;
          const isOther = draggingId && draggingId !== skill.id;

          return (
            <motion.div
              key={skill.id}
              drag
              dragElastic={0}
              dragMomentum={false}
              onDragStart={() => handleDragStart(skill.id)}
              onDrag={(e, info) => handleDrag(skill.id, info)}
              onDragEnd={() => handleDragEnd(skill.id)}
              style={{
                x: positions[skill.id].x,
                y: positions[skill.id].y,
                position: "absolute",
                left: "50%",
                top: "50%",
              }}
              whileHover={{ scale: 1.15, zIndex: 50 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                scale: isDragging ? 1.2 : (isOther ? 0.9 : 1),
                opacity: isOther ? 0.5 : 1,
                filter: isOther ? "blur(1px)" : "none",
              }}
              className="w-16 h-16 -ml-8 -mt-8 rounded-full bg-white shadow-xl border border-gray-100 cursor-grab active:cursor-grabbing flex items-center justify-center z-20 transition-colors"
            >
              {/* BRAND COLOR APPLIED HERE */}
              <div className="text-3xl" style={{ color: skill.color }}>
                {skill.icon}
              </div>

              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-[10px] font-bold tracking-wide rounded opacity-0 hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-30">
                {skill.name}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}