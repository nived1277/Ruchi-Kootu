import { useState, useEffect, useCallback } from 'react';
import { useGeolocation } from './useGeolocation.js';
import { geocodePlace } from '../services/geocodingService.js';

export function useAppSearch(showToast) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  const { coordinates, error: geoError, setError: setGeoError, loading: geoLoading, detectLocation, setCoordinates } = useGeolocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearchSubmit = useCallback(async (query, sendTestNotification) => {
    if (!query || !query.trim()) return;

    setSearchQuery(query);
    
    if (sendTestNotification) {
      sendTestNotification('trending', 'Search Executed', `You searched for: "${query}"`, '🔍');
    }

    const coords = await geocodePlace(query);
    if (coords) {
      setCoordinates(coords);
      showToast(`Advisory grid redirected: ${coords.displayName?.split(',')[0] || query}`);
    } else {
      if (!coordinates) {
        detectLocation();
      }
    }
  }, [coordinates, detectLocation, setCoordinates, showToast]);

  const handleDetectLocation = useCallback(() => {
    setSearchQuery("");
    setDebouncedSearchQuery("");
    setCoordinates(null);
    detectLocation();
  }, [detectLocation, setCoordinates]);

  return {
    searchQuery,
    setSearchQuery,
    debouncedSearchQuery,
    setDebouncedSearchQuery,
    coordinates,
    setCoordinates,
    geoError,
    setGeoError,
    geoLoading,
    handleSearchSubmit,
    handleDetectLocation
  };
}
export default useAppSearch;
