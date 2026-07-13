// RUCHI KOOTU - Custom Hook for RUCHI Score Calculations
import { useMemo } from 'react';
import { computeRuchiScore } from '../utils/ruchiScore.js';

export function useRuchiScore(restaurants = [], userLocation = null, searchQuery = '', favorites = []) {
  return useMemo(() => {
    if (!restaurants || restaurants.length === 0) return [];

    const context = {
      userLocation,
      searchQuery,
      favorites
    };

    // Calculate score for each restaurant and sort them
    return restaurants
      .map(restaurant => {
        const { score, reasons } = computeRuchiScore(restaurant, context);
        return {
          ...restaurant,
          ruchiScore: score,
          ruchiReasons: reasons
        };
      })
      .sort((a, b) => b.ruchiScore - a.ruchiScore);
  }, [restaurants, userLocation, searchQuery, favorites]);
}
export default useRuchiScore;
