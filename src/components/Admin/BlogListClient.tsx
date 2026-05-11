"use client";
import React from "react";
import { Trash2, Edit3, FileText, Calendar, Globe, BookOpen } from "lucide-react";
import { deletePostAction } from "@/app/actions";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string;
  cover: string | null;
}

export default function BlogListClient({ items }: { items: Post[] }) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <AnimatePresence>
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ delay: index * 0.05 }}
            className="group relative bg-white/5 border border-white/10 rounded-[2rem] p-6 backdrop-blur-xl hover:bg-white/[0.08] hover:border-fuchsia-500/30 transition-all duration-300 flex flex-col h-full shadow-2xl overflow-hidden"
          >
            {/* Image Header */}
            <div className="relative h-48 -mx-6 -mt-6 mb-6 overflow-hidden bg-black/40 border-b border-white/5">
              {item.cover ? (
                <img src={item.cover} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" onError={(e) => (e.currentTarget.style.display = 'none')} />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-fuchsia-500/10 to-pink-500/5">
                  <FileText size={48} className="text-fuchsia-500/40 mb-2" />
                  <span className="text-[10px] uppercase tracking-widest text-fuchsia-500/50 font-black">Article Header</span>
                </div>
              )}
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Actions Hover */}
              <div className="absolute top-4 right-4 flex gap-2 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 p-1.5 rounded-xl backdrop-blur-md border border-white/10 z-10">
                <Link 
                  href={`/admin/blog/${item.id}`}
                  className="p-2 text-gray-300 hover:text-white hover:bg-white/20 rounded-lg transition-colors"
                  title="Write/Edit Content"
                >
                  <Edit3 size={16} />
                </Link>
                <form action={deletePostAction.bind(null, item.id)}>
                  <button 
                    type="submit" 
                    className="p-2 text-red-400/80 hover:text-white hover:bg-red-500 rounded-lg transition-colors"
                    title="Delete Post"
                  >
                    <Trash2 size={16} />
                  </button>
                </form>
              </div>

              {/* Date Badge */}
              <div className="absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-mono text-gray-300">
                <Calendar size={12} className="text-fuchsia-400" />
                {item.date}
              </div>
            </div>

            {/* Content */}
            <div className="flex-grow flex flex-col">
              <h3 className="text-xl font-black text-white leading-tight group-hover:text-fuchsia-300 transition-colors mb-3">
                {item.title}
              </h3>
              
              <p className="text-sm text-gray-400 leading-relaxed line-clamp-3 mb-6 flex-grow">
                {item.excerpt || "No excerpt provided."}
              </p>

              {/* Footer Links */}
              <div className="pt-4 mt-auto border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-fuchsia-500/70 truncate max-w-[200px]">
                  <Globe size={12} />
                  <span className="truncate">/{item.slug}</span>
                </div>

                <Link 
                  href={`/admin/blog/${item.id}`}
                  className="flex items-center gap-1.5 text-xs font-bold text-fuchsia-400 hover:text-fuchsia-300 transition-colors uppercase tracking-widest"
                >
                  Edit Post <BookOpen size={14} />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {items.length === 0 && (
        <div className="col-span-full py-24 flex flex-col items-center justify-center bg-white/5 rounded-[2.5rem] border border-dashed border-white/20 shadow-inner">
          <div className="p-4 bg-white/5 rounded-full mb-4 border border-white/5">
            <FileText size={40} className="text-gray-500" />
          </div>
          <p className="text-gray-300 font-bold text-lg">No Articles Published</p>
          <p className="text-sm text-gray-500 mt-2 font-mono">Use the Fast Build form to draft your first post.</p>
        </div>
      )}
    </div>
  );
}
