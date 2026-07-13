import React from 'react';
import RuchiScoreBadge from './RuchiScoreBadge.jsx';

export default function TopPicks({ restaurants = [], onSelectRestaurant, selectedRestaurantId }) {
  // Filter top picks: ruchiScore >= 80, sorted descending, take top 3
  const topPicks = restaurants
    .filter(r => r.ruchiScore >= 80)
    .slice(0, 3);

  if (topPicks.length === 0) return null;

  return (
    <div className="flex flex-col gap-4 mb-8">
      <div className="flex items-center gap-2 border-b border-gold/10 pb-2">
        <span className="text-xs text-gold animate-pulse">✦</span>
        <h3 className="font-serif text-lg md:text-xl font-light tracking-wider text-gold-gradient">
          Today's Top Picks
        </h3>
        <span className="text-[9px] uppercase tracking-widest text-neutral-500 font-mono ml-auto">
          Premium Gastronomy Matches
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topPicks.map(rest => {
          const isSelected = selectedRestaurantId === rest.id;
          return (
            <div
              key={rest.id}
              onClick={() => onSelectRestaurant(rest)}
              className={`
                group relative rounded-xl overflow-hidden cursor-pointer
                glass-panel-gold border transition-all duration-500
                hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(212,175,55,0.08)]
                ${isSelected ? 'border-gold/60 shadow-[0_0_15px_rgba(212,175,55,0.15)] ring-1 ring-gold/20' : 'border-gold/10'}
              `}
            >
              {/* Premium Top Pick Badge */}
              <div className="absolute top-3 left-3 z-10 bg-black/80 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-gold/40 flex items-center gap-1">
                <span className="text-[8px] font-bold text-gold tracking-widest uppercase">TOP PICK</span>
              </div>

              {/* Background Image / Overlay */}
              <div className="relative h-28 w-full overflow-hidden bg-neutral-900">
                <img
                  src={rest.image}
                  alt={rest.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-transparent" />
              </div>

              {/* Card Body */}
              <div className="p-4 flex flex-col justify-between -mt-6 relative z-10 bg-gradient-to-t from-[#0A0A0A] to-transparent">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="min-w-0 flex flex-col gap-0.5">
                    <h4 className="font-serif text-sm text-neutral-100 group-hover:text-gold transition-colors duration-300 truncate font-semibold">
                      {rest.name}
                    </h4>
                    <span className="text-[9px] uppercase tracking-wider text-neutral-400">
                      {rest.cuisine}
                    </span>
                  </div>
                  <RuchiScoreBadge score={rest.ruchiScore} />
                </div>

                {/* Why Recommended reasons list */}
                {rest.ruchiReasons && rest.ruchiReasons.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {rest.ruchiReasons.map((reason, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-gold/10 border border-gold/20 text-[8px] uppercase tracking-widest text-gold font-semibold"
                      >
                        {reason}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
