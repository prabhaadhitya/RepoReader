"use client"

import ReactMarkdown from 'react-markdown';

export default function MarkdownViewer({ content }: any) {
  return (
    <div 
      className="border border-slate-700 rounded-2xl p-8 bg-slate-900/40 
                prose prose-invert max-w-none
                prose-headings:text-white prose-p:text-slate-300
                prose-code:text-blue-300 prose-code:bg-slate-800 prose-code:px-1 prose-code:rounded
                prose-pre:bg-slate-800 prose-a:text-blue-400
                prose-ul:text-slate-300 prose-li:marker:text-blue-500"
    >
        <ReactMarkdown>{content}</ReactMarkdown>      
    </div>
  );
}
