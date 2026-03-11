"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { useState } from "react";

export default function ReadmeActions({ repoId }: { repoId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegenerate = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/readme/regenerate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoId }),
      });

      const json = await res.json();

      if (json.success) {
        const restartBtn = document.getElementById("restart-stream");
        if (restartBtn) restartBtn.click();
      } else {
        setError(json.message || "Regeneration failed.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
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

        {/* REGENERATE BUTTON */}
        <button
          onClick={handleRegenerate}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-3 rounded-xl border border-blue-500/40
                     bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 font-semibold 
                     transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
          {loading ? "Regenerating..." : "Regenerate README"}
        </button> 

        {/* ANALYZE BUTTON */}
        <button
          onClick={() => router.push("/dashboard")} 
          className="px-6 py-3 rounded-xl  hover:bg-slate-700 text-[#8D9CB1] hover:text-white font-semibold transition cursor-pointer"
        >
          Analyze another repo
        </button>      
      </div>
      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}
    </div>  
  );
}
