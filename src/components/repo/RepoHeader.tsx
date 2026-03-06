export default function RepoHeader({ repository }: any) {
  return (
    <div className="space-y-4">
      {/* TITLE */}
      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-bold text-white">
          {repository.owner}/{repository.repoName}
        </h1>
        <span className="px-3 py-1 text-xs rounded-full bg-slate-800 text-slate-300 border border-slate-700">
          Public
        </span>
      </div>
      {/* SUBTITLE */}
      <p className="text-slate-400 max-w-2xl">
        Here's a beginner-friendly breakdown of this repository. 
        No jargon — just clear explanations.
      </p>
    </div>
  );
}

