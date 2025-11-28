"use client";

import React, { useRef, useState } from "react";
import { motion, useDragControls } from "framer-motion";
import {
  FaHtml5,
  FaJs,
  FaReact,
  FaPython,
  FaDatabase,
  FaGithub,
  FaDocker,
  FaAws,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiNextdotjs,
  SiFramer,
  SiMicrosoftazure,
  SiNumpy,
  SiPandas,
  SiOpenai,
  SiVisualstudiocode,
  SiGithubcopilot,
  SiKubernetes,
  SiTerraform,
} from "react-icons/si";

/**
 * Option A Skills component
 *
 * - Positions are stored as percentages {x: 0..100, y: 0..100}
 * - Dragging uses DragControls to remove initial "snap" delay
 * - onDragStart: freeze other nodes (they don't animate until drop)
 * - onDragEnd: compute new positions for connected nodes and animate them
 * - clamp positions to bounding area
 */

const INITIAL_SKILLS = [
  { id: "react", name: "React", icon: <FaReact />, x: 25, y: 40, group: "web", connections: ["next", "tailwind", "js"] },
  { id: "next", name: "Next.js", icon: <SiNextdotjs />, x: 15, y: 25, group: "web", connections: ["react", "tailwind", "framer"] },
  { id: "tailwind", name: "Tailwind", icon: <SiTailwindcss />, x: 35, y: 30, group: "web", connections: ["react", "next", "html"] },
  { id: "js", name: "JavaScript", icon: <FaJs />, x: 30, y: 55, group: "web", connections: ["react", "html", "python"] },
  { id: "html", name: "HTML5", icon: <FaHtml5 />, x: 15, y: 55, group: "web", connections: ["js", "tailwind"] },
  { id: "framer", name: "Framer", icon: <SiFramer />, x: 10, y: 10, group: "web", connections: ["next"] },

  { id: "python", name: "Python", icon: <FaPython />, x: 55, y: 60, group: "data", connections: ["js", "numpy", "pandas", "openai"] },
  { id: "openai", name: "OpenAI", icon: <SiOpenai />, x: 70, y: 75, group: "data", connections: ["python", "copilot"] },
  { id: "numpy", name: "NumPy", icon: <SiNumpy />, x: 45, y: 75, group: "data", connections: ["python", "pandas"] },
  { id: "pandas", name: "Pandas", icon: <SiPandas />, x: 60, y: 85, group: "data", connections: ["python", "numpy"] },
  { id: "copilot", name: "Copilot", icon: <SiGithubcopilot />, x: 80, y: 65, group: "data", connections: ["openai", "vscode"] },

  { id: "azure", name: "Azure", icon: <SiMicrosoftazure />, x: 65, y: 20, group: "cloud", connections: ["docker", "k8s", "openai"] },
  { id: "aws", name: "AWS", icon: <FaAws />, x: 80, y: 15, group: "cloud", connections: ["docker", "terraform"] },
  { id: "docker", name: "Docker", icon: <FaDocker />, x: 75, y: 35, group: "cloud", connections: ["azure", "aws", "k8s"] },
  { id: "k8s", name: "Kubernetes", icon: <SiKubernetes />, x: 85, y: 45, group: "cloud", connections: ["docker", "azure"] },
  { id: "terraform", name: "Terraform", icon: <SiTerraform />, x: 90, y: 25, group: "cloud", connections: ["aws"] },
  { id: "github", name: "GitHub", icon: <FaGithub />, x: 50, y: 10, group: "cloud", connections: ["azure", "vscode"] },
  { id: "vscode", name: "VS Code", icon: <SiVisualstudiocode />, x: 60, y: 45, group: "cloud", connections: ["github", "copilot"] },
];

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

