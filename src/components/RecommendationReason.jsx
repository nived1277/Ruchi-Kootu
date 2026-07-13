import React from 'react';

export default function RecommendationReason({ reasons = [] }) {
  if (!reasons || reasons.length === 0) return null;

  return (
    <div className="flex flex-col gap-1.5 mt-3 bg-[#121212]/40 border border-gold/10 p-3 rounded-xl animate-[fadeIn_300ms_ease-out]">
      <span className="text-[9px] uppercase tracking-widest text-neutral-500 font-semibold font-mono">
        Why Recommended:
      </span>
      <div className="flex flex-wrap gap-1.5 mt-1">
        {reasons.map((reason, idx) => (
          <span
            key={idx}
            className="px-2.5 py-0.5 rounded bg-gold/10 border border-gold/20 text-[9px] uppercase tracking-wider text-gold font-semibold flex items-center gap-1"
          >
            <span className="w-1 h-1 rounded-full bg-gold shrink-0"></span>
            {reason}
          </span>
        ))}
      </div>
    </div>
  );
}
