"use client";
import React, { useState } from "react";
import { Trash2, Edit3, Award, ExternalLink, Calendar, Building, ShieldCheck } from "lucide-react";
import { updateCertificationAction, deleteCertificationAction } from "@/app/actions";
import EditModal from "./EditModal";
import { motion, AnimatePresence } from "framer-motion";

interface Certification {
  id: number;
  name: string;
  issuer: string;
  date: string;
  url: string | null;
  img: string | null;
  type?: string;
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
              className="group relative bg-white/5 border border-white/10 rounded-[2rem] p-6 backdrop-blur-xl hover:bg-white/[0.08] hover:border-purple-500/30 transition-all duration-300 flex flex-col h-full shadow-2xl overflow-hidden"
            >
              {/* Image Header */}
              <div className="relative h-40 -mx-6 -mt-6 mb-6 overflow-hidden bg-black/40 border-b border-white/5 flex items-center justify-center p-4">
                {item.img ? (
                  <img src={item.img} alt={item.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700" onError={(e) => (e.currentTarget.style.display = 'none')} />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-500/10 to-purple-500/5">
                    <ShieldCheck size={48} className="text-purple-500/40 mb-2" />
                    <span className="text-[10px] uppercase tracking-widest text-purple-500/50 font-black">Verified Credential</span>
                  </div>
                )}
                {/* Subtle Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

                {/* Badge */}
                <div className="absolute bottom-4 left-4 flex gap-2">
                  <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider backdrop-blur-md border ${
                    item.type === 'major' || !item.type ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' : 'bg-zinc-500/20 text-zinc-300 border-zinc-500/30'
                  }`}>
                    {item.type === 'minor' ? 'Supplementary' : 'Flagship'}
                  </span>
                </div>

                {/* Actions Hover */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 p-1.5 rounded-xl backdrop-blur-md border border-white/10 z-10">
                  <button 
                    onClick={() => setEditingItem(item)}
                    className="p-2 text-gray-300 hover:text-white hover:bg-white/20 rounded-lg transition-colors"
                    title="Edit Certification"
                  >
                    <Edit3 size={16} />
                  </button>
                  <form action={deleteCertificationAction.bind(null, item.id)}>
                    <button 
                      type="submit" 
                      className="p-2 text-red-400/80 hover:text-white hover:bg-red-500 rounded-lg transition-colors"
                      title="Delete Certification"
                    >
                      <Trash2 size={16} />
                    </button>
                  </form>
                </div>
              </div>

              {/* Title & Issuer */}
              <div className="flex-grow mb-6">
                <h3 className="text-lg font-black text-white leading-tight group-hover:text-purple-300 transition-colors mb-3">
                  {item.name}
                </h3>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Building size={14} className="text-purple-500/70" />
                    <span className="text-sm font-medium">{item.issuer}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar size={14} className="text-purple-500/70" />
                    <span className="text-[10px] font-mono uppercase tracking-widest">{item.date}</span>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              {item.url && (
                <div className="pt-4 mt-auto border-t border-white/5">
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 text-purple-400 rounded-xl transition-colors text-xs font-bold uppercase tracking-widest"
                  >
                    View Credential <ExternalLink size={14} />
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {items.length === 0 && (
          <div className="col-span-full py-24 flex flex-col items-center justify-center bg-white/5 rounded-[2.5rem] border border-dashed border-white/20 shadow-inner">
            <div className="p-4 bg-white/5 rounded-full mb-4 border border-white/5">
              <Award size={40} className="text-gray-500" />
            </div>
            <p className="text-gray-300 font-bold text-lg">No Certifications Added</p>
            <p className="text-sm text-gray-500 mt-2 font-mono">Click "Add New" to showcase your credentials.</p>
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
    </>
  );
}
