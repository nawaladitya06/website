"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import PageLoader from "./PageLoader";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isPending, setIsPending] = React.useState(true); // Start true for initial load
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    // Ensure initial load stays for 1.5s
    const timer = setTimeout(() => setIsPending(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // When pathname changes, trigger the loader
  React.useEffect(() => {
    if (!mounted) return;
    setIsPending(true);
    const timer = setTimeout(() => setIsPending(false), 1500); 
    return () => clearTimeout(timer);
  }, [pathname, mounted]);

  if (!mounted) return (
    <div className="fixed inset-0 bg-[#050505] z-[200]">
        <PageLoader />
    </div>
  );

  return (
    <AnimatePresence mode="wait">
      {/* 1. The Global Loader Overlay */}
      <AnimatePresence>
        {isPending && <PageLoader key="global-loader" />}
      </AnimatePresence>

      {/* 2. The Content Transition */}
      <motion.div
        key={pathname}
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ 
          opacity: isPending ? 0 : 1, 
          scale: isPending ? 0.98 : 1, 
          y: isPending ? 10 : 0 
        }}
        exit={{ opacity: 0, scale: 1.02, y: -10 }}
        transition={{ 
          duration: 0.8, 
          ease: [0.22, 1, 0.36, 1] 
        }}
        style={{ visibility: isPending ? "hidden" : "visible" }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
