"use client";
import React from "react";
import { Trash2, Edit3, Layout, Calendar, Github, Globe } from "lucide-react";
import { deleteProjectAction } from "@/app/actions";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface Project {
  id: number;
  title: string;
  desc: string;
  tech: string[] | string;
  year: string;
  size: string;
  img: string;
  github: string | null;
  demo: string | null;
  type: string;
}

export default function ProjectListClient({ items }: { items: Project[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <AnimatePresence>
        {items.map((item, index) => {
          const techArray = Array.isArray(item.tech) ? item.tech : [];
          
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.05 }}
              className="group relative bg-white/5 border border-white/10 rounded-[2rem] p-6 backdrop-blur-xl hover:bg-white/[0.08] hover:border-purple-500/30 transition-all duration-300 flex flex-col h-full shadow-2xl overflow-hidden"
            >
              {/* Card Header & Image */}
              <div className="relative h-40 -mx-6 -mt-6 mb-6 overflow-hidden bg-black/40 border-b border-white/5">
                {item.img ? (
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" onError={(e) => (e.currentTarget.style.display = 'none')} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Layout size={32} className="text-gray-600" />
                  </div>
                )}
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Badges on Image */}
                <div className="absolute bottom-4 left-4 flex gap-2">
                  <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider backdrop-blur-md border ${
                    item.type === 'major' ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' : 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                  }`}>
                    {item.type === 'major' ? 'Major Case' : 'Minor Build'}
                  </span>
                </div>

                {/* Actions Hover (Desktop) */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 p-1.5 rounded-xl backdrop-blur-md border border-white/10">
                  <Link 
                    href={`/admin/projects/${item.id}`}
                    className="p-2 text-gray-300 hover:text-white hover:bg-white/20 rounded-lg transition-colors"
                    title="Edit Case Study"
                  >
                    <Edit3 size={16} />
                  </Link>
                  <form action={deleteProjectAction.bind(null, item.id!)}>
                    <button 
                      type="submit" 
                      className="p-2 text-red-400/80 hover:text-white hover:bg-red-500 rounded-lg transition-colors"
                      title="Delete Project"
                    >
                      <Trash2 size={16} />
                    </button>
                  </form>
                </div>
              </div>

              {/* Title & Timeline */}
              <div className="mb-4">
                <h3 className="text-xl font-black text-white leading-tight group-hover:text-purple-300 transition-colors mb-2">{item.title}</h3>
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-gray-400">
                  <Calendar size={12} className="text-purple-500/70" />
                  {item.year}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {techArray.slice(0, 4).map((t: string) => (
                  <span key={t} className="px-2 py-0.5 bg-white/5 border border-white/5 text-gray-300 rounded text-[10px] font-bold uppercase tracking-widest">{t}</span>
                ))}
                {techArray.length > 4 && (
                  <span className="px-2 py-0.5 bg-white/5 border border-white/5 text-gray-500 rounded text-[10px] font-bold uppercase tracking-widest">+{techArray.length - 4}</span>
                )}
              </div>

              {/* Description */}
              <div className="flex-grow mb-6">
                <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">
                  {item.desc}
                </p>
              </div>

              {/* Links Footer */}
              {(item.github || item.demo) && (
                <div className="pt-4 mt-auto border-t border-white/5 flex gap-4">
                  {item.github && (
                    <a href={item.github} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-white transition-colors">
                      <Github size={14} /> Repository
                    </a>
                  )}
                  {item.demo && (
                    <a href={item.demo} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-white transition-colors">
                      <Globe size={14} /> Live Demo
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>

      {items.length === 0 && (
        <div className="col-span-full py-24 flex flex-col items-center justify-center bg-white/5 rounded-[2.5rem] border border-dashed border-white/20 shadow-inner">
          <div className="p-4 bg-white/5 rounded-full mb-4 border border-white/5">
            <Layout size={40} className="text-gray-500" />
          </div>
          <p className="text-gray-300 font-bold text-lg">No Projects Archived</p>
          <p className="text-sm text-gray-500 mt-2 font-mono">Use the Fast Build form to initialize a new project.</p>
        </div>
      )}
    </div>
  );
}
