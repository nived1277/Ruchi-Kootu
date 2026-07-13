import React, { useEffect, useState } from 'react';

export default function RuchiScoreBadge({ score }) {
  const [dashOffset, setDashOffset] = useState(94.2); // 2 * PI * 15 = 94.2 (full circle offset)

  useEffect(() => {
    // Trigger progress sweep animation after mount
    const timer = setTimeout(() => {
      const targetOffset = 94.2 - (94.2 * score) / 100;
      setDashOffset(targetOffset);
    }, 100);
    return () => clearTimeout(timer);
  }, [score]);

  // Premium colors based on Ruchi Score thresholds
  const getScoreColor = (s) => {
    if (s >= 90) return '#D4AF37'; // Gold
    if (s >= 75) return '#10B981'; // Green
    if (s >= 60) return '#F59E0B'; // Orange
    return '#EF4444'; // Red
  };

  const scoreColor = getScoreColor(score);

  return (
    <div className="relative w-12 h-12 flex items-center justify-center shrink-0 group/badge transition-transform duration-500 hover:scale-110">
      {/* Outer Golden Glow animation on hover */}
      <div 
        className="absolute inset-0 rounded-full opacity-0 group-hover/badge:opacity-30 transition-opacity duration-700 pointer-events-none"
        style={{
          boxShadow: `0 0 14px 4px ${scoreColor}`,
          background: `radial-gradient(circle, ${scoreColor}10 0%, transparent 70%)`
        }}
      />
      
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
        <circle 
          cx="18" 
          cy="18" 
          r="15" 
          fill="none" 
          stroke="rgba(255,255,255,0.05)" 
          strokeWidth="2.5" 
        />
        <circle 
          cx="18" 
          cy="18" 
          r="15" 
          fill="none" 
          stroke={scoreColor} 
          strokeWidth="2.5" 
          strokeDasharray="94.2" 
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
          style={{
            filter: `drop-shadow(0 0 2px ${scoreColor})`
          }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-[11px] font-mono font-bold" style={{ color: scoreColor }}>
          {score}
        </span>
        <span className="text-[5px] tracking-widest uppercase font-semibold text-neutral-500 font-sans -mt-0.5">RUCHI</span>
      </div>
    </div>
  );
}
