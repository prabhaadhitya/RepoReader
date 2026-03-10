import Link from "next/link";
import { FileQuestion, Home, LayoutDashboard } from "lucide-react";

export default function NotFound() {
  return (
    <main className="bg-[#020817] min-h-screen text-white flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-slate-800 border border-slate-700">
            <FileQuestion size={32} className="text-blue-500" />
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-6xl font-bold text-slate-700">404</p>
          <h1 className="text-2xl font-bold text-white">
            Page not found
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="flex gap-3 justify-center">
          <Link
            href="/"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 
                       hover:bg-blue-500 text-white text-sm font-medium transition"
          >
            <Home size={16} />
            Go home
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-700 
                       hover:bg-slate-800 text-white text-sm font-medium transition"
          >
            <LayoutDashboard size={16} />
            Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}