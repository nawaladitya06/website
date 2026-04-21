import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google"; 
import "./globals.css";
import SpotlightBackground from "@/components/ui/SpotlightBackground";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Aditya Nawal | Portfolio",
  description: "B.Sc IT Developer & Designer",
  icons: { icon: '/icon.png' },
};

import PageTransition from "@/components/ui/PageTransition";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrains.variable} bg-[#050505] text-white antialiased font-sans`}>
        {/* Layer 1: Mouse Spotlight */}
        <SpotlightBackground />
        
        {/* Layer 3: Main Content (Ensure transparency) */}
        <div className="relative z-10 bg-transparent">
          <PageTransition>
            {children}
          </PageTransition>
        </div>
      </body>
    </html>
  );
}