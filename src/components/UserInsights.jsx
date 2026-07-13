import React from 'react';
import PreferenceCard from './PreferenceCard.jsx';

export default function UserInsights({ preferences = {}, restaurants = [], onSelectRestaurant, onCloseProfile }) {
  const cuisines = preferences.cuisines || {};
  const categories = preferences.categories || {};
  const diningTimes = preferences.diningTimes || {};
  const budgets = preferences.budgets || {};
  const distances = preferences.distances || {};
  const searchHistory = preferences.searchHistory || [];

  // Helper to find key with max score
  const getMaxKey = (obj) => {
    let maxK = "None";
    let maxV = -1;
    Object.entries(obj).forEach(([k, v]) => {
      if (v > maxV && v > 0) {
        maxV = v;
        maxK = k;
      }
    });
    return maxK;
  };

  const favoriteCuisine = getMaxKey(cuisines);
  const favoriteCategory = getMaxKey(categories);
  const favoriteDiningTime = getMaxKey(diningTimes);

  // Average Budget
  const favoriteBudgetLevel = getMaxKey(budgets);
  const averageBudget = favoriteBudgetLevel !== "None" 
    ? `₹`.repeat(Number(favoriteBudgetLevel)) 
    : "Any Budget";

  // Average Travel Distance
  const favoriteDistanceRange = getMaxKey(distances);
  const averageTravelDistance = favoriteDistanceRange === "close" ? "Within 1 km" : 
                                 favoriteDistanceRange === "medium" ? "Within 3 km" : 
                                 favoriteDistanceRange === "far" ? "More than 3 km" : "Any Distance";

  // Top Cuisines / Categories for Growth Charts
  const topCuisines = Object.entries(cuisines).sort((a, b) => b[1] - a[1]).slice(0, 3);
  const topCategories = Object.entries(categories).sort((a, b) => b[1] - a[1]).slice(0, 3);

  const totalCuisineScore = Object.values(cuisines).reduce((acc, curr) => acc + curr, 0) || 1;
  const totalCategoryScore = Object.values(categories).reduce((acc, curr) => acc + curr, 0) || 1;

  // Resolve Favorite Restaurants list
  const favoriteRestaurants = restaurants.filter(r => (preferences.favorites || []).includes(r.id));

  return (
    <div className="flex flex-col gap-6 animate-[fadeIn_300ms_ease-out]">
      <div className="flex flex-col gap-1.5 border-b border-gold/10 pb-4">
        <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-500 font-semibold font-mono">Gastronomy Metrics</span>
        <h4 className="font-serif text-xl text-neutral-200">Your Dining Persona</h4>
      </div>

      {/* Summary Persona Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="glass-panel p-4 rounded-xl border border-gold/10 flex flex-col gap-1">
          <span className="text-[8px] uppercase tracking-wider text-neutral-500 font-mono">Favorite Cuisine</span>
          <span className="text-xs font-serif text-gold truncate font-semibold">{favoriteCuisine}</span>
        </div>
        <div className="glass-panel p-4 rounded-xl border border-gold/10 flex flex-col gap-1">
          <span className="text-[8px] uppercase tracking-wider text-neutral-500 font-mono">Favorite Category</span>
          <span className="text-xs font-serif text-gold truncate font-semibold">{favoriteCategory}</span>
        </div>
        <div className="glass-panel p-4 rounded-xl border border-gold/10 flex flex-col gap-1">
          <span className="text-[8px] uppercase tracking-wider text-neutral-500 font-mono">Dining Schedule</span>
          <span className="text-xs font-serif text-gold truncate font-semibold">{favoriteDiningTime}</span>
        </div>
        <div className="glass-panel p-4 rounded-xl border border-gold/10 flex flex-col gap-1">
          <span className="text-[8px] uppercase tracking-wider text-neutral-500 font-mono">Average Budget</span>
          <span className="text-xs font-serif text-gold truncate font-semibold">{averageBudget}</span>
        </div>
        <div className="glass-panel p-4 rounded-xl border border-gold/10 flex flex-col gap-1">
          <span className="text-[8px] uppercase tracking-wider text-neutral-500 font-mono">Travel Distance</span>
          <span className="text-xs font-serif text-gold truncate font-semibold">{averageTravelDistance}</span>
        </div>
        <div className="glass-panel p-4 rounded-xl border border-gold/10 flex flex-col gap-1 col-span-2 sm:col-span-1">
          <span className="text-[8px] uppercase tracking-wider text-neutral-500 font-mono">Saved Lounges</span>
          <span className="text-xs font-serif text-gold truncate font-semibold">{(preferences.favorites || []).length} Mapped</span>
        </div>
      </div>

      {/* Growth Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cuisine Growth */}
        <div className="flex flex-col gap-3">
          <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-mono">Cuisine Preferences</span>
          <div className="flex flex-col gap-3">
            {topCuisines.length > 0 ? topCuisines.map(([name, score]) => (
              <PreferenceCard 
                key={name}
                title={name}
                score={score}
                percentage={Math.round((score / totalCuisineScore) * 100)}
                icon="🍛"
              />
            )) : (
              <span className="text-xs text-neutral-500 italic">No cuisine preferences logged yet.</span>
            )}
          </div>
        </div>

        {/* Category Growth */}
        <div className="flex flex-col gap-3">
          <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-mono">Category Preferences</span>
          <div className="flex flex-col gap-3">
            {topCategories.length > 0 ? topCategories.map(([name, score]) => (
              <PreferenceCard 
                key={name}
                title={name}
                score={score}
                percentage={Math.round((score / totalCategoryScore) * 100)}
                icon="🍽"
              />
            )) : (
              <span className="text-xs text-neutral-500 italic">No category preferences logged yet.</span>
            )}
          </div>
        </div>
      </div>

      {/* Favorite Restaurants & Searches Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
        {/* Saved/Favorite Restaurants */}
        <div className="flex flex-col gap-3">
          <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-mono">Favorite Lounges</span>
          <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-2 scrollbar-thin">
            {favoriteRestaurants.length > 0 ? favoriteRestaurants.map(rest => (
              <div 
                key={rest.id}
                onClick={() => {
                  onSelectRestaurant(rest);
                  onCloseProfile && onCloseProfile();
                }}
                className="p-3 rounded-lg bg-neutral-900/40 border border-neutral-800/60 hover:border-gold/30 transition-all cursor-pointer flex justify-between items-center"
              >
                <span className="text-xs text-neutral-300 font-medium truncate pr-4">{rest.name}</span>
                <span className="text-[9px] uppercase tracking-wider text-gold font-mono">{rest.cuisine}</span>
              </div>
            )) : (
              <span className="text-xs text-neutral-500 italic">No saved lounges.</span>
            )}
          </div>
        </div>

        {/* Recent Searches */}
        <div className="flex flex-col gap-3">
          <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-mono">Recent Search Logs</span>
          <div className="flex flex-wrap gap-1.5">
            {searchHistory.length > 0 ? searchHistory.map((queryText, idx) => (
              <span 
                key={idx}
                className="px-3 py-1 rounded bg-[#121212]/80 border border-neutral-800 text-[10px] text-neutral-400 font-mono"
              >
                {queryText}
              </span>
            )) : (
              <span className="text-xs text-neutral-500 italic">No recent searches logged.</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
