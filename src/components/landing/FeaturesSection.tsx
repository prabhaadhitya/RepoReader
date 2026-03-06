"use client"

import { Code2, BookOpen, Sparkles } from "lucide-react";

function FeaturesSection() {
  return (
    <section className="bg-[#0A1222] p-15">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* HEADER */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Why use our tool?
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            We bridge the gap between complex code and clear understanding,
            helping you <br /> learn faster.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">          
          {/* CARD-1 */}
          <div className="border border-slate-700 rounded-2xl p-8 bg-slate-900/40 backdrop-blur hover:border-blue-500 transition">
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-slate-800 mb-6">
              <Code2 size={22} className="text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              Code Analysis
            </h3>
            <p className="text-slate-400 leading-relaxed">
              We analyze the codebase structure and dependencies to explain
              technical details in plain English.
            </p>
          </div>

          {/* CARD-2 */}
          <div className="border border-slate-700 rounded-2xl p-8 bg-slate-900/40 backdrop-blur hover:border-blue-500 transition">
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-slate-800 mb-6">
              <BookOpen size={22} className="text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              Documentation Generation
            </h3>
            <p className="text-slate-400 leading-relaxed">
              Automatically generate installation guides, usage examples,
              and contribution guidelines.
            </p>
          </div>
          
          {/* CARD-3 */}
          <div className="border border-slate-700 rounded-2xl p-8 bg-slate-900/40 backdrop-blur hover:border-blue-500 transition">
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-slate-800 mb-6">
              <Sparkles size={22} className="text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">
              Beginner Friendly
            </h3>
            <p className="text-slate-400 leading-relaxed">
              Technical jargon is explained simply, making it perfect
              for students and junior developers.
            </p>
          </div>
        </div>

      </div>      
    </section>
  )
}

export default FeaturesSection
