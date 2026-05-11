"use client";
import React from "react";
import { Trash2, Reply, Calendar, User, Mail, MessageSquare } from "lucide-react";
import { deleteMessageAction } from "@/app/actions";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: string | Date;
}

export default function MessagesListClient({ items }: { items: Message[] }) {
  return (
    <div className="grid grid-cols-1 gap-6">
      <AnimatePresence>
        {items.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ delay: index * 0.05 }}
            className="group relative p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-2xl transition-all duration-300 hover:bg-white/[0.08] hover:border-purple-500/30 overflow-hidden shadow-2xl"
          >
            {/* Background Glow Effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 -rotate-45 translate-x-32 -translate-y-32 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-3xl" />

            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 relative z-10">
              <div className="space-y-4 flex-1">
                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <div className="flex items-center gap-2 text-white font-bold bg-white/5 px-3 py-1.5 rounded-xl border border-white/5">
                    <User size={14} className="text-purple-400" />
                    {message.name}
                  </div>
                  <div className="flex items-center gap-2 text-gray-300 bg-white/5 px-3 py-1.5 rounded-xl border border-white/5">
                    <Mail size={14} className="text-purple-400/70" />
                    <a href={`mailto:${message.email}`} className="hover:text-purple-300 transition-colors">{message.email}</a>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 font-mono text-xs uppercase tracking-widest px-3 py-1.5 rounded-xl border border-transparent">
                    <Calendar size={12} className="text-gray-600" />
                    {new Date(message.createdAt).toLocaleString()}
                  </div>
                </div>
                
                <div className="bg-black/20 p-6 rounded-2xl border border-white/5 group-hover:border-white/10 transition-colors relative">
                  <MessageSquare size={24} className="absolute top-4 right-4 text-white/5" />
                  <p className="text-gray-300 leading-relaxed line-clamp-3 italic pr-8 relative z-10">
                    "{message.message}"
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 xl:flex-col shrink-0">
                <Link 
                  href={`/admin/messages/${message.id}`}
                  className="flex items-center justify-center gap-2 w-full xl:w-48 px-6 py-4 bg-gradient-to-r from-purple-600 to-purple-600 text-white font-extrabold rounded-2xl hover:from-purple-500 hover:to-purple-500 transition-all shadow-lg shadow-purple-500/20 active:scale-[0.98]"
                >
                  <Reply size={18} />
                  <span>Read & Reply</span>
                </Link>
                
                <form action={deleteMessageAction.bind(null, message.id)} className="w-auto xl:w-full">
                   <button 
                    type="submit"
                    className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-red-500/10 text-red-400 border border-red-500/20 rounded-2xl hover:bg-red-500 hover:text-white transition-all active:scale-[0.98]"
                    title="Delete Message"
                  >
                    <Trash2 size={18} />
                    <span className="hidden xl:inline">Delete</span>
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {items.length === 0 && (
        <div className="py-32 flex flex-col items-center justify-center bg-white/5 rounded-[3rem] border border-dashed border-white/20 shadow-inner">
          <div className="p-6 bg-white/5 rounded-full mb-6 border border-white/5">
            <MessageSquare size={48} className="text-gray-500" />
          </div>
          <h3 className="text-2xl font-black text-white mb-2">Inbox is Empty</h3>
          <p className="text-gray-500 font-mono text-sm uppercase tracking-widest">No contact form submissions.</p>
        </div>
      )}
    </div>
  );
}
