import React from 'react';
import RuchiScoreBadge from './RuchiScoreBadge.jsx';

export default function RecommendedSection({ restaurants = [], preferences = {}, onSelectRestaurant }) {
  const cuisines = preferences.cuisines || {};
  
  // Find favorite cuisine
  let favoriteCuisine = "None";
  let maxCuisineVal = -1;
  Object.entries(cuisines).forEach(([k, v]) => {
    if (v > maxCuisineVal && v > 0) {
      maxCuisineVal = v;
      favoriteCuisine = k;
    }
  });

  // Shelves filters
  const recommendedForYou = restaurants.filter(r => r.ruchiScore >= 75).slice(0, 5);
  
  // 🔥 Trending Today calculation
  const trendingToday = React.useMemo(() => {
    return restaurants
      .map(rest => {
        const viewCount = (preferences.viewHistory || []).filter(h => h.id === rest.id).length;
        const isFav = (preferences.favorites || []).includes(rest.id) ? 1 : 0;
        
        let reviewsCount = rest.reviewCount || 0;
        try {
          const localReviews = JSON.parse(localStorage.getItem(`RUCHI_LOCAL_REVIEWS_${rest.id}`) || '[]');
          reviewsCount += localReviews.length;
        } catch {}

        const trendingScore = (viewCount * 5) + (isFav * 20) + (reviewsCount * 2);
        return { ...rest, trendingScore };
      })
      .filter(r => r.trendingScore > 0)
      .sort((a, b) => b.trendingScore - a.trendingScore)
      .slice(0, 5);
  }, [restaurants, preferences.viewHistory, preferences.favorites]);

  const becauseYouLikeCuisine = favoriteCuisine !== "None" 
    ? restaurants.filter(r => r.cuisine === favoriteCuisine).slice(0, 5)
    : [];
  const nearbyCafes = restaurants.filter(r => r.category === "Cafe" && r.distance <= 2.5).slice(0, 5);
  const budgetFriendlyPicks = restaurants.filter(r => r.priceLevel <= 3).slice(0, 5);
  const dinnerSuggestions = restaurants.filter(r => r.cuisine.includes("French") || r.cuisine.includes("Japanese") || r.cuisine.includes("Awadhi")).slice(0, 5);

  const renderShelf = (title, subtitle, list) => {
    if (list.length === 0) return null;
    return (
      <div className="flex flex-col gap-3 mb-8 animate-[fadeIn_300ms_ease-out]">
        <div className="flex flex-col">
          <h4 className="font-serif text-base text-neutral-100 font-light tracking-wide">{title}</h4>
          <span className="text-[9px] uppercase tracking-widest text-neutral-500 font-mono mt-0.5">{subtitle}</span>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-thin">
          {list.map(rest => (
            <div
              key={rest.id}
              onClick={() => onSelectRestaurant(rest)}
              className="w-44 shrink-0 rounded-xl overflow-hidden bg-gradient-to-b from-[#121212] to-black/40 border border-gold/10 p-3 hover:border-gold/30 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col gap-2 relative group shadow-md"
            >
              <img 
                src={rest.image} 
                alt={rest.name}
                className="w-full h-24 object-cover rounded-lg group-hover:scale-[1.02] transition-transform duration-500" 
              />
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-semibold text-neutral-200 truncate font-serif">{rest.name}</span>
                <span className="text-[8px] text-neutral-500 uppercase font-mono tracking-widest mt-0.5">{rest.cuisine}</span>
              </div>
              <div className="flex justify-between items-center mt-1 border-t border-neutral-900/60 pt-2">
                <span className="text-[9px] font-mono text-neutral-500">{rest.distance.toFixed(1)} km</span>
                <RuchiScoreBadge score={rest.ruchiScore} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="flex items-center gap-2 border-b border-gold/10 pb-2">
        <span className="text-xs text-gold">✦</span>
        <h3 className="font-serif text-lg md:text-xl font-light tracking-wider text-gold-gradient">
          Curated For Your Profile
        </h3>
        <span className="text-[9px] uppercase tracking-widest text-neutral-500 font-mono ml-auto">
          AI Adaptive Recommendation
        </span>
      </div>

      {renderShelf("Recommended For You", "Based on your behavior profile", recommendedForYou)}
      {renderShelf("🔥 Trending Today", "Highly sought after by the community", trendingToday)}
      {favoriteCuisine !== "None" && renderShelf(`Because You Like ${favoriteCuisine}`, "Your preferred flavor palette", becauseYouLikeCuisine)}
      {renderShelf("Nearby Cafes You'll Love", "Convenient coffee & workspace", nearbyCafes)}
      {renderShelf("Budget Friendly Picks", "Distinguished meals under ₹300-₹500 tier", budgetFriendlyPicks)}
      {renderShelf("Dinner Suggestions", "Refined evening options", dinnerSuggestions)}
    </div>
  );
}
