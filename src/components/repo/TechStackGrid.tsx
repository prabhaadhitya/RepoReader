import { Layers } from "lucide-react";

export default function TechStackGrid({ techStack }: any) {
  
  return (
    <div className="space-y-3 mb-6">
      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-3">
          <Layers size={22} className="text-blue-500" />
          <h2 className="text-xl font-semibold text-white">
            Tech Stack
          </h2>
        </div>

        <p className="text-sm text-slate-400">
          These are the main tools and technologies used in this project.
        </p>

      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {techStack?.map((tech: any) => (
          <div
            key={tech}
            className="border border-slate-700 rounded-2xl p-6 bg-slate-900/40 backdrop-blur hover:border-blue-500 transition"
          >
            <div className="flex gap-4 items-start">
              {/* ICON BADGE */}
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-slate-800 text-blue-500 font-semibold">
                {tech.name.slice(0, 2).toUpperCase()}
              </div>

              {/* CONTENT */}
              <div>
                <h3 className="text-white font-semibold mb-1">
                  {tech.name}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {tech.description}
                </p>
              </div>
            </div>          
          </div>
        ))}
      </div>
    </div>
  );
}