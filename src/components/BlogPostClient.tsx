"use client";
import { motion, useScroll, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Share2 } from "lucide-react";

export default function BlogPostClient({ post }: { post: any }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stagger: 0,
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "circOut" } }
  };

  return (
    <>
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-purple-500 origin-left z-[100]" 
        style={{ scaleX }} 
      />

      <motion.main 
        initial="hidden"
        animate="show"
        variants={containerVars}
        className="min-h-screen pt-32 pb-20 px-4 md:px-6 max-w-3xl mx-auto"
      >
        <motion.div variants={itemVars}>
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>
        </motion.div>

        <article className="space-y-16">
          <motion.header variants={itemVars} className="space-y-8">
            <div className="flex items-center gap-6 text-sm text-purple-400 font-mono tracking-wider">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                {post.date}
              </div>
              <div className="flex items-center gap-2">
                <User size={16} />
                Aditya Nawal
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.1] tracking-tight">
              {post.title}
            </h1>
            
            <p className="text-2xl text-gray-400 leading-relaxed font-light italic border-l-2 border-purple-500/30 pl-6 py-2">
               {post.excerpt}
            </p>
          </motion.header>

          <motion.div 
            variants={itemVars}
            className="relative aspect-video rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl shadow-purple-500/5"
          >
            <Image 
              src={post.cover} 
              alt={post.title} 
              fill 
              className="object-cover"
              priority
            />
          </motion.div>

          <motion.div variants={itemVars} className="prose prose-invert prose-purple max-w-none">
            <div className="text-gray-300 text-xl leading-relaxed whitespace-pre-wrap font-light space-y-8">
              {post.content}
            </div>
          </motion.div>

          <motion.footer 
            variants={itemVars}
            className="pt-16 border-t border-white/10 flex flex-wrap items-center justify-between gap-8"
          >
            <div className="flex items-center gap-5">
               <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-white/10 p-0.5 bg-gradient-to-tr from-purple-500 to-cyan-500">
                  <div className="w-full h-full rounded-[0.85rem] overflow-hidden bg-[#050505]">
                    <Image src="/icon.png" alt="Aditya" width={56} height={56} className="object-cover opacity-80" />
                  </div>
               </div>
               <div>
                 <p className="text-white text-lg font-bold tracking-tight">Aditya Nawal</p>
                 <p className="text-gray-500 font-mono text-sm uppercase tracking-widest">Full Stack Architect</p>
               </div>
            </div>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-3 px-6 py-3 bg-white/[0.03] border border-white/10 rounded-2xl hover:bg-white/[0.08] hover:border-purple-500/30 transition-all"
            >
              <Share2 size={20} className="text-gray-400 group-hover:text-purple-400 transition-colors" />
              <span className="text-white font-medium">Share Insights</span>
            </motion.button>
          </motion.footer>
        </article>
      </motion.main>
    </>
  );
}
