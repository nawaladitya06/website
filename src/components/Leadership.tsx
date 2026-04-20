"use client";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

export type Experience = {
  id?: number;
  role: string;
  org: string;
  year: string;
  desc: string;
};

export default function Leadership({ experiences = [] }: { experiences?: Experience[] }) {
  return (
<section id="leadership" className="py-20 md:py-32 px-4 md:px-6 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 text-center"
      >
        <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
          <Briefcase className="text-cyan-400" size={40} />
          Leadership Logs
        </h2>
        <div className="h-1 w-20 bg-cyan-500 rounded-full mx-auto" />
      </motion.div>

      <div className="grid gap-8">
        {experiences.map((exp, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-cyan-500/30 transition-all"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500 rounded-l-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                {exp.org}
              </h3>
              <span className="text-cyan-400 font-mono text-sm">
                {exp.role}
              </span>
            </div>
            
            <p className="text-gray-400 leading-relaxed text-lg">
              {exp.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}