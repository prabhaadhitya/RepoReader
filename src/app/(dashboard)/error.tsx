"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, RefreshCw, LayoutDashboard } from "lucide-react";

export default function DashboardError({
    error,
    reset,
  }: {
    error: Error & { digest?: string };
    reset: () => void;
  }) {
    useEffect(() => {
      console.error("Dashboard error:", error);
    }, [error]);

    const router = useRouter();

  return (
    <main className="bg-[#020817] min-h-screen text-white flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-red-500/10 border border-red-500/30">
            <AlertTriangle size={32} className="text-red-400" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-white">
            Something went wrong
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            An error occurred while loading this page. Try again or go back to your dashboard.
          </p>
          {error?.message && (
            <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2 mt-2">
              {error.message}
            </p>
          )}
        </div>

        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 
                       hover:bg-blue-500 text-white text-sm font-medium transition cursor-pointer"
          >
            <RefreshCw size={16} />
            Try again
          </button>
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-700 
                       hover:bg-slate-800 text-white text-sm font-medium transition cursor-pointer"
          >
            <LayoutDashboard size={16} />
            Go to dashboard
          </button>
        </div>
      </div>
    </main>
  )
}
