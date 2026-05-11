"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FolderKanban, Briefcase, GraduationCap, Cpu, UserCircle, LogOut, NotebookText, MessageSquare, Award, FileText } from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Messages', href: '/admin/messages', icon: MessageSquare },
    { name: 'Resume', href: '/admin/resume', icon: FileText },
    { name: 'Blog', href: '/admin/blog', icon: NotebookText },
    { name: 'Projects', href: '/admin/projects', icon: FolderKanban },
    { name: 'Experience', href: '/admin/experience', icon: Briefcase },
    { name: 'Education', href: '/admin/education', icon: GraduationCap },
    { name: 'Certifications', href: '/admin/certifications', icon: Award },
    { name: 'Skills', href: '/admin/skills', icon: Cpu },
  ];

  return (
    <aside
      style={{ position: 'fixed', top: 0, left: 0, bottom: 0, width: '256px', zIndex: 9999 }}
      className="h-screen border-r border-white/10 bg-[#0a0a0a] flex flex-col pt-8 pb-4"
    >
      <div className="px-6 mb-10 h-8 flex items-center">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
          Admin Panel
        </h2>
      </div>

      <nav className="flex-1 flex flex-col gap-2 px-4 overflow-y-auto">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link 
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive 
                  ? 'bg-white/10 text-white border border-white/20 shadow-md' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <Icon size={20} className={isActive ? 'text-purple-400' : ''} />
              <span className="font-medium">{link.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-4 mt-auto">
        <button onClick={() => {
            document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            window.location.href = '/admin/login';
          }} 
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors border border-transparent hover:border-red-500/20"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
