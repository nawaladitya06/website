import AdminSidebar from "@/components/AdminSidebar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const auth = cookieStore.get("auth");
  
  if (!auth?.value || auth.value !== process.env.ADMIN_PASSWORD) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen w-full relative z-20 bg-[#050505]">
      {/* Permanent Fixed Sidebar space */}
      <div className="w-64 fixed inset-y-0 left-0 z-50">
        <AdminSidebar />
      </div>

      {/* Main Workspace mathematically locked exclusively to the right side */}
      <main className="flex-1 ml-[256px] min-w-0 flex justify-center py-10 px-10 relative z-10 min-h-screen border-l border-white/5">
        <div className="w-full max-w-6xl">
          {children}
        </div>
      </main>
    </div>
  );
}
