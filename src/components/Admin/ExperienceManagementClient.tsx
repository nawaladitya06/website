"use client";
import React, { useState } from "react";
import { Plus, X, Briefcase, Save } from "lucide-react";
import ExperienceListClient from "./ExperienceListClient";

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

interface ExperienceManagementClientProps {
  items: Experience[];
  createAction: (formData: FormData) => Promise<void>;
}

export default function ExperienceManagementClient({ items, createAction }: ExperienceManagementClientProps) {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    try {
      await createAction(formData);
      setShowForm(false);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-8 relative z-10">
      {/* Dynamic Header with Toggle Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/[0.03] border border-white/10 p-4 sm:p-6 rounded-[2rem] backdrop-blur-2xl shadow-xl">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-2xl text-purple-400 border border-purple-500/20 shadow-inner">
            <Briefcase size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-wide">Experience Management</h2>
            <div className="flex items-center gap-2 mt-1">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <p className="text-gray-400 text-[10px] uppercase tracking-[0.2em] font-mono">{items.length} Records Active</p>
            </div>
          </div>
        </div>
        
        <button
          onClick={() => setShowForm(!showForm)}
          className={`flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-bold transition-all duration-300 w-full sm:w-auto shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 ${
            showForm 
            ? "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white" 
            : "bg-white text-black hover:bg-purple-50 shadow-white/10"
          }`}
        >
          {showForm ? (
            <>
              <X size={18} />
              <span>Cancel Entry</span>
            </>
          ) : (
            <>
              <Plus size={18} />
              <span>Add Experience</span>
            </>
          )}
        </button>
      </div>

      {/* Dynamic Layout Container */}
      <div className={`flex flex-col xl:flex-row gap-8 transition-all duration-500`}>
        
        {/* Creation Form (Collapsible) */}
        <div 
          className={`transition-all duration-500 ease-in-out transform origin-top xl:origin-left ${
            showForm ? "opacity-100 scale-100 xl:w-[400px] flex-shrink-0" : "opacity-0 scale-95 h-0 xl:h-auto xl:w-0 overflow-hidden"
          }`}
        >
          <div className="bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl xl:sticky xl:top-8">
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/10">
              <div className="p-2 bg-purple-500/20 rounded-xl text-purple-400">
                <Plus size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">New Entry</h2>
                <p className="text-xs text-gray-500 font-mono mt-0.5">Fill out details below</p>
              </div>
            </div>
            
            <form action={handleSubmit} className="space-y-5">
              <div className="space-y-1.5 group">
                <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest ml-1 group-focus-within:text-purple-400 transition-colors">Role Title</label>
                <input required name="role" placeholder="e.g. Senior Full-Stack Developer" className="w-full px-5 py-3.5 bg-black/40 border border-white/5 rounded-2xl text-white focus:outline-none focus:border-purple-500/50 focus:bg-purple-500/5 transition-all text-sm placeholder:text-gray-600" />
              </div>
              
              <div className="space-y-1.5 group">
                <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest ml-1 group-focus-within:text-purple-400 transition-colors">Organization</label>
                <input required name="org" placeholder="e.g. Google India" className="w-full px-5 py-3.5 bg-black/40 border border-white/5 rounded-2xl text-white focus:outline-none focus:border-purple-500/50 focus:bg-purple-500/5 transition-all text-sm placeholder:text-gray-600" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5 group">
                  <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest ml-1 group-focus-within:text-purple-400 transition-colors">Timeline</label>
                  <input required name="year" placeholder="2023 - Present" className="w-full px-5 py-3.5 bg-black/40 border border-white/5 rounded-2xl text-white focus:outline-none focus:border-purple-500/50 focus:bg-purple-500/5 transition-all text-sm placeholder:text-gray-600" />
                </div>
                <div className="space-y-1.5 group">
                  <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest ml-1 group-focus-within:text-purple-400 transition-colors">Category</label>
                  <select required name="category" className="w-full px-4 py-3.5 bg-black/40 border border-white/5 rounded-2xl text-white focus:outline-none focus:border-purple-500/50 focus:bg-purple-500/5 transition-all text-sm appearance-none">
                    <option value="professional" className="bg-zinc-900">Professional</option>
                    <option value="leadership" className="bg-zinc-900">Leadership</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5 group">
                <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest ml-1 group-focus-within:text-purple-400 transition-colors">Organization Logo</label>
                <div className="bg-black/40 border border-white/5 rounded-2xl p-2 transition-all focus-within:border-purple-500/50 focus-within:bg-purple-500/5">
                  <input type="file" name="img" accept="image/*" className="w-full px-3 py-2 text-white outline-none text-xs file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:uppercase file:tracking-widest file:bg-purple-500/10 file:text-purple-400 hover:file:bg-purple-500/20 file:cursor-pointer file:transition-colors" />
                  <div className="relative mt-2">
                    <div className="absolute inset-0 flex items-center px-2">
                      <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-[10px]">
                      <span className="bg-[#0f0f13] px-2 text-gray-500 uppercase tracking-widest font-black">OR</span>
                    </div>
                  </div>
                  <input name="img_url" placeholder="Paste image URL here..." className="w-full px-3 py-2.5 bg-transparent text-xs text-gray-300 focus:outline-none mt-1 placeholder:text-gray-600" />
                </div>
              </div>

              <div className="space-y-1.5 group">
                <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest ml-1 group-focus-within:text-purple-400 transition-colors">Description / Impact</label>
                <textarea required name="desc" placeholder="Detail your responsibilities, achievements, and technologies used..." rows={5} className="w-full px-5 py-3.5 bg-black/40 border border-white/5 rounded-2xl text-white focus:outline-none focus:border-purple-500/50 focus:bg-purple-500/5 transition-all text-sm placeholder:text-gray-600 resize-none custom-scrollbar" />
              </div>
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-extrabold rounded-2xl hover:from-purple-500 hover:to-indigo-500 transition-all shadow-lg shadow-purple-500/25 active:scale-[0.98] mt-6 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Save size={18} />
                    <span>Save Experience</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Dynamic List Area */}
        <div className="flex-grow transition-all duration-500 min-w-0">
          <ExperienceListClient items={items} />
        </div>
      </div>
    </div>
  );
}
