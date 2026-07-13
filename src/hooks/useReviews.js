import { useState, useEffect, useCallback } from 'react';
import { getReviews, addReview, editReview, deleteReview, likeReview } from '../services/reviewService.js';

export function useReviews(restaurantId = null, user = null, firebaseDb = null) {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchReviews = useCallback(async () => {
    if (!restaurantId) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await getReviews(restaurantId, firebaseDb);
      // Sort newest first
      setReviews(data.sort((a, b) => b.timestamp - a.timestamp));
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [restaurantId, firebaseDb]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleAddReview = async (reviewData) => {
    try {
      const newReview = await addReview({ ...reviewData, restaurantId }, user, firebaseDb);
      setReviews(prev => [newReview, ...prev]);
      return newReview;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const handleEditReview = async (reviewId, reviewData) => {
    try {
      await editReview(reviewId, restaurantId, reviewData, user, firebaseDb);
      setReviews(prev => prev.map(r => r.id === reviewId ? { ...r, ...reviewData, timestamp: Date.now() } : r));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await deleteReview(reviewId, restaurantId, user, firebaseDb);
      setReviews(prev => prev.filter(r => r.id !== reviewId));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const handleLikeReview = async (reviewId) => {
    try {
      await likeReview(reviewId, restaurantId, user, firebaseDb);
      const userId = user?.uid || "guest-id";
      setReviews(prev => prev.map(r => {
        if (r.id === reviewId) {
          const likedBy = r.likedBy || [];
          let likes = r.likes || 0;
          let newLikedBy = [...likedBy];
          if (likedBy.includes(userId)) {
            newLikedBy = newLikedBy.filter(id => id !== userId);
            likes = Math.max(0, likes - 1);
          } else {
            newLikedBy.push(userId);
            likes += 1;
          }
          return { ...r, likes, likedBy: newLikedBy };
        }
        return r;
      }));
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    reviews,
    isLoading,
    error,
    addReview: handleAddReview,
    editReview: handleEditReview,
    deleteReview: handleDeleteReview,
    likeReview: handleLikeReview,
    refreshReviews: fetchReviews
  };
}
export default useReviews;
