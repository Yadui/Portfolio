"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, MotionValue, motionValue } from "framer-motion";
import {
  FaHtml5, FaJs, FaReact, FaPython, FaGithub, FaDocker, FaAws
} from "react-icons/fa";
import {
  SiTailwindcss, SiNextdotjs, SiMicrosoftazure, SiNumpy,
  SiPandas, SiOpenai, SiVisualstudiocode, SiGithubcopilot,
  SiKubernetes, SiTerraform
} from "react-icons/si";
import * as d3 from "d3-force";

const initialSkills = [
  // Left Hemisphere (Web & Cloud) - Logic, Structure
  { id: "react", name: "React", icon: <FaReact />, bx: -20, by: -15, group: "web", connections: ["next","tailwind","js"] },
  { id: "next", name: "Next.js", icon: <SiNextdotjs />, bx: -30, by: -5, group: "web", connections: ["react","tailwind"] },
  { id: "tailwind", name: "Tailwind", icon: <SiTailwindcss />, bx: -25, by: 10, group: "web", connections: ["react","next","html"] },
  { id: "js", name: "JS", icon: <FaJs />, bx: -15, by: 5, group: "web", connections: ["react","python"] },
  { id: "html", name: "HTML", icon: <FaHtml5 />, bx: -35, by: 15, group: "web", connections: ["tailwind"] },
  { id: "azure", name: "Azure", icon: <SiMicrosoftazure />, bx: -15, by: -30, group: "cloud", connections: ["docker","openai"] },
  { id: "aws", name: "AWS", icon: <FaAws />, bx: -25, by: -25, group: "cloud", connections: ["docker"] },
  { id: "docker", name: "Docker", icon: <FaDocker />, bx: -10, by: -20, group: "cloud", connections: ["azure","aws","k8s"] },
  { id: "k8s", name: "K8s", icon: <SiKubernetes />, bx: -30, by: -35, group: "cloud", connections: ["docker"] },
  { id: "terraform", name: "Terraform", icon: <SiTerraform />, bx: -40, by: -20, group: "cloud", connections: ["aws"] },

  // Right Hemisphere (AI & Data) - Creativity, Intelligence
  { id: "python", name: "Python", icon: <FaPython />, bx: 15, by: -10, group: "ai", connections: ["js","numpy","pandas","openai"] },
  { id: "numpy", name: "NumPy", icon: <SiNumpy />, bx: 25, by: -25, group: "ai", connections: ["python"] },
  { id: "pandas", name: "Pandas", icon: <SiPandas />, bx: 35, by: -15, group: "ai", connections: ["python"] },
  { id: "openai", name: "OpenAI", icon: <SiOpenai />, bx: 20, by: 5, group: "ai", connections: ["python","copilot"] },
  { id: "copilot", name: "Copilot", icon: <SiGithubcopilot />, bx: 30, by: 15, group: "ai", connections: ["openai"] },

  // Brainstem / Center (Tools)
  { id: "github", name: "GitHub", icon: <FaGithub />, bx: 0, by: 25, group: "tools", connections: ["vscode"] },
  { id: "vscode", name: "VS Code", icon: <SiVisualstudiocode />, bx: 0, by: 35, group: "tools", connections: ["github","copilot"] },
] as const;

