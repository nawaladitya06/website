"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import PageLoader from "./PageLoader";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isPending, setIsPending] = React.useState(false); // Default to false
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Handle route changes
  React.useEffect(() => {
    if (!mounted) return;
    setIsPending(true);
    const timer = setTimeout(() => setIsPending(false), 1000); 
    return () => clearTimeout(timer);
  }, [pathname, mounted]);

  if (!mounted) return <>{children}</>; // Render children immediately on server

  return (
    <>
      <AnimatePresence>
        {isPending && (
          <div className="fixed inset-0 z-[200]">
            <PageLoader key="global-loader" />
          </div>
        )}
      </AnimatePresence>

      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </>
  );
}
