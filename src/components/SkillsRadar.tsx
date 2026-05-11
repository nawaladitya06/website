"use client";
import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface SkillsRadarProps {
  skills: any[];
}

// --- Radar Chart (per-category avg) ---
function RadarChart({ radarData }: { radarData: { category: string; level: number; shortName: string }[] }) {
  const size = 500;
  const center = size / 2;
  const radius = size * 0.30;
  const sides = radarData.length;
  const angleStep = (Math.PI * 2) / sides;

  const generateLevels = (count: number) => {
    const levels = [];
    for (let i = 1; i <= count; i++) {
      const r = (radius / count) * i;
      const pts = Array.from({ length: sides }, (_, j) => {
        const x = center + r * Math.cos(j * angleStep - Math.PI / 2);
        const y = center + r * Math.sin(j * angleStep - Math.PI / 2);
        return `${x},${y}`;
      });
      levels.push(pts.join(" "));
    }
    return levels;
  };

  const dataPoints = radarData
    .map((s, i) => {
      const r = (radius * s.level) / 100;
      const x = center + r * Math.cos(i * angleStep - Math.PI / 2);
      const y = center + r * Math.sin(i * angleStep - Math.PI / 2);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full overflow-visible">
      <defs>
        <radialGradient id="radarFill" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.2" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background polygons */}
      {generateLevels(5).map((pts, i) => (
        <polygon key={i} points={pts} fill="none" stroke="white" strokeOpacity={0.06 + i * 0.01} strokeWidth="1" />
      ))}

      {/* Level percentage labels at rightmost axis */}
      {[20, 40, 60, 80, 100].map((pct, i) => {
        const r = (radius / 5) * (i + 1);
        const x = center + r;
        const y = center;
        return (
          <text key={pct} x={x + 4} y={y - 3} fill="#4b5563" fontSize="7" fontFamily="monospace">
            {pct}%
          </text>
        );
      })}

      {/* Axis lines */}
      {radarData.map((_, i) => {
        const x2 = center + radius * Math.cos(i * angleStep - Math.PI / 2);
        const y2 = center + radius * Math.sin(i * angleStep - Math.PI / 2);
        return <line key={i} x1={center} y1={center} x2={x2} y2={y2} stroke="white" strokeOpacity="0.07" strokeWidth="1" />;
      })}

      {/* Data area */}
      <motion.polygon
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true }}
        points={dataPoints}
        fill="url(#radarFill)"
        stroke="#a855f7"
        strokeWidth="2"
        filter="url(#glow)"
        style={{ transformOrigin: `${center}px ${center}px` }}
      />

      {/* Nodes */}
      {radarData.map((skill, i) => {
        const r = (radius * skill.level) / 100;
        const x = center + r * Math.cos(i * angleStep - Math.PI / 2);
        const y = center + r * Math.sin(i * angleStep - Math.PI / 2);
        return (
          <g key={i}>
            <circle cx={x} cy={y} r={6} fill="#1a1a2e" stroke="#a855f7" strokeWidth="2" />
            <motion.circle
              initial={{ r: 0 }}
              whileInView={{ r: 3 }}
              transition={{ delay: 0.6 + i * 0.06 }}
              viewport={{ once: true }}
              cx={x}
              cy={y}
              fill="#a855f7"
            />
          </g>
        );
      })}

      {/* Labels — smart positioning to avoid overlap */}
      {radarData.map((skill, i) => {
        const angle = i * angleStep - Math.PI / 2;
        const labelRadius = radius + 55;
        const lx = center + labelRadius * Math.cos(angle);
        const ly = center + labelRadius * Math.sin(angle);

        // Split into max 2 lines of ~12 chars each
        const words = skill.shortName.split(" ");
        const lines: string[] = [];
        let current = "";
        words.forEach((w) => {
          if ((current + " " + w).trim().length > 13) {
            if (current) lines.push(current);
            current = w;
          } else {
            current = (current + " " + w).trim();
          }
        });
        if (current) lines.push(current);

        const lineH = 10;
        const totalH = lines.length * lineH;

        return (
          <g key={i}>
            {lines.map((line, li) => (
              <text
                key={li}
                x={lx}
                y={ly - totalH / 2 + li * lineH + lineH / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#9ca3af"
                fontSize="8"
                fontFamily="monospace"
                fontWeight="700"
                letterSpacing="0.08em"
              >
                {line.toUpperCase()}
              </text>
            ))}
            {/* Level badge */}
            <text
              x={lx}
              y={ly + totalH / 2 + 4}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#a855f7"
              fontSize="8"
              fontFamily="monospace"
              fontWeight="800"
            >
              {skill.level}%
            </text>
          </g>
        );
      })}

      {/* Center label */}
      <text x={center} y={center - 8} textAnchor="middle" fill="white" fontSize="14" fontWeight="800" fontFamily="monospace">TECH</text>
      <text x={center} y={center + 8} textAnchor="middle" fill="#a855f7" fontSize="9" fontFamily="monospace" letterSpacing="0.15em">RADAR</text>
    </svg>
  );
}

