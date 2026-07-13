import { useState, useCallback } from 'react';

export function useAppCollections(
  user, 
  firebaseInstanceRef, 
  showToast,
  favorites,
  setFavorites,
  collections,
  setCollections,
  recentlyViewed,
  setRecentlyViewed
) {

  const syncUserData = useCallback(async (updatedFavs, updatedCols, updatedRecent) => {
    const f = updatedFavs || favorites;
    const c = updatedCols || collections;
    const r = updatedRecent || recentlyViewed;

    if (user && firebaseInstanceRef.current && user.uid !== 'mock-uid') {
      const db = firebaseInstanceRef.current.db;
      const { doc, setDoc } = await import('firebase/firestore');
      try {
        await setDoc(doc(db, "users", user.uid), {
          favorites: f,
          collections: c,
          recentlyViewed: r
        }, { merge: true });
      } catch (err) {
        console.error("Sync failed:", err);
      }
    } else {
      if (updatedFavs) localStorage.setItem('RUCHI_KOOTU_FAVORITES_MOCK', JSON.stringify(f));
      if (updatedCols) localStorage.setItem('RUCHI_KOOTU_COLLECTIONS_MOCK', JSON.stringify(c));
      if (updatedRecent) localStorage.setItem('RUCHI_KOOTU_RECENT_MOCK', JSON.stringify(r));
    }
  }, [user, firebaseInstanceRef, favorites, collections, recentlyViewed]);

  const handleToggleFavorite = useCallback((restaurantId) => {
    const isFav = favorites.includes(restaurantId);
    const updated = isFav 
      ? favorites.filter(id => id !== restaurantId)
      : [...favorites, restaurantId];
    setFavorites(updated);
    localStorage.setItem('RUCHI_KOOTU_FAVORITES', JSON.stringify(updated));
    syncUserData(updated, null, null);
    showToast(isFav ? "Removed from favorites." : "Added to favorites.");
  }, [favorites, syncUserData, showToast]);

  const handleToggleCollection = useCallback((colKey, restaurantId) => {
    const colList = collections[colKey] || [];
    const updatedColList = colList.includes(restaurantId)
      ? colList.filter(id => id !== restaurantId)
      : [...colList, restaurantId];
    
    const updatedCols = {
      ...collections,
      [colKey]: updatedColList
    };
    setCollections(updatedCols);
    syncUserData(null, updatedCols, null);
  }, [collections, syncUserData]);

  const handleAddToRecentlyViewed = useCallback((restaurantId) => {
    const filtered = recentlyViewed.filter(id => id !== restaurantId);
    const updatedRecent = [restaurantId, ...filtered].slice(0, 5);
    setRecentlyViewed(updatedRecent);
    syncUserData(null, null, updatedRecent);
  }, [recentlyViewed, syncUserData]);

  return {
    favorites,
    setFavorites,
    collections,
    setCollections,
    recentlyViewed,
    setRecentlyViewed,
    syncUserData,
    handleToggleFavorite,
    handleToggleCollection,
    handleAddToRecentlyViewed
  };
}
export default useAppCollections;
