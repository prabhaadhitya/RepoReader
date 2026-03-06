"use client";

import { useState } from "react";
import { Folder, FolderOpen, File, ChevronRight, Info } from "lucide-react";

function TreeItem({ item, level = 0 }: any) {
  const [open, setOpen] = useState(level === 0);
  const isFolder = item.type === "folder";

  return (
    <div>
      {/* Row */}
      <div
        onClick={() => isFolder && setOpen(!open)}
        className="relative flex items-center justify-between py-2 pr-3 
                   cursor-pointer group rounded-md transition-all duration-200
                   hover:bg-slate-800/50"
        style={{ paddingLeft: `${level * 18 + 14}px` }}
      >
        <div className="flex items-center gap-2 text-sm text-slate-200">

          {/* Chevron */}
          {isFolder ? (
            <ChevronRight
              size={16}
              className={`transition-transform duration-200 text-slate-400 ${
                open ? "rotate-90" : ""
              }`}
            />
          ) : (
            <span className="w-4" />
          )}

          {/* Folder / File Icon */}
          {isFolder ? (
            open ? (
              <FolderOpen size={16} className="text-blue-500" />
            ) : (
              <Folder size={16} className="text-blue-500" />
            )
          ) : (
            <File size={16} className="text-slate-400" />
          )}

          {/* Name */}
          <span>{item.name}</span>
        </div>

        {/* Info Icon + Tooltip */}
        <div
          className="relative group/info"
          onClick={(e) => e.stopPropagation()}
        >
          <Info
            size={14}
            className="text-slate-500 opacity-0 group-hover:opacity-100 
                       transition-all duration-200 hover:text-blue-400"
          />

          {/* Tooltip */}
          <div
            className="absolute right-8 top-1/2 -translate-y-1/2 w-72 p-4 rounded-xl text-sm leading-relaxed
                       bg-[#0B1220] border border-slate-600 text-slate-300
                       shadow-2xl opacity-0 pointer-events-none group-hover/info:opacity-100
                       transition-all duration-200 z-50"
          >
            {item.description || "No description available."}
          </div>
        </div>
      </div>

      {/* Children */}
      {isFolder && open && item.children && (
        <div className="ml-4 border-l border-slate-800">
          {item.children.map((child: any) => (
            <TreeItem
              key={child.name}
              item={child}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TreeItem