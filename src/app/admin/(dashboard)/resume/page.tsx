export const dynamic = "force-dynamic";
import { getProfileAction, updateResumeAction } from "@/app/actions";
import ResumeUploadClient from "@/components/Admin/ResumeUploadClient";
import { FileText } from "lucide-react";

export default async function AdminResumePage() {
    const profile = await getProfileAction();
    const currentResumeUrl = profile?.resume || null;

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-12 pb-32">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-3">
                        <FileText className="text-purple-500" size={32} />
                        Resume Manager
                    </h1>
                    <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.3em] mt-2">
                        Professional Document Configuration
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-12 items-start">
                <section>
                    <ResumeUploadClient 
                        currentResumeUrl={currentResumeUrl} 
                        updateAction={updateResumeAction} 
                    />
                </section>
            </div>
        </div>
    );
}
