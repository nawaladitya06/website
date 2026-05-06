"use client";
import React, { useState } from "react";
import { Trash2, Edit3, Briefcase } from "lucide-react";
import { deleteExperienceAction, updateExperienceAction } from "@/app/actions";
import EditModal from "./EditModal";

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
      <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-sm text-gray-300 border-separate border-spacing-y-4">
            <thead>
              <tr className="text-gray-500 uppercase text-[10px] font-black tracking-[0.2em]">
                <th className="pb-2 px-6">Role & Org</th>
                <th className="pb-2 px-6">Domain</th>
                <th className="pb-2 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id} className="group bg-white/[0.02] hover:bg-white/[0.05] transition-all">
                  <td className="py-3 px-6 rounded-l-4xl border-y border-l border-white/5 group-hover:border-purple-500/30">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white/5 overflow-hidden border border-white/10 flex items-center justify-center">
                            {item.img ? <img src={item.img} alt={item.org} className="w-full h-full object-cover relative z-10" onError={(e) => (e.currentTarget.style.display = 'none')} /> : null}
                            <Briefcase size={20} className="text-gray-600 absolute" />
                        </div>
                        <div>
                            <p className="text-white font-bold leading-tight">{item.role}</p>
                            <p className="text-gray-500 text-xs mt-1">{item.org} • <span className="font-mono text-[10px]">{item.year}</span></p>
                        </div>
                    </div>
                  </td>
                  <td className="py-3 px-6 border-y border-white/5 group-hover:border-purple-500/30">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                        item.category === 'professional' ? 'bg-cyan-500/10 text-cyan-400' : 'bg-yellow-500/10 text-yellow-400'
                    }`}>
                      {item.category}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-right rounded-r-4xl border-y border-r border-white/5 group-hover:border-purple-500/30">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => setEditingItem(item)}
                        className="p-3 bg-white/5 text-gray-400 rounded-xl hover:bg-white/10 hover:text-white transition active:scale-90"
                      >
                        <Edit3 size={18} />
                      </button>
                      <form action={deleteExperienceAction.bind(null, item.id!) as any}>
                        <button 
                          type="submit" 
                          className="p-3 bg-red-500/5 text-red-400/50 rounded-xl hover:bg-red-500 hover:text-white transition active:scale-90"
                        >
                          <Trash2 size={18} />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={3} className="py-20 text-center text-gray-600">No career history records</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
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
