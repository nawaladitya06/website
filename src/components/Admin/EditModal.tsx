"use client";
import React, { useState, useEffect } from "react";
import { X, Save, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  initialData: any;
  onSave: (formData: FormData) => Promise<void>;
  fields: {
    name: string;
    label: string;
    type: "text" | "number" | "textarea" | "select" | "url" | "file";
    placeholder?: string;
    required?: boolean;
    accept?: string;
    options?: { label: string; value: string }[];
  }[];
}

export default function EditModal({ isOpen, onClose, title, initialData, onSave, fields }: EditModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    try {
      await onSave(formData);
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to update record");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-zinc-900 border border-white/10 rounded-[2.5rem] shadow-2xl shadow-purple-500/10 overflow-hidden"
        >
          {/* Header */}
          <div className="flex justify-between items-center px-8 py-6 border-b border-white/5">
            <h2 className="text-2xl font-bold text-white tracking-tight">{title}</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/5 rounded-full text-gray-400 hover:text-white transition-all"
            >
              <X size={24} />
            </button>
          </div>

          {/* Body */}
          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fields.map((field) => (
                <div key={field.name} className={field.type === "textarea" ? "md:col-span-2" : ""}>
                  <label className="block text-[10px] uppercase font-black text-gray-500 tracking-widest mb-2 ml-1">
                    {field.label}
                  </label>
                  
                  {field.type === "textarea" ? (
                    <textarea
                      name={field.name}
                      defaultValue={initialData?.[field.name]}
                      required={field.required}
                      placeholder={field.placeholder}
                      rows={5}
                      className="w-full px-5 py-2 bg-black/40 border border-white/10 rounded-4xl text-white focus:outline-none focus:border-purple-500 focus:bg-white/5 transition-all text-sm leading-relaxed"
                    />
                  ) : field.type === "select" ? (
                    <select
                      name={field.name}
                      defaultValue={initialData?.[field.name]}
                      required={field.required}
                      className="w-full px-5 py-2 bg-black/40 border border-white/10 rounded-4xl text-white focus:outline-none focus:border-purple-500 focus:bg-white/5 transition-all text-sm"
                    >
                      {field.options?.map(opt => (
                        <option key={opt.value} value={opt.value} className="bg-zinc-900">{opt.label}</option>
                      ))}
                    </select>
                  ) : field.type === "file" ? (
                    <input
                      type="file"
                      name={field.name}
                      required={field.required}
                      accept={field.accept || "image/*,application/pdf"}
                      className="w-full px-5 py-2 bg-black/40 border border-white/10 rounded-4xl text-white focus:outline-none focus:border-purple-500 focus:bg-white/5 transition-all text-sm file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:uppercase file:tracking-widest file:bg-purple-500/10 file:text-purple-400 hover:file:bg-purple-500/20"
                    />
                  ) : (
                    <input
                      type={field.type === "url" ? "text" : field.type}
                      name={field.name}
                      defaultValue={initialData?.[field.name]}
                      required={field.required}
                      placeholder={field.placeholder}
                      className="w-full px-5 py-1 bg-black/40 border border-white/10 rounded-4xl text-white focus:outline-none focus:border-purple-500 focus:bg-white/5 transition-all text-sm"
                    />
                  )}
                </div>
              ))}
            </div>

            {error && (
              <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400 text-sm">
                <AlertCircle size={18} />
                {error}
              </div>
            )}

            {/* Footer Buttons */}
            <div className="mt-10 flex gap-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 bg-white/5 border border-white/10 text-white font-bold rounded-4xl hover:bg-white/10 transition active:scale-95"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 bg-white text-black font-extrabold rounded-4xl hover:bg-purple-100 transition shadow-lg shadow-white/5 active:scale-95 disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2"
              >
                {loading ? "Saving..." : (
                  <>
                    <Save size={20} />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
