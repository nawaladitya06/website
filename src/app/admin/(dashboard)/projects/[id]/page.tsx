export const dynamic = "force-dynamic";
import { getProjectByIdAction, updateProjectAction } from "@/app/actions";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, Save, Layout, Calendar, Github, Link as LinkIcon, Info } from "lucide-react";
import Link from "next/link";


export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProjectByIdAction(parseInt(id));

  if (!project) notFound();

  // Parse tech stack for the input
  const techString = Array.isArray(project.tech) 
    ? project.tech.join(", ") 
    : typeof project.tech === 'string' 
        ? JSON.parse(project.tech).join(", ") 
        : "";

  return (
    <div className="p-8 max-w-5xl mx-auto pb-32">
       <Link 
        href="/admin/projects" 
        className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-12 group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        Back to Projects
      </Link>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-3">
            <Layout className="text-purple-500" size={32} />
            Edit Project
          </h1>
          <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.3em] mt-2">Ref ID: #{project.id}</p>
        </div>
      </div>

      <form action={async (formData: FormData) => {
        'use server';
        await updateProjectAction(project.id, formData);
        redirect('/admin/projects');
      }} className="space-y-12">
        
        {/* Core Details section */}
        <section className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 -rotate-45 translate-x-32 -translate-y-32" />
            
            <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-2 border-l-4 border-purple-500 pl-4">
                Core Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                    <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1">Project Title</label>
                    <input required name="title" defaultValue={project.title} className="w-full px-6 py-4 bg-black/40 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-purple-500 focus:bg-white/5 transition-all" />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1 flex items-center gap-1.5">
                        <Calendar size={12} /> Year
                    </label>
                    <input required name="year" defaultValue={project.year} className="w-full px-6 py-4 bg-black/40 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-purple-500 focus:bg-white/5 transition-all" />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1">Achievement Weight</label>
                    <select required name="type" defaultValue={project.type || 'major'} className="w-full px-6 py-4 bg-black/40 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-purple-500 focus:bg-white/5 transition-all text-sm appearance-none">
                        <option value="major" className="bg-zinc-900">Major Achievement</option>
                        <option value="minor" className="bg-zinc-900">Minor Contribution</option>
                    </select>
                </div>
                <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1">Tech Stack (Comma Separated)</label>
                    <input required name="tech" defaultValue={techString} className="w-full px-6 py-4 bg-black/40 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-purple-500 focus:bg-white/5 transition-all font-mono text-sm" />
                </div>
                <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1">Main Project Image</label>
                    <input type="file" name="img" accept="image/*" className="w-full px-6 py-2 bg-black/40 border border-white/10 rounded-4xl text-white focus:outline-none focus:border-purple-500 focus:bg-white/5 transition-all text-sm file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:uppercase file:tracking-widest file:bg-purple-500/10 file:text-purple-400 hover:file:bg-purple-500/20" />
                    <input name="img_url" defaultValue={project.img} placeholder="...or keep/paste image URL" className="w-full px-5 py-1 bg-white/5 border border-white/5 rounded-4xl text-[10px] text-gray-500 focus:outline-none focus:border-purple-500/30 transition-all mt-1" />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1 flex items-center gap-1.5">
                        <Github size={12} /> GitHub URL (Optional)
                    </label>
                    <input name="github" defaultValue={project.github || ''} className="w-full px-6 py-4 bg-black/40 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-purple-500 focus:bg-white/5 transition-all text-sm" />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1 flex items-center gap-1.5">
                        <LinkIcon size={12} /> Live Demo URL (Optional)
                    </label>
                    <input name="demo" defaultValue={project.demo || ''} className="w-full px-6 py-4 bg-black/40 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-purple-500 focus:bg-white/5 transition-all text-sm" />
                </div>
            </div>
        </section>

        {/* Case Study Section */}
        <section className="bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-3xl shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-2 border-l-4 border-purple-500 pl-4">
                Case Study Content
            </h2>
            <div className="space-y-8">
                <div className="space-y-2">
                    <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1">One-line Summary</label>
                    <textarea required name="desc" defaultValue={project.desc} rows={2} className="w-full px-6 py-4 bg-black/40 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-purple-500 focus:bg-white/5 transition-all leading-relaxed" />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1">The Challenge</label>
                    <textarea name="challenge" defaultValue={project.challenge || ''} rows={4} className="w-full px-6 py-4 bg-black/40 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-purple-500 focus:bg-white/5 transition-all leading-relaxed" />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1">The Solution</label>
                    <textarea name="solution" defaultValue={project.solution || ''} rows={4} className="w-full px-6 py-4 bg-black/40 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-purple-500 focus:bg-white/5 transition-all leading-relaxed" />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1">The Impact</label>
                    <textarea name="impact" defaultValue={project.impact || ''} rows={4} className="w-full px-6 py-4 bg-black/40 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-purple-500 focus:bg-white/5 transition-all leading-relaxed" />
                </div>
            </div>
        </section>

        {/* Global Action Bar */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-lg px-6 z-50">
            <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-4 rounded-[2.5rem] shadow-2xl flex gap-4">
                <Link 
                    href="/admin/projects"
                    className="flex-1 py-4 bg-black/40 text-white font-bold rounded-4xl hover:bg-black/60 transition text-center flex items-center justify-center"
                >
                    Cancel
                </Link>
                <button
                    type="submit"
                    className="flex-[2] py-4 bg-white text-black font-black rounded-4xl hover:bg-purple-100 transition shadow-xl shadow-white/5 flex items-center justify-center gap-2 text-lg active:scale-95"
                >
                    <Save size={20} />
                    Commit Changes
                </button>
            </div>
        </div>
      </form>
      
      {/* Help Tip */}
      <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/5 flex items-start gap-4">
        <Info className="text-purple-400 mt-1" size={20} />
        <p className="text-sm text-gray-500 leading-relaxed italic">
            <strong>Pro Tip:</strong> All changes made here will be reflected across the main landing page, the individual project case study page, and the archive. Cache will be flushed automatically upon save.
        </p>
      </div>
    </div>
  );
}
