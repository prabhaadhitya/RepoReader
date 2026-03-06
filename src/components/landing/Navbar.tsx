"use client"

import Link from "next/link"
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Sun, Moon, LogIn, LogOut, ArrowLeft } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();

  const [theme, setTheme] = useState(false)

  const pathname = usePathname();
  const router = useRouter();

  let variant = "landing";

  if (pathname.startsWith("/dashboard")) variant = "dashboard";
  if (pathname.startsWith("/repo") || pathname.startsWith("/readme")) variant = "detail";

  return (
    // <nav className="sticky top-0 backdrop-blur bg-[#020817]/80">
    <nav className="bg-[#020817] border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          {variant === "detail" && (
            <button 
              onClick={() => router.back()}
              className="text-slate-400 hover:text-white"
            >
              <ArrowLeft size={18} />
            </button>
          )}
          <Link
            href="/"
            className="text-lg font-semibold text-white tracking-tight"
          >
            RepoReader
          </Link>               
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-6 text-sm text-slate-300">
          {/* Landing Navbar */}
          {variant === "landing" && (
            <>
              <Link href="https://github.com" target="_blank" className="hover:text-white">
                GitHub
              </Link>
              <Link href="/pricing" className="hover:text-white">
                Pricing
              </Link>
              <button 
                className="hover:text-white cursor-pointer" 
                onClick={() => setTheme((prev) => !prev)}
              >
                {theme ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {!session ? (
                <>
                  <Link
                    href="/auth/login"
                    className="flex items-center gap-2 border border-slate-700 px-4 py-1.5 rounded-lg hover:bg-slate-800"
                  >
                    <LogIn size={16} />
                    Login
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="flex items-center gap-2 bg-blue-600 px-4 py-1.5 rounded-lg hover:bg-blue-500 text-white"
                  >
                    Sign up
                  </Link>
                </>
              ) : (
                <button
                  onClick={() => signOut({ callbackUrl: "/"})}
                  className="flex items-center gap-2 border border-slate-700 px-4 py-1.5 rounded-lg hover:bg-slate-800"
                >
                  <LogOut size={16} />
                  Sign out
                </button>
              )}
            </>
          )}
          {/* Dashboard Navbar */}
          {variant === "dashboard" && (
            <>
              <button 
                className="hover:text-white cursor-pointer" 
                onClick={() => setTheme((prev) => !prev)}
              >
                {theme ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button 
                className="flex items-center gap-2 border border-slate-700 px-4 py-1.5 rounded-lg hover:bg-slate-800 cursor-pointer"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                <LogOut size={16} />
                Sign out
              </button>
            </>
          )}
          {/* Repo / Readme Pages */}
          {variant === "detail" && (
            <button 
              className="hover:text-white cursor-pointer" 
              onClick={() => setTheme((prev) => !prev)}
            >
              {theme ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}
        </div>
      </div>      
    </nav>
  )
}
