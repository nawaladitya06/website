export const dynamic = "force-dynamic";
import { getExperiencesAction, createExperienceAction } from "@/app/actions";
import ExperienceManagementClient from "@/components/Admin/ExperienceManagementClient";
import { Briefcase } from "lucide-react";

export default async function AdminExperiencePage() {
  const items = await getExperiencesAction() || [];

  return (
    <div className="p-8 max-w-7xl mx-auto pb-24">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-3">
          <Briefcase className="text-purple-500" size={32} />
          Professional History
        </h1>
        <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.3em] mt-2">
          Roles, Internships & Leadership
        </p>
      </div>

      {/* Management Area */}
      <ExperienceManagementClient 
        items={items} 
        createAction={createExperienceAction} 
      />
    </div>
  );
}
