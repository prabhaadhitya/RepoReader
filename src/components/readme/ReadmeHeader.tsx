"use client";

import { useState } from "react";
import { Copy, Download, FileText, Check } from "lucide-react";

export default function ReadmeHeader({ content }: { content: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-3">
        <FileText size={26} className="text-blue-500" />
        <h1 className="text-2xl font-bold text-white">
          Generated README
        </h1>
      </div>
      <div className="flex gap-3">
        <button 
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-700 
                  bg-slate-900/50 hover:bg-slate-700 cursor-pointer transition 
                    text-sm text-white"
          onClick={async () => {
            await navigator.clipboard.writeText(content);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}          
        >
          <Copy size={16} />
          Copy
        </button>
        <button 
          className="flex items-center gap-2 px-4 py-2 rounded-xl border 
                  border-slate-700 bg-slate-900/50 hover:bg-slate-700 cursor-pointer 
                    transition text-sm text-white"
          onClick={() => {
            const blob = new Blob([content], { type: "text/markdown" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "README.md";
            a.click();
            URL.revokeObjectURL(url);
          }}          
        >
          <Download size={16} />
          Download
        </button>
      </div>      
    </div>
  );
}
