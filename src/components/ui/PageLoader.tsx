"use client";
import React from "react";
import { motion } from "framer-motion";

export default function PageLoader() {
    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                return prev + Math.floor(Math.random() * 10) + 5;
            });
        }, 100);
        return () => clearInterval(timer);
    }, []);

    const name = "ADITYA NAWAL";
    const letters = name.split("");

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#000000]"
        >
            {/* 1. Atmospheric Radial Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.08),transparent_70%)]" />

            {/* 2. Main Content Container */}
            <div className="relative flex flex-col items-center w-full max-w-lg px-8">

                {/* 3. System Status (Micro Text) */}
                <div className="flex items-center gap-3 mb-12">
                    <motion.div
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]"
                    />
                    <span className="text-[9px] uppercase tracking-[0.6em] font-black text-gray-500">
                        Initializing...
                    </span>
                </div>

                {/* 4. Large Staggered Name Reveal */}
                <div className="flex flex-wrap justify-center gap-x-[0.4em] mb-16">
                    {letters.map((char, i) => (
                        <motion.span
                            key={i}
                            initial={{ opacity: 0, y: 15, filter: "blur(10px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{
                                duration: 0.8,
                                delay: i * 0.05,
                                ease: [0.22, 1, 0.36, 1]
                            }}
                            className={`text-3xl md:text-5xl font-black tracking-tighter ${char === ' ' ? 'w-4' : 'text-white'}`}
                        >
                            {char === 'N' ? <span className="text-purple-500 italic">N</span> : char}
                        </motion.span>
                    ))}
                </div>

                {/* 5. Precision Status Bar */}
                <div className="w-full relative py-6">
                    {/* The Line */}
                    <div className="w-full h-[1px] bg-white/5 relative">
                        {/* The Pulse */}
                        <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-y-0 left-0 bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,1)]"
                        />
                        {/* Moving Diamond */}
                        <motion.div
                            animate={{ x: ["0%", "100%", "0%"] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-1 left-0 w-2 h-2 rotate-45 border border-purple-500/50 bg-black z-20"
                        />
                    </div>

                    {/* Progress Percentage */}
                    <div className="mt-4 flex justify-between items-end">
                        <span className="text-[8px] font-mono font-bold text-gray-600 uppercase tracking-widest">                         </span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-xs font-mono font-black text-purple-500 tracking-tighter">
                                {String(Math.min(progress, 100)).padStart(2, '0')}
                            </span>
                            <span className="text-[8px] font-mono font-bold text-gray-500">%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 6. Scanline Effect (Refined) */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(255,255,255,0.01),rgba(0,0,255,0.02))] bg-[size:100%_3px,4px_100%] z-50 opacity-40" />
        </motion.div>
    );
}
