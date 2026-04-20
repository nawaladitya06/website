"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const toggleMenu = () => setIsOpen(!isOpen);

  const links = [
    { name: "Home", href: "#home", id: "home" },
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "Skills", href: "#skills", id: "skills" },
    { name: "Education", href: "#education", id: "education" },
    { name: "Leadership", href: "#leadership", id: "leadership" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  // Scroll Detection Logic (Only for active tab highlighting now)
  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = links.map((link) => link.id);
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If top of section is within the top half of the viewport
          if (rect.top >= -200 && rect.top <= 400) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl">
      <div
        // FIXED: Removed the conditional "bg-black" check. 
        // It is now always "bg-white/5 backdrop-blur-md"
        className="relative px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-lg shadow-purple-500/10 flex items-center justify-between transition-all duration-300"
      >
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 group pl-2">
          <div className="relative w-8 h-8 overflow-hidden rounded-full border border-white/20">
            <Image
              src="/icon.png"
              alt="Aditya Nawal"
              fill
              className="object-cover"
            />
          </div>
          <span className="text-xs font-bold text-white tracking-widest hidden sm:block">
            ADITYA<span className="text-purple-400">.DEV</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setActiveSection(link.id)}
              className={`relative px-4 py-2 text-xs font-medium transition-colors duration-300 ${
                activeSection === link.id
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {activeSection === link.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white/10 rounded-full z-[-1]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute top-16 left-0 w-full bg-black/95 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden p-3 flex flex-col gap-2 md:hidden shadow-2xl"
          >
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => {
                  setIsOpen(false);
                  setActiveSection(link.id);
                }}
                className={`text-center py-3 rounded-2xl transition-all ${
                  activeSection === link.id
                    ? "bg-white/10 text-white font-bold"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}