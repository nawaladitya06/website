import { getPostByIdAction, updatePostAction } from "@/app/actions";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, Save, FileText, Globe, Image as ImageIcon, Sparkles, Info } from "lucide-react";
import Link from "next/link";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPostByIdAction(parseInt(id));

  if (!post) notFound();

  return (
    <div className="p-8 max-w-5xl mx-auto pb-32">
       <Link 
        href="/admin/blog" 
        className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-12 group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        Back to Posts
      </Link>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-3">
            <FileText className="text-purple-500" size={32} />
            Edit Blog Post
          </h1>
          <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.3em] mt-2">Published on: {post.date}</p>
        </div>
      </div>

      <form action={async (formData: FormData) => {
        'use server';
        await updatePostAction(post.id, formData);
        redirect('/admin/blog');
      }} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-12">
            <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
                <div className="space-y-8">
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1">Post Title</label>
                        <input required name="title" defaultValue={post.title} className="w-full px-6 py-4 bg-black/40 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-purple-500 focus:bg-white/5 transition-all text-xl font-bold" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1 flex items-center gap-2">
                            <Sparkles size={12} className="text-purple-400" />
                            Full Content (Markdown Supported)
                        </label>
                        <textarea 
                            required 
                            name="content" 
                            defaultValue={post.content} 
                            rows={20} 
                            className="w-full px-6 py-6 bg-black/40 border border-white/10 rounded-[2rem] text-gray-200 focus:outline-none focus:border-purple-500 focus:bg-white/5 transition-all font-mono text-sm leading-relaxed custom-scrollbar" 
                        />
                    </div>
                </div>
            </section>
        </div>

        {/* Sidebar Settings Area */}
        <div className="lg:col-span-1 space-y-8">
            <section className="bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl sticky top-8">
                <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
                    Post Settings
                </h3>
                
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1 flex items-center gap-1.5">
                            <Globe size={12} /> Slug (URL)
                        </label>
                        <input required name="slug" defaultValue={post.slug} className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-purple-400 focus:outline-none focus:border-purple-500 focus:bg-white/5 transition-all font-mono text-xs" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1 flex items-center gap-1.5">
                            <ImageIcon size={12} /> Cover Image
                        </label>
                        <input required name="cover" defaultValue={post.cover} className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:bg-white/5 transition-all text-[10px]" />
                        {post.cover && (
                            <div className="mt-3 rounded-xl overflow-hidden border border-white/5 aspect-video">
                                <img src={post.cover} alt="Preview" className="w-full h-full object-cover opacity-50" />
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1">Excerpt</label>
                        <textarea required name="excerpt" defaultValue={post.excerpt} rows={3} className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-gray-400 focus:outline-none focus:border-purple-500 focus:bg-white/5 transition-all text-xs leading-relaxed" />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 bg-white text-black font-black rounded-2xl hover:bg-purple-100 transition shadow-xl shadow-white/5 flex items-center justify-center gap-2 active:scale-95 mt-4"
                    >
                        <Save size={20} />
                        Update Post
                    </button>
                    
                    <Link 
                        href="/admin/blog"
                        className="block w-full py-3 text-center text-gray-500 hover:text-white text-xs font-medium transition-colors"
                    >
                        Cancel Edits
                    </Link>
                </div>

                <div className="mt-8 pt-8 border-t border-white/5">
                    <div className="flex items-start gap-3 p-4 bg-purple-500/5 rounded-xl border border-purple-500/10">
                        <Info size={14} className="text-purple-400 mt-0.5 shrink-0" />
                        <p className="text-[10px] text-gray-500 leading-relaxed italic">
                            Changing the <strong>Slug</strong> will break any old links shared on social media. Use with caution!
                        </p>
                    </div>
                </div>
            </section>
        </div>
      </form>
    </div>
  );
}
