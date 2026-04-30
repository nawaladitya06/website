import { getMessagesAction, deleteMessageAction } from "@/app/actions";
import { MessageSquare, Trash2, Reply, Calendar, User, Mail } from "lucide-react";
import Link from "next/link";


export default async function AdminMessagesPage() {
  const messages = await getMessagesAction();

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight flex items-center gap-4">
            <MessageSquare className="text-purple-400" size={32} />
            Inbox
          </h1>
          <p className="text-gray-500 font-mono text-sm uppercase tracking-widest">Manage your contact form submissions</p>
        </div>
      </div>

      <div className="space-y-6">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className="group relative p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-2xl transition-all hover:bg-white/[0.08] hover:border-purple-500/30 overflow-hidden"
          >
            {/* Background Glow Effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 -rotate-45 translate-x-32 -translate-y-32 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
              <div className="space-y-4 flex-1">
                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <div className="flex items-center gap-2 text-white font-bold">
                    <User size={16} className="text-purple-400" />
                    {message.name}
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Mail size={16} />
                    {message.email}
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 font-mono text-xs">
                    <Calendar size={14} />
                    {new Date(message.createdAt).toLocaleString()}
                  </div>
                </div>
                
                <div className="bg-black/20 p-6 rounded-2xl border border-white/5 group-hover:border-white/10 transition-colors">
                  <p className="text-gray-300 leading-relaxed line-clamp-2 italic">
                    "{message.message}"
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Link 
                  href={`/admin/messages/${message.id}`}
                  className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-2xl hover:bg-purple-100 transition shadow-lg shadow-white/5 active:scale-95"
                >
                  <Reply size={18} />
                  Read & Reply
                </Link>
                
                <form action={async () => {
                  'use server';
                  await deleteMessageAction(message.id);
                }}>
                   <button 
                    type="submit"
                    className="p-3 bg-red-500/10 text-red-400 border border-red-500/20 rounded-2xl hover:bg-red-500 hover:text-white transition active:scale-95"
                    title="Delete Message"
                  >
                    <Trash2 size={18} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}

        {messages.length === 0 && (
          <div className="text-center py-32 rounded-[3rem] border border-dashed border-white/10 bg-white/[0.02]">
            <MessageSquare size={64} className="mx-auto text-gray-700 mb-6 opacity-50" />
            <p className="text-gray-500 text-xl font-light">Your inbox is currently empty.</p>
          </div>
        )}
      </div>
    </div>
  );
}
