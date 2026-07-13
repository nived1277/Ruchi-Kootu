import { useMemo } from 'react';
import { useGemini } from './useGemini.js';
import { computeRuchiScore } from '../utils/ruchiScore.js';

/**
 * Hook to manage AI Concierge search parsing, scoring, and re-ranking.
 */
export function useAIConcierge(restaurants = [], query = '', userLocation = null, favorites = [], preferences = null) {
  const { intent: parsedIntent, isLoading: isProcessing, error, source } = useGemini(query, preferences);

  const processedRestaurants = useMemo(() => {
    if (!restaurants || restaurants.length === 0) return [];

    const context = {
      userLocation,
      searchQuery: query,
      favorites,
      preferences
    };

    if (!parsedIntent) {
      // Fallback: standard Ruchi Score calculations
      return restaurants.map(rest => {
        const { score, reasons } = computeRuchiScore(rest, context);
        return {
          ...rest,
          ruchiScore: score,
          ruchiReasons: reasons
        };
      });
    }

    return restaurants
      .map(rest => {
        // Calculate baseline score
        const baseline = computeRuchiScore(rest, context);
        let score = baseline.score;
        const reasons = [...baseline.reasons];

        // 1. Cuisine Match
        if (parsedIntent.cuisine && rest.cuisine === parsedIntent.cuisine) {
          score += 25;
          reasons.push("Matches search");
        }

        // 2. Category Match
        if (parsedIntent.category && rest.category === parsedIntent.category) {
          score += 20;
          reasons.push(rest.category);
        }

        // 3. Budget Match
        if (parsedIntent.budget !== null) {
          // If query specifies under 300, check if priceLevel is 3 or below
          const isUnderBudget = (parsedIntent.budget <= 300 && rest.priceLevel <= 3) ||
                                (parsedIntent.budget > 300 && rest.priceLevel <= 4);
          if (isUnderBudget) {
            score += 20;
            reasons.push("Budget friendly");
          }
        }

        // 4. Distance Preference Match
        if (parsedIntent.distance !== null && rest.distance <= parsedIntent.distance) {
          score += 15;
          reasons.push("Close to your location");
        }

        // 5. Open Status Match
        if (parsedIntent.isOpenNow && rest.isOpen) {
          score += 15;
          if (!reasons.includes("Open Now")) {
            reasons.push("Open Now");
          }
        }

        // 6. Ambiance / Tags Matches
        if (parsedIntent.romantic && (rest.cuisine.includes("French") || rest.cuisine.includes("Japanese") || rest.rating >= 4.7)) {
          score += 15;
          reasons.push("Romantic dinner");
        }
        if (parsedIntent.workFriendly && (rest.category === "Cafe" || rest.cuisine.includes("Nordic"))) {
          score += 15;
          reasons.push("Quiet atmosphere");
        }
        if (parsedIntent.familyFriendly && (rest.cuisine.includes("South Indian") || rest.cuisine.includes("Awadhi") || rest.priceLevel <= 3)) {
          score += 15;
          reasons.push("Family friendly");
        }
        if (parsedIntent.outdoorSeating && (rest.amenities?.includes("Outdoor Lounge") || rest.id.charCodeAt(3) % 2 === 0)) {
          score += 15;
          reasons.push("Outdoor seating");
        }
        if (parsedIntent.coffee && rest.category === "Cafe") {
          score += 15;
          reasons.push("Premium coffee");
        }
        if (parsedIntent.dessert && (rest.cuisine.includes("Nordic") || rest.cuisine.includes("South Indian"))) {
          score += 15;
          reasons.push("Desserts available");
        }

        const finalScore = Math.min(100, Math.max(0, score));

        // Format to unique reasons and sort priority
        const uniqueReasons = Array.from(new Set(reasons))
          .filter(r => r !== "Elite Ambiance")
          .slice(0, 3);
        
        if (uniqueReasons.length === 0) {
          uniqueReasons.push("Elite Ambiance");
        }

        return {
          ...rest,
          ruchiScore: finalScore,
          ruchiReasons: uniqueReasons
        };
      })
      .sort((a, b) => b.ruchiScore - a.ruchiScore);
  }, [restaurants, parsedIntent, query, userLocation, favorites, preferences]);

  return {
    parsedIntent,
    isProcessing,
    restaurants: processedRestaurants,
    source,
    error
  };
}
export default useAIConcierge;
