import { Zap } from "lucide-react";

export default function CreditsDisplay({ credits }: { credits: number }) {
  const total = 3;

  if (credits <= 0) {
    return (
      <div className="border border-red-500/40 bg-red-500/10 rounded-2xl p-5 space-y-2">
        <div className="flex items-center gap-2">
          <Zap size={18} className="text-red-400" />
          <p className="text-white font-semibold">No analyses remaining</p>
        </div>
        <p className="text-sm text-slate-400">
          You've used all {total} of your free analyses.
        </p>
      </div>
    );
  }

  return (
    <div className={`border rounded-2xl p-5 space-y-3 
      ${credits === 1 
        ? "border-yellow-500/40 bg-yellow-500/10" 
        : "border-slate-700 bg-slate-900/40"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap size={18} className={credits === 1 ? "text-yellow-400" : "text-blue-500"} />
          <p className="text-white font-semibold">Analyses remaining</p>
        </div>
        <span className={`text-sm font-bold px-3 py-1 rounded-full 
          ${credits === 1 
            ? "bg-yellow-500/20 text-yellow-400" 
            : "bg-blue-500/20 text-blue-400"
          }`}
        >
          {credits} / {total}
        </span>
      </div>

      <div className="w-full bg-slate-800 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-500
            ${credits === 1 ? "bg-yellow-400" : "bg-blue-500"}`}
          style={{ width: `${(credits / total) * 100}%` }}
        />
      </div>

      {credits === 1 && (
        <p className="text-xs text-yellow-400">
          Last analysis remaining — use it wisely!
        </p>
      )}
    </div>
  );
}