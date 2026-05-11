export const dynamic = "force-dynamic";
import { getSkillsAction, createSkillAction } from "@/app/actions";
import SkillsManagementClient from "@/components/Admin/SkillsManagementClient";
import { Cpu } from "lucide-react";

export default async function AdminSkillsPage() {
  const items = await getSkillsAction() || [];

  return (
    <div className="p-8 max-w-7xl mx-auto pb-24">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-3">
          <Cpu className="text-cyan-500" size={32} />
          Manage Skills
        </h1>
        <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.3em] mt-2">
          Technical Inventory & Analytics
        </p>
      </div>

      {/* Management Area */}
      <SkillsManagementClient 
        items={items} 
        createAction={createSkillAction} 
      />
    </div>
  );
}
