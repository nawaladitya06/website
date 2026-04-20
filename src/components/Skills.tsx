"use client";
import { motion } from "framer-motion";
import { Terminal, Cpu, ExternalLink } from "lucide-react";

export default function Skills({ skills = [] }: { skills: any[] }) {
  // Group skills by category organically from the database records
  const groupedSkills = skills.reduce((acc: any, skill: any) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push({ name: skill.name, url: skill.url });
    return acc;
  }, {});

  return (
    <section id="skills" className="py-20 md:py-32 px-4 md:px-6 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 text-center"
      >
        <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
          <Cpu className="text-cyan-400" size={40} />
          Tech Arsenal
        </h2>
        <div className="h-1 w-20 bg-cyan-500 rounded-full mx-auto" />
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Object.entries(groupedSkills).map(([category, items]: [string, any], index) => (
          <motion.div 
            key={category}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md hover:border-cyan-500/30 transition-all"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-white/5 rounded-lg text-cyan-400">
                <Terminal size={20} />
              </div>
              <h3 className="text-xl font-semibold text-white font-mono">
                {category}
              </h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {items.map((skill: any) => (
                <a 
                  key={skill.name} 
                  href={skill.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="relative group/skill px-3 py-1.5 text-sm text-gray-400 bg-white/5 rounded border border-white/5 hover:text-white hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all cursor-pointer flex items-center gap-1"
                >
                  {skill.name}
                  {/* Subtle arrow icon on hover */}
                  <ExternalLink size={10} className="opacity-0 group-hover/skill:opacity-100 transition-opacity -mr-2 group-hover/skill:mr-0" />
                </a>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}