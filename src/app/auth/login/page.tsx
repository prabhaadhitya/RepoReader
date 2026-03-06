import LoginCard from "@/components/auth/LoginCard";


export default function LoginPage() {
  return (
    <div className='min-h-screen bg-white dark:bg-[#020817] text-slate-900 dark:text-white flex items-center justify-center px-6'>
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-4">
          {/* HEADER */}
          <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold text-white">
              RepoReader
              </h1>
              <p className="text-slate-400">
              Welcome back! Sign in to continue.          
              </p>
          </div>

          {/* FORM */}
          <LoginCard />
        </div>
        <p className="text-xs text-center text-slate-600 dark:text-slate-400">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  )
}
