"use client";
import React, { useState } from "react";
import { Trash2, Edit3, Type, Quote } from "lucide-react";
import { deleteAboutAction, updateAboutAction } from "@/app/actions";
import EditModal from "./EditModal";
import { motion, AnimatePresence } from "framer-motion";

interface About {
  id: number;
  content: string;
}

export default function AboutListClient({ items }: { items: About[] }) {
  const [editingItem, setEditingItem] = useState<About | null>(null);

  const fields: any[] = [
    { name: "content", label: "Paragraph Content", type: "textarea", required: true, placeholder: "Describe yourself..." },
  ];

  async function handleSave(formData: FormData) {
    if (editingItem) {
      await updateAboutAction(editingItem.id, formData);
    }
  }

  return (
    <>
      <div className="space-y-4">
        <AnimatePresence>
          {items.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.1 }}
              className="group relative p-6 bg-white/5 border border-white/10 rounded-[2rem] hover:bg-white/[0.08] hover:border-purple-500/30 transition-all duration-300 shadow-xl backdrop-blur-xl"
            >
              <div className="flex justify-between gap-6">
                <div className="flex gap-5">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500/20 to-fuchsia-600/10 text-purple-400 flex items-center justify-center font-black text-sm shrink-0 border border-purple-500/20 shadow-inner">
                    {index + 1}
                  </div>
                  <div className="pt-2">
                    <Quote size={14} className="text-purple-500/30 mb-2" />
                    <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                      {item.content}
                    </p>
                  </div>
                </div>
                
                {/* Actions Hover */}
                <div className="flex flex-col gap-2 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 p-1.5 rounded-xl backdrop-blur-md border border-white/10 shrink-0">
                  <button 
                    onClick={() => setEditingItem(item)}
                    className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    title="Edit Paragraph"
                  >
                    <Edit3 size={14} />
                  </button>
                  <form action={deleteAboutAction.bind(null, item.id!)}>
                    <button 
                      type="submit" 
                      className="p-2 text-red-400/80 hover:text-white hover:bg-red-500 rounded-lg transition-colors"
                      title="Delete Paragraph"
                    >
                      <Trash2 size={14} />
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {items.length === 0 && (
          <div className="py-16 flex flex-col items-center justify-center bg-white/5 rounded-[2.5rem] border border-dashed border-white/20 shadow-inner">
            <Type size={32} className="text-gray-600 mb-3" />
            <p className="text-gray-400 font-medium text-sm">No bio paragraphs written</p>
          </div>
        )}
      </div>

      <EditModal 
        isOpen={!!editingItem}
        onClose={() => setEditingItem(null)}
        title="Update Bio Paragraph"
        initialData={editingItem}
        onSave={handleSave}
        fields={fields}
      />
    </>
  );
}
