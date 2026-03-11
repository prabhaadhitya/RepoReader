"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export default function StreamingReadme({ repoId }: { repoId: string }) {
  const [content, setContent] = useState("");
  const [streaming, setStreaming] = useState(true);
  const [error, setError] = useState("");
  const [streamKey, setStreamKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setContent("");
    setStreaming(true);
    setError("");

    async function startStream() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/repo/stream?repoId=${repoId}&t=${Date.now()}`
        );

        if (!res.ok || !res.body) {
          setError("Failed to load README.");
          setStreaming(false);
          return;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done || cancelled) break;
          const chunk = decoder.decode(value, { stream: true });
          setContent((prev) => prev + chunk);
        }
      } catch (err) {
        if (!cancelled) {
          setError("Something went wrong while streaming.");
          console.log(err)
        }
      } finally {
        if (!cancelled) setStreaming(false);
      }
    }

    startStream();

    return () => {
      cancelled = true;
    };
  }, [repoId, streamKey]);

  if (error) {
    return (
      <div className="border border-red-500/30 rounded-2xl p-8 bg-red-500/10 text-red-400 text-sm">
        {error}
      </div>
    );
  }

  return (
    <div className="border border-slate-700 rounded-2xl p-8 bg-slate-900/40 min-h-48">
      {content === "" && streaming && (
        <div className="flex items-center gap-3 text-slate-400 text-sm">
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
          Generating your README...
        </div>
      )}

      {content && (
        <div
          className="prose prose-invert max-w-none
                     prose-headings:text-white prose-p:text-slate-300
                     prose-code:text-blue-300 prose-code:bg-slate-800 
                     prose-code:px-1 prose-code:rounded
                     prose-pre:bg-slate-800 prose-a:text-blue-400
                     prose-ul:text-slate-300 prose-li:marker:text-blue-500"
        >
          <ReactMarkdown>{content}</ReactMarkdown>
          {streaming && (
            <span className="inline-block w-2 h-4 bg-blue-400 ml-1 animate-pulse rounded-sm" />
          )}
        </div>
      )}

      {/* Hidden trigger to restart stream */}
      <button
        id="restart-stream"
        className="hidden"
        onClick={() => setStreamKey((k) => k + 1)}
      />
    </div>
  );
}