"use client";

import { useRouter, usePathname } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", path: "/dashboard"}
  ]
  return (
    <aside className="w-64 bg-white border-r p-6">
      <h1 className="text-xl font-bold mb-8">
        RepoReader
      </h1>

      <nav className="space-y-3">
        {navItems.map((item) => (
          <button 
            key={item.path} 
            onClick={() => router.push(item.path)}
            className={`block w-full text-left px-3 py-2 rounded 
              ${pathname === item.path ? "bg-black text-white" : "hover:bg-gray-100"}`}
          >
            {item.name}
          </button>
        ))}
      </nav>
      
    </aside>
  )
}
