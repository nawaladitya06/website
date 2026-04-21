"use client";
import React, { useState } from "react";
import { Award, Trash2, Edit3, ExternalLink, ShieldCheck } from "lucide-react";
import { updateCertificationAction, deleteCertificationAction } from "@/app/actions";
import EditModal from "./EditModal";

interface Certification {
  id: number;
  name: string;
  issuer: string;
  date: string;
  url: string | null;
  img: string | null;
}

export default function CertificationsListClient({ items }: { items: Certification[] }) {
  const [editingItem, setEditingItem] = useState<Certification | null>(null);

  const fields: any[] = [
    { name: "name", label: "Certification Name", type: "text", required: true },
    { name: "issuer", label: "Issuing Organization", type: "text", required: true },
    { name: "date", label: "Date Issued", type: "text", required: true },
    { name: "type", label: "Credential Level", type: "select", options: [
        { label: "Flagship Credential", value: "major" },
        { label: "Supplementary Validation", value: "minor" }
    ]},
    { name: "img", label: "Upload New Certificate Image", type: "file", accept: "image/*" },
    { name: "img_url", label: "...or Update Image URL", type: "url", placeholder: "https://..." },
    { name: "url", label: "Upload New Verification / PDF", type: "file", accept: "application/pdf,image/*" },
    { name: "file_url", label: "...or Update Doc URL", type: "url", placeholder: "https://..." },
  ];

  return (
    <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-xl shadow-2xl">
      <div className="space-y-6">
        {items.map((item) => (
          <div 
            key={item.id} 
            className="group flex flex-col md:flex-row md:items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-3xl hover:bg-white/[0.05] hover:border-purple-500/30 transition-all gap-6"
          >
            <div className="flex items-center gap-5">
              {item.img ? (
                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-black/20 border border-white/10 shrink-0">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
              ) : (
                <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0 border border-purple-500/10">
                  <ShieldCheck size={28} />
                </div>
              )}
              <div className="space-y-1">
                <h3 className="text-white font-black text-lg tracking-tight leading-tight">{item.name}</h3>
                <div className="flex items-center gap-3 text-[10px] uppercase font-bold tracking-widest text-gray-500">
                  <span className="text-purple-400">{item.issuer}</span>
                  <span className="w-1 h-1 rounded-full bg-white/10" />
                  <span>{item.date}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 ml-auto md:ml-0">
              {item.url && (
                <a 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-white/5 text-gray-400 rounded-xl hover:bg-white/10 hover:text-white transition active:scale-95"
                >
                  <ExternalLink size={18} />
                </a>
              )}
              <button 
                onClick={() => setEditingItem(item)}
                className="p-3 bg-white text-black rounded-xl hover:bg-purple-100 transition active:scale-90"
              >
                <Edit3 size={18} />
              </button>
              <form action={deleteCertificationAction.bind(null, item.id)}>
                <button 
                  type="submit" 
                  className="p-3 bg-red-500/5 text-red-400/50 rounded-xl hover:bg-red-500 hover:text-white transition active:scale-90"
                >
                  <Trash2 size={18} />
                </button>
              </form>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className="py-20 text-center text-gray-700 font-medium italic">
            No certifications added yet.
          </div>
        )}
      </div>

      <EditModal 
        isOpen={!!editingItem}
        onClose={() => setEditingItem(null)}
        title="Edit Certification"
        initialData={editingItem}
        onSave={(fd) => updateCertificationAction(editingItem!.id, fd)}
        fields={fields}
      />
    </div>
  );
}
