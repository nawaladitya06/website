"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Github, ExternalLink, Cpu, Lightbulb, Target } from "lucide-react";

export default function ProjectDetailClient({ project, techArray }: { project: any, techArray: string[] }) {
  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <motion.main 
      initial="hidden"
      animate="show"
      variants={containerVars}
      className="min-h-screen pt-32 pb-20 px-4 md:px-6 max-w-5xl mx-auto"
    >
      <motion.div variants={itemVars}>
        <Link 
          href="/projects" 
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Works
        </Link>
      </motion.div>

      <motion.div 
        variants={itemVars}
        className="relative w-full aspect-video rounded-[2.5rem] overflow-hidden border border-white/10 mb-16 shadow-2xl shadow-purple-500/10"
      >
        <Image 
          src={project.img} 
          alt={project.title} 
          fill 
          className="object-cover scale-105 hover:scale-100 transition-transform duration-1000"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-20">
          {/* Header */}
          <motion.div variants={itemVars} className="space-y-6">
            <div className="space-y-2">
                <p className="text-purple-400 font-mono text-sm tracking-[0.3em] uppercase font-bold">Case Study</p>
                <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-none">{project.title}</h1>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {techArray.map((t: string) => (
                <span key={t} className="px-4 py-1.5 text-xs font-mono text-white bg-white/5 backdrop-blur-md rounded-full border border-white/10 hover:border-purple-500/50 transition-colors">
                  {t}
                </span>
              ))}
            </div>
            
            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed font-light max-w-3xl">
              {project.desc}
            </p>
          </motion.div>

          {/* Details Sections */}
          <div className="space-y-12">
            {project.challenge && (
              <motion.div 
                variants={itemVars}
                className="group p-10 rounded-[2rem] bg-white/[0.02] border border-white/10 hover:border-red-500/20 transition-all duration-500"
              >
                <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-red-500/10 rounded-2xl text-red-400 group-hover:scale-110 transition-transform">
                        <Target size={28} />
                    </div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">The Challenge</h2>
                </div>
                <p className="text-gray-400 text-lg leading-relaxed whitespace-pre-wrap font-light">{project.challenge}</p>
              </motion.div>
            )}

            {project.solution && (
              <motion.div 
                variants={itemVars}
                className="group p-10 rounded-[2rem] bg-white/[0.02] border border-white/10 hover:border-purple-500/20 transition-all duration-500"
              >
                <div className="flex items-center gap-4 mb-6">
                     <div className="p-3 bg-purple-500/10 rounded-2xl text-purple-400 group-hover:scale-110 transition-transform">
                        <Cpu size={28} />
                    </div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">The Solution</h2>
                </div>
                <p className="text-gray-400 text-lg leading-relaxed whitespace-pre-wrap font-light">{project.solution}</p>
              </motion.div>
            )}

            {project.impact && (
              <motion.div 
                variants={itemVars}
                className="group p-10 rounded-[2rem] bg-white/[0.02] border border-white/10 hover:border-yellow-500/20 transition-all duration-500"
              >
                <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-yellow-500/10 rounded-2xl text-yellow-400 group-hover:scale-110 transition-transform">
                        <Lightbulb size={28} />
                    </div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Key Impact</h2>
                </div>
                <p className="text-gray-400 text-lg leading-relaxed whitespace-pre-wrap font-light">{project.impact}</p>
              </motion.div>
            )}
          </div>
        </div>

        <motion.div variants={itemVars} className="space-y-8">
          <div className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl space-y-8 sticky top-32">
            <div>
                <h3 className="text-sm font-mono text-gray-500 uppercase tracking-[0.2em] mb-6">Project Metadata</h3>
                <div className="space-y-6">
                <div>
                    <p className="text-xs text-gray-500 font-bold mb-1">COMPLETION YEAR</p>
                    <p className="text-white text-lg font-medium">{project.year}</p>
                </div>
                <div className="h-px bg-white/10" />
                <div>
                    <p className="text-xs text-gray-500 font-bold mb-4">RESOURCES & ACCESS</p>
                    <div className="flex flex-col gap-3">
                    {project.github && (
                        <a 
                        href={project.github} 
                        target="_blank" 
                        className="group/link flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-purple-500/10 hover:border-purple-500/30 transition-all"
                        >
                        <div className="flex items-center gap-3">
                            <Github size={20} className="text-gray-400 group-hover/link:text-white" />
                            <span className="text-sm text-gray-200 font-medium">Source Code</span>
                        </div>
                        <ExternalLink size={14} className="text-gray-500" />
                        </a>
                    )}
                    {project.demo && (
                        <a 
                        href={project.demo} 
                        target="_blank" 
                        className="group/link flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-green-500/10 hover:border-green-500/30 transition-all"
                        >
                        <div className="flex items-center gap-3">
                            <ExternalLink size={20} className="text-gray-400 group-hover/link:text-white" />
                            <span className="text-sm text-gray-200 font-medium">Live Deployment</span>
                        </div>
                        <ExternalLink size={14} className="text-gray-500" />
                        </a>
                    )}
                    </div>
                </div>
                </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
}
