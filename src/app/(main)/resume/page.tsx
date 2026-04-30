export const dynamic = "force-dynamic";
import { getProfileAction, getEducationsAction, getExperiencesAction, getSkillsAction, getAboutAction, getCertificationsAction } from "@/app/actions";
import { Mail, Github, Linkedin, Globe, Printer, Download, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";


export default async function ResumePage() {
  const [profile, educations, experiences, skills, about, certs] = await Promise.all([
    getProfileAction(),
    getEducationsAction(),
    getExperiencesAction(),
    getSkillsAction(),
    getAboutAction(),
    getCertificationsAction()
  ]);

  if (!profile) return (
    <div className="pt-40 pb-20 text-center px-4">
      <div className="max-w-md mx-auto p-12 rounded-3xl bg-white/5 border border-dashed border-white/20 backdrop-blur-xl">
        <h1 className="text-3xl font-bold text-white mb-4">Resume Not Ready</h1>
        <p className="text-gray-400 mb-8 font-light">Your professional profile hasn't been initialized yet. Head to the Admin Panel to fill out your details and generate your live resume!</p>
        <Link 
          href="/admin/about" 
          className="px-6 py-3 bg-purple-600 rounded-xl text-white font-bold hover:bg-purple-700 transition-all inline-block"
        >
          Initialize Profile
        </Link>
      </div>
    </div>
  );

  const bio = about?.[about.length - 1]?.content || "";
  const portfolioUrl = "https://aditya.dev"; // Should ideally be dynamic
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(portfolioUrl)}&color=7c3aed&bgcolor=ffffff`;

  return (
    <main className="min-h-screen pt-32 pb-20 px-4 md:px-6">
      {/* 1. Resume Controls (Hidden when printing) */}
      <div className="max-w-4xl mx-auto mb-12 flex flex-col md:flex-row justify-between items-center gap-6 print:hidden">
        <div className="flex items-center gap-4">
            <Link href="/" className="p-3 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white transition-colors">
                <ArrowLeft size={20} />
            </Link>
            <div>
                <h1 className="text-2xl font-bold text-white">Live Resume</h1>
                <p className="text-sm text-gray-500">Optimized for A4 Printing & PDF</p>
            </div>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-white hover:bg-white/10 transition-all font-medium"
          >
            <Printer size={18} />
            Print to PDF
          </button>
          <a 
            href={profile.resume}
            download
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-tr from-purple-600 to-purple-500 rounded-2xl text-white hover:shadow-lg hover:shadow-purple-500/20 transition-all font-bold"
          >
            <Download size={18} />
            Download Original
          </a>
        </div>
      </div>

      {/* 2. THE RESUME SHEET */}
      <div className="max-w-4xl mx-auto bg-white text-black p-10 md:p-16 shadow-[0_0_80px_rgba(0,0,0,0.6)] print:shadow-none print:m-0 print:p-0 min-h-[29.7cm] rounded-[2.5rem] print:rounded-none overflow-hidden relative">
        
        {/* Decorative corner for screen only */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 -rotate-45 translate-x-16 -translate-y-16 print:hidden" />

        {/* Header */}
        <header className="border-b-4 border-black pb-10 mb-12 flex flex-col md:flex-row justify-between items-start gap-8 relative">
          <div className="flex-1">
            <h1 className="text-5xl font-black uppercase tracking-tighter mb-2 leading-none">{profile.name} {profile.surname}</h1>
            <p className="text-2xl font-bold text-purple-700 mb-6 tracking-tight">{profile.role}</p>
            <p className="max-w-2xl text-base leading-relaxed text-gray-700 font-medium">{bio}</p>
          </div>
          
          <div className="flex flex-col md:items-end gap-6">
            {/* QR Code Container */}
            <div className="hidden md:block p-3 border-2 border-purple-100 rounded-2xl bg-white shadow-sm">
                <img src={qrCodeUrl} alt="Portfolio QR" width={80} height={80} />
                <p className="text-[8px] font-black text-center mt-2 uppercase tracking-widest text-purple-600">Scan Portfolio</p>
            </div>

            <div className="space-y-2 text-sm font-bold text-gray-900 border-l-4 md:border-l-0 md:border-r-4 border-purple-500 pl-4 md:pl-0 md:pr-4">
                <div className="flex items-center md:justify-end gap-3">
                {profile.email}
                <Mail size={16} className="text-purple-600" />
                </div>
                <div className="flex items-center md:justify-end gap-3">
                aditya-nawal
                <Linkedin size={16} className="text-purple-600" />
                </div>
                <div className="flex items-center md:justify-end gap-3">
                nawaladitya06
                <Github size={16} className="text-purple-600" />
                </div>
                <div className="flex items-center md:justify-end gap-3 text-purple-700">
                {portfolioUrl.replace("https://", "")}
                <Globe size={16} className="text-purple-600" />
                </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {/* Main Column */}
          <div className="md:col-span-2 space-y-14">
            {/* Experience */}
            <section>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] border-b-2 border-gray-100 pb-3 mb-8 flex items-center gap-4">
                <span className="w-8 h-1 bg-black" />
                Professional Experience
              </h2>
              <div className="space-y-12">
                {experiences.map((exp: any) => (
                  <div key={exp.id} className="relative pl-6 border-l-2 border-purple-100">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-purple-600 border-4 border-white" />
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-extrabold text-xl tracking-tight">{exp.role}</h3>
                      <span className="text-xs font-black px-3 py-1 bg-gray-100 rounded-full text-gray-500">{exp.year}</span>
                    </div>
                    <p className="font-bold text-base text-purple-700 mb-4">{exp.org}</p>
                    <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap font-medium">{exp.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Education */}
            <section>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] border-b-2 border-gray-100 pb-3 mb-8 flex items-center gap-4">
                <span className="w-8 h-1 bg-black" />
                Education
              </h2>
              <div className="space-y-8">
                {educations.map((edu: any) => (
                  <div key={edu.id} className="group">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-extrabold text-lg">{edu.institution}</h3>
                      <span className="text-sm font-bold text-gray-400">{edu.year}</span>
                    </div>
                    <p className="text-sm font-bold text-purple-700">{edu.degree} <span className="text-gray-300 mx-2">|</span> {edu.score}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-14">
            <section>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] border-b-2 border-gray-100 pb-3 mb-8">Core Stack</h2>
              <div className="space-y-8">
                {Array.from(new Set(skills.map((s: any) => s.category))).map((cat: string) => (
                  <div key={cat}>
                    <h3 className="text-[11px] font-black uppercase text-purple-600 mb-3 tracking-widest">{cat}</h3>
                    <div className="flex flex-wrap gap-2">
                       {skills.filter((s: any) => s.category === cat).map((s: any) => (
                         <span key={s.id} className="text-xs font-black px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100">{s.name}</span>
                       ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-sm font-black uppercase tracking-[0.2em] border-b-2 border-gray-100 pb-3 mb-8">Languages</h2>
              <div className="space-y-3">
                {[["English", "Professional"], ["Hindi", "Native"], ["Marathi", "Conversational"]].map(([l, v]) => (
                    <div key={l} className="flex justify-between items-center text-sm">
                        <span className="font-bold">{l}</span>
                        <span className="text-[10px] uppercase font-black text-gray-400">{v}</span>
                    </div>
                ))}
              </div>
            </section>

            <section className="print:mt-auto">
              <h2 className="text-sm font-black uppercase tracking-[0.2em] border-b-2 border-gray-100 pb-3 mb-8">Certifications</h2>
              <div className="space-y-4">
                {certs.map((cert: any) => (
                    <div key={cert.id} className="group">
                        <div className="flex items-center gap-3 text-xs font-bold text-gray-900 mb-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-purple-600 shrink-0" />
                            {cert.name}
                        </div>
                        <p className="text-[10px] text-gray-400 font-bold ml-4.5 uppercase tracking-widest">{cert.issuer} • {cert.date}</p>
                        {cert.url && (
                          <a 
                            href={cert.url} 
                            target="_blank" 
                            className="text-[9px] text-purple-600 font-black ml-4.5 uppercase tracking-tighter hover:underline print:hidden"
                          >
                            Verify Credential
                          </a>
                        )}
                    </div>
                ))}
                {certs.length === 0 && (
                  <p className="text-[10px] text-gray-400 italic">Credentials pending verification</p>
                )}
              </div>
            </section>
          </div>
        </div>
        
        {/* Footer for print */}
        <footer className="hidden print:block mt-20 pt-8 border-t border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">
            Generated via Aditya's Live Portfolio • {new Date().getFullYear()}
        </footer>
      </div>
    </main>
  );
}
