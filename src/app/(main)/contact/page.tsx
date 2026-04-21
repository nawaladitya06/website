import Contact from "@/components/Contact";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export default async function ContactPage() {
  return (
    <div className="pt-32 pb-20">
      <Contact />
    </div>
  );
}
