import { getSkillsAction, createSkillAction, deleteSkillAction } from "@/app/actions";
import { Trash2 } from "lucide-react";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export default async function AdminSkillsPage() {
  const items = await getSkillsAction() || [];

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-white">Manage Skills</h1>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl mb-10">
        <h2 className="text-xl font-semibold text-white mb-6">Add New Skill</h2>
        <form action={createSkillAction} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input required name="category" placeholder="Category (e.g. Frontend, Backend)" className="w-full px-4 py-3 bg-black/40 border border-white/20 rounded-xl text-white focus:outline-none focus:border-white focus:bg-white/5 transition-all" />
          <input required name="name" placeholder="Skill Name (e.g. React.js)" className="w-full px-4 py-3 bg-black/40 border border-white/20 rounded-xl text-white focus:outline-none focus:border-white focus:bg-white/5 transition-all" />
          <input required name="url" placeholder="Documentation URL" className="md:col-span-2 w-full px-4 py-3 bg-black/40 border border-white/20 rounded-xl text-white focus:outline-none focus:border-white focus:bg-white/5 transition-all" />
          <button type="submit" className="md:col-span-2 px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]">Create Skill</button>
        </form>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-300">
          <thead className="border-b border-white/10 text-gray-400">
            <tr>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Skill Name</th>
              <th className="py-3 px-4">URL</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-3 px-4 font-medium text-white">{item.category}</td>
                <td className="py-3 px-4">{item.name}</td>
                <td className="py-3 px-4 text-xs">{item.url}</td>
                <td className="py-3 px-4 text-right">
                  <form action={deleteSkillAction.bind(null, item.id!)}>
                    <button type="submit" className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition"><Trash2 size={16} /></button>
                  </form>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={4} className="py-8 text-center text-gray-500">No skills records found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
