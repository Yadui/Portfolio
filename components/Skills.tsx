"use client";

import { useRef, useState, useEffect } from "react";
import { motion, MotionValue, motionValue } from "framer-motion";
import {
  FaHtml5, FaJs, FaReact, FaPython, FaGithub, FaDocker, FaAws
} from "react-icons/fa";
import {
  SiTailwindcss, SiNextdotjs, SiMicrosoftazure, SiNumpy,
  SiPandas, SiOpenai, SiVisualstudiocode, SiGithubcopilot,
  SiKubernetes, SiTerraform, SiRedux, SiExpress, SiPostgresql,
  SiRedis, SiHuggingface, SiTensorflow, SiNotion, SiFigma
} from "react-icons/si";
import * as d3force from "d3-force";
import { polygonContains, polygonCentroid } from "d3-polygon";

// --- MAPPED TO SCREENSHOT LAYOUT ---
const initialSkills = [
  // TOP LAYER (y: -16 to -22) - Compressed
  { id: "js", name: "JS", icon: <FaJs />, color: "#F7DF1E", bx: 0, by: -26, group: "web", connections: ["react", "python"] },
  { id: "python", name: "Python", icon: <FaPython />, color: "#3776AB", bx: 11, by: -28, group: "ai", connections: ["js", "openai", "pandas"] },
  { id: "react", name: "React", icon: <FaReact />, color: "#61DAFB", bx: -15, by: -12, group: "web", connections: ["js", "next", "tailwind", "html"] },
  { id: "redux", name: "Redux", icon: <SiRedux />, color: "#764ABC", bx: -10, by: -22, group: "web", connections: ["react"] },

  // UPPER-MIDDLE LAYER (y: -4 to -14)
  { id: "express", name: "Express", icon: <SiExpress />, color: "#000000", bx: -20, by: -6, group: "web", connections: ["next"] },
  { id: "huggingface", name: "HuggingFace", icon: <SiHuggingface />, color: "#FFCC00", bx: 15, by: -12, group: "ai", connections: ["openai"] },
  { id: "openai", name: "OpenAI", icon: <SiOpenai />, color: "#10A37F", bx: 8, by: -12, group: "ai", connections: ["python", "azure", "copilot"] },
  { id: "aws", name: "AWS", icon: <FaAws />, color: "#FF9900", bx: 17, by: -15, group: "cloud", connections: ["docker", "terraform"] },
  { id: "copilot", name: "Copilot", icon: <SiGithubcopilot />, color: "#000000", bx: 12, by: -9, group: "ai", connections: ["openai", "vscode", "numpy"] },

  // MIDDLE LAYER (y: -4 to +4)
  { id: "next", name: "Next.js", icon: <SiNextdotjs />, color: "#000000", bx: -6, by: -5, group: "web", connections: ["react", "azure"] },
  { id: "html", name: "HTML", icon: <FaHtml5 />, color: "#E34F26", bx: -22, by: 0, group: "web", connections: ["react", "tailwind"] },
  { id: "tailwind", name: "Tailwind", icon: <SiTailwindcss />, color: "#06B6D4", bx: -18, by: 4, group: "web", connections: ["react", "html"] },
  { id: "docker", name: "Docker", icon: <FaDocker />, color: "#2496ED", bx: -13, by: 1, group: "cloud", connections: ["azure", "aws", "k8s"] },
  { id: "azure", name: "Azure", icon: <SiMicrosoftazure />, color: "#0078D4", bx: 0, by: 0, group: "cloud", connections: ["next", "docker", "openai"] },
  { id: "pandas", name: "Pandas", icon: <SiPandas />, color: "#150458", bx: 14, by: -2, group: "ai", connections: ["python", "numpy"] },
  { id: "vscode", name: "VS Code", icon: <SiVisualstudiocode />, color: "#007ACC", bx: 18, by: 3, group: "tools", connections: ["copilot", "github"] },
  { id: "numpy", name: "NumPy", icon: <SiNumpy />, color: "#013243", bx: 20, by: 0, group: "ai", connections: ["pandas", "copilot"] },

  // LOWER-MIDDLE LAYER (y: +6 to +12)
  { id: "postgres", name: "Postgres", icon: <SiPostgresql />, color: "#336791", bx: -17, by: 7, group: "cloud", connections: ["docker"] },
  { id: "redis", name: "Redis", icon: <SiRedis />, color: "#DC382D", bx: -12, by: 11, group: "cloud", connections: ["docker"] },
  { id: "tensorflow", name: "TensorFlow", icon: <SiTensorflow />, color: "#FF6F00", bx: 18, by: 9, group: "ai", connections: ["numpy"] },
  { id: "figma", name: "Figma", icon: <SiFigma />, color: "#F24E1E", bx: 22, by: 12, group: "tools", connections: ["vscode"] },

  // BOTTOM LAYER (y: +16 to +24)
  { id: "k8s", name: "K8s", icon: <SiKubernetes />, color: "#326CE5", bx: -7, by: 14, group: "cloud", connections: ["docker", "terraform"] },
  { id: "terraform", name: "Terraform", icon: <SiTerraform />, color: "#7B42BC", bx: 3, by: 21, group: "cloud", connections: ["aws", "k8s"] },
  { id: "github", name: "GitHub", icon: <FaGithub />, color: "#181717", bx: 16, by: 23, group: "tools", connections: ["vscode"] },
  { id: "notion", name: "Notion", icon: <SiNotion />, color: "#000000", bx: 0, by: 28, group: "tools", connections: ["github"] },
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

// Global nodes variable removed


// Soft boundary force replaced by shape containment

const CENTER_X = 0;
const CENTER_Y = -10;
// COORDINATE_SCALE removed (now scaling dynamically)

function pathToPolygon(pathEl: SVGPathElement, step = 3) {
  const length = pathEl.getTotalLength();
  const points: [number, number][] = [];
  for (let i = 0; i < length; i += step) {
    const p = pathEl.getPointAtLength(i);
    points.push([p.x, p.y]);
  }
  return points;
}

const SkillConnection = ({
  x1, y1, x2, y2,
  isRelated
}: {
  x1: MotionValue<number>, y1: MotionValue<number>,
  x2: MotionValue<number>, y2: MotionValue<number>,
  isRelated: boolean
}) => {
  const [timing, setTiming] = useState<{ duration: number; delay: number } | null>(null);

  useEffect(() => {
    const duration = 1.5 + Math.random() * 3.0;
    const delay = Math.random() * 4.0;
    setTiming({ duration, delay });
  }, []);

  return (
    <>
      <motion.line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={isRelated ? "#00ff99" : "#cbd5e1"}
        strokeWidth={isRelated ? 2 : 1}
        strokeLinecap="round"
        opacity={isRelated ? 1 : 0.3}
        transition={{ duration: 0.2 }}
      />
      {timing && (
        <motion.line
          x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={isRelated ? "#00ff99" : "#4ade80"}
          strokeWidth={isRelated ? 2 : 3}
          strokeLinecap="round"
          strokeDasharray="15 1000"
          animate={{ strokeDashoffset: [-1015, 15] }}
          transition={{
            duration: timing.duration,
            repeat: Infinity,
            repeatDelay: Math.random() * 5,
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

  // Move scale to state/ref to be responsive
  const [scale, setScale] = useState(2.5);
  const nodesRef = useRef<SkillNode[]>([]);

  // Update scale on resize
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScale(3.6); // Mobile - larger to fill increased brain size
      } else if (width < 1024) {
        setScale(5.5); // Tablet
      } else {
        setScale(8.5); // Desktop - much larger to fill the big brain
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    // Recalculate node positions when scale changes
    // If it's the first init (empty nodes), map from initialSkills
    // If nodes exist, we might want to preserve current positions but scale them? 
    // For simplicity and to fix the layout issue, let's re-init target positions based on scale

    // We need to keep the simulation stable. 
    // Let's perform a smart update: update targetX/targetY based on new scale

    const currentNodes = nodesRef.current.length > 0 ? nodesRef.current : initialSkills.map(s => ({ ...s } as SkillNode));

    // Update targets and initial positions based on new scale
    currentNodes.forEach((node, i) => {
      const original = initialSkills[i];
      const tx = original.bx * scale;
      const ty = original.by * scale;

      node.targetX = tx;
      node.targetY = ty;

      // Only snap positions if this is first load (simulation not running yet)
      if (nodesRef.current.length === 0) {
        node.x = tx;
        node.y = ty;
      }
    });

    nodesRef.current = currentNodes;
    const nodes = currentNodes;

    const links = initialSkills.flatMap((s) =>
      s.connections
        .map((targetId) => {
          const sourceNode = nodes.find(n => n.id === s.id);
          const targetNode = nodes.find(n => n.id === targetId);
          return sourceNode && targetNode ? { source: sourceNode, target: targetNode } : null;
        })
        .filter(Boolean)
    ) as { source: SkillNode; target: SkillNode }[];

    // SCALE-DEPENDENT FORCES
    // As scale increases, we need stronger repulsion and longer links to fill the space
    const repulsionStrength = -25 * scale;
    const linkDistance = 8 * scale;
    const collisionRadius = 5 * scale;

    const simulation = d3force.forceSimulation(nodes as any)
      .force("charge", d3force.forceManyBody().strength(repulsionStrength))
      .force("link", (d3force.forceLink(links).distance(linkDistance)))
      .force("collide", d3force.forceCollide(collisionRadius).strength(0.8))
      .force("x", d3force.forceX((d: any) => d.targetX).strength(0.1))
      .force("y", d3force.forceY((d: any) => d.targetY).strength(0.1))
      .alphaDecay(0.02)
      .alpha(1)
      .alphaMin(0.001);

    // Build polygon from the brain path and align it to our node coordinate system
    const svgEl = containerRef.current.querySelector('#eFs69VwC5ck1') as SVGSVGElement | null;
    let polygon: [number, number][] | null = null;

    try {
      if (svgEl) {
        const paths = Array.from(svgEl.querySelectorAll('path')) as SVGPathElement[];
        const pathEl = paths.find(p => p.getAttribute('d') && p.getAttribute('d')!.trim().length > 10);
        if (pathEl) {
          const pts = pathToPolygon(pathEl, 3);
          const [cx, cy] = polygonCentroid(pts as any);

          // Use current scale for polygon
          const polyScale = scale;
          const tx = -cx * polyScale + CENTER_X;
          const ty = -cy * polyScale + CENTER_Y;
          polygon = pts.map(([x, y]) => [(x * polyScale) + tx, (y * polyScale) + ty]);

          const forceShapeContainment = (alpha: number) => {
            if (!polygon) return;
            nodes.forEach((node) => {
              if (!polygonContains(polygon as any, [node.x, node.y])) {
                const [px, py] = polygonCentroid(polygon as any);
                node.x += (px - node.x) * alpha * 0.4;
                node.y += (py - node.y) * alpha * 0.4;
                node.x += (node.targetX! - node.x) * alpha * 0.1;
                node.y += (node.targetY! - node.y) * alpha * 0.1;
              }
            });
          };

          simulation.force("containment", forceShapeContainment as any);
        }
      }
    } catch (e) {
      console.warn('Could not create polygon containment', e);
    }

    simulation.on("tick", () => {
      nodes.forEach((node) => {
        positions[node.id].x.set(node.x);
        positions[node.id].y.set(node.y);
      });
    });

    (containerRef.current as any).__simulation = simulation;
    // (containerRef.current as any).__nodes = nodes; // No longer needed on DOM

    return () => {
      simulation.stop();
    };
  }, [positions, scale]); // Re-run when scale changes

  const handleDragStart = (id: string) => {
    setDraggingId(id);
    const simulation = (containerRef.current as any)?.__simulation;
    const node = nodesRef.current.find((n) => n.id === id);
    if (simulation && node) {
      simulation.alphaTarget(0.3).restart();
      node.fx = node.x;
      node.fy = node.y;
    }
  };

  const handleDrag = (id: string, info: any) => {
    const node = nodesRef.current.find((n) => n.id === id);
    if (node) {
      node.fx = positions[id].x.get();
      node.fy = positions[id].y.get();
    }
  };

  const handleDragEnd = (id: string) => {
    setDraggingId(null);
    const simulation = (containerRef.current as any)?.__simulation;
    const node = nodesRef.current.find((n) => n.id === id);
    if (simulation && node) {
      // Release fixed position
      node.fx = null;
      node.fy = null;

      // Restart simulation with energy to ensure spring-back
      simulation.alphaTarget(0).restart();
      simulation.alpha(0.4); // Good energy for smooth return with stronger forces
    }
  };


  return (
    <section className="py-16 md:py-28 bg-white relative">
      <div className="sticky top-0 z-30 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm py-6 md:py-10 mb-5 origin-top">
        <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-bold max-h-full text-gray-900">Technical Skills</h2>
      </div>

      <div className="overflow-hidden w-full px-4">
        <div
          ref={containerRef}
          className="relative mx-auto w-full h-[400px] sm:h-[450px] md:h-[600px] lg:h-[700px] flex items-center justify-center -mt-6 sm:-mt-10 md:-mt-20"
          style={{
            transform: "translateZ(0) scale(1)",
            transformOrigin: "center center"
          }}
        >
          {/* Background Decorative SVG */}
          <svg id="eFs69VwC5ck1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 300 300" shapeRendering="geometricPrecision" textRendering="geometricPrecision"
            className="absolute w-[460px] h-[460px] sm:w-[500px] sm:h-[500px] md:w-[700px] md:h-[700px] lg:w-[1000px] lg:h-[1000px] max-w-none opacity-20"
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
                dragElastic={0.2}
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
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 -ml-4 -mt-4 sm:-ml-5 sm:-mt-5 md:-ml-6 md:-mt-6 lg:-ml-7 lg:-mt-7 rounded-full bg-white shadow-xl border border-gray-100 cursor-grab active:cursor-grabbing flex items-center justify-center z-20 transition-colors group"
              >
                <div className="text-base sm:text-xl md:text-2xl lg:text-3xl" style={{ color: skill.color }}>
                  {skill.icon}
                </div>

                <div className="absolute -bottom-6 sm:-bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-[9px] sm:text-[10px] md:text-xs font-bold tracking-wide rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-30">
                  {skill.name}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
