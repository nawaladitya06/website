import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/ui/PageTransition";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Aditya Nawal',
    default: 'Aditya Nawal | Full Stack Developer',
  },
  description: 'B.Sc IT student and Full Stack Developer specializing in premium digital experiences.',
};

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <PageTransition>
        {children}
      </PageTransition>
      <Footer />
    </>
  );
}
