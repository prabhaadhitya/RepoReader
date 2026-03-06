"use client";

import { Sparkles, Users, FileText, CheckCircle } from "lucide-react";

export default function ExplanationCards({ explanation }: any) {
  return (
    <div className="space-y-6">

      {/* WHAT THIS PROJECT DOES */}
      <div className="border border-slate-700 rounded-2xl p-6 bg-slate-900/40 backdrop-blur">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={18} className="text-blue-500" />
          <h2 className="font-semibold text-white">
            What this project does
          </h2>
        </div>
        <p className="text-slate-400 leading-relaxed">
          {explanation.what}
        </p>
      </div>

      {/* WHO IT's FOR */}
      <div className="border border-slate-700 rounded-2xl p-6 bg-slate-900/40 backdrop-blur">
        <div className="flex items-center gap-2 mb-3">
          <Users size={18} className="text-blue-500" />
          <h2 className="font-semibold text-white">
            Who it's for
          </h2>
        </div>
        <p className="text-slate-400 leading-relaxed">
          {explanation.who}
        </p>
      </div>

      {/* MAIN FEATURES */}
      <div className="border border-slate-700 rounded-2xl p-6 bg-slate-900/40 backdrop-blur">
        <div className="flex items-center gap-2 mb-4">
          <FileText size={18} className="text-blue-500" />
          <h2 className="font-semibold text-white">
            Main features
          </h2>
        </div>
        <ul className="space-y-3">
          {explanation.features?.map((feature: string, index: number) => (
            <li key={index} className="flex items-start gap-3 text-slate-400">
              <CheckCircle
                size={18}
                className="text-green-500 mt-0.5"
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>  

    </div>
  );
}