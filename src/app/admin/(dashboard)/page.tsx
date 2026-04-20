import { getProjectsAction, getExperiencesAction, getEducationsAction, getSkillsAction, getAboutAction } from "@/app/actions";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [projectsRes, experiencesRes, educationsRes, skillsRes, aboutRes] = await Promise.all([
    getProjectsAction(),
    getExperiencesAction(),
    getEducationsAction(),
    getSkillsAction(),
    getAboutAction()
  ]);

  const projects = projectsRes || [];
  const experiences = experiencesRes || [];
  const educations = educationsRes || [];
  const skills = skillsRes || [];
  const about = aboutRes || [];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-white mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md flex flex-col">
          <h2 className="text-2xl font-bold text-white mb-4">Projects ({projects.length})</h2>
          <ul className="flex flex-col gap-2 flex-1 mb-6">
            {projects.map(p => <li key={p.id} className="text-gray-300">{p.title}</li>)}
          </ul>
          <a href="/admin/projects" className="mt-auto px-4 py-2 bg-white text-black font-semibold text-center rounded-xl hover:bg-gray-200 transition">Manage Projects &rarr;</a>
        </div>

        <div className="p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md flex flex-col">
          <h2 className="text-2xl font-bold text-white mb-4">Experience ({experiences.length})</h2>
          <ul className="flex flex-col gap-2 flex-1 mb-6">
            {experiences.slice(0,3).map(e => <li key={e.id} className="text-gray-300">{e.role}</li>)}
          </ul>
          <a href="/admin/experience" className="mt-auto px-4 py-2 bg-white text-black font-semibold text-center rounded-xl hover:bg-gray-200 transition">Manage Experience &rarr;</a>
        </div>

        <div className="p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md flex flex-col">
          <h2 className="text-2xl font-bold text-white mb-4">Education ({educations.length})</h2>
          <ul className="flex flex-col gap-2 flex-1 mb-6">
            {educations.slice(0,3).map(e => <li key={e.id} className="text-gray-300">{e.degree}</li>)}
          </ul>
          <a href="/admin/education" className="mt-auto px-4 py-2 bg-white text-black font-semibold text-center rounded-xl hover:bg-gray-200 transition">Manage Education &rarr;</a>
        </div>

        <div className="p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md flex flex-col">
          <h2 className="text-2xl font-bold text-white mb-4">About Me</h2>
          <ul className="flex flex-col gap-2 flex-1 mb-6">
            <li className="text-gray-300 italic">{about.length > 0 ? (about[0].content.substring(0, 50) + "...") : "No content set"}</li>
          </ul>
          <a href="/admin/about" className="mt-auto px-4 py-2 bg-white text-black font-semibold text-center rounded-xl hover:bg-gray-200 transition">Manage About &rarr;</a>
        </div>

        <div className="p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md flex flex-col">
          <h2 className="text-2xl font-bold text-white mb-4">Skills ({skills.length})</h2>
          <ul className="flex flex-col gap-2 flex-1 mb-6">
            {skills.slice(0,5).map(s => <li key={s.id} className="text-gray-300">{s.name}</li>)}
          </ul>
          <a href="/admin/skills" className="mt-auto px-4 py-2 bg-white text-black font-semibold text-center rounded-xl hover:bg-gray-200 transition">Manage Skills &rarr;</a>
        </div>
      </div>
    </div>
  );
}
