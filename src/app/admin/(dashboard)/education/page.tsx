export const dynamic = "force-dynamic";
import { getEducationsAction, createEducationAction } from "@/app/actions";
import EducationManagementClient from "@/components/Admin/EducationManagementClient";
import { GraduationCap } from "lucide-react";

export default async function AdminEducationPage() {
  const items = await getEducationsAction() || [];

  return (
    <div className="p-8 max-w-7xl mx-auto pb-24">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-3">
          <GraduationCap className="text-purple-500" size={32} />
          Academic History
        </h1>
        <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.3em] mt-2">
          University & Certifications
        </p>
      </div>

      {/* Management Area */}
      <EducationManagementClient 
        items={items} 
        createAction={createEducationAction} 
      />
    </div>
  );
}
