import { useState, useEffect, useCallback } from 'react';
import { getCollections, saveCollections } from '../services/collectionService.js';

export function useCollections(user = null, firebaseDb = null) {
  const [collections, setCollections] = useState({
    "My Favorites": [],
    "Weekend Spots": [],
    "Date Night": [],
    "Best Biryani": [],
    "Budget Food": []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let unsubscribe = null;

    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        if (user && firebaseDb && user.uid !== 'mock-uid') {
          const { doc, onSnapshot } = await import('firebase/firestore');
          unsubscribe = onSnapshot(doc(firebaseDb, "users", user.uid), (docSnap) => {
            if (docSnap.exists()) {
              const data = docSnap.data();
              if (data.customCollections) {
                setCollections(data.customCollections);
              }
            }
          });
        } else {
          const localData = await getCollections(user, firebaseDb);
          setCollections(localData);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user, firebaseDb]);

  const createCollection = useCallback(async (name) => {
    if (!name.trim()) return;
    const trimmed = name.trim();
    setCollections(prev => {
      if (prev[trimmed]) return prev;
      const updated = { ...prev, [trimmed]: [] };
      saveCollections(updated, user, firebaseDb);
      return updated;
    });
  }, [user, firebaseDb]);

  const toggleRestaurantInCollection = useCallback(async (colName, restaurantId) => {
    setCollections(prev => {
      const list = prev[colName] || [];
      const updatedList = list.includes(restaurantId) 
        ? list.filter(id => id !== restaurantId)
        : [...list, restaurantId];
      const updated = { ...prev, [colName]: updatedList };
      saveCollections(updated, user, firebaseDb);
      return updated;
    });
  }, [user, firebaseDb]);

  return {
    collections,
    isLoading,
    error,
    createCollection,
    toggleRestaurant: toggleRestaurantInCollection
  };
}
export default useCollections;
