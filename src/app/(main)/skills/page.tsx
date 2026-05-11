export const dynamic = "force-dynamic";
import SkillsRadar from "@/components/SkillsRadar";
import { getSkillsAction } from "@/app/actions";
import { Cpu } from "lucide-react";

export default async function SkillsPage() {
  const skills = await getSkillsAction() || [];

  return (
    <main className="min-h-screen pt-32 pb-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Page Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Cpu className="text-purple-400" size={40} />
            Skills Analytics
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto font-light mb-4">
            A comprehensive visualization of technical proficiency across all domains — from radar overview to individual skill mastery.
          </p>
          <div className="h-1 w-20 bg-purple-500 rounded-full mx-auto" />
        </div>

        {/* Full Skills Visualization */}
        <SkillsRadar skills={skills} />
      </div>
    </main>
  );
}
