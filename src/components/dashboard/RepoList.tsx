"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star, Lock, Globe } from "lucide-react";
import AnalyzingOverlay from "./AnalyzingOverlay";

type Repo = {
  id: number;
  name: string;
  fullName: string;
  description: string;
  url: string;
  language: string;
  stars: number;
  updatedAt: string;
  isPrivate: boolean;
};

export default function RepoList({ repos }: { repos: Repo[] }) {
  const router = useRouter();
  const [loadingRepo, setLoadingRepo] = useState<string | null>(null);
  const [error, setError] = useState("");
  
  const handleAnalyze = async (fullName: string) => {
    try {
      setLoadingRepo(fullName);
      setError("");

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/repo/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoUrl: `https://github.com/${fullName}` }),
      }); 

      const json = await res.json();

      if (json.success) {
        router.push(`/repo/${json.data.repository._id}`);
      } else {
        setError(json.message || "Analysis failed.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
      console.log("Error in fetching repo list: ", error);
    } finally {
      setLoadingRepo(null);
    }
  }

  if (repos.length === 0) {
    return (
      <p className="text-slate-400 text-sm">No public repositories found.</p>
    );
  }

  return (
    <div className="space-y-4">
      {/* Overlay */}
      {loadingRepo && <AnalyzingOverlay />}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Your Repositories</h2>
        <span className="text-sm text-slate-400">{repos.length} repos</span>
      </div>

      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {repos.map((repo) => (
          <div
            key={repo.id}
            className="border border-slate-700 rounded-2xl p-5 bg-slate-900/40 
                       backdrop-blur hover:border-blue-500 transition space-y-3"
          >
            {/* Top row */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                {repo.isPrivate 
                  ? <Lock size={14} className="text-slate-500 mt-0.5" /> 
                  : <Globe size={14} className="text-slate-500 mt-0.5" />
                }
                <span className="text-white font-medium text-sm truncate">
                  {repo.name}
                </span>
              </div>
              {repo.language && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 
                                 text-slate-300 border border-slate-700 shrink-0">
                  {repo.language}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 min-h-10">
              {repo.description || "No description provided."}
            </p>

            {/* Bottom row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Star size={12} />
                  {repo.stars}
                </span>
                <span>
                  {new Date(repo.updatedAt).toLocaleDateString("en-GB")}
                </span>
              </div>

              {/* Only allow analyzing public repos */}
              {repo.isPrivate ? (
                <span className="text-xs text-slate-500 italic">Private</span>
              ) : (
                <button
                  onClick={() => handleAnalyze(repo.fullName)}
                  disabled={loadingRepo === repo.fullName}
                  className="text-xs px-3 py-1.5 rounded-lg bg-blue-600 
                             hover:bg-blue-500 text-white transition 
                             disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {loadingRepo === repo.fullName ? "Analyzing..." : "Generate README →"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
