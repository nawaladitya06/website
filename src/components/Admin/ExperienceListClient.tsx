"use client";
import React, { useState } from "react";
import { Trash2, Edit3, Briefcase, Calendar, Building2 } from "lucide-react";
import { deleteExperienceAction, updateExperienceAction } from "@/app/actions";
import EditModal from "./EditModal";
import { motion, AnimatePresence } from "framer-motion";

interface Experience {
  id: number;
  role: string;
  org: string;
  year: string;
  desc: string;
  category: string;
  img: string;
  doc: string | null;
}

export default function ExperienceListClient({ items }: { items: Experience[] }) {
  const [editingItem, setEditingItem] = useState<Experience | null>(null);

  const fields: any[] = [
    { name: "role", label: "Role / Position", type: "text", required: true },
    { name: "org", label: "Organization", type: "text", required: true },
    { name: "year", label: "Timeline", type: "text", required: true },
    { name: "category", label: "Category", type: "select", required: true, options: [
        { label: "Professional (Internship/Job)", value: "professional" },
        { label: "Leadership Role", value: "leadership" }
    ]},
    { name: "img", label: "Upload New Logo", type: "file", accept: "image/*" },
    { name: "img_url", label: "...or Update Logo URL", type: "url" },
    { name: "doc", label: "Update Document URL", type: "url" },
    { name: "desc", label: "Description", type: "textarea", required: true },
  ];

  async function handleSave(formData: FormData) {
    if (editingItem) {
      await updateExperienceAction(editingItem.id, formData);
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
              className="group relative bg-white/5 border border-white/10 rounded-[2rem] p-6 backdrop-blur-xl hover:bg-white/[0.08] hover:border-purple-500/30 transition-all duration-300 flex flex-col h-full shadow-2xl"
            >
              {/* Card Header */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-inner">
                    {item.img ? (
                      <img src={item.img} alt={item.org} className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
                    ) : (
                      <Briefcase size={24} className="text-gray-500" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white leading-tight group-hover:text-purple-300 transition-colors">{item.role}</h3>
                    <div className="flex items-center gap-2 text-gray-400 mt-1">
                      <Building2 size={12} />
                      <span className="text-xs font-medium">{item.org}</span>
                    </div>
                  </div>
                </div>

                {/* Actions (Hidden until hover on desktop) */}
                <div className="flex flex-col gap-2 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity absolute right-6 top-6 bg-black/40 p-1.5 rounded-xl backdrop-blur-md border border-white/5">
                  <button 
                    onClick={() => setEditingItem(item)}
                    className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit3 size={16} />
                  </button>
                  <form action={deleteExperienceAction.bind(null, item.id!)}>
                    <button 
                      type="submit" 
                      className="p-2 text-red-400/70 hover:text-white hover:bg-red-500 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </form>
                </div>
              </div>

              {/* Badges & Timeline */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                  item.category === 'professional' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                }`}>
                  {item.category}
                </span>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-[10px] font-mono text-gray-300">
                  <Calendar size={12} className="text-gray-500" />
                  {item.year}
                </div>
              </div>

              {/* Description */}
              <div className="flex-grow">
                <p className="text-sm text-gray-400 leading-relaxed line-clamp-4 group-hover:line-clamp-none transition-all duration-300">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {items.length === 0 && (
          <div className="col-span-full py-20 flex flex-col items-center justify-center bg-white/5 rounded-[2.5rem] border border-dashed border-white/20">
            <Briefcase size={48} className="text-gray-600 mb-4" />
            <p className="text-gray-400 font-medium">No experience records found</p>
            <p className="text-sm text-gray-500 mt-2">Click "Add New Experience" to get started.</p>
          </div>
        )}
      </div>

      <EditModal 
        isOpen={!!editingItem}
        onClose={() => setEditingItem(null)}
        title="Update Experience"
        initialData={editingItem}
        onSave={handleSave}
        fields={fields}
      />
    </>
  );
}
