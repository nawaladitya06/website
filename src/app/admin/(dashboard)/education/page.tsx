export const dynamic = "force-dynamic";
import { getEducationsAction, createEducationAction } from "@/app/actions";
import EducationListClient from "@/components/Admin/EducationListClient";
import { GraduationCap, Plus } from "lucide-react";


export default async function AdminEducationPage() {
  const items = await getEducationsAction() || [];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-12 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-3">
            <GraduationCap className="text-purple-500" size={32} />
            Manage Education
          </h1>
          <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.3em] mt-2">Academic History & Certifications</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* Creation Form */}
        <div className="lg:col-span-1 sticky top-8">
            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Plus size={20} className="text-purple-400" />
                    Add Education
                </h2>
                <form action={createEducationAction} className="space-y-3">
                    <div className="space-y-1">
                        <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1">Institution</label>
                        <input required name="institution" placeholder="e.g. Stanford University" className="w-full px-5 py-1 bg-black/40 border border-white/10 rounded-4xl text-white focus:outline-none focus:border-purple-500 focus:bg-white/5 transition-all text-sm" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1">Degree / Course</label>
                        <input required name="degree" placeholder="e.g. B.Tech Computer Science" className="w-full px-5 py-1 bg-black/40 border border-white/10 rounded-4xl text-white focus:outline-none focus:border-purple-500 focus:bg-white/5 transition-all text-sm" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1">Timeline</label>
                        <input required name="year" placeholder="e.g. 2018 - 2022" className="w-full px-5 py-1 bg-black/40 border border-white/10 rounded-4xl text-white focus:outline-none focus:border-purple-500 focus:bg-white/5 transition-all text-sm" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1">Score / Result</label>
                        <input required name="score" placeholder="e.g. 9.8 CGPA" className="w-full px-5 py-1 bg-black/40 border border-white/10 rounded-4xl text-white focus:outline-none focus:border-purple-500 focus:bg-white/5 transition-all text-sm" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1">Institution Link</label>
                        <input required name="link" placeholder="https://..." className="w-full px-5 py-1 bg-black/40 border border-white/10 rounded-4xl text-white focus:outline-none focus:border-purple-500 focus:bg-white/5 transition-all text-sm" />
                    </div>
                    <button type="submit" className="w-full py-3 bg-white text-black font-extrabold rounded-4xl hover:bg-purple-100 transition shadow-lg shadow-white/5 active:scale-95 mt-4">
                        Add Education
                    </button>
                </form>
            </div>
        </div>

        {/* Dynamic List */}
        <div className="lg:col-span-2">
            <EducationListClient items={items} />
        </div>
      </div>
    </div>
  );
}
