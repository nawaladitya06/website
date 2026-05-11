"use client";
import React, { useState } from "react";
import { Trash2, Edit3, GraduationCap, Award, ExternalLink, Calendar } from "lucide-react";
import { deleteEducationAction, updateEducationAction } from "@/app/actions";
import EditModal from "./EditModal";
import { motion, AnimatePresence } from "framer-motion";

interface Education {
  id: number;
  institution: string;
  degree: string;
  year: string;
  score: string;
  link: string;
}

export default function EducationListClient({ items }: { items: Education[] }) {
  const [editingItem, setEditingItem] = useState<Education | null>(null);

  const fields: any[] = [
    { name: "institution", label: "Institution", type: "text", required: true },
    { name: "degree", label: "Degree / Course", type: "text", required: true },
    { name: "year", label: "Year", type: "text", required: true },
    { name: "score", label: "Score / GPA", type: "text", required: true },
    { name: "link", label: "Institution Link", type: "url", required: true },
  ];

  async function handleSave(formData: FormData) {
    if (editingItem) {
      await updateEducationAction(editingItem.id, formData);
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence>
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.05 }}
              className="group relative bg-white/5 border border-white/10 rounded-[2rem] p-6 backdrop-blur-xl hover:bg-white/[0.08] hover:border-emerald-500/30 transition-all duration-300 flex flex-col h-full shadow-2xl overflow-hidden"
            >
              {/* Actions (Hover) */}
              <div className="absolute top-4 right-4 flex gap-2 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 p-1.5 rounded-xl backdrop-blur-md border border-white/10 z-10">
                <button 
                  onClick={() => setEditingItem(item)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  title="Edit Record"
                >
                  <Edit3 size={16} />
                </button>
                <form action={deleteEducationAction.bind(null, item.id!)}>
                  <button 
                    type="submit" 
                    className="p-2 text-red-400/80 hover:text-white hover:bg-red-500 rounded-lg transition-colors"
                    title="Delete Record"
                  >
                    <Trash2 size={16} />
                  </button>
                </form>
              </div>

              {/* Icon & Title */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/20 flex flex-shrink-0 items-center justify-center text-emerald-400 shadow-inner group-hover:scale-105 transition-transform duration-300">
                  <GraduationCap size={24} />
                </div>
                <div className="pr-16">
                  <h3 className="text-lg font-bold text-white leading-tight group-hover:text-emerald-300 transition-colors">
                    {item.institution}
                  </h3>
                  <a 
                    href={item.link} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-emerald-400 transition-colors mt-1"
                  >
                    Visit Website <ExternalLink size={10} />
                  </a>
                </div>
              </div>

              {/* Degree */}
              <div className="mb-6 flex-grow">
                <p className="text-gray-300 font-medium leading-relaxed">
                  {item.degree}
                </p>
              </div>

              {/* Bottom Metadata */}
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/5 rounded-lg text-xs font-mono text-gray-400">
                  <Calendar size={12} className="text-gray-500" />
                  {item.year}
                </div>
                
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-xs font-mono font-bold text-emerald-400">
                  <Award size={12} />
                  {item.score}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {items.length === 0 && (
          <div className="col-span-full py-20 flex flex-col items-center justify-center bg-white/5 rounded-[2.5rem] border border-dashed border-white/20">
            <GraduationCap size={48} className="text-gray-600 mb-4" />
            <p className="text-gray-400 font-medium">No academic records found</p>
            <p className="text-sm text-gray-500 mt-2">Click "Add Record" to build your educational history.</p>
          </div>
        )}
      </div>

      <EditModal 
        isOpen={!!editingItem}
        onClose={() => setEditingItem(null)}
        title="Update Academic Record"
        initialData={editingItem}
        onSave={handleSave}
        fields={fields}
      />
    </>
  );
}
