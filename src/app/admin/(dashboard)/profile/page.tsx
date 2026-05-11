export const dynamic = "force-dynamic";
import { getAboutAction, createAboutAction, getProfileAction, updateProfileAction } from "@/app/actions";
import AboutListClient from "@/components/Admin/AboutListClient";
import CoreProfileForm from "@/components/Admin/CoreProfileForm";
import BioManagementForm from "@/components/Admin/BioManagementForm";
import { User, FileText } from "lucide-react";

export default async function AdminProfilePage() {
    const items = await getAboutAction() || [];
    const profile = await getProfileAction();

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-12 pb-32">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-3">
                        <User className="text-purple-500" size={32} />
                        Identity & Bio
                    </h1>
                    <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.3em] mt-2">
                        Personal Branding & Narrative
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                {/* Profile Management */}
                <section className="h-full">
                    <CoreProfileForm profile={profile} updateAction={updateProfileAction} />
                </section>

                {/* Bio Paragraphs Management */}
                <section className="space-y-8">
                    {/* Creation Form */}
                    <BioManagementForm createAction={createAboutAction} />

                    {/* List with Modals */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 px-2">
                            <div className="p-1.5 bg-white/5 rounded-lg border border-white/10">
                                <FileText size={14} className="text-gray-400" />
                            </div>
                            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Narrative Stack</h3>
                            <div className="h-px bg-white/10 flex-grow ml-4" />
                        </div>
                        <AboutListClient items={items} />
                    </div>
                </section>

            </div>
        </div>
    );
}
