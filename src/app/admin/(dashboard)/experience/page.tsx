import { getExperiencesAction, createExperienceAction } from "@/app/actions";
import ExperienceListClient from "@/components/Admin/ExperienceListClient";
import { Briefcase, Plus } from "lucide-react";


export default async function AdminExperiencePage() {
  const items = await getExperiencesAction() || [];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-12 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-3">
            <Briefcase className="text-purple-500" size={32} />
            Professional History
          </h1>
          <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.3em] mt-2">Roles, Internships & Leadership</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* Creation Form */}
        <div className="lg:col-span-1 sticky top-8">
            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Plus size={20} className="text-purple-400" />
                    New Experience
                </h2>
                <form action={createExperienceAction} className="space-y-3">
                    <div className="space-y-0.5">
                        <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1">Role Title</label>
                        <input required name="role" placeholder="e.g. Senior Developer" className="w-full px-5 py-1 bg-black/40 border border-white/10 rounded-4xl text-white focus:outline-none focus:border-purple-500 focus:bg-white/5 transition-all text-sm" />
                    </div>
                    <div className="space-y-0.5">
                        <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1">Organization</label>
                        <input required name="org" placeholder="e.g. Google India" className="w-full px-5 py-1 bg-black/40 border border-white/10 rounded-4xl text-white focus:outline-none focus:border-purple-500 focus:bg-white/5 transition-all text-sm" />
                    </div>
                    <div className="space-y-0.5">
                        <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1">Timeline</label>
                        <input required name="year" placeholder="e.g. 2023 - Present" className="w-full px-5 py-1 bg-black/40 border border-white/10 rounded-4xl text-white focus:outline-none focus:border-purple-500 focus:bg-white/5 transition-all text-sm" />
                    </div>
                    <div className="space-y-0.5">
                        <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1">Org Logo</label>
                        <input type="file" name="img" accept="image/*" className="w-full px-5 py-2 bg-black/40 border border-white/10 rounded-4xl text-white focus:outline-none focus:border-purple-500 focus:bg-white/5 transition-all text-sm file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:uppercase file:tracking-widest file:bg-purple-500/10 file:text-purple-400 hover:file:bg-purple-500/20" />
                        <input name="img_url" placeholder="...or paste logo URL" className="w-full px-5 py-1 bg-white/5 border border-white/5 rounded-4xl text-[10px] text-gray-500 focus:outline-none focus:border-purple-500/30 transition-all mt-1" />
                    </div>
                    <div className="space-y-0.5">
                        <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1">Category</label>
                        <select required name="category" className="w-full px-5 py-2 bg-black/40 border border-white/10 rounded-4xl text-white focus:outline-none focus:border-purple-500 focus:bg-white/5 transition-all text-sm">
                            <option value="professional" className="bg-zinc-900">Professional Role</option>
                            <option value="leadership" className="bg-zinc-900">Leadership Role</option>
                        </select>
                    </div>
                    <div className="space-y-0.5">
                        <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1">Description</label>
                        <textarea required name="desc" placeholder="Brief about your impact..." rows={4} className="w-full px-5 py-2 bg-black/40 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-purple-500 focus:bg-white/5 transition-all text-sm" />
                    </div>
                    <button type="submit" className="w-full py-3 bg-white text-black font-extrabold rounded-4xl hover:bg-purple-100 transition shadow-lg shadow-white/5 active:scale-95 mt-4">
                        Save Entry
                    </button>
                </form>
            </div>
        </div>

        {/* Dynamic List */}
        <div className="lg:col-span-2">
            <ExperienceListClient items={items} />
        </div>
      </div>
    </div>
  );
}
