import { getPostBySlugAction } from "@/app/actions";
import { notFound } from "next/navigation";
import BlogPostClient from "@/components/BlogPostClient";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlugAction(slug);

  if (!post) notFound();

  return <BlogPostClient post={post} />;
}
