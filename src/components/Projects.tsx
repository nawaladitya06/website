"use client";
import { motion } from "framer-motion";
import Image from "next/image"; // Import Image component
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
};

export default function Projects({ projects = [] }: { projects?: Project[] }) {
  return (
    <section id="projects" className="py-20 md:py-32 px-4 md:px-6 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 text-center"
      >
        <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
          <Rocket className="text-purple-400" size={40} />
          Selected Works
        </h2>
        <div className="h-1 w-20 bg-purple-500 rounded-full mx-auto" />
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[350px]">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`
              ${project.size === "col-span-2" ? "md:col-span-2" : "md:col-span-1"}
              group relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden hover:border-purple-500/30 transition-colors flex flex-col justify-end
            `}
          >
            {/* 1. PROJECT PREVIEW IMAGE (Background) */}
            <div className="absolute inset-0 z-0">
               {/* Note: Ensure you have these images in public/projects/ folder */}
               <Image 
                 src={project.img} 
                 alt={project.title}
                 fill
                 className="object-cover opacity-60 group-hover:scale-110 group-hover:opacity-40 transition-all duration-700"
               />
            </div>

            {/* 2. Dark Gradient Overlay (Makes text readable) */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-transparent z-10 pointer-events-none" />
            
            {/* 3. Card Content */}
            <div className="relative z-20 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors flex items-center gap-3">
                  {project.title}
                </h3>

                {/* ACTION BUTTONS (Github & Demo) */}
                <div className="flex gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                  {project.github && (
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="p-2 bg-white/10 rounded-full hover:bg-white/20 hover:text-purple-400 transition-colors backdrop-blur-md"
                      title="View Code"
                    >
                      <Github size={18} />
                    </a>
                  )}
                  {project.demo && (
                    <a 
                      href={project.demo} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="p-2 bg-white/10 rounded-full hover:bg-white/20 hover:text-green-400 transition-colors backdrop-blur-md"
                      title="Live Demo"
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>
              
              <p className="text-gray-400 text-sm mb-4 line-clamp-2 group-hover:line-clamp-none transition-all">
                {project.desc}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="px-2 py-1 text-xs font-mono text-purple-300 bg-purple-500/10 rounded border border-purple-500/20 backdrop-blur-md">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}