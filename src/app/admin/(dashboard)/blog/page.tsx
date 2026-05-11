export const dynamic = "force-dynamic";
import { getPostsAction, createPostAction } from "@/app/actions";
import BlogManagementClient from "@/components/Admin/BlogManagementClient";
import { FileText } from "lucide-react";

export default async function AdminBlogPage() {
  const posts = await getPostsAction() || [];

  return (
    <div className="p-8 max-w-7xl mx-auto pb-24">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-black text-white tracking-tight flex items-center gap-3">
          <FileText className="text-purple-500" size={32} />
          Blog Manager
        </h1>
        <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.3em] mt-2">
          Articles & Engineering Notes
        </p>
      </div>

      {/* Management Area */}
      <BlogManagementClient 
        items={posts} 
        createAction={createPostAction} 
      />
    </div>
  );
}
