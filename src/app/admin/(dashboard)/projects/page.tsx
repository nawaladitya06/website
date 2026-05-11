export const dynamic = "force-dynamic";
import { getProjectsAction, createProjectAction } from "@/app/actions";
import ProjectManagementClient from "@/components/Admin/ProjectManagementClient";
import { Layout } from "lucide-react";

export default async function AdminProjectsPage() {
  const items = await getProjectsAction() || [];

  return (
    <div className="p-8 max-w-7xl mx-auto pb-24">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-3">
          <Layout className="text-indigo-500" size={32} />
          Project Archive
        </h1>
        <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.3em] mt-2">
          Case Studies & Showcase
        </p>
      </div>

      {/* Management Area */}
      <ProjectManagementClient 
        items={items} 
        createAction={createProjectAction} 
      />
    </div>
  );
}
