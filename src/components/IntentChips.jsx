import React from 'react';

export default function IntentChips({ parsedIntent, onClearIntent }) {
  if (!parsedIntent) return null;

  const chips = [];

  if (parsedIntent.cuisine) {
    chips.push({ label: `Cuisine: ${parsedIntent.cuisine}`, key: 'cuisine' });
  }
  if (parsedIntent.category) {
    chips.push({ label: `Category: ${parsedIntent.category}`, key: 'category' });
  }
  if (parsedIntent.budget !== null) {
    chips.push({ label: `Budget: Under ₹${parsedIntent.budget}`, key: 'budget' });
  }
  if (parsedIntent.distance !== null) {
    chips.push({ label: `Distance: Within ${parsedIntent.distance} km`, key: 'distance' });
  }
  if (parsedIntent.isOpenNow) {
    chips.push({ label: 'Open Now', key: 'isOpenNow' });
  }
  if (parsedIntent.familyFriendly) {
    chips.push({ label: 'Family Friendly', key: 'familyFriendly' });
  }
  if (parsedIntent.romantic) {
    chips.push({ label: 'Romantic', key: 'romantic' });
  }
  if (parsedIntent.workFriendly) {
    chips.push({ label: 'Quiet / Work', key: 'workFriendly' });
  }
  if (parsedIntent.outdoorSeating) {
    chips.push({ label: 'Outdoor Seating', key: 'outdoorSeating' });
  }
  if (parsedIntent.coffee) {
    chips.push({ label: 'Coffee', key: 'coffee' });
  }
  if (parsedIntent.dessert) {
    chips.push({ label: 'Dessert', key: 'dessert' });
  }

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4 animate-[fadeIn_300ms_ease-out]">
      <span className="text-[9px] uppercase tracking-widest text-neutral-500 font-semibold font-mono">
        AI Detected:
      </span>
      {chips.map(chip => (
        <span
          key={chip.key}
          className="glass-panel-gold border border-gold/30 px-3 py-1 rounded-full text-[10px] tracking-wide text-gold font-medium flex items-center gap-1.5 shadow-md"
        >
          <span className="w-1 h-1 rounded-full bg-gold animate-pulse"></span>
          {chip.label}
        </span>
      ))}
      {onClearIntent && (
        <button
          onClick={onClearIntent}
          className="text-[9px] uppercase tracking-widest text-neutral-400 hover:text-gold transition-colors duration-300 font-mono underline ml-2"
        >
          Clear AI Query
        </button>
      )}
    </div>
  );
}
