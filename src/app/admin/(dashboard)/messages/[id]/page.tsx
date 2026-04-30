export const dynamic = "force-dynamic";
import { getMessageByIdAction, deleteMessageAction } from "@/app/actions";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, Mail, Calendar, User, Trash2, Send, MessageSquare } from "lucide-react";
import Link from "next/link";


export default async function MessageDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const message = await getMessageByIdAction(parseInt(id));

  if (!message) notFound();

  const replySubject = encodeURIComponent(`RE: Portfolio Inquiry - ${message.name}`);
  const replyBody = encodeURIComponent(`Hi ${message.name},\n\n\n\n--- Original Message ---\nFrom: ${message.name}\nDate: ${new Date(message.createdAt).toLocaleString()}\n\n"${message.message}"`)
    .replace(/%0A/g, '%0D%0A'); // Ensure cross-platform line breaks for mail clients
  const mailtoUrl = `mailto:${message.email}?subject=${replySubject}&body=${replyBody}`;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Link
        href="/admin/messages"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-12 group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        Back to Inbox
      </Link>

      <div className="space-y-8">
        {/* Header Section */}
        <div className="p-10 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 -rotate-45 translate-x-16 -translate-y-16" />

          <div className="flex flex-col md:flex-row justify-between items-start gap-8 relative z-10">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-purple-500/10 rounded-2xl text-purple-400">
                  <MessageSquare size={32} />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white tracking-tight">Inquiry Details</h1>
                  <p className="text-gray-500 font-mono text-xs uppercase tracking-widest mt-1">Ref ID: #{message.id}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-2 gap-8 pt-4">
                <div className="space-y-1">
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Sender Name</p>
                  <p className="text-white text-xl font-bold flex items-center gap-2">
                    <User size={16} className="text-purple-400" />
                    {message.name}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Email Address</p>
                  <p className="text-white text-xl font-bold flex items-center gap-2">
                    <Mail size={12} className="text-purple-400" />
                    {message.email}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Received Date</p>
                  <p className="text-gray-300 font-medium flex items-center gap-2">
                    <Calendar size={16} />
                    {new Date(message.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 w-full md:w-auto">
              <a
                href={mailtoUrl}
                className="w-full flex items-center justify-center gap-3 px-6 py-1 bg-white text-black font-extrabold rounded-2xl border border-white hover:bg-purple-100 transition-all shadow-xl shadow-white/5 active:scale-95 text-lg"
              >
                Reply
              </a>

              <form action={async () => {
                'use server';
                await deleteMessageAction(message.id);
                redirect('/admin/messages');
              }}>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 px-6 py-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded-2xl hover:bg-red-500 hover:text-white transition-all active:scale-95 font-bold"
                >
                  Delete
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Message Content Section */}
        <div className="p-12 rounded-[3rem] bg-white/[0.02] border border-white/10 relative">
          <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.3em] mb-10">Original Inquiry Text</p>
          <div className="prose prose-invert prose-purple max-w-none">
            <p className="text-gray-200 text-2xl font-light leading-relaxed italic border-l-4 border-purple-500/30 pl-10">
              "{message.message}"
            </p>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="p-6 rounded-2xl bg-purple-500/5 border border-purple-500/10 flex items-start gap-4">
          <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400 mt-1">
            <Send size={14} />
          </div>
          <p className="text-sm text-gray-400 font-light leading-relaxed">
            Clicking <strong>"Reply via Email"</strong> will automatically open your default mail client with a pre-filled subject and the original message appended for context.
          </p>
        </div>
      </div>
    </div>
  );
}
