import React from 'react';

export default function AIResponse({ intent, source = 'offline' }) {
  if (!intent) return null;

  const points = [];
  if (intent.category) points.push(intent.category);
  if (intent.cuisine) points.push(intent.cuisine);
  if (intent.budget) points.push(`Under ₹${intent.budget}`);
  if (intent.distance) points.push(`Within ${intent.distance} km`);
  if (intent.isOpenNow) points.push("Open Now");
  if (intent.romantic) points.push("Romantic");
  if (intent.familyFriendly) points.push("Family Friendly");
  if (intent.workFriendly) points.push("Work Friendly");
  if (intent.outdoorSeating) points.push("Outdoor Seating");
  if (intent.coffee) points.push("Coffee");
  if (intent.dessert) points.push("Desserts");
  
  if (intent.keywords && intent.keywords.length > 0) {
    intent.keywords.forEach(k => {
      const cap = k.charAt(0).toUpperCase() + k.slice(1);
      if (!points.includes(cap)) {
        points.push(cap);
      }
    });
  }

  if (points.length === 0) return null;

  return (
    <div className="flex flex-col gap-2 p-4 glass-panel-gold border border-gold/15 rounded-xl bg-black/40 shadow-lg animate-[fadeIn_300ms_ease-out]">
      <div className="flex items-center justify-between">
        <span className="text-[9px] uppercase tracking-widest text-neutral-500 font-semibold font-mono">
          AI Understood:
        </span>
        <span className="text-[8px] uppercase tracking-widest px-2 py-0.5 rounded bg-gold/10 border border-gold/30 text-gold font-mono">
          {source === 'gemini' ? 'Gemini Engine' : 'Offline Engine'}
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5 mt-1">
        {points.map((point, idx) => (
          <span 
            key={idx}
            className="px-2.5 py-0.5 rounded-full bg-gold/5 border border-gold/20 text-[10px] text-neutral-300 font-medium flex items-center gap-1.5"
          >
            <span className="w-1 h-1 rounded-full bg-gold"></span>
            {point}
          </span>
        ))}
      </div>
    </div>
  );
}
