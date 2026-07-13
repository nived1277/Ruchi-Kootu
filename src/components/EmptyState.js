import React from 'react';
import htm from 'htm';

const html = htm.bind(React.createElement);

export default function EmptyState({ onReset, searchRadius }) {
  return html`
    <div className="glass-panel p-12 rounded-2xl border border-gold/10 text-center flex flex-col items-center gap-6 animate-[fadeInUp_500ms_ease-out] max-w-lg mx-auto">
      <!-- Premium Gold Animated Illustration -->
      <div className="relative w-24 h-24 flex items-center justify-center">
        <!-- Outer pulsing golden rings -->
        <span className="absolute inline-flex w-full h-full rounded-full bg-[#D4AF37]/10 opacity-70 animate-ping"></span>
        <span className="absolute inline-flex w-3/4 h-3/4 rounded-full bg-[#D4AF37]/5 border border-[#D4AF37]/20 animate-pulse"></span>
        
        <!-- Premium Stylized Radar Map SVG -->
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          className="w-12 h-12 text-gold relative z-10 animate-[spin_8s_linear_infinite]"
        >
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeDasharray="3 3" />
          <circle cx="12" cy="12" r="6" stroke="currentColor" />
          <circle cx="12" cy="12" r="2" fill="currentColor" className="text-gold" />
          <line x1="12" y1="2" x2="12" y2="22" stroke="currentColor" strokeDasharray="1 3" />
          <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" strokeDasharray="1 3" />
        </svg>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-serif text-2xl font-light text-neutral-200 tracking-wide">
          No nearby restaurants found in this area.
        </h3>
        <p className="text-xs text-neutral-500 max-w-md leading-relaxed">
          Our concierge search inside the current ${searchRadius / 1000} km matrix returned no gastronomy options. Try resetting your search parameters, widening the radius, or exploring a new destination.
        </p>
      </div>

      ${onReset && html`
        <button 
          onClick=${onReset} 
          className="px-6 py-2.5 rounded-full bg-gold/10 hover:bg-gold/20 border border-gold/30 hover:border-gold/60 text-gold text-[10px] uppercase tracking-widest font-semibold transition-all duration-300 hover:scale-105"
        >
          Reset Search Parameters
        </button>
      `}
    </div>
  `;
}
