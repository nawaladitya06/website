"use client";
import React, { useState } from "react";
import { Award, ShieldCheck, ExternalLink, Calendar, X, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CertificationsClient({ initialCerts }: { initialCerts: any[] }) {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const certs = initialCerts;

  return (
    <main className="min-h-screen bg-transparent selection:bg-purple-500/30">
      <div className="pt-40 pb-32 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-24 space-y-4">
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-black uppercase tracking-[0.2em]"
            >
                <Award size={14} />
                Professional Validations
            </motion.div>
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl font-black text-white tracking-tighter"
            >
                Certifications<span className="text-purple-500">.</span>
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-gray-500 max-w-xl mx-auto text-lg font-medium leading-relaxed"
            >
                A collection of my technical certifications, academic achievements, and industry-standard validations.
            </motion.p>
        </div>

        {/* Grid */}
        {/* 1. MAJOR CERTIFICATIONS - PREMIUM GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
            {certs.filter(c => !c.type || c.type === 'major').map((cert, index) => (
                <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative flex flex-col h-full bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden hover:bg-white/[0.08] hover:border-purple-500/30 transition-all duration-500"
                >
                    {/* Image Preview / Overlay */}
                    <div className="relative h-64 overflow-hidden bg-black/40">
                            {cert.img ? (
                            <img 
                                src={cert.img} 
                                alt={cert.name} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                            />
                            ) : (
                            <div className="w-full h-full flex items-center justify-center text-white/5">
                                <ShieldCheck size={120} strokeWidth={0.5} />
                            </div>
                            )}
                            
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60" />
                            
                            {cert.img && (
                            <button 
                                onClick={() => setSelectedImg(cert.img)}
                                className="absolute bottom-6 right-6 p-4 bg-white/10 backdrop-blur-md rounded-2xl text-white opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0"
                            >
                                <Maximize2 size={20} />
                            </button>
                            )}
                    </div>

                    {/* Content */}
                    <div className="p-8 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                            <span className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-lg text-[10px] font-black uppercase tracking-widest border border-purple-500/10">
                                {cert.issuer}
                            </span>
                            <div className="flex items-center gap-1.5 text-gray-500">
                                <Calendar size={14} />
                                <span className="text-xs font-bold">{cert.date}</span>
                            </div>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-white mb-6 leading-tight tracking-tight">
                            {cert.name}
                        </h3>

                        <div className="mt-auto pt-6 border-t border-white/5 flex gap-4">
                            {cert.url && (
                                <a 
                                    href={cert.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex-1 py-3.5 bg-white text-black text-center rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-purple-100 transition-all flex items-center justify-center gap-2"
                                >
                                    <ExternalLink size={14} />
                                    Verify Credential
                                </a>
                            )}
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>

        {/* 2. MINOR CERTIFICATIONS - COMPACT LIST */}
        {certs.some(c => c.type === 'minor') && (
            <section className="pt-20 border-t border-white/5">
                 <div className="mb-12">
                    <h3 className="text-2xl font-bold text-white mb-2">Supplementary Validations</h3>
                    <p className="text-gray-500 text-sm font-medium">Workshop completions, technical seminars, and minor course certificates.</p>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {certs.filter(c => c.type === 'minor').map((cert, index) => (
                        <motion.div
                            key={cert.id}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center justify-between p-6 bg-white/[0.03] border border-white/5 rounded-2xl hover:bg-white/[0.07] hover:border-purple-500/20 transition-all group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400">
                                    <Award size={20} />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold group-hover:text-purple-400 transition-colors">{cert.name}</h4>
                                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">{cert.issuer} • {cert.date}</p>
                                </div>
                            </div>
                            {cert.url && (
                                <a href={cert.url} target="_blank" className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-all">
                                    <ExternalLink size={16} />
                                </a>
                            )}
                        </motion.div>
                    ))}
                 </div>
            </section>
        )}

        {certs.length === 0 && (
            <div className="py-40 text-center space-y-6">
                 <div className="w-20 h-20 rounded-full border-2 border-dashed border-white/10 mx-auto flex items-center justify-center">
                    <ShieldCheck size={32} className="text-gray-800" />
                 </div>
                 <p className="text-gray-500 font-medium italic">No public certifications disclosed yet.</p>
            </div>
        )}
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImg && (
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-12">
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedImg(null)}
                    className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                />
                
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="relative max-w-5xl w-full h-full flex items-center justify-center"
                >
                    <button 
                         onClick={() => setSelectedImg(null)}
                         className="absolute -top-12 right-0 md:-top-6 md:-right-12 p-3 bg-white/5 hover:bg-white/10 rounded-full text-white transition-all z-10"
                    >
                        <X size={24} />
                    </button>
                    <img src={selectedImg} alt="Certificate" className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl border border-white/10" />
                </motion.div>
            </div>
        )}
      </AnimatePresence>
    </main>
  );
}
