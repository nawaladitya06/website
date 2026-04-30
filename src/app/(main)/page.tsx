import Hero from "@/components/Hero";
import { getAboutAction, getProfileAction } from "../actions";


export default async function Home() {
  let about: any[] = [];
  let profile: any = null;
  
  try {
    const results = await Promise.all([
      getAboutAction(),
      getProfileAction()
    ]);
    [about, profile] = results;
  } catch (e) {
    console.error("DB not initialized yet or dev mode setup missing", e);
  }

  return (
    <main className="min-h-screen relative z-10">
      <Hero about={about} profile={profile} />
    </main>
  );
}