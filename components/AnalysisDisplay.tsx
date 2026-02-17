
import React from 'react';
import { GemstoneAnalysis } from '../types';

interface Props {
  data: GemstoneAnalysis;
  image: string;
}

const FlashCard: React.FC<{ title?: string; children: React.ReactNode; className?: string; icon?: string }> = ({ title, children, className = "", icon }) => (
  <div className={`bg-slate-900 border border-slate-700/50 rounded-2xl p-6 shadow-xl flex flex-col h-full hover:border-emerald-500/30 transition-all duration-300 ${className}`}>
    {title && (
      <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-3">
        {icon && <span className="text-xl">{icon}</span>}
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">{title}</h3>
      </div>
    )}
    <div className="flex-1">
      {children}
    </div>
  </div>
);

export const AnalysisDisplay: React.FC<Props> = ({ data, image }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      
      {/* Main Flashcard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* The Gemstone Flashcard (Hero) */}
        <div className="md:col-span-2 lg:col-span-1">
          <div className="bg-white rounded-[2rem] p-4 shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-500">
            <div className="aspect-square rounded-[1.5rem] overflow-hidden mb-4 bg-slate-100 flex items-center justify-center">
              <img src={image} alt="Specimen" className="w-full h-full object-cover" />
            </div>
            <div className="px-2 pb-2">
              <div className="flex justify-between items-end mb-2">
                <h2 className="text-2xl font-bold text-slate-900 leading-none">{data.identification.primary}</h2>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-100">
                  {data.identification.confidence}% CONF
                </span>
              </div>
              <p className="text-slate-500 text-sm italic mb-4">{data.identification.origin || "Unknown Origin"}</p>
              <div className="flex flex-wrap gap-1">
                {data.identification.features.slice(0, 3).map((f, i) => (
                  <span key={i} className="text-[10px] font-bold text-slate-400 uppercase border border-slate-200 px-2 py-0.5 rounded">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Visual Stats Flashcard */}
        <FlashCard title="Optical Evaluation" icon="👁️">
          <div className="space-y-4">
            <div>
              <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Color Palette</p>
              <p className="text-slate-200 text-sm leading-relaxed">{data.visualEvaluation.color}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Clarity State</p>
              <p className="text-slate-200 text-sm leading-relaxed">{data.visualEvaluation.clarity}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Architecture (Cut)</p>
              <p className="text-slate-200 text-sm leading-relaxed">{data.visualEvaluation.cut}</p>
            </div>
          </div>
        </FlashCard>

        {/* Valuation Flashcard */}
        <FlashCard title="Market Appraisal" icon="💹" className="bg-emerald-950/20 border-emerald-500/20">
          <div className="flex flex-col justify-between h-full">
            <div>
              <p className="text-[10px] text-emerald-500 uppercase font-bold mb-2">Estimated Value Range</p>
              <div className="text-3xl font-bold text-white mb-4 tabular-nums tracking-tighter">
                {data.valuation.priceRange}
              </div>
              <p className="text-emerald-100/60 text-xs leading-relaxed italic">
                {data.valuation.factors}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-emerald-500/10">
              <p className="text-[10px] text-slate-500 font-bold uppercase mb-2">Confusable Simulants</p>
              <div className="flex flex-wrap gap-2">
                {data.identification.simulants.map((s, i) => (
                  <span key={i} className="text-xs text-red-400 bg-red-400/10 px-2 py-1 rounded border border-red-400/20">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </FlashCard>

        {/* Recommendations Flashcard */}
        <FlashCard title="Laboratory Directives" icon="🧪">
          <ul className="space-y-3">
            {data.recommendations.map((r, i) => (
              <li key={i} className="flex gap-3 text-sm text-slate-300 items-start">
                <span className="text-emerald-500 mt-1">•</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </FlashCard>

        {/* Technical Warnings Flashcard */}
        <FlashCard title="Expert Disclaimers" icon="⚠️" className="md:col-span-2 lg:col-span-2 border-amber-500/20 bg-amber-500/5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="space-y-2">
               {data.warnings.map((w, i) => (
                 <p key={i} className="text-xs text-amber-200/70 italic leading-relaxed">
                   - {w}
                 </p>
               ))}
             </div>
             <div className="text-[10px] text-slate-500 border-l border-slate-800 pl-4 space-y-2">
               <p>This automated report utilizes <strong>Gemini 3 Pro Intelligence</strong> for hyper-spectral visual analysis.</p>
               <p>Accuracy depends on lighting conditions and optical resolution of the captured image.</p>
             </div>
          </div>
        </FlashCard>

      </div>

      <div className="text-center pt-12">
        <p className="text-slate-600 text-[10px] uppercase tracking-widest font-bold">
          Official Analysis Record #GE-{Math.floor(Math.random() * 1000000)}
        </p>
      </div>
    </div>
  );
};
