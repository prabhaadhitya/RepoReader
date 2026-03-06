"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Github, Mail, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function SignupCard() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const json = await res.json();

      if (res.ok) {
        await signIn("credentials", {
          email,
          password,
          callbackUrl: "/dashboard",
        });
      } else {
        setError(json.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
      console.log("Error in signup: ", error)
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form 
      onSubmit={handleSignup}
      className="border border-slate-700 rounded-2xl p-8 bg-slate-900/40 backdrop-blur space-y-6"
    >
      <div className="text-center space-y-2">
        <h2 className="text-xl font-semibold text-white">
          Sign up
        </h2>
        <p className="text-sm text-slate-400">
          We only read public repositories — your code stays safe.
        </p>
      </div>
      {/* GITHUB BTN */}
      <button
        type="button" 
        className="w-full flex items-center justify-center gap-2 
                  border border-slate-700 rounded-xl py-3 cursor-pointer
                  text-white hover:bg-slate-800 transition"
        onClick={() => signIn("github", { callbackUrl: "/dashboard" })}          
       >
        <Github size={18} />
        Continue with GitHub
      </button>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="flex-1 border-t border-slate-700"></div>
        <span className="text-xs text-slate-500">or</span>
        <div className="flex-1 border-t border-slate-700"></div>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-slate-300">Email</label>
        <div className="relative">
          <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#020817] border border-slate-700 
                      rounded-xl py-3 pl-10 pr-4 text-white
                      focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-slate-300">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#020817] border border-slate-700 
                      rounded-xl py-3 px-4 text-white
                      focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition"
          >
            {showPassword ? <EyeOff size={16} className="cursor-pointer" /> : <Eye size={16} className="cursor-pointer" />}
          </button>
        </div>
      </div>

      <button 
        className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl 
                  font-medium transition cursor-pointer disabled:opacity-50 
                  disabled:cursor-not-allowed"
        type="submit"
        disabled={loading}
      >
        {loading ? "Creating account..." : "Create account"}
      </button>
      {error && (
        <p className="text-red-400 text-sm text-center">{error}</p>
      )}

      <p className="text-sm text-center text-slate-400">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-blue-500 hover:underline cursor-pointer">
          Sign in
        </Link>
      </p>
    </form>
  )
}