// Type for D3 nodes
type SkillNode = {
  id: string;
  x: number;
  y: number;
  fx?: number | null;
  fy?: number | null;
  targetX?: number;
  targetY?: number;
} & (typeof initialSkills)[number];

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  // Initialize MotionValues for each skill
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

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    
    // Node radius (approx 32px + border/shadow) -> use 40 for safety
    const radius = 40; 
    const padding = 20;
    const minX = -width / 2 + radius + padding;
    const maxX = width / 2 - radius - padding;
    const minY = -height / 2 + radius + padding;
    const maxY = height / 2 - radius - padding;

    // Create D3 nodes with initial positions based on brain coordinates (bx/by)
    // Scale bx/by (percentages) to pixels
    const nodes: SkillNode[] = initialSkills.map((s) => {
      const tx = (s.bx / 100) * width * 1.2; // Spread out a bit more
      const ty = (s.by / 100) * height * 1.2;
      return {
        ...s,
        x: tx, // Start at target
        y: ty,
        targetX: tx,
        targetY: ty,
      };
    });

    // Create links
    const links: { source: string; target: string }[] = [];
    initialSkills.forEach((s) => {
      s.connections.forEach((targetId) => {
        if (initialSkills.find((k) => k.id === targetId)) {
          links.push({ source: s.id, target: targetId });
        }
      });
    });

    // Initialize Simulation
    const simulation = d3.forceSimulation(nodes)
      .force("charge", d3.forceManyBody().strength(-120)) // Reduced repulsion to allow shape formation
      .force("link", (d3.forceLink(links).id((d: any) => d.id) as any).distance(70))
      .force("collide", d3.forceCollide(45).strength(1))
      // Pull towards brain positions
      .force("x", d3.forceX((d: any) => d.targetX).strength(0.08))
      .force("y", d3.forceY((d: any) => d.targetY).strength(0.08));

    simulation.on("tick", () => {
      nodes.forEach((node) => {
        // Constrain to box
        node.x = Math.max(minX, Math.min(maxX, node.x));
        node.y = Math.max(minY, Math.min(maxY, node.y));

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
    <section className="py-28 bg-white">
      <h2 className="text-center text-4xl font-bold text-primary mb-12">Technical Skills</h2>

      <div
        ref={containerRef}
        className="relative mx-auto w-full max-w-5xl h-[650px] overflow-visible flex items-center justify-center"
      >
        {/* CONNECTIONS & BRAIN OUTLINE */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
          <g style={{ transform: "translate(50%, 50%)" }}>
            {/* Subtle Brain Outline */}
            <path
              d="
                M 0 -220
                C -100 -280, -420 -250, -420 -50
                C -420 180, -100 280, 0 220
                C 100 280, 420 180, 420 -50
                C 420 -250, 100 -280, 0 -220
                Z
                M 0 -220 L 0 220
              "
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="2"
              strokeDasharray="8 8"
              opacity="0.6"
            />
            
            {initialSkills.flatMap(a =>
              a.connections.map(cid => {
                const b = initialSkills.find(s => s.id === cid);
                if (!b) return null;
                // We render lines based on motion values.
                // Since we are inside an SVG group translated to center, we can use x/y directly.
                return (
                  <motion.line
                    key={`${a.id}-${b.id}`}
                    x1={positions[a.id].x as any}
                    y1={positions[a.id].y as any}
                    x2={positions[b.id].x as any}
                    y2={positions[b.id].y as any}
                    stroke="#6366f1"
                    strokeWidth="2"
                    strokeOpacity={0.2}
                    strokeLinecap="round"
                  />
                );
              })
            )}
          </g>
        </svg>

        {/* NODES */}
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
                // We don't need left/top 50% if we are using x/y from center (0,0) relative to parent?
                // Wait, parent is flex center? 
                // If parent is flex center, static position is center.
                // absolute position with x/y transforms will be relative to that center?
                // No, absolute position is relative to nearest positioned ancestor (the container).
                // So (0,0) is top-left of container.
                // We want (0,0) to be center.
                // So we set left: 50%, top: 50%.
                left: "50%",
                top: "50%",
              }}
              whileHover={{ scale: 1.2, zIndex: 50 }}
              whileTap={{ scale: 0.9 }}
              animate={{
                scale: isDragging ? 1.3 : (isOther ? 0.8 : 1),
                opacity: isOther ? 0.4 : 1,
                filter: isOther ? "blur(2px)" : "none",
              }}
              className="w-16 h-16 -ml-8 -mt-8 rounded-full bg-white shadow-lg border-2 border-indigo-100 cursor-grab active:cursor-grabbing flex items-center justify-center z-10"
            >
              <div className={`text-3xl ${isDragging ? "text-indigo-600" : "text-gray-700"}`}>
                {skill.icon}
              </div>
              
              {/* Tooltip */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-3 py-1 bg-gray-900 text-white text-xs rounded opacity-0 hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                {skill.name}
              </div>
            </motion.div>
          );
        })}
      </div>

      <p className="text-center mt-10 text-gray-500 font-medium">
        Interactive Force-Directed Graph
      </p>
    </section>
  );
}