"use client";
import React, { useState } from "react";
import { Plus, X, FileText, Send } from "lucide-react";
import BlogListClient from "./BlogListClient";

interface Post {
  id: number;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string;
  cover: string | null;
}

interface BlogManagementClientProps {
  items: Post[];
  createAction: (formData: FormData) => Promise<void>;
}

export default function BlogManagementClient({ items, createAction }: BlogManagementClientProps) {
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
            <FileText size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-wide">Blog Manager</h2>
            <div className="flex items-center gap-2 mt-1">
              <div className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" />
              <p className="text-gray-400 text-[10px] uppercase tracking-[0.2em] font-mono">{items.length} Articles Live</p>
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
              <span>Cancel Draft</span>
            </>
          ) : (
            <>
              <Plus size={18} />
              <span>Draft New Post</span>
            </>
          )}
        </button>
      </div>

      {/* Dynamic Layout Container */}
      <div className={`flex flex-col xl:flex-row gap-8 transition-all duration-500`}>
        
        {/* Creation Form (Collapsible) */}
        <div 
          className={`transition-all duration-500 ease-in-out transform origin-top xl:origin-left ${
            showForm ? "opacity-100 scale-100 xl:w-[420px] flex-shrink-0" : "opacity-0 scale-95 h-0 xl:h-auto xl:w-0 overflow-hidden"
          }`}
        >
          <div className="bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl xl:sticky xl:top-8">
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/10">
              <div className="p-2 bg-purple-500/20 rounded-xl text-purple-400">
                <Plus size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Initialize Post</h2>
                <p className="text-xs text-gray-500 font-mono mt-0.5">Setup metadata</p>
              </div>
            </div>
            
            <form action={handleSubmit} className="space-y-5">
              <div className="space-y-1.5 group">
                <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest ml-1 group-focus-within:text-purple-400 transition-colors">Article Title</label>
                <input required name="title" placeholder="e.g. Next.js 15 Server Components" className="w-full px-5 py-3.5 bg-black/40 border border-white/5 rounded-2xl text-white focus:outline-none focus:border-purple-500/50 focus:bg-purple-500/5 transition-all text-sm placeholder:text-gray-600" />
              </div>
              
              <div className="space-y-1.5 group">
                <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest ml-1 group-focus-within:text-purple-400 transition-colors">URL Slug</label>
                <input required name="slug" placeholder="e.g. nextjs-server-components" className="w-full px-5 py-3.5 bg-black/40 border border-white/5 rounded-2xl text-purple-300 font-mono text-xs focus:outline-none focus:border-purple-500/50 focus:bg-purple-500/5 transition-all placeholder:text-gray-600" />
              </div>
              
              <div className="space-y-1.5 group">
                <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest ml-1 group-focus-within:text-purple-400 transition-colors">Cover Image URL</label>
                <input required type="url" name="cover" placeholder="https://..." className="w-full px-5 py-3.5 bg-black/40 border border-white/5 rounded-2xl text-white focus:outline-none focus:border-purple-500/50 focus:bg-purple-500/5 transition-all text-sm placeholder:text-gray-600" />
              </div>

              <div className="space-y-1.5 group">
                <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest ml-1 group-focus-within:text-purple-400 transition-colors">Short Excerpt</label>
                <textarea required name="excerpt" placeholder="A brief summary for the blog index..." rows={3} className="w-full px-5 py-3.5 bg-black/40 border border-white/5 rounded-2xl text-white focus:outline-none focus:border-purple-500/50 focus:bg-purple-500/5 transition-all text-sm placeholder:text-gray-600 resize-none custom-scrollbar" />
              </div>
              
              <div className="space-y-1.5 group hidden">
                <label className="text-[10px] uppercase font-black text-gray-400 tracking-widest ml-1">Content (Markdown)</label>
                {/* Pre-filling content with a placeholder since we want users to use the full page editor */}
                <textarea required name="content" defaultValue="# Start writing..." className="hidden" />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-purple-600 text-white font-extrabold rounded-2xl hover:from-purple-500 hover:to-purple-500 transition-all shadow-lg shadow-purple-500/25 active:scale-[0.98] mt-6 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send size={18} />
                    <span>Initialize Post</span>
                  </>
                )}
              </button>
              
              <p className="text-[10px] text-gray-500 text-center uppercase tracking-widest mt-4">You will write the full Markdown content in the dedicated editor after creation.</p>
            </form>
          </div>
        </div>

        {/* Dynamic List Area */}
        <div className="flex-grow transition-all duration-500 min-w-0">
          <BlogListClient items={items} />
        </div>
      </div>
    </div>
  );
}
