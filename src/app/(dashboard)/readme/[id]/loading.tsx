export default function Loading() {
  return (
    <main className="bg-[#020817] min-h-screen text-white">

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-8 animate-pulse">

        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div className="h-6 w-48 bg-slate-800 rounded"></div>

          <div className="flex gap-3">
            <div className="h-8 w-20 bg-slate-800 rounded"></div>
            <div className="h-8 w-24 bg-slate-800 rounded"></div>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-4">

            <div className="h-6 w-40 bg-slate-800 rounded"></div>

            <div className="space-y-3">
              <div className="h-4 w-full bg-slate-800 rounded"></div>
              <div className="h-4 w-full bg-slate-800 rounded"></div>
              <div className="h-4 w-5/6 bg-slate-800 rounded"></div>
            </div>

            <div className="h-40 bg-slate-800 rounded-xl"></div>

            <div className="space-y-3">
              <div className="h-4 w-full bg-slate-800 rounded"></div>
              <div className="h-4 w-5/6 bg-slate-800 rounded"></div>
            </div>

          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-6">

            {/* VERSION HISTORY */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
              <div className="h-4 w-32 bg-slate-800 rounded"></div>

              <div className="space-y-2">
                <div className="h-10 bg-slate-800 rounded"></div>
                <div className="h-10 bg-slate-800 rounded"></div>
                <div className="h-10 bg-slate-800 rounded"></div>
              </div>
            </div>

            {/* INFO CARD */}
            <div className="border border-dashed border-slate-800 rounded-xl p-4 space-y-2">
              <div className="h-4 w-40 bg-slate-800 rounded"></div>
              <div className="h-3 w-full bg-slate-800 rounded"></div>
              <div className="h-3 w-5/6 bg-slate-800 rounded"></div>
            </div>

          </div>

        </div>

        {/* BOTTOM ACTIONS */}
        <div className="flex gap-4">
          <div className="h-10 w-40 bg-slate-800 rounded"></div>
          <div className="h-10 w-40 bg-slate-800 rounded"></div>
        </div>

      </div>

    </main>
  );
}