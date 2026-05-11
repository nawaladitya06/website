"use client";
import React, { useState } from "react";
import { Plus, X, GraduationCap, Save } from "lucide-react";
import EducationListClient from "./EducationListClient";

interface Education {
  id: number;
  institution: string;
  degree: string;
  year: string;
  score: string;
  link: string;
}

interface EducationManagementClientProps {
  items: Education[];
  createAction: (formData: FormData) => Promise<void>;
}

export default function EducationManagementClient({ items, createAction }: EducationManagementClientProps) {
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
          <div className="p-3 bg-gradient-to-br from-emerald-500/20 to-teal-600/10 rounded-2xl text-emerald-400 border border-emerald-500/20 shadow-inner">
            <GraduationCap size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-wide">Academic Records</h2>
            <div className="flex items-center gap-2 mt-1">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <p className="text-gray-400 text-[10px] uppercase tracking-[0.2em] font-mono">{items.length} Entries Logged</p>
            </div>
          </div>
        </div>
        
        <button
          onClick={() => setShowForm(!showForm)}
          className={`flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-bold transition-all duration-300 w-full sm:w-auto shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 ${
            showForm 
            ? "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white" 
            : "bg-white text-black hover:bg-emerald-50 shadow-white/10"
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
              <span>Add Record</span>
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
              <div className="p-2 bg-emerald-500/20 rounded-xl text-emerald-400">
                <Plus size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">New Academic Record</h2>
                <p className="text-xs text-gray-500 font-mono mt-0.5">University or Institution</p>
              </div>
            </div>
            
            <form action={handleSubmit} className="space-y-5">
              <div className="space-y-1.5 group">
                <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest ml-1 group-focus-within:text-emerald-400 transition-colors">Institution</label>
                <input required name="institution" placeholder="e.g. Stanford University" className="w-full px-5 py-3.5 bg-black/40 border border-white/5 rounded-2xl text-white focus:outline-none focus:border-emerald-500/50 focus:bg-emerald-500/5 transition-all text-sm placeholder:text-gray-600" />
              </div>
              
              <div className="space-y-1.5 group">
                <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest ml-1 group-focus-within:text-emerald-400 transition-colors">Degree / Course</label>
                <input required name="degree" placeholder="e.g. B.Tech in Computer Science" className="w-full px-5 py-3.5 bg-black/40 border border-white/5 rounded-2xl text-white focus:outline-none focus:border-emerald-500/50 focus:bg-emerald-500/5 transition-all text-sm placeholder:text-gray-600" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5 group">
                  <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest ml-1 group-focus-within:text-emerald-400 transition-colors">Timeline</label>
                  <input required name="year" placeholder="2018 - 2022" className="w-full px-5 py-3.5 bg-black/40 border border-white/5 rounded-2xl text-white focus:outline-none focus:border-emerald-500/50 focus:bg-emerald-500/5 transition-all text-sm placeholder:text-gray-600" />
                </div>
                <div className="space-y-1.5 group">
                  <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest ml-1 group-focus-within:text-emerald-400 transition-colors">Score / GPA</label>
                  <input required name="score" placeholder="e.g. 3.8/4.0" className="w-full px-5 py-3.5 bg-black/40 border border-white/5 rounded-2xl text-white focus:outline-none focus:border-emerald-500/50 focus:bg-emerald-500/5 transition-all text-sm placeholder:text-gray-600" />
                </div>
              </div>

              <div className="space-y-1.5 group">
                <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest ml-1 group-focus-within:text-emerald-400 transition-colors">Institution Link</label>
                <input required type="url" name="link" placeholder="https://..." className="w-full px-5 py-3.5 bg-black/40 border border-white/5 rounded-2xl text-white focus:outline-none focus:border-emerald-500/50 focus:bg-emerald-500/5 transition-all text-sm placeholder:text-gray-600" />
              </div>
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold rounded-2xl hover:from-emerald-500 hover:to-teal-500 transition-all shadow-lg shadow-emerald-500/25 active:scale-[0.98] mt-6 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Save size={18} />
                    <span>Save Academic Record</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Dynamic List Area */}
        <div className="flex-grow transition-all duration-500 min-w-0">
          <EducationListClient items={items} />
        </div>
      </div>
    </div>
  );
}