// --- Horizontal bar chart for all categories ---
function CategoryBars({ radarData }: { radarData: { category: string; level: number; count: number }[] }) {
  const sorted = [...radarData].sort((a, b) => b.level - a.level);
  const colors = [
    "from-purple-500 to-indigo-500",
    "from-cyan-500 to-blue-500",
    "from-pink-500 to-rose-500",
    "from-emerald-500 to-teal-500",
    "from-amber-500 to-orange-500",
    "from-violet-500 to-purple-500",
    "from-sky-500 to-cyan-500",
    "from-fuchsia-500 to-pink-500",
    "from-lime-500 to-emerald-500",
    "from-red-500 to-pink-500",
  ];

  return (
    <div className="space-y-4">
      {sorted.map((cat, i) => (
        <div key={cat.category}>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs font-mono font-bold text-gray-300 uppercase tracking-wider truncate max-w-[60%]">
              {cat.category}
            </span>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-gray-500">{cat.count} skills</span>
              <span className="text-xs font-mono font-bold text-purple-400">{cat.level}%</span>
            </div>
          </div>
          <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${cat.level}%` }}
              transition={{ duration: 1.2, delay: i * 0.07, ease: "easeOut" }}
              viewport={{ once: true }}
              className={`h-full bg-gradient-to-r ${colors[i % colors.length]} rounded-full relative`}
            >
              <div className="absolute inset-0 bg-white/20 rounded-full" />
            </motion.div>
          </div>
        </div>
      ))}
    </div>
  );
}

// --- Circular progress ring per skill ---
function SkillRing({ skill, index }: { skill: any; index: number }) {
  const [hovered, setHovered] = useState(false);
  const r = 28;
  const circ = 2 * Math.PI * r;
  const dash = (skill.level / 100) * circ;

  const hue = (index * 37) % 360;
  const color = `hsl(${270 + (index * 23) % 90}, 80%, 65%)`;

  return (
    <motion.a
      href={skill.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.04 }}
      viewport={{ once: true }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col items-center gap-2 group cursor-pointer"
    >
      <div className="relative w-16 h-16">
        <svg width="64" height="64" viewBox="0 0 64 64" className="-rotate-90">
          {/* Track */}
          <circle cx="32" cy="32" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="5" />
          {/* Progress */}
          <motion.circle
            cx="32"
            cy="32"
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            whileInView={{ strokeDashoffset: circ - dash }}
            transition={{ duration: 1.2, delay: index * 0.05, ease: "easeOut" }}
            viewport={{ once: true }}
            style={{ filter: hovered ? `drop-shadow(0 0 6px ${color})` : "none" }}
          />
        </svg>
        {/* Percentage in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[10px] font-mono font-bold text-white">{skill.level}%</span>
        </div>
      </div>

      {/* Skill name + link icon */}
      <div className="flex items-center gap-1 max-w-[80px]">
        <span className="text-[10px] text-gray-400 group-hover:text-purple-300 transition-colors text-center leading-tight font-medium line-clamp-2">
          {skill.name}
        </span>
        <ExternalLink size={8} className="text-gray-600 group-hover:text-purple-400 flex-shrink-0 transition-colors" />
      </div>
    </motion.a>
  );
}

// --- Main Export ---
export default function SkillsRadar({ skills }: SkillsRadarProps) {
  const [activeTab, setActiveTab] = useState<"radar" | "bars">("radar");

  const { radarData, categoryData, groupedSkills } = useMemo(() => {
    const cats: Record<string, { total: number; count: number; skills: any[] }> = {};
    skills.forEach((s) => {
      if (!cats[s.category]) cats[s.category] = { total: 0, count: 0, skills: [] };
      cats[s.category].total += s.level;
      cats[s.category].count++;
      cats[s.category].skills.push(s);
    });

    // Short names for radar labels
    const shortNameMap: Record<string, string> = {
      "Frontend Development": "Frontend",
      "Backend Development": "Backend",
      "Databases & Storage": "Databases",
      "Full-Stack Development": "Full-Stack",
      "Cloud, DevOps & Deployment": "DevOps",
      "Programming Languages": "Languages",
      "AI & Developer Tools": "AI Tools",
      "Mobile Development": "Mobile",
      "UI/UX & Design": "UI/UX",
      "Core CS Concepts": "CS Core",
    };

    const radar = Object.entries(cats)
      .map(([cat, { total, count }]) => ({
        category: cat,
        shortName: shortNameMap[cat] || cat,
        level: Math.round(total / count),
        count,
      }))
      .slice(0, 9); // max 9 for radar

    const bars = Object.entries(cats).map(([cat, { total, count }]) => ({
      category: cat,
      level: Math.round(total / count),
      count,
    }));

    return { radarData: radar, categoryData: bars, groupedSkills: cats };
  }, [skills]);

  if (radarData.length < 3) {
    return (
      <div className="flex items-center justify-center p-12 bg-white/5 rounded-3xl border border-dashed border-white/10 text-gray-500 italic text-sm min-h-[400px]">
        Add skills in at least 3 categories to generate your tech radar.
      </div>
    );
  }

  return (
    <div className="space-y-16">

      {/* === SECTION 1: Radar + Category Bars === */}
      <div className="p-8 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl shadow-purple-500/5">
        {/* Tab Toggle */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-1 p-1 rounded-full bg-white/5 border border-white/10">
            {(["radar", "bars"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-widest transition-all ${
                  activeTab === tab
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30"
                    : "text-gray-500 hover:text-white"
                }`}
              >
                {tab === "radar" ? "Radar Chart" : "Category Bars"}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "radar" ? (
            <motion.div
              key="radar"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex justify-center"
            >
              <div className="w-full max-w-[520px] aspect-square">
                <RadarChart radarData={radarData} />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="bars"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <CategoryBars radarData={categoryData} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* === SECTION 2: Per-Skill Ring Grid grouped by category === */}
      <div className="space-y-16">
        {Object.entries(groupedSkills).map(([category, { skills: catSkills }], catIdx) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: catIdx * 0.05 }}
            viewport={{ once: true }}
          >
            {/* Category Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
              <div className="px-5 py-2 rounded-full border border-purple-500/30 bg-purple-500/10">
                <span className="text-xs font-mono font-bold text-purple-300 uppercase tracking-widest">
                  {category}
                </span>
              </div>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
            </div>

            {/* Skill Rings Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-8 gap-6 justify-items-center">
              {catSkills.map((skill: any, i: number) => (
                <SkillRing key={skill.name} skill={skill} index={catIdx * 20 + i} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
