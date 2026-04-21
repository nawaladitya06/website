import Projects from "@/components/Projects";
import { getProjectsAction } from "@/app/actions";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await getProjectsAction() || [];

  return (
    <div className="pt-32 pb-20">
      <Projects projects={projects} />
    </div>
  );
}
