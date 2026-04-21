import Leadership from "@/components/Leadership";
import { getExperiencesAction } from "@/app/actions";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export default async function ExperiencePage() {
  const experiences = await getExperiencesAction() || [];

  return (
    <div className="pt-32 pb-20">
      <Leadership experiences={experiences} />
    </div>
  );
}
