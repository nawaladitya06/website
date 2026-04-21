"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image"; // Ensures the photo works
import Link from "next/link";
import { Github, Linkedin, Mail, Code2, Cpu, Download } from "lucide-react";

// --- TERMINAL COMPONENT ---
const InteractiveTerminal = () => {
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false); // Track click/focus state
  const [output, setOutput] = useState<string[]>([
    "Welcome to Aditya's Portfolio v2.0",
    "Type 'help' to see available commands.",
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const cmd = input.trim().toLowerCase();
      let response = "";

      switch (cmd) {
        case "help":
          response = "Available commands: about, stack, contact, clear";
          break;
        case "about":
          response = "B.Sc IT '26 Student | Full Stack & App Developer.";
          break;
        case "stack":
          response = "Frontend: React, Next.js | Backend: Node, Supabase.";
          break;
        case "contact":
          response = "Email: nawaladitya06@gmail.com";
          break;
        case "clear":
          setOutput([]);
          setInput("");
          return;
        default:
          response = `Command not found: ${cmd}`;
      }

      setOutput([...output, `> ${input}`, response]);
      setInput("");
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [output]);

  return (
    <div
      onClick={() => {
        setIsFocused(true);
        inputRef.current?.focus();
      }}
      // Reverts to glass when clicking outside (optional)
      onBlur={() => setIsFocused(false)}
      className={`w-full max-w-md border border-white/10 rounded-xl overflow-hidden shadow-2xl font-mono text-sm mt-8 md:mt-0 transition-all duration-500 cursor-text ${isFocused
          ? "bg-black scale-[1.02] border-purple-500/30"
          : "bg-white/5 backdrop-blur-md"
        }`}
    >
      {/* Terminal Header */}
      <div className={`px-4 py-2 flex items-center gap-2 border-b border-white/5 transition-colors ${isFocused ? "bg-white/5" : "bg-transparent"
        }`}>
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-2 text-xs text-gray-500">guest@aditya-portfolio: ~</span>
      </div>

      {/* Terminal Body */}
      <div className="p-4 h-64 overflow-y-auto text-gray-300 space-y-2 custom-scrollbar">
        {output.map((line, i) => (
          <div key={i} className={`${line.startsWith(">") ? "text-purple-400" : "text-gray-300"}`}>
            {line}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className={`px-4 py-3 border-t border-white/5 flex items-center gap-2 transition-colors ${isFocused ? "bg-black" : "bg-transparent"
        }`}>
        <span className="text-green-500">➜</span>
        <span className="text-purple-400">~</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleCommand}
          onFocus={() => setIsFocused(true)}
          className="bg-transparent border-none outline-none text-white w-full font-mono placeholder-gray-600"
          placeholder="Click to type..."
        />
      </div>
    </div>
  );
};

// --- HERO MAIN COMPONENT ---
export default function Hero({ about = [], profile }: { about?: any[], profile?: any }) {
  // Use dynamic profile data or fallbacks
  const name = profile?.name || "Aditya";
  const surname = profile?.surname || "Nawal";
  const roleText = profile?.role || "Full Stack Dev | B.Sc IT '26";
  const photoUrl = profile?.photo || "/icon.png";
  const githubUrl = profile?.github || "https://github.com/nawaladitya06";
  const linkedinUrl = profile?.linkedin || "https://www.linkedin.com/in/aditya-nawal";
  const emailUrl = profile?.email ? `mailto:${profile.email}` : "mailto:nawaladitya06@gmail.com";
  const resumeUrl = profile?.resume || "/Aditya Nawal Resume.pdf";

  // Fallback to static text if DB is empty
  const bioText = about && about.length > 0 
    ? about[about.length - 1].content 
    : "Crafting aesthetic digital experiences with modern tech. Specializing in the MERN stack, Next.js, and mobile app development.";

  return (
    <section id="home" className="relative min-h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-20 pt-32 md:pt-20 overflow-hidden">

      {/* Grid Background */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* CONTENT CONTAINER */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-8">

        {/* LEFT: Text & Photo */}
        <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">

          {/* PROFILE PHOTO ROW (Restored) */}
          <div className="flex flex-col md:flex-row items-center gap-6 mb-4 justify-center md:justify-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative w-28 h-28 rounded-full border-4 border-white/10 shadow-2xl overflow-hidden shrink-0"
            >
              <Image
                src={photoUrl}
                alt={`${name} ${surname}`}
                fill
                className="object-cover"
                priority
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-purple-300 h-fit"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              Available for Work
            </motion.div>
          </div>

          {/* NAME & INTRO */}
          <div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-2">
              {name} <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">{surname}</span>
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-lg md:text-2xl text-gray-400 font-light flex flex-wrap justify-center md:justify-start gap-3"
            >
              <span className="flex items-center gap-2">{roleText}</span>
            </motion.p>
          </div>

          <p className="text-gray-400 text-sm md:text-base max-w-lg mx-auto md:mx-0 leading-relaxed whitespace-pre-wrap">
            {bioText}
          </p>

          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <a href={githubUrl} target="_blank" className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all">
              <Github className="text-gray-400" size={20} />
            </a>
            <a href={linkedinUrl} target="_blank" className="p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all">
              <Linkedin className="text-gray-400" size={20} />
            </a>
            <a
              href={resumeUrl}
              download
              className="px-6 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 text-white font-medium transition-all flex items-center gap-2 text-sm backdrop-blur-md"
            >
              <Download size={18} className="text-purple-400" />
              Resume
            </a>
            <Link
              href="/contact"
              className="relative z-20 px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-purple-200 transition-all flex items-center gap-2 text-sm shadow-xl shadow-purple-500/10 active:scale-95"
            >
              <Mail size={18} />
              Let's Talk
            </Link>
          </div>
        </div>

        {/* RIGHT: Terminal */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="w-full md:w-1/2 flex justify-center md:justify-end"
        >
          <InteractiveTerminal />
        </motion.div>

      </div>
    </section>
  );
}