import React, { useState } from 'react';

export default function Collections({ collections = {}, onCreateCollection, onToggleRestaurant, restaurants = [], onSelectRestaurant, onClose }) {
  const [newColName, setNewColName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newColName.trim()) return;
    onCreateCollection(newColName.trim());
    setNewColName("");
  };

  return (
    <div className="flex flex-col gap-6 animate-[fadeIn_300ms_ease-out]">
      <div className="flex flex-col gap-1.5 border-b border-gold/10 pb-4">
        <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-500 font-semibold font-mono">Dining Folders</span>
        <h4 className="font-serif text-xl text-neutral-200">Your Custom Collections</h4>
      </div>

      {/* Create New Collection Form */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input 
          type="text" 
          placeholder="New Collection Name... (e.g. Weekend Spots)"
          value={newColName}
          onChange={(e) => setNewColName(e.target.value)}
          className="flex-1 px-4 py-2.5 rounded-xl bg-black/60 border border-gold/15 text-xs text-neutral-300 placeholder-neutral-600 focus:outline-none focus:border-gold/45 transition-all font-light"
        />
        <button 
          type="submit"
          disabled={!newColName.trim()}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C9A25C] text-neutral-950 text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-40"
        >
          Create
        </button>
      </form>

      {/* List of Collections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(collections).map(([colName, restaurantIds]) => {
          const items = restaurants.filter(r => restaurantIds.includes(r.id));
          return (
            <div key={colName} className="glass-panel p-5 rounded-xl border border-gold/10 flex flex-col gap-3 relative group">
              <div className="flex justify-between items-center">
                <h5 className="text-xs font-serif font-bold text-neutral-200">{colName}</h5>
                <span className="text-[9px] font-mono text-gold px-2 py-0.5 rounded bg-gold/5 border border-gold/15">
                  {items.length} Lounges
                </span>
              </div>
              
              <div className="flex flex-col gap-1.5 mt-1.5 max-h-40 overflow-y-auto pr-1 scrollbar-thin">
                {items.length > 0 ? items.map(rest => (
                  <div 
                    key={rest.id}
                    className="text-[11px] text-neutral-400 font-light flex justify-between items-center border-b border-neutral-900/40 pb-1 hover:border-gold/10 transition-colors"
                  >
                    <span 
                      onClick={() => {
                        onSelectRestaurant(rest);
                        onClose && onClose();
                      }}
                      className="truncate pr-4 hover:text-gold cursor-pointer"
                    >
                      {rest.name}
                    </span>
                    <button 
                      onClick={() => onToggleRestaurant(colName, rest.id)}
                      className="text-[8px] uppercase tracking-wider text-neutral-600 hover:text-red-400 transition-colors ml-auto font-mono"
                    >
                      Remove
                    </button>
                  </div>
                )) : (
                  <span className="text-[10px] text-neutral-600 italic">No restaurants saved in this collection.</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
