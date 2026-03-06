import { Lightbulb } from "lucide-react";

export default function InfoCard() {
  return (
    <div className="border border-dashed border-slate-600 rounded-2xl p-6 bg-slate-900/40 backdrop-blur">
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb size={18} className="text-yellow-400" />
        <h3 className="font-semibold text-white">
          What is a README?
        </h3>
      </div>
      <p className="text-sm text-slate-400 leading-relaxed">
        A README is a document that introduces your project. 
        It helps others (and your future self) understand what 
        the project does, how to use it, and how to contribute.
      </p>      
    </div>
  );
}
