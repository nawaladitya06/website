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
    <>
      {/* Sidebar: rendered as a sibling OUTSIDE the main flow wrapper.
          Uses inline style for fixed positioning to be immune to any 
          parent stacking context created by the root layout. */}
      <AdminSidebar />

      {/* Main content wrapper: pl-64 creates the gutter, isolate creates 
          a new stacking context that caps all children below the sidebar */}
      <div
        style={{ paddingLeft: '256px', isolation: 'isolate', position: 'relative', zIndex: 0 }}
        className="min-h-screen w-full"
      >
        <main className="w-full min-h-screen py-10 px-10">
          <div className="w-full max-w-5xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
