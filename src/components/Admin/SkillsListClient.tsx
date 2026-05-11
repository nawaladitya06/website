"use client";
import React, { useState } from "react";
import { Trash2, Edit3, Globe, Cpu } from "lucide-react";
import { deleteSkillAction, updateSkillAction } from "@/app/actions";
import EditModal from "./EditModal";
import { motion, AnimatePresence } from "framer-motion";

interface Skill {
  id: number;
  category: string;
  name: string;
  url: string;
  level: number;
}

export default function SkillsListClient({ items }: { items: Skill[] }) {
  const [editingItem, setEditingItem] = useState<Skill | null>(null);

  const fields: any[] = [
    { name: "category", label: "Category", type: "text", required: true, placeholder: "e.g. Frontend" },
    { name: "name", label: "Skill Name", type: "text", required: true, placeholder: "e.g. React" },
    { name: "level", label: "Proficiency Level (0-100)", type: "number", required: true, placeholder: "80" },
    { name: "url", label: "Documentation URL", type: "url", required: true, placeholder: "https://..." },
  ];

  async function handleSave(formData: FormData) {
    if (editingItem) {
      await updateSkillAction(editingItem.id, formData);
    }
  }

  // Group skills by category
  const groupedSkills = items.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <>
      <div className="space-y-8">
        <AnimatePresence>
          {Object.entries(groupedSkills).map(([category, skills], catIndex) => (
            <motion.div 
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: catIndex * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-[2rem] p-6 backdrop-blur-xl shadow-2xl overflow-hidden"
            >
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                <div className="p-2 bg-purple-500/10 rounded-xl text-purple-400">
                  <Cpu size={18} />
                </div>
                <h3 className="text-lg font-bold text-white uppercase tracking-wider">{category}</h3>
                <span className="ml-auto text-xs font-mono text-gray-500">{skills.length} skills</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {skills.map((skill, index) => (
                  <motion.div 
                    key={skill.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (catIndex * 0.1) + (index * 0.05) }}
                    className="group relative flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.08] hover:border-purple-500/30 transition-all duration-300"
                  >
                    <div className="flex-1 min-w-0 pr-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-bold text-white truncate group-hover:text-purple-300 transition-colors">{skill.name}</span>
                        <a href={skill.url} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors flex-shrink-0">
                          <Globe size={12} />
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-purple-400 to-purple-500 rounded-full"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-mono text-purple-400 font-bold w-6">{skill.level}%</span>
                      </div>
                    </div>

                    {/* Actions Hover */}
                    <div className="flex items-center gap-1 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => setEditingItem(skill)}
                        className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                        title="Edit Skill"
                      >
                        <Edit3 size={14} />
                      </button>
                      <form action={deleteSkillAction.bind(null, skill.id!)}>
                        <button 
                          type="submit" 
                          className="p-2 text-red-400/80 hover:text-white hover:bg-red-500 rounded-lg transition-colors"
                          title="Delete Skill"
                        >
                          <Trash2 size={14} />
                        </button>
                      </form>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {items.length === 0 && (
          <div className="py-24 flex flex-col items-center justify-center bg-white/5 rounded-[2.5rem] border border-dashed border-white/20 shadow-inner">
            <div className="p-4 bg-white/5 rounded-full mb-4 border border-white/5">
              <Cpu size={40} className="text-gray-500" />
            </div>
            <p className="text-gray-300 font-bold text-lg">No Skills Mapped</p>
            <p className="text-sm text-gray-500 mt-2 font-mono">Use the form to add technical skills.</p>
          </div>
        )}
      </div>

      <EditModal 
        isOpen={!!editingItem}
        onClose={() => setEditingItem(null)}
        title="Update Tech Skill"
        initialData={editingItem}
        onSave={handleSave}
        fields={fields}
      />
    </>
  );
}
