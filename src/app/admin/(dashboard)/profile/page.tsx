import { getAboutAction, createAboutAction, getProfileAction, updateProfileAction } from "@/app/actions";
import AboutListClient from "@/components/Admin/AboutListClient";
import { User, Camera, Mail, Github, Linkedin, FileText, Briefcase, Plus, Sparkles, MapPin } from "lucide-react";


export default async function AdminProfilePage() {
    const items = await getAboutAction() || [];
    const profile = await getProfileAction();

    return (
        <div className="p-8 max-w-6xl mx-auto space-y-12 pb-32">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-3">
                        <User className="text-purple-500" size={32} />
                        Identity & Bio
                    </h1>
                    <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.3em] mt-2">Personal Branding & Narrative</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                {/* Profile Management */}
                <section className="space-y-4">
                    <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 -rotate-45 translate-x-16 -translate-y-16" />

                        <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
                            <Sparkles className="text-purple-400" size={20} />
                            Core Profile
                        </h2>

                        <form action={updateProfileAction} className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1">First Name</label>
                                    <input required name="name" defaultValue={profile?.name || ""} className="w-full px-5 py-1 bg-black/40 border border-white/10 rounded-4xl text-white focus:outline-none focus:border-purple-500 transition-all text-sm" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1">Surname</label>
                                    <input required name="surname" defaultValue={profile?.surname || ""} className="w-full px-5 py-1 bg-black/40 border border-white/10 rounded-4xl text-white focus:outline-none focus:border-purple-500 transition-all text-sm" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1 flex items-center gap-2"> <Briefcase size={12} /> Tagline / Professional Role </label>
                                <input required name="role" defaultValue={profile?.role || ""} placeholder="  Full Stack Developer" className="w-full px-5 py-3 bg-black/40 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-purple-500 transition-all text-sm" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1 flex items-center gap-2"> <Mail size={12} /> Email </label>
                                    <input required name="email" defaultValue={profile?.email || ""} className="w-full px-5 py-1 bg-black/40 border border-white/10 rounded-4xl text-white focus:outline-none focus:border-purple-500 transition-all text-sm" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1 flex items-center gap-2"> <Linkedin size={12} /> LinkedIn </label>
                                    <input required name="linkedin" defaultValue={profile?.linkedin || ""} className="w-full px-5 py-1 bg-black/40 border border-white/10 rounded-4xl text-white focus:outline-none focus:border-purple-500 transition-all text-xs" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1 flex items-center gap-2"> <Camera size={12} /> Avatar URL </label>
                                <input required name="photo" defaultValue={profile?.photo || ""} className="w-full px-5 py-1 bg-black/40 border border-white/10 rounded-4xl text-white focus:outline-none focus:border-purple-500 transition-all text-[10px]" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase font-black text-gray-500 tracking-widest ml-1 flex items-center gap-2"> <FileText size={12} /> Resume Link </label>
                                <input required name="resume" defaultValue={profile?.resume || ""} className="w-full px-5 py-1 bg-black/40 border border-white/10 rounded-4xl text-white focus:outline-none focus:border-purple-500 transition-all text-[10px]" />
                            </div>

                            <button type="submit" className="w-full py-4 bg-white text-black font-black rounded-4xl hover:bg-purple-100 transition shadow-xl shadow-white/5 active:scale-[0.98] mt-6 text-lg">
                                Sync Profile
                            </button>
                        </form>
                    </div>
                </section>

                {/* Bio Paragraphs Management */}
                <section className="space-y-12">
                    {/* Creation Form */}
                    <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-3xl shadow-2xl">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Plus size={20} className="text-purple-400" />
                            Expand Bio
                        </h2>
                        <form action={createAboutAction} className="space-y-4">
                            <textarea required name="content" placeholder="Tell your story..." rows={4} className="w-full px-6 py-4 bg-black/40 border border-white/10 rounded-3xl text-white focus:outline-none focus:border-purple-500 transition-all leading-relaxed text-sm" />
                            <button type="submit" className="w-full py-4 bg-purple-600 text-white font-bold rounded-2xl hover:bg-purple-500 transition-all active:scale-95">
                                Add Paragraph
                            </button>
                        </form>
                    </div>

                    {/* List with Modals */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 px-4">
                            <FileText size={16} className="text-gray-500" />
                            <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest">Bio Stack</h3>
                        </div>
                        <AboutListClient items={items} />
                    </div>
                </section>

            </div>
        </div>
    );
}
