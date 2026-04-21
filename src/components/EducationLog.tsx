"use client";
import { motion } from "framer-motion";
import { GraduationCap, ExternalLink } from "lucide-react"; // 1. Import ExternalLink

export type Education = {
  id?: number;
  institution: string;
  degree: string;
  year: string;
  score: string;
  link: string;
};

export default function About({ educations = [] }: { educations?: Education[] }) {
  return (
    <section id="education" className="py-20 md:py-32 px-4 md:px-6 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 text-center"
      >
        <h2 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
          <GraduationCap className="text-purple-400" size={40} />
          Education Log
        </h2>
        <div className="h-1 w-20 bg-purple-500 rounded-full mx-auto" />
      </motion.div>

      <div className="space-y-12 relative border-l border-white/10 ml-3 pl-8">
        {educations.map((edu, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            viewport={{ once: true }}
            className="relative group"
          >
            {/* Timeline Dot */}
            <div className="absolute -left-[41px] top-1 h-6 w-6 rounded-full border-4 border-[#050505] bg-purple-500 group-hover:scale-125 transition-transform" />
            
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-colors backdrop-blur-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                {/* 2. Update this section to use the link */}
                <a 
                  href={edu.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 group/link"
                >
                  <h3 className="text-xl font-bold text-white group-hover/link:text-purple-400 transition-colors">
                    {edu.institution}
                  </h3>
                  <ExternalLink size={16} className="text-gray-400 group-hover/link:text-purple-400 transition-colors" />
                </a>

                <span className="px-3 py-1 text-xs font-mono text-purple-300 bg-purple-500/10 rounded-full border border-purple-500/20 w-fit">
                  {edu.year}
                </span>
              </div>
              <p className="text-lg text-gray-300 font-medium">{edu.degree}</p>
              <p className="text-gray-500 text-sm mt-2 font-mono">
                {edu.score}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}