import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Leadership from "@/components/Leadership";
import { getProjectsAction, getExperiencesAction, getEducationsAction, getSkillsAction, getAboutAction } from "../actions";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export default async function Home() {
  let projects: any[] = [];
  let experiences: any[] = [];
  let educations: any[] = [];
  let skills: any[] = [];
  let about: any[] = [];
  
  try {
    [projects, experiences, educations, skills, about] = await Promise.all([
      getProjectsAction(),
      getExperiencesAction(),
      getEducationsAction(),
      getSkillsAction(),
      getAboutAction()
    ]);
  } catch (e) {
    console.error("DB not initialized yet or dev mode setup missing", e);
  }

  return (
    <main className="min-h-screen relative z-10">
      <Hero about={about} />
      <About educations={educations} />
      <Skills skills={skills} />
      <Leadership experiences={experiences} />
      <Projects projects={projects} />
      <Contact />
      <Footer />
    </main>
  );
}