"use client";
import React, { useState } from "react";
import { Plus, X, Briefcase } from "lucide-react";
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

  async function handleSubmit(formData: FormData) {
    await createAction(formData);
    setShowForm(false);
  }

  return (
    <div className="space-y-8">
      {/* Dynamic Header with Toggle Button */}
      <div className="flex justify-between items-center bg-white/5 border border-white/10 p-6 rounded-[2rem] backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-purple-500/10 rounded-2xl text-purple-400">
            <Briefcase size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Experience Management</h2>
            <p className="text-gray-500 text-[10px] uppercase tracking-widest font-mono">Total {items.length} records found</p>
          </div>
        </div>
        
        <button
          onClick={() => setShowForm(!showForm)}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all active:scale-95 ${
            showForm 
            ? "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white" 
            : "bg-white text-black hover:bg-purple-100 shadow-lg shadow-white/5"
          }`}
        >
          {showForm ? (
            <>
              <X size={18} />
              Cancel
            </>
          ) : (
            <>
              <Plus size={18} />
              Add New Experience
            </>
          )}
        </button>
      </div>

      {/* Dynamic Layout */}
      <div className={`grid grid-cols-1 transition-all duration-500 gap-8 ${showForm ? "lg:grid-cols-3" : "lg:grid-cols-1"}`}>
        
        {/* Creation Form (Collapsible) */}
        {showForm && (
          <div className="lg:col-span-1 animate-fade-in">
            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl sticky top-8">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Plus size={20} className="text-purple-400" />
                New Entry
              </h2>
              <form action={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1">Role Title</label>
                  <input required name="role" placeholder="e.g. Senior Developer" className="w-full px-5 py-3 bg-black/40 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-purple-500 focus:bg-white/5 transition-all text-sm" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1">Organization</label>
                  <input required name="org" placeholder="e.g. Google India" className="w-full px-5 py-3 bg-black/40 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-purple-500 focus:bg-white/5 transition-all text-sm" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1">Timeline</label>
                  <input required name="year" placeholder="e.g. 2023 - Present" className="w-full px-5 py-3 bg-black/40 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-purple-500 focus:bg-white/5 transition-all text-sm" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1">Org Logo</label>
                  <input type="file" name="img" accept="image/*" className="w-full px-5 py-2.5 bg-black/40 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-purple-500 transition-all text-sm file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:uppercase file:tracking-widest file:bg-purple-500/10 file:text-purple-400 hover:file:bg-purple-500/20" />
                  <input name="img_url" placeholder="...or paste logo URL" className="w-full px-5 py-2 bg-white/5 border border-white/5 rounded-xl text-[10px] text-gray-500 focus:outline-none focus:border-purple-500/30 transition-all mt-1" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1">Category</label>
                  <select required name="category" className="w-full px-5 py-3 bg-black/40 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-purple-500 focus:bg-white/5 transition-all text-sm">
                    <option value="professional" className="bg-zinc-900">Professional Role</option>
                    <option value="leadership" className="bg-zinc-900">Leadership Role</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1">Description</label>
                  <textarea required name="desc" placeholder="Brief about your impact..." rows={4} className="w-full px-5 py-3 bg-black/40 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-purple-500 focus:bg-white/5 transition-all text-sm" />
                </div>
                <button type="submit" className="w-full py-4 bg-white text-black font-extrabold rounded-2xl hover:bg-purple-100 transition shadow-lg shadow-white/5 active:scale-95 mt-4">
                  Save Experience
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Dynamic List Area */}
        <div className={showForm ? "lg:col-span-2" : "lg:col-span-1"}>
          <ExperienceListClient items={items} />
        </div>
      </div>
    </div>
  );
}
