import React from 'react';

export default function AIThinking() {
  return (
    <div className="flex items-center justify-center gap-3 p-5 glass-panel-gold border border-gold/20 rounded-xl bg-black/60 shadow-xl max-w-sm mx-auto animate-[fadeIn_300ms_ease-out]">
      <div className="relative w-8 h-8 shrink-0">
        <span className="absolute inset-0 rounded-full border border-gold/30 animate-ping"></span>
        <div className="w-full h-full border-2 border-gold/20 border-t-gold rounded-full animate-spin" />
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-serif italic text-gold-gradient font-semibold">Ruchi AI Concierge</span>
        <span className="text-[9px] uppercase tracking-widest text-neutral-500 font-mono mt-0.5 animate-pulse">
          Consulting Gastronomy Grid...
        </span>
      </div>
    </div>
  );
}
