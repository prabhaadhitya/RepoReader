import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import RepoHeader from "@/components/repo/RepoHeader";
import ExplanationCards from "@/components/repo/ExplanationCards";
import TechStackGrid from "@/components/repo/TechStackGrid";
import FolderTree from "@/components/repo/FolderTree";
import RepoActions from "@/components/repo/RepoActions";

export default async function RepoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");

  const cookieStore = await cookies();
  const cookieHeader = cookieStore.getAll()
    .map(c => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/analysis/${id}`,
    {
      cache: "no-cache",
      headers: {
        Cookie: cookieHeader,
      },
    }
  );

  const json = await res.json();
  const data = json.data;

  if (!data || !data.repository) {
    return (
      <main className="bg-[#020817] text-white min-h-screen flex items-center justify-center">
        <p className="text-slate-400">Could not load repository data. Please try again.</p>
      </main>
    );
  }

  return (
    <main className="bg-[#020817] text-white min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">
        <RepoHeader repository={data.repository} />
        <ExplanationCards explanation={data.analysis.explanation} />
        <TechStackGrid techStack={data.analysis.explanation.techStack} />
        <FolderTree structure={data.repository.structure} />
        <RepoActions repoId={id} />
      </div>
    </main>
  );
}