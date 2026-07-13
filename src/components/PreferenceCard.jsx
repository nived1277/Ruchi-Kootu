import React from 'react';

export default function PreferenceCard({ title, score, percentage, icon }) {
  return (
    <div className="glass-panel p-4 rounded-xl border border-gold/10 flex flex-col gap-2 relative overflow-hidden group hover:border-gold/30 transition-all duration-300">
      <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity text-gold text-lg">
        {icon || "✦"}
      </div>
      <span className="text-[9px] uppercase tracking-wider text-neutral-500 font-semibold font-mono">
        {title}
      </span>
      <div className="flex items-baseline gap-2 mt-1">
        <span className="text-xl font-serif text-gold-gradient font-bold">+{score}</span>
        {percentage !== undefined && (
          <span className="text-[10px] text-neutral-400 font-mono">({percentage}%)</span>
        )}
      </div>
      {percentage !== undefined && (
        <div className="w-full bg-neutral-900 h-1 rounded-full overflow-hidden mt-1.5">
          <div 
            className="bg-gradient-to-r from-[#C9A25C] to-[#D4AF37] h-full rounded-full transition-all duration-1000"
            style={{ width: `${percentage}%` }}
          />
        </div>
      )}
    </div>
  );
}
