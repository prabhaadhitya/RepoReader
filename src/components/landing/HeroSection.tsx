"use client"

export default function HeroSection() {
  return (
    <section className="bg-[#020817] text-white pt-28 pb-15 px-6 text-center">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* TOP BADGE */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
                        bg-slate-800/60 border border-slate-700 text-sm text-slate-300">
          <span className="w-2 h-2 bg-green-500 rounded-full" />
          Simplifying Open Source for Everyone
        </div>

        {/* MAIN HEADING */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight">
          <span className="block text-slate-200">
            Understand any GitHub repo
          </span>
          <span className="block text-blue-500">
            in under 30 seconds
          </span>
        </h1>

        {/* SUBTITLE */}
        <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
          Don't let complex codebases intimidate you. Paste a repository URL
          and get a clear, beginner-friendly explanation instantly.
        </p>
      </div>
    </section>
  );
}