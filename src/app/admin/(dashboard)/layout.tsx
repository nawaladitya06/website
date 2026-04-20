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
    <div className="min-h-screen w-full bg-[#050505]">
      {/* Sidebar: rendered directly, it positions itself with CSS fixed */}
      <AdminSidebar />

      {/* Main content: offset by sidebar width, scrolls naturally */}
      <main className="ml-64 min-h-screen py-10 px-10">
        <div className="w-full max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
