"use client";
import React, { useState } from "react";
import { FileText, Save, UploadCloud, Link as LinkIcon } from "lucide-react";

interface ResumeUploadClientProps {
  currentResumeUrl: string | null;
  updateAction: (formData: FormData) => Promise<void>;
}

export default function ResumeUploadClient({ currentResumeUrl, updateAction }: ResumeUploadClientProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success">("idle");

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setSaveStatus("idle");
    try {
      await updateAction(formData);
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-purple-500/20 to-transparent rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />

      <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-3">
        <div className="p-2 bg-purple-500/20 rounded-xl text-purple-400">
          <UploadCloud size={20} />
        </div>
        Document Configuration
      </h2>
      <p className="text-sm text-gray-400 font-mono mb-8 ml-[3.25rem]">Link your primary resume document (PDF recommended)</p>

      <form action={handleSubmit} className="space-y-6 relative z-10 max-w-2xl">
        <div className="space-y-1.5 group">
          <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest ml-1 flex items-center gap-2 group-focus-within:text-purple-400 transition-colors"> 
            <LinkIcon size={12} /> External File URL 
          </label>
          <input 
            required 
            type="url" 
            name="resume" 
            defaultValue={currentResumeUrl || ""} 
            placeholder="https://drive.google.com/... or https://yourdomain.com/resume.pdf" 
            className="w-full px-5 py-4 bg-black/40 border border-white/5 rounded-2xl text-white focus:outline-none focus:border-purple-500/50 focus:bg-purple-500/5 transition-all text-sm placeholder:text-gray-600" 
          />
          <p className="text-xs text-gray-500 mt-2 ml-1">Currently, this system uses linked URLs rather than direct file binary storage. Upload your PDF to Google Drive or AWS S3 and paste the direct link here.</p>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className={`w-full py-4 font-extrabold rounded-2xl transition-all shadow-lg active:scale-[0.98] mt-8 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${
            saveStatus === "success" 
            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" 
            : "bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white hover:from-purple-500 hover:to-fuchsia-500 shadow-purple-500/25"
          }`}
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : saveStatus === "success" ? (
            <>
              <Save size={18} />
              <span>Document Linked Successfully!</span>
            </>
          ) : (
            <>
              <Save size={18} />
              <span>Synchronize Document Link</span>
            </>
          )}
        </button>
      </form>

      {currentResumeUrl && (
        <div className="mt-12 p-6 rounded-2xl bg-black/20 border border-white/5 flex items-start gap-4 max-w-2xl">
          <div className="p-3 bg-white/5 rounded-xl border border-white/10 shrink-0">
             <FileText size={24} className="text-gray-400" />
          </div>
          <div className="overflow-hidden">
             <h3 className="text-sm font-bold text-white mb-1">Active Linked Document</h3>
             <a href={currentResumeUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-purple-400 hover:text-purple-300 underline underline-offset-4 truncate block transition-colors">
               {currentResumeUrl}
             </a>
          </div>
        </div>
      )}
    </div>
  );
}
