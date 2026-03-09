import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import ReadmeHeader from "@/components/readme/ReadmeHeader";
import MarkdownViewer from "@/components/readme/MarkdownViewer";
import VersionHistory from "@/components/readme/VersionHistory";
import InfoCard from "@/components/readme/InfoCard";
import ReadmeActions from "@/components/readme/ReadmeActions";

export default async function ReadmePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.getAll()
    .map(c => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/readme/latest/${id}`,
    {
      cache: "no-store",
      headers: {
        Cookie: cookieHeader,
      },
    }
  );

  const json = await res.json();
  const readme = json.data;

  if (!readme || !readme.content) {
    return (
      <main className="bg-[#020817] text-white min-h-screen flex items-center justify-center">
        <p className="text-slate-400">README not found. Please generate one first.</p>
      </main>
    );
  }

  return (
    <main className="bg-[#020817] text-white min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
        <ReadmeHeader content={readme.content} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <MarkdownViewer content={readme.content} />
          </div>
          <div className="space-y-6 lg:sticky lg:top-24 h-fit">
            <VersionHistory repoId={id} />
            <InfoCard />
          </div>
        </div>
        <ReadmeActions repoId={id} />
      </div>
    </main>
  );
}