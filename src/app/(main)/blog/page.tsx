import { getPostsAction } from "@/app/actions";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowRight, NotebookText } from "lucide-react";
import { motion } from "framer-motion";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await getPostsAction();

  return (
    <main className="min-h-screen pt-32 pb-20 px-4 md:px-6 max-w-5xl mx-auto">
      <div className="text-center mb-20">
        <h1 className="text-5xl font-bold text-white mb-4 flex items-center justify-center gap-4">
          <NotebookText className="text-purple-400" size={48} />
          Technical Logs
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto font-light text-lg">
          Insights, tutorials, and deep dives into full-stack development and modern tech.
        </p>
      </div>

      <div className="grid gap-12">
        {posts.map((post) => (
          <Link 
            key={post.id} 
            href={`/blog/${post.slug}`}
            className="group grid grid-cols-1 md:grid-cols-3 gap-8 items-center p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/[0.08] hover:border-purple-500/30 transition-all"
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10">
              <Image 
                src={post.cover} 
                alt={post.title} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-500" 
              />
            </div>
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-3 text-sm text-purple-400 font-mono">
                <Calendar size={14} />
                {post.date}
              </div>
              <h2 className="text-3xl font-bold text-white group-hover:text-purple-300 transition-colors">
                {post.title}
              </h2>
              <p className="text-gray-400 leading-relaxed font-light line-clamp-2">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-2 text-white font-bold text-sm group-hover:gap-4 transition-all">
                Read Article
                <ArrowRight size={16} />
              </div>
            </div>
          </Link>
        ))}

        {posts.length === 0 && (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
            <p className="text-gray-500">New logs coming soon. Stay tuned!</p>
          </div>
        )}
      </div>
    </main>
  );
}
