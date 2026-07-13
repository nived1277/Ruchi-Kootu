import { useState, useEffect, useCallback } from 'react';
import { 
  updatePreferenceWeights, 
  syncPreferences, 
  loadLocalPreferences 
} from '../services/preferences.js';

export function usePreferences(user = null, firebaseDb = null) {
  const [preferences, setPreferences] = useState(() => loadLocalPreferences());

  // Load preferences from Firestore if logged in
  useEffect(() => {
    if (!user || !firebaseDb || user.uid === 'mock-uid') {
      setPreferences(loadLocalPreferences());
      return;
    }

    let unsubscribe = null;

    const loadFirestoreData = async () => {
      try {
        const { doc, onSnapshot } = await import('firebase/firestore');
        unsubscribe = onSnapshot(doc(firebaseDb, "users", user.uid), (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.ruchiPreferences) {
              setPreferences(data.ruchiPreferences);
            }
          }
        });
      } catch (err) {
        console.error("Failed to load Firestore preferences, falling back to local:", err);
        setPreferences(loadLocalPreferences());
      }
    };

    loadFirestoreData();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user, firebaseDb]);

  // General action tracking wrapper
  const trackAction = useCallback((actionType, data) => {
    setPreferences(prev => {
      const updated = updatePreferenceWeights(actionType, data, prev);
      syncPreferences(updated, user, firebaseDb);
      return updated;
    });
  }, [user, firebaseDb]);

  const trackSearch = useCallback((query) => trackAction('SEARCH', query), [trackAction]);
  const trackView = useCallback((rest) => trackAction('VIEW', rest), [trackAction]);
  const trackFavorite = useCallback((rest, isAdded) => trackAction('FAVORITE', { restaurant: rest, isAdded }), [trackAction]);
  const trackVisit = useCallback((rest) => trackAction('VISIT', rest), [trackAction]);

  const clearHistory = useCallback(() => {
    setPreferences(prev => {
      const updated = {
        ...prev,
        searchHistory: [],
        viewHistory: [],
        visitHistory: []
      };
      syncPreferences(updated, user, firebaseDb);
      return updated;
    });
  }, [user, firebaseDb]);

  const resetPreferences = useCallback(() => {
    const fresh = {
      cuisines: {},
      categories: {},
      budgets: {},
      distances: {},
      diningTimes: { Breakfast: 0, Lunch: 0, Dinner: 0 },
      searchHistory: [],
      favorites: [],
      viewHistory: [],
      visitHistory: []
    };
    setPreferences(fresh);
    syncPreferences(fresh, user, firebaseDb);
  }, [user, firebaseDb]);

  const exportPersonalData = useCallback(() => {
    try {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(preferences, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `ruchi_kootu_concierge_data_${user?.uid || 'guest'}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } catch (e) {
      console.error("Export failed", e);
    }
  }, [preferences, user]);

  return {
    preferences,
    trackSearch,
    trackView,
    trackFavorite,
    trackVisit,
    clearHistory,
    resetPreferences,
    exportPersonalData
  };
}
export default usePreferences;