export default function SkillsOptionA() {
  const containerRef = useRef(null);
  const dragControls = useDragControls();

  // state: positions, keyed by id
  const [nodes, setNodes] = useState(
    () => INITIAL_SKILLS.reduce((acc, s) => ({ ...acc, [s.id]: { ...s } }), {})
  );

  const [draggingId, setDraggingId] = useState(null);

  // region limits (percent). adjust as needed. These keep nodes between header & next section.
  // topPercent=top boundary, bottomPercent=bottom boundary of allowed area.
  const Y_LIMITS_PERCENT = { top: 15, bottom: 85 };
  const X_LIMITS_PERCENT = { left: 4, right: 96 };

  // magnetism params (while dragging)
  const MAGNETISM_THRESHOLD = 18; // percent distance threshold for attracting related nodes
  const MAGNETISM_STRENGTH = 0.12; // how much related nodes move towards the dragged node while dragging

  // helpers to convert client coordinates -> percent within container
  function clientToPercent(clientX, clientY) {
    const rect = containerRef.current.getBoundingClientRect();
    const px = ((clientX - rect.left) / rect.width) * 100;
    const py = ((clientY - rect.top) / rect.height) * 100;
    return { x: clamp(px, X_LIMITS_PERCENT.left, X_LIMITS_PERCENT.right), y: clamp(py, Y_LIMITS_PERCENT.top, Y_LIMITS_PERCENT.bottom) };
  }

  // Start drag — ensure immediate follow by calling dragControls.start in pointer down handler
  function handlePointerDown(e, id) {
    // stop propagation so container doesn't steal pointer
    e.stopPropagation();
    setDraggingId(id);
    // start the framer drag controls (makes motion element follow pointer immediately)
    dragControls.start(e);
  }

  // During drag: move dragged node to pointer (we use onDrag to update live)
  function handleDrag(event, info, id) {
    if (!containerRef.current) return;
    const { x, y } = clientToPercent(info.point.x, info.point.y);
    setNodes(prev => ({ ...prev, [id]: { ...prev[id], x, y } }));

    // Magnetism: gently move related nodes toward the dragging node while dragging (non-destructive)
    const dragging = nodes[id];
    if (!dragging) return;
    Object.values(nodes).forEach(n => {
      if (n.id === id) return;
      // only affect connected nodes
      const isConnected = dragging.connections.includes(n.id) || n.connections.includes(dragging.id);
      if (!isConnected) return;
      // compute percent distance
      const dx = dragging.x - n.x;
      const dy = dragging.y - n.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MAGNETISM_THRESHOLD) {
        // update position slightly toward dragging node
        setNodes(prev => {
          const cur = prev[n.id];
          // compute new pos = cur + (dragging - cur)*k
          const nx = clamp(cur.x + dx * MAGNETISM_STRENGTH, X_LIMITS_PERCENT.left, X_LIMITS_PERCENT.right);
          const ny = clamp(cur.y + dy * MAGNETISM_STRENGTH, Y_LIMITS_PERCENT.top, Y_LIMITS_PERCENT.bottom);
          return { ...prev, [n.id]: { ...cur, x: nx, y: ny } };
        });
      }
    });
  }

  // On drag end — settle connected nodes into new clustered layout
  function handleDragEnd(event, info, id) {
    setDraggingId(null);

    // On drop: compute a simple reclustering for connected nodes:
    // - find all nodes directly connected to the dropped node (one hop)
    // - compute angle slots around the dropped node and place them around it at a radius depending on count
    const dropped = nodes[id];
    if (!dropped) return;

    const connectedIds = dropped.connections.filter(cid => nodes[cid]);
    if (connectedIds.length === 0) return;

    // radius in percent — a small ring around the dropped node
    const ringRadius = clamp(8 + connectedIds.length * 2, 6, 22);

    // compute evenly spaced angles
    const n = connectedIds.length;
    const angleStep = (2 * Math.PI) / n;
    const startAngle = Math.PI / 2; // start at top

    // new positions map
    const updates = {};
    connectedIds.forEach((cid, idx) => {
      const angle = startAngle + idx * angleStep;
      const nx = clamp(dropped.x + Math.cos(angle) * ringRadius, X_LIMITS_PERCENT.left, X_LIMITS_PERCENT.right);
      const ny = clamp(dropped.y - Math.sin(angle) * ringRadius, Y_LIMITS_PERCENT.top, Y_LIMITS_PERCENT.bottom);
      updates[cid] = { ...nodes[cid], x: nx, y: ny };
    });

    // optionally, pull connected-of-connected a little (2nd order) to preserve grouping
    const secondOrder = {};
    connectedIds.forEach(cid => {
      const node = nodes[cid];
      node.connections.forEach(grand => {
        if (connectedIds.includes(grand) || grand === id) return;
        // small nudge toward their primary connected peer (cid)
        const target = updates[cid] || nodes[cid];
        const cur = nodes[grand];
        const dx = target.x - cur.x;
        const dy = target.y - cur.y;
        secondOrder[grand] = {
          ...cur,
          x: clamp(cur.x + dx * 0.12, X_LIMITS_PERCENT.left, X_LIMITS_PERCENT.right),
          y: clamp(cur.y + dy * 0.12, Y_LIMITS_PERCENT.top, Y_LIMITS_PERCENT.bottom),
        };
      });
    });

    // Apply updates in one setState to allow smooth framer motion springs
    setNodes(prev => {
      const next = { ...prev };
      Object.keys(updates).forEach(k => (next[k] = updates[k]));
      Object.keys(secondOrder).forEach(k => {
        // only update if not overwritten already
        if (!next[k]) next[k] = secondOrder[k];
        else next[k] = { ...next[k], ...secondOrder[k] };
      });
      return next;
    });
  }

  // Utility to compute SVG line coordinates from percent positions (string px or percent)
  const lineXY = (a, b) => `${a.x}% ${a.y}% ${b.x}% ${b.y}%`;

  // helper to detect active relationship when hovering or dragging
  const isActivePair = (a, b) => {
    if (!draggingId) return true;
    // if dragging, highlight only relations of the dragging node
    const dragNode = nodes[draggingId];
    return dragNode.connections.includes(a.id) || dragNode.connections.includes(b.id) || a.id === draggingId || b.id === draggingId;
  };

  return (
    <section
      className="py-24 bg-white relative overflow-hidden min-h-[640px] flex flex-col items-center"
      style={{ paddingTop: 36, paddingBottom: 36 }}
    >
      <div className="container mx-auto px-4 relative z-10 w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-6 pointer-events-none">
          <h2 className="text-4xl font-bold text-slate-900">Technical Skills</h2>
          <p className="text-slate-600">Drag icons to explore — related icons will cluster on drop.</p>
        </div>

        {/* network area */}
        <div
          ref={containerRef}
          className="relative bg-slate-50 border border-slate-100 rounded-xl shadow-sm mx-auto"
          style={{ height: 420, overflow: "hidden", minHeight: 420 }}
        >
          {/* svg lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Draw lines using percent -> svg 0..100 coordinate mapping */}
            {Object.values(nodes).map(a =>
              a.connections.map(toId => {
                const b = nodes[toId];
                if (!b) return null;
                // unique key order
                const key = [a.id, toId].sort().join("--");
                // only draw once (a < b)
                if (a.id > toId) return null;
                const active = isActivePair(a, b);
                const stroke = active ? "#10b981" : "#94a3b8"; // green when active
                const opacity = draggingId ? (active ? 1 : 0.14) : 0.55;
                const width = active ? 0.6 : 0.28; // using svg user coords (0..100)
                return (
                  <line
                    key={key}
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    stroke={stroke}
                    strokeWidth={width}
                    strokeLinecap="round"
                    style={{ transition: "stroke-width 300ms, stroke 250ms, opacity 300ms" }}
                    opacity={opacity}
                  />
                );
              })
            )}
          </svg>

          {/* nodes */}
          {Object.values(nodes).map(node => {
            const isDragging = draggingId === node.id;
            return (
              <motion.div
                key={node.id}
                style={{
                  position: "absolute",
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  translate: "-50% -50%",
                  zIndex: isDragging ? 999 : 20,
                  // ensure smooth motion when positions change
                }}
                // framer motion props for drag
                drag
                dragControls={dragControls}
                dragElastic={0}
                dragMomentum={false}
                onPointerDown={(e) => handlePointerDown(e, node.id)}
                onDrag={(e, info) => handleDrag(e, info, node.id)}
                onDragEnd={(e, info) => handleDragEnd(e, info, node.id)}
                whileDrag={{ scale: 1.12 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div
                  className={`flex items-center justify-center w-14 h-14 rounded-full bg-white border shadow-md cursor-grab select-none`}
                  style={{
                    borderColor: "#e2e8f0",
                    boxShadow: "0 6px 18px rgba(2,6,23,0.06)",
                  }}
                  title={node.name}
                >
                  <div style={{ fontSize: 20, color: "#0f172a" }}>{node.icon}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}