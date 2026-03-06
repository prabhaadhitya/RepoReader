"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Github } from "lucide-react";

const examples = [
  "facebook/react",
  "vuejs/vue",
  "denoland/deno",
];

export default function RepoInput() {
  const [repoUrl, setRepoUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!repoUrl.trim()) return;

    try {
      setLoading(true);

      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/repo/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ repoUrl }),
      });

      const json = await res.json();

      if (json.success) {
        router.push(`/repo/${json.data.repository._id}`);
      } else {
        setError(json.message || "Analysis failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please check the URL and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto border-2 border-[#3F4450] bg-slate-900/40 backdrop-blur p-6 rounded-2xl space-y-6">
      <div className="flex items-center gap-2 text-slate-300 font-medium">
        <Github size={18} />
        <span>Repository URL</span>
      </div>

      <form onSubmit={handleAnalyze} className="space-y-4">
        <input
          type="text"
          placeholder="https://github.com/username/repository"
          value={repoUrl}
          onChange={(e) => {
            setRepoUrl(e.target.value);
            setError("");
          }}
          className="w-full p-3 rounded-lg bg-[#020817] border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex items-start gap-2 text-sm text-slate-400">
          <span className="mt-0.5">ⓘ</span>
          <p>
            A repository URL is the web address of a GitHub project.
            Go to any project on{" "}
            <a href="https://github.com/" target="_blank"><span className="text-blue-500 cursor-pointer">github.com</span></a>, copy the URL
            from your browser, and paste it here.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-11 rounded-lg text-black bg-blue-600 cursor-pointer hover:bg-blue-500 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Analyzing..." : "Generate README →"}
        </button>
        {error && (
          <p className="text-red-400 text-sm text-center">{error}</p>
        )}
      </form>

      <div className="border-t border-slate-700 my-4" />

      <div className="space-y-3" >
        <p className="text-sm text-slate-400">Try an example:</p>
        <div className="flex flex-wrap gap-3">
          {examples.map((repo) => (
            <button 
              key={repo} type="button" onClick={() => setRepoUrl(`https://github.com/${repo}`)}
              className="px-4 py-2 text-sm rounded-full bg-slate-800 hover:bg-slate-700 transition cursor-pointer"
            >
              {repo}
            </button>
          ))}
        </div>        
      </div>
    </div>
  );
}