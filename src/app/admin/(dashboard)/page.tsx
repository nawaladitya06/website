export const dynamic = "force-dynamic";
import { getProjectsAction, getExperiencesAction, getEducationsAction, getSkillsAction, getAboutAction, getMessagesAction, getPostsAction, getCertificationsAction } from "@/app/actions";


export default async function AdminDashboard() {
  const [projectsRes, experiencesRes, educationsRes, skillsRes, aboutRes, messagesRes, postsRes, certsRes] = await Promise.all([
    getProjectsAction(),
    getExperiencesAction(),
    getEducationsAction(),
    getSkillsAction(),
    getAboutAction(),
    getMessagesAction(),
    getPostsAction(),
    getCertificationsAction()
  ]);

  const projects = projectsRes || [];
  const experiences = experiencesRes || [];
  const educations = educationsRes || [];
  const skills = skillsRes || [];
  const about = aboutRes || [];
  const messages = messagesRes || [];
  const posts = postsRes || [];
  const certs = certsRes || [];

  return (
    <div className="p-8 max-w-7xl mx-auto pb-24">
      <h1 className="text-4xl font-black text-white mb-8 tracking-tighter">Admin Overview<span className="text-purple-500">.</span></h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Messages Card - High Priority */}
        <div className="p-8 rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-2xl flex flex-col shadow-2xl shadow-purple-500/5 group relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 -rotate-45 translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform duration-700" />
          <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
             Inbox
             {messages.length > 0 && <span className="text-xs px-2 py-0.5 bg-purple-500 text-white rounded-full">{messages.length}</span>}
          </h2>
          <p className="text-gray-500 text-sm mb-6 uppercase tracking-widest font-mono font-bold">Contact Requests</p>
          <ul className="flex flex-col gap-3 flex-1 mb-8">
            {messages.slice(0,3).map(m => (
                <li key={m.id} className="text-sm border-l-2 border-purple-500/30 pl-4 py-1">
                    <p className="text-white font-medium line-clamp-1">{m.name}</p>
                    <p className="text-gray-500 text-[10px] uppercase font-bold">{new Date(m.createdAt).toLocaleDateString()}</p>
                </li>
            ))}
            {messages.length === 0 && <li className="text-gray-500 italic text-sm">No messages yet</li>}
          </ul>
          <a href="/admin/messages" className="w-full py-4 bg-white text-black font-bold text-center rounded-2xl hover:bg-purple-100 transition shadow-lg shadow-white/5 active:scale-95">Open Inbox &rarr;</a>
        </div>

        <div className="p-8 rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-2xl flex flex-col group relative overflow-hidden">
          <h2 className="text-2xl font-bold text-white mb-2">Projects</h2>
          <p className="text-gray-500 text-sm mb-6 uppercase tracking-widest font-mono font-bold">Works ({projects.length})</p>
          <ul className="flex flex-col gap-3 flex-1 mb-8">
            {projects.slice(0,3).map(p => <li key={p.id} className="text-gray-300 text-sm flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan-500" /> {p.title}</li>)}
          </ul>
          <a href="/admin/projects" className="w-full py-4 bg-white/5 border border-white/10 text-white font-bold text-center rounded-2xl hover:bg-white/10 transition active:scale-95">Manage Projects</a>
        </div>

        <div className="p-8 rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-2xl flex flex-col group relative overflow-hidden">
          <h2 className="text-2xl font-bold text-white mb-2">Blog Posts</h2>
          <p className="text-gray-500 text-sm mb-6 uppercase tracking-widest font-mono font-bold">Articles ({posts.length})</p>
          <ul className="flex flex-col gap-3 flex-1 mb-8">
            {posts.slice(0,3).map(p => <li key={p.id} className="text-gray-300 text-sm flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500" /> {p.title}</li>)}
          </ul>
          <a href="/admin/blog" className="w-full py-4 bg-white/5 border border-white/10 text-white font-bold text-center rounded-2xl hover:bg-white/10 transition active:scale-95">Manage Blog</a>
        </div>

        <div className="p-8 rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-2xl flex flex-col group relative overflow-hidden">
          <h2 className="text-2xl font-bold text-white mb-2">Skills</h2>
          <p className="text-gray-500 text-sm mb-6 uppercase tracking-widest font-mono font-bold">Tech Stack ({skills.length})</p>
          <ul className="flex flex-col gap-3 flex-1 mb-8">
            {skills.slice(0,3).map(s => <li key={s.id} className="text-gray-300 text-sm flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500" /> {s.name} ({s.level}%)</li>)}
            {skills.length === 0 && <li className="text-gray-500 italic text-sm">No skills listed</li>}
          </ul>
          <a href="/admin/skills" className="w-full py-4 bg-white/5 border border-white/10 text-white font-bold text-center rounded-2xl hover:bg-white/10 transition active:scale-95">Manage Skills</a>
        </div>

        <div className="p-8 rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-2xl flex flex-col group relative overflow-hidden">
          <h2 className="text-2xl font-bold text-white mb-2">Education</h2>
          <p className="text-gray-500 text-sm mb-6 uppercase tracking-widest font-mono font-bold">Academic ({educations.length})</p>
          <ul className="flex flex-col gap-3 flex-1 mb-8">
            {educations.slice(0,3).map(e => <li key={e.id} className="text-gray-300 text-sm flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500" /> {e.institution}</li>)}
            {educations.length === 0 && <li className="text-gray-500 italic text-sm">No education records</li>}
          </ul>
          <a href="/admin/education" className="w-full py-4 bg-white/5 border border-white/10 text-white font-bold text-center rounded-2xl hover:bg-white/10 transition active:scale-95">Manage Education</a>
        </div>

        <div className="p-8 rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-2xl flex flex-col group relative overflow-hidden">
          <h2 className="text-2xl font-bold text-white mb-2">Experience</h2>
          <p className="text-gray-500 text-sm mb-6 uppercase tracking-widest font-mono font-bold">Professional ({experiences.length})</p>
          <ul className="flex flex-col gap-3 flex-1 mb-8">
            {experiences.slice(0,3).map(e => <li key={e.id} className="text-gray-300 text-sm flex items-center gap-2"><div className={`w-1.5 h-1.5 rounded-full ${e.category === 'leadership' ? 'bg-cyan-500' : 'bg-purple-500'}`} /> {e.role}</li>)}
            {experiences.length === 0 && <li className="text-gray-500 italic text-sm">No experience entries</li>}
          </ul>
          <a href="/admin/experience" className="w-full py-4 bg-white/5 border border-white/10 text-white font-bold text-center rounded-2xl hover:bg-white/10 transition active:scale-95">Manage Experience</a>
        </div>

        <div className="p-8 rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-2xl flex flex-col group relative overflow-hidden">
          <h2 className="text-2xl font-bold text-white mb-2">Certifications</h2>
          <p className="text-gray-500 text-sm mb-6 uppercase tracking-widest font-mono font-bold">Validations ({certs.length})</p>
          <ul className="flex flex-col gap-3 flex-1 mb-8">
            {certs.slice(0,3).map(c => <li key={c.id} className="text-gray-300 text-sm flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> {c.name}</li>)}
            {certs.length === 0 && <li className="text-gray-500 italic text-sm">No certs added</li>}
          </ul>
          <a href="/admin/certifications" className="w-full py-4 bg-white/5 border border-white/10 text-white font-bold text-center rounded-2xl hover:bg-white/10 transition active:scale-95">Manage Certs</a>
        </div>
      </div>
    </div>
  );
}
