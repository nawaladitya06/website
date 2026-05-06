"use client";
import React, { useState } from "react";
import { Trash2, Edit3, Globe } from "lucide-react";
import { deleteSkillAction, updateSkillAction } from "@/app/actions";
import EditModal from "./EditModal";

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

  return (
    <>
      <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-xl overflow-hidden shadow-2xl shadow-black/20">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-sm text-gray-300 border-separate border-spacing-y-2">
            <thead>
              <tr className="text-gray-500 uppercase text-[10px] font-black tracking-[0.2em]">
                <th className="pb-4 px-6">Domain</th>
                <th className="pb-4 px-6">Skill</th>
                <th className="pb-4 px-6">Proficiency</th>
                <th className="pb-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id} className="group bg-white/[0.02] hover:bg-white/[0.05] transition-all">
                  <td className="py-2.5 px-6 rounded-l-4xl border-y border-l border-white/5 group-hover:border-purple-500/30">
                    <span className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-2.5 px-6 border-y border-white/5 group-hover:border-purple-500/30">
                    <div className="flex items-center gap-3">
                        <span className="text-white font-bold">{item.name}</span>
                        <a href={item.url} target="_blank" className="text-gray-600 hover:text-white transition-colors">
                            <Globe size={14} />
                        </a>
                    </div>
                  </td>
                  <td className="py-2.5 px-6 border-y border-white/5 group-hover:border-purple-500/30">
                    <div className="w-full max-w-[100px] h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-gradient-to-r from-purple-500 to-cyan-400" 
                            style={{ width: `${item.level}%` }}
                        />
                    </div>
                  </td>
                  <td className="py-2.5 px-6 text-right rounded-r-4xl border-y border-r border-white/5 group-hover:border-purple-500/30">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => setEditingItem(item)}
                        className="p-2.5 bg-white/5 text-gray-400 rounded-xl hover:bg-white/10 hover:text-white transition active:scale-90"
                        title="Edit Skill"
                      >
                        <Edit3 size={16} />
                      </button>
                      <form action={deleteSkillAction.bind(null, item.id!)}>
                        <button 
                          type="submit" 
                          className="p-2.5 bg-red-500/5 text-red-400/50 rounded-xl hover:bg-red-500 hover:text-white transition active:scale-90"
                          title="Delete Skill"
                        >
                          <Trash2 size={16} />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-20 text-center">
                    <div className="flex flex-col items-center gap-3 opacity-20">
                        <div className="w-12 h-12 rounded-full border-2 border-dashed border-white" />
                        <p className="text-gray-400 font-medium">No skills mapped yet</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
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
