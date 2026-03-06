"use client";

function UsingSteps() {
  return (
    <section className="py-20 px-6 bg-[#020817]">
      <div className="max-w-5xl mx-auto">
        {/* CARDS */}
        <div className="grid gap-8 md:grid-cols-3">

          {/* STEP-1 */}
          <div className="border border-slate-700 rounded-2xl p-8 bg-slate-900/40 backdrop-blur hover:border-blue-500 transition">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800 text-blue-500 font-semibold mb-6">
              1
            </div>
            <h3 className="text-lg font-semibold text-white mb-3">
              Paste Repo
            </h3>
            <p className="text-slate-400 leading-relaxed">
              Simply copy & paste the URL of any public GitHub repository.
            </p>
          </div>

          {/* STEP-2 */}
          <div className="border border-slate-700 rounded-2xl p-8 bg-slate-900/40 backdrop-blur hover:border-blue-500 transition">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800 text-blue-500 font-semibold mb-6">
              2
            </div>
            <h3 className="text-lg font-semibold text-white mb-3">
              Understand Project
            </h3>
            <p className="text-slate-400 leading-relaxed">
              Get a clear breakdown of what the project does and how it works.
            </p>
          </div>

          {/* STEP-3 */}
          <div className="border border-slate-700 rounded-2xl p-8 bg-slate-900/40 backdrop-blur hover:border-blue-500 transition">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800 text-blue-500 font-semibold mb-6">
              3
            </div>
            <h3 className="text-lg font-semibold text-white mb-3">
              Generate README
            </h3>
            <p className="text-slate-400 leading-relaxed">
              Create a beautiful, comprehensive README for your own projects.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default UsingSteps;