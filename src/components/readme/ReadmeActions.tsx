"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function ReadmeActions({ repoId }: any) {
  const router = useRouter();

  return (
    <div className="flex flex-wrap gap-4">
      {/* BACK BUTTON */}
      <button 
        onClick={() => router.push(`/repo/${repoId}`)} 
        className="flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-700 
                   bg-slate-900/50 hover:bg-slate-800 text-white font-semibold transition cursor-pointer"
      >
        <ArrowLeft size={18} />
        Back to overview
      </button>  

      {/* ANALYZE BUTTON */}
      <button
        onClick={() => router.push("/dashboard")} 
        className="px-6 py-3 rounded-xl  hover:bg-slate-700 text-[#8D9CB1] hover:text-white font-semibold transition cursor-pointer"
      >
        Analyze another repo
      </button>      
    </div>
  );
}
