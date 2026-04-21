import { getProjectsAction, createProjectAction, deleteProjectAction } from "@/app/actions";
import { Trash2, Edit3, Plus, Layout } from "lucide-react";
import Link from "next/link";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const items = await getProjectsAction() || [];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-12 pb-24">
       {/* Header */}
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-3">
            <Layout className="text-purple-500" size={32} />
            Project Archive
          </h1>
          <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.3em] mt-2">Case Studies & Showcase</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* Creation Form (Simplified for the list page, details can be edited later) */}
        <div className="lg:col-span-1 sticky top-8">
            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Plus size={20} className="text-purple-400" />
                    Fast Build
                </h2>
                <form action={createProjectAction} className="space-y-3">
                    <input required name="title" placeholder="Project Title" className="w-full px-5 py-1 bg-black/40 border border-white/10 rounded-4xl text-white focus:outline-none focus:border-purple-500 focus:bg-white/5 transition-all text-sm" />
                    <input required name="year" placeholder="Year" className="w-full px-5 py-1 bg-black/40 border border-white/10 rounded-4xl text-white focus:outline-none focus:border-purple-500 focus:bg-white/5 transition-all text-sm" />
                    <input required name="tech" placeholder="Tech Stack (React, TS...)" className="w-full px-5 py-1 bg-black/40 border border-white/10 rounded-4xl text-white focus:outline-none focus:border-purple-500 focus:bg-white/5 transition-all text-sm" />
                    <div className="space-y-0.5">
                        <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1">Achievement Weight</label>
                        <select required name="type" className="w-full px-5 py-2 bg-black/40 border border-white/10 rounded-4xl text-white focus:outline-none focus:border-purple-500 focus:bg-white/5 transition-all text-sm">
                            <option value="major" className="bg-zinc-900">Major Achievement</option>
                            <option value="minor" className="bg-zinc-900">Minor Contribution</option>
                        </select>
                    </div>
                    <div className="space-y-0.5">
                        <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1">Main Project Image</label>
                        <input type="file" name="img" accept="image/*" className="w-full px-5 py-2 bg-black/40 border border-white/10 rounded-4xl text-white focus:outline-none focus:border-purple-500 focus:bg-white/5 transition-all text-sm file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:uppercase file:tracking-widest file:bg-purple-500/10 file:text-purple-400 hover:file:bg-purple-500/20" />
                        <input name="img_url" placeholder="...or paste image URL" className="w-full px-5 py-1 bg-white/5 border border-white/5 rounded-4xl text-[10px] text-gray-500 focus:outline-none focus:border-purple-500/30 transition-all mt-1" />
                    </div>
                    <textarea required name="desc" placeholder="Brief summary..." rows={3} className="w-full px-5 py-2 bg-black/40 border border-white/10 rounded-4xl text-white focus:outline-none focus:border-purple-500 focus:bg-white/5 transition-all text-sm" />
                    <button type="submit" className="w-full py-3 bg-white text-black font-extrabold rounded-4xl hover:bg-purple-100 transition shadow-lg shadow-white/5 active:scale-95 mt-4">
                        Initial Commit
                    </button>
                    <p className="text-[10px] text-gray-500 text-center uppercase tracking-widest mt-2">Full case studies can be added via Edit</p>
                </form>
            </div>
        </div>

        {/* List View */}
        <div className="lg:col-span-2">
            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-xl overflow-hidden shadow-2xl">
                <div className="space-y-6">
                    {items.map(item => (
                        <div key={item.id} className="group flex flex-col md:flex-row md:items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-3xl hover:bg-white/[0.05] hover:border-purple-500/30 transition-all gap-6">
                           <div className="flex items-center gap-6">
                                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-black/20 border border-white/10 shadow-inner">
                                    <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-white font-black text-xl tracking-tight">{item.title}</h3>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-2 py-0.5 bg-purple-500/10 text-purple-400 rounded text-[10px] font-bold uppercase tracking-widest">{item.year}</span>
                                        {Array.isArray(item.tech) ? item.tech.slice(0, 3).map((t: string) => (
                                            <span key={t} className="px-2 py-0.5 bg-white/5 text-gray-400 rounded text-[10px] font-bold uppercase tracking-widest">{t}</span>
                                        )) : null}
                                    </div>
                                </div>
                           </div>

                           <div className="flex items-center gap-3 ml-auto md:ml-0">
                                <Link 
                                    href={`/admin/projects/${item.id}`}
                                    className="p-3 bg-white text-black rounded-xl hover:bg-purple-100 transition active:scale-90"
                                    title="Edit Case Study"
                                >
                                    <Edit3 size={18} />
                                </Link>
                                <form action={deleteProjectAction.bind(null, item.id!)}>
                                    <button 
                                        type="submit" 
                                        className="p-3 bg-red-500/5 text-red-400/50 rounded-xl hover:bg-red-500 hover:text-white transition active:scale-90"
                                        title="Delete Project"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </form>
                           </div>
                        </div>
                    ))}
                    {items.length === 0 && (
                        <div className="py-20 text-center text-gray-700 font-medium">No projects in archive</div>
                    )}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
