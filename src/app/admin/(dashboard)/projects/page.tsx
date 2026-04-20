import { getProjectsAction, createProjectAction, deleteProjectAction } from "@/app/actions";
import { Trash2 } from "lucide-react";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const items = await getProjectsAction() || [];

  return (
    <div className="p-8 max-w-5xl mx-auto z-10 relative">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-white">Manage Projects</h1>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl mb-10">
        <h2 className="text-xl font-semibold text-white mb-6">Add New Project</h2>
        <form action={createProjectAction} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input required name="title" placeholder="Project Title" className="w-full px-4 py-3 bg-black/40 border border-white/20 rounded-xl text-white focus:outline-none focus:border-white focus:bg-white/5 transition-all" />
          <input required name="year" placeholder="Year" className="w-full px-4 py-3 bg-black/40 border border-white/20 rounded-xl text-white focus:outline-none focus:border-white focus:bg-white/5 transition-all" />
          <input required name="tech" placeholder="Tech Stack (comma separated)" className="w-full px-4 py-3 bg-black/40 border border-white/20 rounded-xl text-white focus:outline-none focus:border-white focus:bg-white/5 transition-all" />
          <input required name="img" placeholder="Image URL (e.g. /projects/img.png)" className="w-full px-4 py-3 bg-black/40 border border-white/20 rounded-xl text-white focus:outline-none focus:border-white focus:bg-white/5 transition-all" />
          <input name="github" placeholder="Github URL (optional)" className="w-full px-4 py-3 bg-black/40 border border-white/20 rounded-xl text-white focus:outline-none focus:border-white focus:bg-white/5 transition-all" />
          <input name="demo" placeholder="Demo URL (optional)" className="w-full px-4 py-3 bg-black/40 border border-white/20 rounded-xl text-white focus:outline-none focus:border-white focus:bg-white/5 transition-all" />
          <textarea required name="desc" placeholder="Description" rows={3} className="md:col-span-2 w-full px-4 py-3 bg-black/40 border border-white/20 rounded-xl text-white focus:outline-none focus:border-white focus:bg-white/5 transition-all" />
          <button type="submit" className="md:col-span-2 px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]">Create Project</button>
        </form>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-300">
          <thead className="border-b border-white/10 text-gray-400">
            <tr>
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Year</th>
              <th className="py-3 px-4">Tech</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="py-3 px-4 font-medium text-white">{item.title}</td>
                <td className="py-3 px-4">{item.year}</td>
                <td className="py-3 px-4">
                  <div className="flex gap-1 flex-wrap">
                    {Array.isArray(item.tech) ? item.tech.map((t: string) => <span key={t} className="px-2 py-0.5 bg-white/10 rounded">{t}</span>) : null}
                  </div>
                </td>
                <td className="py-3 px-4 text-right">
                  <form action={deleteProjectAction.bind(null, item.id!)}>
                    <button type="submit" className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition"><Trash2 size={16} /></button>
                  </form>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={4} className="py-8 text-center text-gray-500">No projects found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
