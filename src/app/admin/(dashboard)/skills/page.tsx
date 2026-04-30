import { getSkillsAction, createSkillAction } from "@/app/actions";
import SkillsListClient from "@/components/Admin/SkillsListClient";
import { Cpu, Plus } from "lucide-react";


export default async function AdminSkillsPage() {
  const items = await getSkillsAction() || [];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-12 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-3">
            <Cpu className="text-purple-500" size={32} />
            Manage Skills
          </h1>
          <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.3em] mt-2">Technical Inventory & Analytics</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* Creation Form */}
        <div className="lg:col-span-1 sticky top-8">
            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Plus size={20} className="text-purple-400" />
                    New Skill
                </h2>
                <form action={createSkillAction} className="space-y-3">
                    <div className="space-y-1">
                        <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1">Domain</label>
                        <input required name="category" placeholder="e.g. Frontend" className="w-full px-5 py-1 bg-black/40 border border-white/10 rounded-4xl text-white focus:outline-none focus:border-purple-500 focus:bg-white/5 transition-all text-sm" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1">Tech Name</label>
                        <input required name="name" placeholder="e.g. React.js" className="w-full px-5 py-1 bg-black/40 border border-white/10 rounded-4xl text-white focus:outline-none focus:border-purple-500 focus:bg-white/5 transition-all text-sm" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1">Proficiency %</label>
                        <input required type="number" name="level" min="0" max="100" defaultValue="80" className="w-full px-5 py-1 bg-black/40 border border-white/10 rounded-4xl text-white focus:outline-none focus:border-purple-500 focus:bg-white/5 transition-all text-sm" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1">Docs URL</label>
                        <input required name="url" placeholder="https://..." className="w-full px-5 py-1 bg-black/40 border border-white/10 rounded-4xl text-white focus:outline-none focus:border-purple-500 focus:bg-white/5 transition-all text-sm" />
                    </div>
                    <button type="submit" className="w-full py-3 bg-white text-black font-extrabold rounded-4xl hover:bg-purple-100 transition shadow-lg shadow-white/5 active:scale-95 mt-4">
                        Add to Stack
                    </button>
                </form>
            </div>
        </div>

        {/* Dynamic List */}
        <div className="lg:col-span-2">
            <SkillsListClient items={items} />
        </div>
      </div>
    </div>
  );
}
