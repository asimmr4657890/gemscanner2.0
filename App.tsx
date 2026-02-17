
import React, { useState, useRef, useCallback } from 'react';
import { analyzeGemstone } from './services/geminiService';
import { AnalysisState } from './types';
import { GemstoneIcon } from './components/GemstoneIcon';
import { AnalysisDisplay } from './components/AnalysisDisplay';

const App: React.FC = () => {
  const [state, setState] = useState<AnalysisState>({
    loading: false,
    result: null,
    error: null,
    image: null,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setState(prev => ({ ...prev, image: reader.result as string, error: null, result: null }));
      };
      reader.readAsDataURL(file);
    }
  };

  const startAnalysis = async () => {
    if (!state.image) return;

    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const result = await analyzeGemstone(state.image);
      setState(prev => ({ ...prev, loading: false, result }));
    } catch (err: any) {
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: err.message || "An unexpected error occurred during analysis." 
      }));
    }
  };

  const reset = () => {
    setState({
      loading: false,
      result: null,
      error: null,
      image: null,
    });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 pb-20">
      {/* Navbar */}
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={reset}>
            <GemstoneIcon className="w-8 h-8 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span className="font-bold text-xl tracking-tight text-white italic">GemEye</span>
          </div>
          <div className="hidden md:flex gap-6 text-[10px] font-bold uppercase tracking-widest text-slate-500">
            <span className="hover:text-emerald-400 cursor-help transition-colors">Vision Pro</span>
            <span className="hover:text-emerald-400 cursor-help transition-colors">Market Data</span>
            <span className="hover:text-emerald-400 cursor-help transition-colors">Vault</span>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        {!state.result && !state.loading && (
          <div className="text-center mb-16 animate-in fade-in slide-in-from-top-4 duration-1000">
            <h1 className="text-5xl md:text-8xl font-bold text-white mb-6 leading-tight tracking-tighter">
              The AI <span className="text-emerald-400 italic">Gemologist</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10">
              Expert-level visual identification and market valuation powered by advanced neural analysis.
            </p>
          </div>
        )}

        {/* Action Area */}
        <div className="flex flex-col items-center">
          {!state.image && (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="w-full max-w-2xl aspect-[4/3] border-2 border-dashed border-slate-700 rounded-[3rem] flex flex-col items-center justify-center bg-slate-800/10 hover:bg-slate-800/30 hover:border-emerald-500/50 transition-all cursor-pointer group shadow-2xl"
            >
              <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6 group-hover:bg-emerald-500/10 transition-colors">
                <svg className="w-10 h-10 text-slate-500 group-hover:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </div>
              <p className="text-xl font-bold text-slate-300 tracking-tight">Drop specimen image</p>
              <p className="text-slate-500 text-xs mt-2 uppercase tracking-widest font-bold">Analysis via Gemini 3 Pro</p>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleImageUpload} 
              />
            </div>
          )}

          {state.image && !state.result && !state.loading && (
            <div className="w-full max-w-xl animate-in fade-in zoom-in-95 duration-500">
              <div className="bg-white p-6 rounded-[2.5rem] shadow-2xl mb-10 transform -rotate-1">
                <div className="aspect-square rounded-[2rem] overflow-hidden mb-4 bg-slate-50">
                  <img src={state.image} alt="Target specimen" className="w-full h-full object-contain" />
                </div>
                <div className="flex justify-between items-center px-2">
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Awaiting Verification</p>
                   <button onClick={reset} className="text-slate-400 hover:text-red-500 transition-colors">
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                   </button>
                </div>
              </div>
              <button 
                onClick={startAnalysis}
                className="w-full py-6 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-3xl shadow-2xl shadow-emerald-900/30 transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-4 text-xl uppercase tracking-widest"
              >
                Start Lab Analysis
              </button>
            </div>
          )}

          {state.loading && (
            <div className="flex flex-col items-center py-20 text-center">
              <div className="relative mb-12">
                <div className="w-32 h-32 border-[6px] border-emerald-500/10 border-t-emerald-500 rounded-full animate-spin"></div>
                <GemstoneIcon className="w-12 h-12 text-emerald-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <p className="text-3xl font-bold text-white mb-2 italic">Scanning Lattice Structure</p>
              <p className="text-slate-500 uppercase tracking-widest text-[10px] font-black">Refracting Light & Evaluating Purity</p>
            </div>
          )}

          {state.error && (
            <div className="w-full max-w-2xl bg-red-950/20 border border-red-500/20 p-8 rounded-[2rem] flex flex-col items-center gap-4 text-center animate-in shake duration-500">
               <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-2">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
               </div>
               <h4 className="text-xl font-bold text-red-400">Analysis Failed</h4>
               <p className="text-red-200/50 max-w-sm italic">{state.error}</p>
               <button 
                  onClick={reset}
                  className="mt-4 px-8 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-bold uppercase tracking-widest rounded-full transition-all border border-red-500/20"
                >
                  Clear and Retry
                </button>
            </div>
          )}

          {state.result && state.image && (
            <div className="w-full">
              <AnalysisDisplay data={state.result} image={state.image} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
