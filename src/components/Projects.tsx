"use client";
import { motion } from "framer-motion";
import Image from "next/image"; // Import Image component
import Link from "next/link";
import { Github, ExternalLink, Play, Rocket } from "lucide-react";

export type Project = {
  id?: number;
  title: string;
  desc: string;
  tech: string[];
  year: string;
  size: string;
  img: string;
  github: string | null;
  demo: string | null;
  type?: "major" | "minor";
};

export default function Projects({ projects = [] }: { projects?: any[] }) {
  // 0. DEBUG: Log projects count to console (User can see in browser inspector)
  console.log("Projects received by component:", projects?.length);

  // 1. RESILIENT NORMALIZATION
  const normalizedProjects = (projects || []).map((p, idx) => {
    // Handle Title/Desc safety
    const title = p.title || `Untitled Project ${idx + 1}`;
    const desc = p.desc || "No description provided.";
    
    // Handle Tech safety
    let tech = p.tech;
    if (typeof tech === 'string' && tech.trim()) {
      try { tech = JSON.parse(tech); } catch(e) { tech = tech.split(',').map((s: string) => s.trim()); }
    }
    const safeTech = Array.isArray(tech) ? tech : [];

    // Handle Type safety
    const type = p.type || 'major';

    return { ...p, title, desc, tech: safeTech, type };
  });

  const majorProjects = normalizedProjects.filter(p => !p.type || p.type.toLowerCase() !== 'minor');
  const minorProjects = normalizedProjects.filter(p => p.type?.toLowerCase() === 'minor');

  return (
    <section id="projects" className="py-20 md:py-32 px-4 md:px-6 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 text-center"
      >
        <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
          <Rocket className="text-purple-400" size={40} />
          Selected Works
        </h2>
        <div className="h-1 w-20 bg-purple-500 rounded-full mx-auto" />
      </motion.div>
      
      {/* 1. MAJOR PROJECTS */}
      {majorProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[450px] mb-32">
          {majorProjects.map((project, index) => (
            <motion.div
              key={project.id || index}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`
                ${project.size === "col-span-2" ? "md:col-span-2" : "md:col-span-1"}
                group relative rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden hover:border-purple-500/30 transition-all duration-500 flex flex-col justify-end
              `}
            >
              {project.img && (
                <div className="absolute inset-0 z-0 text-white/10 flex items-center justify-center overflow-hidden">
                    <Image 
                      src={project.img} 
                      alt={project.title}
                      fill
                      className="object-cover opacity-60 group-hover:scale-105 transition-all duration-700"
                    />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />
              
              <div className="relative z-20 p-10 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                <h3 className="text-3xl font-black text-white group-hover:text-purple-400 transition-colors mb-3 tracking-tighter">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-6 line-clamp-2">
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t: string) => (
                    <span key={t} className="px-2 py-1 text-[9px] font-black uppercase tracking-widest text-purple-300 bg-purple-500/10 rounded-lg border border-purple-500/10">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="py-24 text-center border border-white/10 bg-white/[0.02] rounded-[3rem] mb-32 relative overflow-hidden group">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.03),transparent_70%)]" />
             <p className="text-gray-500 font-mono text-xs uppercase tracking-[0.4em] relative z-10">No flagship projects found</p>
        </div>
      )}

      {/* 2. MINOR PROJECTS */}
      {minorProjects.length > 0 && (
        <section className="pt-20 border-t border-white/5">
             <div className="mb-12">
                <h3 className="text-2xl font-bold text-white mb-2">Secondary Lab</h3>
                <p className="text-gray-500 text-sm font-medium">Experimental builds and micro-utilities.</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {minorProjects.map((project, index) => (
                    <motion.div
                        key={project.id || index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-6 bg-white/5 border border-white/5 rounded-3xl hover:bg-white/[0.08] transition-all"
                    >
                        <h4 className="text-lg font-bold text-white mb-2 uppercase tracking-tight">{project.title}</h4>
                        <p className="text-gray-500 text-xs line-clamp-2 mb-4">{project.desc}</p>
                        <div className="flex flex-wrap gap-1.5">
                            {project.tech.map((t: string) => (
                                <span key={t} className="text-[9px] font-bold text-gray-500 opacity-60">#{t}</span>
                            ))}
                        </div>
                    </motion.div>
                ))}
             </div>
        </section>
      )}
    </section>
  );
}