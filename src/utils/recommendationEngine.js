// RUCHI KOOTU - AI Recommendation Engine Service Layer

/**
 * Computes personalized recommendation scores for restaurants based on user context.
 * Returns an array of restaurants with an injected `matchScore` and `conciergeNote`.
 */
export function getRecommendations(restaurants, userPreferences = {}) {
  const {
    favoriteCuisine = null,
    maxDistance = 5, // km
    budgetTier = null, // 1 to 4
    searchQuery = ""
  } = userPreferences;

  // Get current hour to offer context-aware notes
  const currentHour = new Date().getHours();
  
  return restaurants.map(restaurant => {
    let score = 85; // baseline luxury score
    let notes = [];

    // 1. Cuisine match
    if (favoriteCuisine) {
      if (restaurant.cuisine.toLowerCase() === favoriteCuisine.toLowerCase()) {
        score += 10;
        notes.push(`Matches your preference for ${restaurant.cuisine}`);
      }
    }

    // 2. Search query relevance
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (
        restaurant.name.toLowerCase().includes(q) ||
        restaurant.cuisine.toLowerCase().includes(q) ||
        restaurant.description.toLowerCase().includes(q)
      ) {
        score += 12;
        notes.push("Direct match for your search criteria");
      } else {
        score -= 15; // lower priority if not matching search
      }
    }

    // 3. Distance scoring
    if (restaurant.distance <= 1.0) {
      score += 5;
      notes.push("Exceptionally close to your coordinates");
    } else if (restaurant.distance > maxDistance) {
      score -= 10;
    }

    // 4. Rating and reviews
    if (restaurant.rating >= 4.8) {
      score += 3;
      notes.push("Ranked in the elite tier of guest reviews");
    }

    // 5. Time of day contextual notes
    if (currentHour >= 18 && currentHour <= 22) {
      if (restaurant.cuisine === "Contemporary French" || restaurant.cuisine === "Artisanal Japanese") {
        notes.push("Highly recommended for an exquisite evening tasting menu");
      }
    } else if (currentHour >= 11 && currentHour <= 15) {
      notes.push("Perfect choice for a serene business luncheon");
    }

    // Cap score at 99% (nothing is 100% perfect in private member advice) and min 60%
    const finalScore = Math.max(60, Math.min(99, score));
    
    // Choose the best single note for the concierge vibe
    const conciergeNote = notes.length > 0 
      ? notes[Math.floor(Math.random() * notes.length)] 
      : "Selected for its refined ambiance and culinary distinction";

    return {
      ...restaurant,
      matchScore: finalScore,
      conciergeNote
    };
  });
}
