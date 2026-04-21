"use client";
import React, { useState } from "react";
import { Trash2, Edit3, Type } from "lucide-react";
import { deleteAboutAction, updateAboutAction } from "@/app/actions";
import EditModal from "./EditModal";

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
      <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-xl overflow-hidden shadow-2xl">
        <div className="space-y-4">
            {items.map((item, index) => (
                <div 
                    key={item.id} 
                    className="group relative p-6 bg-white/[0.02] border border-white/5 rounded-3xl hover:bg-white/[0.05] hover:border-purple-500/30 transition-all"
                >
                    <div className="flex justify-between gap-6">
                        <div className="flex gap-4">
                             <div className="w-8 h-8 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center font-black text-xs shrink-0">
                                {index + 1}
                             </div>
                             <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap italic">
                                "{item.content}"
                             </p>
                        </div>
                        
                        <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                                onClick={() => setEditingItem(item)}
                                className="p-2 bg-white text-black rounded-lg hover:bg-purple-100 transition active:scale-90"
                                title="Edit Paragraph"
                            >
                                <Edit3 size={14} />
                            </button>
                            <form action={deleteAboutAction.bind(null, item.id!)}>
                                <button 
                                    type="submit" 
                                    className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition active:scale-90"
                                    title="Delete Paragraph"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            ))}

            {items.length === 0 && (
                <div className="py-20 text-center text-gray-700 italic border-2 border-dashed border-white/5 rounded-3xl">
                    No bio paragraphs found
                </div>
            )}
        </div>
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
