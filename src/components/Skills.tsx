"use client";
import { motion } from "framer-motion";
import { Terminal, Cpu, ExternalLink } from "lucide-react";

export default function Skills({ skills = [] }: { skills: any[] }) {
  // Group skills by category organically from the database records
  const groupedSkills = skills.reduce((acc: any, skill: any) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push({ name: skill.name, url: skill.url, level: skill.level || 80 });
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
          <Cpu className="text-purple-400" size={40} />
          Tech Arsenal
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto font-light mb-4">A visualization of my technical proficiency and stack specialization.</p>
        <div className="h-1 w-20 bg-purple-500 rounded-full mx-auto" />
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {Object.entries(groupedSkills).map(([category, items]: [string, any], index) => (
          <motion.div 
            key={category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl"
          >
            <div className="flex items-center gap-3 mb-10">
              <div className="p-2.5 bg-purple-500/10 rounded-xl text-purple-400">
                <Terminal size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white">
                {category}
              </h3>
            </div>
            
            <div className="space-y-8">
              {items.map((skill: any) => (
                <div key={skill.name} className="group/skill">
                  <div className="flex justify-between items-center mb-2">
                    <a 
                      href={skill.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-white font-medium hover:text-purple-400 transition-colors"
                    >
                      {skill.name}
                      <ExternalLink size={14} className="opacity-0 group-hover/skill:opacity-100 transition-opacity" />
                    </a>
                    <span className="text-sm font-mono text-purple-500 font-bold">{skill.level}%</span>
                  </div>
                  
                  {/* Progress Bar Container */}
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                      viewport={{ once: true }}
                      className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full relative"
                    >
                      {/* Inner Glow */}
                      <div className="absolute inset-0 bg-white/20 animate-pulse" />
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}