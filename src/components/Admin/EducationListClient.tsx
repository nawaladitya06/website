"use client";
import React, { useState } from "react";
import { Trash2, Edit3, ExternalLink } from "lucide-react";
import { deleteEducationAction, updateEducationAction } from "@/app/actions";
import EditModal from "./EditModal";

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
      <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-sm text-gray-300 border-separate border-spacing-y-2">
            <thead>
              <tr className="text-gray-500 uppercase text-[10px] font-black tracking-[0.2em]">
                <th className="pb-4 px-6">Institution</th>
                <th className="pb-4 px-6">Degree</th>
                <th className="pb-4 px-6">Score</th>
                <th className="pb-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id} className="group bg-white/[0.02] hover:bg-white/[0.05] transition-all">
                  <td className="py-2 px-6 rounded-l-4xl border-y border-l border-white/5 group-hover:border-purple-500/30">
                    <div className="flex flex-col">
                        <span className="text-white font-bold">{item.institution}</span>
                        <span className="text-[10px] text-gray-500 font-mono mt-1">{item.year}</span>
                    </div>
                  </td>
                  <td className="py-2 px-6 border-y border-white/5 group-hover:border-purple-500/30">
                    <span className="text-gray-300">{item.degree}</span>
                  </td>
                  <td className="py-2 px-6 border-y border-white/5 group-hover:border-purple-500/30">
                    <span className="px-3 py-1 bg-white/5 rounded-lg text-xs font-mono">{item.score}</span>
                  </td>
                  <td className="py-2 px-6 text-right rounded-r-4xl border-y border-r border-white/5 group-hover:border-purple-500/30">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => setEditingItem(item)}
                        className="p-2.5 bg-white/5 text-gray-400 rounded-xl hover:bg-white/10 hover:text-white transition active:scale-90"
                      >
                        <Edit3 size={16} />
                      </button>
                      <form action={deleteEducationAction.bind(null, item.id!)}>
                        <button 
                          type="submit" 
                          className="p-2.5 bg-red-500/5 text-red-400/50 rounded-xl hover:bg-red-500 hover:text-white transition active:scale-90"
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
                  <td colSpan={4} className="py-20 text-center text-gray-500 italic">No academic records found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
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
