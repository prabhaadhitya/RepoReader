"use client";

import { useEffect, useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";

const steps = [
  { message: "Fetching repository data...", duration: 5000 },
  { message: "Analyzing code structure...", duration: 8000 },
  { message: "Generating explanation...", duration: 10000 },
  { message: "Writing your README...", duration: 7000 },
  { message: "Almost done...", duration: Infinity },
];

export default function AnalyzingOverlay() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    let elapsed = 0;

    const timers = steps.slice(0, -1).map((step, index) => {
      elapsed += step.duration;
      return setTimeout(() => {
        setCurrentStep(index + 1);
      }, elapsed);
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#020817]/90 backdrop-blur-sm z-50 
                    flex items-center justify-center px-6">
      <div className="w-full max-w-md border border-slate-700 rounded-2xl 
                      p-8 bg-slate-900/90 backdrop-blur space-y-8">

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="w-14 h-14 flex items-center justify-center 
                            rounded-2xl bg-blue-500/10 border border-blue-500/30">
              <Loader2 size={28} className="text-blue-400 animate-spin" />
            </div>
          </div>
          <h2 className="text-xl font-semibold text-white">
            Analyzing Repository
          </h2>
          <p className="text-sm text-slate-400">
            This usually takes 20-30 seconds. Please don't close this page.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-3">
          {steps.map((step, index) => {
            const isDone = index < currentStep;
            const isActive = index === currentStep;

            return (
              <div
                key={index}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-500
                  ${isActive ? "bg-blue-500/10 border border-blue-500/20" : ""}
                  ${isDone ? "opacity-50" : ""}
                  ${index > currentStep ? "opacity-20" : ""}
                `}
              >
                {/* Icon */}
                <div className="shrink-0">
                  {isDone ? (
                    <CheckCircle size={18} className="text-green-400" />
                  ) : isActive ? (
                    <Loader2 size={18} className="text-blue-400 animate-spin" />
                  ) : (
                    <div className="w-4.5 h-4.5 rounded-full border border-slate-600" />
                  )}
                </div>

                {/* Text */}
                <p className={`text-sm font-medium
                  ${isActive ? "text-white" : isDone ? "text-slate-400" : "text-slate-600"}
                `}>
                  {step.message}
                </p>
              </div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-800 rounded-full h-1.5">
          <div
            className="h-1.5 bg-blue-500 rounded-full transition-all duration-1000"
            style={{ width: `${((currentStep) / (steps.length - 1)) * 100}%` }}
          />
        </div>

      </div>
    </div>
  );
}