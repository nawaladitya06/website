export const dynamic = "force-dynamic";
import { getCertificationsAction, createCertificationAction } from "@/app/actions";
import CertificationsManagementClient from "@/components/Admin/CertificationsManagementClient";
import { Award } from "lucide-react";

export default async function AdminCertificationsPage() {
  const items = await getCertificationsAction() || [];

  return (
    <div className="p-8 max-w-7xl mx-auto pb-24">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-3">
          <Award className="text-purple-500" size={32} />
          Certifications
        </h1>
        <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.3em] mt-2">
          Professional Validations & Awards
        </p>
      </div>

      {/* Management Area */}
      <CertificationsManagementClient 
        items={items} 
        createAction={createCertificationAction} 
      />
    </div>
  );
}
