import EducationLog from "@/components/EducationLog";
import { getEducationsAction } from "@/app/actions";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export default async function EducationPage() {
  const educations = await getEducationsAction() || [];

  return (
    <div className="pt-32 pb-20">
      <EducationLog educations={educations} />
    </div>
  );
}
