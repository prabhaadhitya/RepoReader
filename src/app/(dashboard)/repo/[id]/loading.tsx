export default function Loading() {
  return (
    <main className="bg-[#020817] text-white min-h-screen">

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-10 animate-pulse">

        {/* Repo Header */}
        <div className="space-y-3">
          <div className="h-6 w-64 bg-slate-800 rounded"></div>
          <div className="h-4 w-96 bg-slate-800 rounded"></div>
        </div>

        {/* Explanation Cards */}
        <div className="space-y-4">
          <div className="h-28 bg-slate-800 rounded-xl"></div>
          <div className="h-28 bg-slate-800 rounded-xl"></div>
          <div className="h-40 bg-slate-800 rounded-xl"></div>
        </div>

        {/* Tech Stack */}
        <div className="space-y-4">
          <div className="h-6 w-32 bg-slate-800 rounded"></div>

          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-20 bg-slate-800 rounded-xl"
              />
            ))}
          </div>
        </div>

        {/* Folder Structure */}
        <div className="space-y-4">
          <div className="h-6 w-40 bg-slate-800 rounded"></div>
          <div className="h-48 bg-slate-800 rounded-xl"></div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <div className="h-10 w-48 bg-slate-800 rounded"></div>
          <div className="h-10 w-48 bg-slate-800 rounded"></div>
        </div>

      </div>

    </main>
  );
}