"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";

interface Skill {
  name: string;
  level: number;
}

interface SkillsRadarProps {
  skills: any[];
}

export default function SkillsRadar({ skills }: SkillsRadarProps) {
  const size = 400;
  const center = size / 2;
  const radius = size * 0.33; // Decreased to make room for full labels
  
  // Aggregate a few representative skills for the radar (max 6-8 for clarity)
  // We'll pick the top level skill from each category or just the overall top ones
  const radarData = useMemo(() => {
    const categories: Record<string, any> = {};
    skills.forEach(s => {
      if (!categories[s.category] || categories[s.category].level < s.level) {
        categories[s.category] = s;
      }
    });
    return Object.values(categories).slice(0, 7); // Max 7 points for a nice shape
  }, [skills]);

  const sides = radarData.length;
  const angleStep = (Math.PI * 2) / sides;

  // Generate points for the radar background polygons
  const generateLevels = (levelCount: number) => {
    const levels = [];
    for (let i = 1; i <= levelCount; i++) {
      const currentRadius = (radius / levelCount) * i;
      const points = [];
      for (let j = 0; j < sides; j++) {
        const x = center + currentRadius * Math.cos(j * angleStep - Math.PI / 2);
        const y = center + currentRadius * Math.sin(j * angleStep - Math.PI / 2);
        points.push(`${x},${y}`);
      }
      levels.push(points.join(" "));
    }
    return levels;
  };

  const backgroundLevels = generateLevels(5);

  // Generate points for the actual data polygon
  const dataPoints = radarData.map((skill, i) => {
    const r = (radius * skill.level) / 100;
    const x = center + r * Math.cos(i * angleStep - Math.PI / 2);
    const y = center + r * Math.sin(i * angleStep - Math.PI / 2);
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white/5 backdrop-blur-3xl rounded-[3rem] border border-white/10 shadow-2xl shadow-purple-500/5">
      <div className="relative w-full max-w-[400px] aspect-square">
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full overflow-visible">
          {/* Background Grid Lines */}
          {backgroundLevels.map((points, i) => (
            <polygon
              key={i}
              points={points}
              fill="none"
              stroke="white"
              strokeOpacity="0.05"
              strokeWidth="1"
            />
          ))}

          {/* Radial Lines */}
          {radarData.map((_, i) => {
            const x2 = center + radius * Math.cos(i * angleStep - Math.PI / 2);
            const y2 = center + radius * Math.sin(i * angleStep - Math.PI / 2);
            return (
              <line
                key={i}
                x1={center}
                y1={center}
                x2={x2}
                y2={y2}
                stroke="white"
                strokeOpacity="0.05"
                strokeWidth="1"
              />
            );
          })}

          {/* Data Area */}
          <motion.polygon
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            points={dataPoints}
            fill="url(#radarGradient)"
            fillOpacity="0.4"
            stroke="#a855f7"
            strokeWidth="2"
            className="drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]"
          />

          {/* Points/Nodes */}
          {radarData.map((skill, i) => {
             const r = (radius * skill.level) / 100;
             const x = center + r * Math.cos(i * angleStep - Math.PI / 2);
             const y = center + r * Math.sin(i * angleStep - Math.PI / 2);
             return (
               <g key={i}>
                 <motion.circle
                   initial={{ r: 0 }}
                   whileInView={{ r: 4 }}
                   transition={{ delay: 0.5 + i * 0.05 }}
                   viewport={{ once: true }}
                   cx={x}
                   cy={y}
                   fill="#a855f7"
                 />
                 {/* Labels */}
                 <text
                    x={center + (radius + 35) * Math.cos(i * angleStep - Math.PI / 2)}
                    y={center + (radius + 35) * Math.sin(i * angleStep - Math.PI / 2)}
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    fill="#9ca3af"
                    className="text-[10px] uppercase font-mono font-bold tracking-widest"
                 >
                    {skill.category}
                 </text>
               </g>
             );
          })}

          <defs>
            <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Center Indicator */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <span className="text-3xl font-bold text-white tracking-tighter">100%</span>
            <span className="text-[8px] text-gray-500 uppercase tracking-widest">Efficiency</span>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-4 w-full">
         {radarData.slice(0, 4).map(skill => (
            <div key={skill.name} className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">{skill.category}</p>
                <div className="flex justify-between items-end">
                    <p className="text-white font-medium">{skill.name}</p>
                    <p className="text-purple-500 font-mono text-xs">{skill.level}%</p>
                </div>
            </div>
         ))}
      </div>
    </div>
  );
}
