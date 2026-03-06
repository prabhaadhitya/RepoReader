"use client";

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { History, RotateCcw } from "lucide-react";

export default function VersionHistory({ repoId }: any) {
  const [versions, setVersions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [restoring, setRestoring] = useState<string | null>(null);

  const router = useRouter();
  
  const fetchVersions = () => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/readme/versions/${repoId}`)
    .then(res => res.json())
    .then(json => {
      setVersions(json.data || []);
      setLoading(false);
    });
  };
  
  useEffect(() => {
    fetchVersions();
  }, [repoId]);
  
  const handleRestore = async (versionId: string) => {
    try {
      setRestoring(versionId);

      const res = await fetch(`/api/readme/restore/${versionId}`, {
        method: "PATCH",
      });

      const json = await res.json();
      if (json.success) {
        fetchVersions();
        router.refresh();
      } else {
        alert("Restore failed: " + json.message);
      }
    } catch (err) {
      console.error("Restore failed: ", err);
      alert("Something went wrong.");
    } finally {
      setRestoring(null);
    }
  };

  return (
    <div className="border border-slate-700 rounded-2xl p-6 bg-slate-900/40 backdrop-blur space-y-6">
      {/* HEADER */}
      <div className="flex items-center gap-2">
        <History size={18} className="text-blue-500" />
        <h3 className="font-semibold text-white">
          Version History
        </h3>
      </div>

      {/* CONTENT */}
      <div className="space-y-4">
        {loading && (
          <p className="text-sm text-slate-400">Loading versions...</p>
        )}
        {!loading && versions.length === 0 && (
          <p className="text-sm text-slate-400">No versions found.</p>
        )}
        {versions.map((v: any) => {
          const isActive = v.isLatest === true;

          return (
            <div
              key={v._id}
              className={`p-4 rounded-xl transition ${
                isActive 
                  ? "border border-blue-500 bg-blue-500/10" 
                  : "bg-slate-800/50 hover:bg-slate-800"
              }`}
            >
              <div className="flex items-center justify-between">
                {/* LEFT */}
                <div>
                  <p className="text-white font-medium">
                    {v.version || "Untitled Version"}
                  </p>
                  <p className="text-xs text-slate-400">
                    {v.createdAt
                      ? new Date(v.createdAt).toLocaleString("en-GB")
                      : "Unknown time"}
                  </p>
                </div>

                {/* RIGHT */}
                {isActive ? (
                  <span className="text-xs px-3 py-1 rounded-full bg-blue-600 text-white">
                    Active
                  </span>
                ) : (
                  <button 
                    onClick={() => handleRestore(v._id)}
                    disabled={restoring === v._id}
                    className="flex items-center gap-1 text-sm text-slate-300 
                            hover:text-white cursor-pointer transition
                              disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <RotateCcw size={14} className={restoring === v._id ? "animate-spin" : ""} />
                    {restoring === v._id ? "Restoring..." : "Restore"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>      
    </div>
  );
}
