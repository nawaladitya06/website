export const dynamic = "force-dynamic";
import { getProjectByIdAction } from "@/app/actions";
import { notFound } from "next/navigation";
import ProjectDetailClient from "@/components/ProjectDetailClient";


export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProjectByIdAction(parseInt(id));

  if (!project) notFound();

  const techArray = typeof project.tech === 'string' ? JSON.parse(project.tech) : project.tech;

  return <ProjectDetailClient project={project} techArray={techArray} />;
}
