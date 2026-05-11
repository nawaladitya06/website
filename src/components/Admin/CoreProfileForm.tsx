"use client";
import React, { useState } from "react";
import { Briefcase, Mail, Linkedin, Camera, FileText, Save, Sparkles } from "lucide-react";

interface Profile {
  id: number;
  name: string;
  surname: string;
  role: string;
  email: string;
  linkedin: string;
  photo: string;
  resume: string;
}

interface CoreProfileFormProps {
  profile: Profile | null;
  updateAction: (formData: FormData) => Promise<void>;
}

export default function CoreProfileForm({ profile, updateAction }: CoreProfileFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    try {
      await updateAction(formData);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-3xl shadow-2xl relative overflow-hidden h-full">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-purple-500/20 to-transparent rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />

      <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
        <div className="p-2 bg-purple-500/20 rounded-xl text-purple-400">
          <Sparkles size={20} />
        </div>
        Core Identity
      </h2>

      <form action={handleSubmit} className="space-y-6 relative z-10">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5 group">
            <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest ml-1 group-focus-within:text-purple-400 transition-colors">First Name</label>
            <input required name="name" defaultValue={profile?.name || ""} placeholder="John" className="w-full px-5 py-3.5 bg-black/40 border border-white/5 rounded-2xl text-white focus:outline-none focus:border-purple-500/50 focus:bg-purple-500/5 transition-all text-sm placeholder:text-gray-600" />
          </div>
          <div className="space-y-1.5 group">
            <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest ml-1 group-focus-within:text-purple-400 transition-colors">Surname</label>
            <input required name="surname" defaultValue={profile?.surname || ""} placeholder="Doe" className="w-full px-5 py-3.5 bg-black/40 border border-white/5 rounded-2xl text-white focus:outline-none focus:border-purple-500/50 focus:bg-purple-500/5 transition-all text-sm placeholder:text-gray-600" />
          </div>
        </div>

        <div className="space-y-1.5 group">
          <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest ml-1 flex items-center gap-2 group-focus-within:text-purple-400 transition-colors"> 
            <Briefcase size={12} /> Tagline / Professional Role 
          </label>
          <input required name="role" defaultValue={profile?.role || ""} placeholder="Full Stack Developer & UI Designer" className="w-full px-5 py-3.5 bg-black/40 border border-white/5 rounded-2xl text-white focus:outline-none focus:border-purple-500/50 focus:bg-purple-500/5 transition-all text-sm placeholder:text-gray-600" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5 group">
            <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest ml-1 flex items-center gap-2 group-focus-within:text-purple-400 transition-colors"> 
              <Mail size={12} /> Email Address
            </label>
            <input required type="email" name="email" defaultValue={profile?.email || ""} placeholder="hello@example.com" className="w-full px-5 py-3.5 bg-black/40 border border-white/5 rounded-2xl text-white focus:outline-none focus:border-purple-500/50 focus:bg-purple-500/5 transition-all text-sm placeholder:text-gray-600" />
          </div>
          <div className="space-y-1.5 group">
            <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest ml-1 flex items-center gap-2 group-focus-within:text-purple-400 transition-colors"> 
              <Linkedin size={12} /> LinkedIn URL 
            </label>
            <input required type="url" name="linkedin" defaultValue={profile?.linkedin || ""} placeholder="https://linkedin.com/in/..." className="w-full px-5 py-3.5 bg-black/40 border border-white/5 rounded-2xl text-white focus:outline-none focus:border-purple-500/50 focus:bg-purple-500/5 transition-all text-xs placeholder:text-gray-600" />
          </div>
        </div>

        <div className="space-y-1.5 group">
          <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest ml-1 flex items-center gap-2 group-focus-within:text-purple-400 transition-colors"> 
            <Camera size={12} /> Avatar URL 
          </label>
          <input required type="url" name="photo" defaultValue={profile?.photo || ""} placeholder="https://..." className="w-full px-5 py-3.5 bg-black/40 border border-white/5 rounded-2xl text-white focus:outline-none focus:border-purple-500/50 focus:bg-purple-500/5 transition-all text-sm placeholder:text-gray-600" />
        </div>

        <div className="space-y-1.5 group">
          <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest ml-1 flex items-center gap-2 group-focus-within:text-purple-400 transition-colors"> 
            <FileText size={12} /> Public Resume Link (PDF)
          </label>
          <input required type="url" name="resume" defaultValue={profile?.resume || ""} placeholder="https://..." className="w-full px-5 py-3.5 bg-black/40 border border-white/5 rounded-2xl text-white focus:outline-none focus:border-purple-500/50 focus:bg-purple-500/5 transition-all text-sm placeholder:text-gray-600" />
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-extrabold rounded-2xl hover:from-purple-500 hover:to-indigo-500 transition-all shadow-lg shadow-purple-500/25 active:scale-[0.98] mt-8 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Save size={18} />
              <span>Synchronize Profile</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
