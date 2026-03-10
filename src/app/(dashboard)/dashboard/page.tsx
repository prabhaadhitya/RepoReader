import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/modules/user/user.model"; 
import DetailCards from "@/components/dashboard/DetailCards";
import RepoInput from "@/components/dashboard/RepoInput";
import RepoList from "@/components/dashboard/RepoList";
import CreditsDisplay from "@/components/dashboard/CreditsDisplay";
import { getUserRepos } from "@/services/github.repos.service";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  const userId = (session?.user as { id: string })?.id;
  const isGithubUser = (session as any)?.provider === "github";
  const accessToken = (session as any)?.accessToken;

  await connectDB();

  const user = isGithubUser
    ? await User.findOne({ githubId: Number(userId) })
    : await User.findById(userId);
  const credits = user?.credits ?? 0;

  let repos: any[] = [];
  if (isGithubUser && accessToken) {
    repos = await getUserRepos(accessToken);
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#020817] text-slate-900 dark:text-white flex items-center justify-center px-6">
      <div className="w-full max-w-4xl space-y-10 mt-10 mb-20">  
        {/* MANUAL INPUT */}      
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight max-w-2xl mx-auto">
            Analyze a Repository
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Paste a public GitHub repository link below and we'll break it down for you.
          </p>
        </div>
        <CreditsDisplay credits={credits} />
        <RepoInput />
        <DetailCards />

        {/* GITHUB USER REPO LIST */}
        {isGithubUser && (
          <div className="border-t border-slate-800 pt-10">
            <RepoList repos={repos} />
          </div>
        )}
      </div>
    </div>
  )
}
