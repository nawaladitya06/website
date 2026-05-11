"use client";
import React, { useState } from "react";
import { Plus, Type } from "lucide-react";

interface BioManagementFormProps {
  createAction: (formData: FormData) => Promise<void>;
}

export default function BioManagementForm({ createAction }: BioManagementFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    try {
      await createAction(formData);
      // Reset form on success (the uncontrolled form needs to be reset)
      const form = document.getElementById("bio-form") as HTMLFormElement;
      if (form) form.reset();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
        <div className="p-2 bg-purple-500/20 rounded-xl text-purple-400">
          <Plus size={20} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Expand Narrative</h2>
          <p className="text-xs text-gray-500 font-mono mt-0.5">Add a new bio paragraph</p>
        </div>
      </div>
      
      <form id="bio-form" action={handleSubmit} className="space-y-4">
        <div className="space-y-1.5 group">
          <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest ml-1 group-focus-within:text-purple-400 transition-colors">Paragraph Content</label>
          <textarea 
            required 
            name="content" 
            placeholder="Tell your story..." 
            rows={4} 
            className="w-full px-5 py-3.5 bg-black/40 border border-white/5 rounded-2xl text-white focus:outline-none focus:border-purple-500/50 focus:bg-purple-500/5 transition-all text-sm placeholder:text-gray-600 resize-none custom-scrollbar" 
          />
        </div>
        
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full py-4 bg-white/10 text-white font-extrabold rounded-2xl hover:bg-purple-600 transition-all shadow-lg shadow-black/20 active:scale-[0.98] mt-2 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed border border-white/10 hover:border-purple-500/50"
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Type size={18} />
              <span>Append to Story</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
