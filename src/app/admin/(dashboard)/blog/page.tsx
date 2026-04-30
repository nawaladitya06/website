import { getPostsAction, createPostAction, deletePostAction } from "@/app/actions";
import { Trash2, Plus, Edit3, FileText, Calendar, Globe } from "lucide-react";
import Link from "next/link";


export default async function AdminBlogPage() {
  const posts = await getPostsAction() || [];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-12 pb-24">
      {/* Header */}
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-3">
            <FileText className="text-purple-500" size={32} />
            Blog Manager
          </h1>
          <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.3em] mt-2">Articles & Engineering Notes</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* Quick Post Creator */}
        <div className="lg:col-span-1 sticky top-8">
            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Plus size={20} className="text-purple-400" />
                    New Post
                </h2>
                <form action={createPostAction} className="space-y-3">
                    <input required name="title" placeholder="Title" className="w-full px-5 py-1 bg-black/40 border border-white/10 rounded-4xl text-white focus:outline-none focus:border-purple-500 focus:bg-white/5 transition-all text-sm" />
                    <input required name="slug" placeholder="url-slug" className="w-full px-5 py-1 bg-black/40 border border-white/10 rounded-4xl text-purple-400 focus:outline-none focus:border-purple-500 focus:bg-white/5 transition-all text-xs font-mono" />
                    <input required name="cover" placeholder="Cover Image URL" className="w-full px-5 py-1 bg-black/40 border border-white/10 rounded-4xl text-white focus:outline-none focus:border-purple-500 focus:bg-white/5 transition-all text-[10px]" />
                    <textarea required name="excerpt" placeholder="Short summary..." rows={2} className="w-full px-5 py-2 bg-black/40 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-purple-500 focus:bg-white/5 transition-all text-xs" />
                    <textarea required name="content" placeholder="Content start..." rows={4} className="w-full px-5 py-2 bg-black/40 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-purple-500 focus:bg-white/5 transition-all text-xs font-mono" />
                    
                    <button type="submit" className="w-full py-3 bg-white text-black font-extrabold rounded-4xl hover:bg-purple-100 transition shadow-lg shadow-white/5 active:scale-95 mt-4">
                        Draft & Launch
                    </button>
                    <p className="text-[10px] text-gray-500 text-center uppercase tracking-widest mt-2">Use Edit for full Markdown writing</p>
                </form>
            </div>
        </div>

        {/* Post Grid */}
        <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-xl shadow-2xl">
                <div className="space-y-6">
                    {posts.map(post => (
                        <div key={post.id} className="group p-4 bg-white/[0.02] border border-white/5 rounded-3xl hover:bg-white/[0.05] hover:border-purple-500/30 transition-all">
                           <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="flex gap-6 items-start">
                                    <div className="hidden sm:block w-24 h-16 rounded-xl overflow-hidden bg-black/20 border border-white/5 shrink-0">
                                        {post.cover ? <img src={post.cover} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" /> : null}
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-white font-bold text-lg tracking-tight group-hover:text-purple-400 transition-colors">{post.title}</h3>
                                        <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                                            <span className="flex items-center gap-1.5"><Calendar size={12} /> {post.date}</span>
                                            <span className="flex items-center gap-1.5 text-purple-400/70"><Globe size={12} /> {post.slug}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 ml-auto">
                                    <Link 
                                        href={`/admin/blog/${post.id}`}
                                        className="p-3 bg-white text-black rounded-xl hover:bg-purple-100 transition active:scale-90"
                                        title="Write Content"
                                    >
                                        <Edit3 size={18} />
                                    </Link>
                                    <form action={deletePostAction.bind(null, post.id)}>
                                        <button 
                                            type="submit" 
                                            className="p-3 bg-red-500/5 text-red-400/50 rounded-xl hover:bg-red-500 hover:text-white transition active:scale-90"
                                            title="Delete Post"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </form>
                                </div>
                           </div>
                        </div>
                    ))}
                    {posts.length === 0 && (
                        <div className="py-20 text-center text-gray-700 font-medium italic">No articles published yet</div>
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
