"use client";

import { useRouter } from "next/navigation";
import { FileText } from "lucide-react";

export default function RepoActions({ repoId }: any) {
  const router = useRouter();

  return (
    <div className="flex flex-wrap gap-4">
      
      <button
        onClick={() => router.push(`/readme/${repoId}`)}
        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 cursor-pointer hover:bg-blue-500
                   transition-all duration-200 text-black font-medium"
      >
        <FileText size={18} />
        View generated README
      </button>

      <button
        onClick={() => router.push("/dashboard")}
        className="px-6 py-3 rounded-xl border border-slate-700 bg-transparent cursor-pointer hover:bg-slate-800
                   transition-all duration-200 text-white font-medium"
      >
        Analyze another repo
      </button>
    </div>
  );
}