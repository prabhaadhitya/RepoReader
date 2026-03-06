"use client";

function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-[#020817] py-8">
        {/* className="border-t border-slate-800 bg-[#020817] py-8 shadow-[0_-10px_30px_-10px_rgba(59,130,246,0.2)]" */}
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="text-sm text-slate-400">
          © {new Date().getFullYear()} RepoReader. Built for developers.
        </p>
      </div>
    </footer>
  );
}

export default Footer;