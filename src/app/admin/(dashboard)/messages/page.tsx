export const dynamic = "force-dynamic";
import { getMessagesAction } from "@/app/actions";
import { MessageSquare } from "lucide-react";
import MessagesListClient from "@/components/Admin/MessagesListClient";

export default async function AdminMessagesPage() {
  const messages = await getMessagesAction();

  return (
    <div className="p-8 max-w-7xl mx-auto pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-3">
            <MessageSquare className="text-blue-500" size={32} />
            Inbox
          </h1>
          <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.3em] mt-2">
            Manage Contact Form Submissions
          </p>
        </div>
        
        <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">{messages.length} Messages</span>
        </div>
      </div>

      {/* List Area */}
      <MessagesListClient items={messages} />
    </div>
  );
}
