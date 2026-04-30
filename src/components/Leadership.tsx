"use client";
import { motion } from "framer-motion";
import { Briefcase, Gem, FileText } from "lucide-react";
import Image from "next/image";

export type Experience = {
  id?: number;
  role: string;
  org: string;
  year: string;
  desc: string;
  category: "leadership" | "professional";
  img: string;
  doc?: string | null;
};

export default function ExperienceSection({ experiences = [] }: { experiences?: Experience[] }) {
  const leadershipRoles = experiences.filter(exp => exp.category === "leadership");
  const professionalRoles = experiences.filter(exp => exp.category === "professional");

  return (
    <section id="experience" className="py-20 md:py-32 px-4 md:px-6 max-w-7xl mx-auto space-y-24 text-white">
      
      {/* 1. PROFESSIONAL EXPERIENCE (Internships/Jobs) */}
      <div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <Briefcase className="text-purple-400" size={40} />
            Professional Journey
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-4 font-light">Internships & Professional Work Experience</p>
          <div className="h-1 w-20 bg-purple-500 rounded-full mx-auto shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
        </motion.div>

        <div className="grid gap-8">
          {professionalRoles.map((exp, index) => (
            <ExperienceCard key={index} exp={exp} index={index} accentColor="purple" />
          ))}
          {professionalRoles.length === 0 && <p className="text-center text-gray-500 py-10">No professional roles added yet.</p>}
        </div>
      </div>

      {/* 2. LEADERSHIP ROLES */}
      <div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <Gem className="text-cyan-400" size={40} />
            Leadership Logs
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-4 font-light">Roles where I led teams and drove impact</p>
          <div className="h-1 w-20 bg-cyan-500 rounded-full mx-auto shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
        </motion.div>

        <div className="grid gap-8">
          {leadershipRoles.map((exp, index) => (
            <ExperienceCard key={index} exp={exp} index={index} accentColor="cyan" />
          ))}
          {leadershipRoles.length === 0 && <p className="text-center text-gray-500 py-10">No leadership roles added yet.</p>}
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({ exp, index, accentColor }: { exp: Experience, index: number, accentColor: string }) {
  const isPurple = accentColor === "purple";
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`group relative p-6 md:p-8 rounded-3xl bg-white/5 border border-white/10 transition-all hover:bg-white/[0.07] ${isPurple ? "hover:border-purple-500/30" : "hover:border-cyan-500/30"}`}
    >
      <div className={`absolute top-0 left-0 w-1 h-full rounded-l-3xl opacity-0 group-hover:opacity-100 transition-opacity ${isPurple ? "bg-purple-500" : "bg-cyan-500"}`} />
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Experience Icon/Image */}
        <div className="relative w-16 h-16 rounded-2xl border border-white/10 overflow-hidden shrink-0 bg-black/40 flex items-center justify-center">
          {exp.img ? (
            <Image src={exp.img} alt={exp.org} fill className="object-cover p-2" />
          ) : (
            <Briefcase size={24} className="text-gray-500" />
          )}
        </div>

        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
            <div>
              <h3 className={`text-2xl font-bold text-white transition-colors ${isPurple ? "group-hover:text-purple-300" : "group-hover:text-cyan-300"}`}>
                {exp.role}
              </h3>
              <p className="text-gray-400 font-medium">{exp.org}</p>
            </div>
            <div className="flex flex-col items-start md:items-end">
              <span className={`font-mono text-sm px-3 py-1 rounded-full bg-white/5 border border-white/10 ${isPurple ? 'text-purple-400' : 'text-cyan-400'}`}>
                {exp.year}
              </span>
            </div>
          </div>
          
          <p className="text-gray-400 leading-relaxed text-base md:text-lg whitespace-pre-wrap font-light mb-4">
            {exp.desc}
          </p>

          {exp.doc && (
            <a 
              href={exp.doc} 
              target="_blank" 
              className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${isPurple ? "text-purple-400 hover:text-purple-300" : "text-cyan-400 hover:text-cyan-300"}`}
            >
              <FileText size={16} />
              View Document / Certificate
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}