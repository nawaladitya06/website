"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const footerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!footerRef.current) return;
    const rect = footerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <footer 
        ref={footerRef}
        onMouseMove={handleMouseMove}
        className="relative group border-t border-white/10 bg-white/[0.02] backdrop-blur-3xl pt-16 pb-8 overflow-hidden"
    >
      {/* Footer Spotlight */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(400px at ${mousePosition.x}px ${mousePosition.y}px, rgba(120, 50, 255, 0.08), transparent 80%)`
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: Brand & Mission */}
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-4">
              Aditya Pawan Nawal
            </h2>
            <p className="text-gray-400 leading-relaxed max-w-sm">
              Full Stack Developer & IT Student crafting aesthetic, high-performance digital experiences. 
              Always open to discussing new projects and creative ideas.
            </p>
          </div>

          {/* Column 2: Quick Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
              Explore
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
            </h3>
            <ul className="space-y-4">
              {[
                { name: "Selected Works", href: "#projects" },
                { name: "Tech Arsenal", href: "#skills" },
                { name: "Education Log", href: "#education" },
                { name: "Leadership", href: "#leadership" },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-gray-400 hover:text-purple-400 transition-colors text-sm flex items-center gap-1 group"
                  >
                    <span className="w-0 group-hover:w-2 h-[1px] bg-purple-400 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Connect */}
          <div>
            <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
              Connect
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
            </h3>
            <ul className="space-y-4">
              <li>
                <a 
                  href="mailto:nawaladitya06@gmail.com" 
                  className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2"
                >
                  <Mail size={16} />
                  nawaladitya06@gmail.com
                </a>
              </li>
              <li>
                <a 
                  href="https://www.linkedin.com/in/aditya-nawal" 
                  target="_blank"
                  className="text-gray-400 hover:text-purple-400 transition-colors text-sm flex items-center gap-2"
                >
                  <Linkedin size={16} />
                  LinkedIn Profile
                  <ArrowUpRight size={12} className="opacity-50" />
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/nawaladitya06" 
                  target="_blank"
                  className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2"
                >
                  <Github size={16} />
                  GitHub Profile
                  <ArrowUpRight size={12} className="opacity-50" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Tech Stack */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {currentYear} Aditya Nawal. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
             <p className="text-xs font-mono text-gray-600 flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
               System Status: Online
             </p>
             <p className="text-xs font-mono text-gray-600">
               Built with Next.js 15 & Tailwind v4
             </p>
          </div>
        </div>
      </div>
    </footer>
  );
}