// RUCHI KOOTU - Restaurant Reviews Service

export async function getReviews(restaurantId, firebaseDb) {
  if (firebaseDb) {
    try {
      const { collection, query, where, getDocs } = await import('firebase/firestore');
      const q = query(collection(firebaseDb, "reviews"), where("restaurantId", "==", restaurantId));
      const querySnapshot = await getDocs(q);
      const reviews = [];
      querySnapshot.forEach((doc) => {
        reviews.push({ id: doc.id, ...doc.data() });
      });
      return reviews;
    } catch (err) {
      console.warn("Firestore reviews read failed, falling back to local storage:", err);
    }
  }

  try {
    const raw = localStorage.getItem(`RUCHI_LOCAL_REVIEWS_${restaurantId}`) || '[]';
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function addReview(reviewData, user, firebaseDb) {
  const review = {
    restaurantId: reviewData.restaurantId,
    rating: reviewData.rating,
    comment: reviewData.comment,
    photos: reviewData.photos || [],
    likes: 0,
    likedBy: [],
    userName: user?.displayName || "Concierge Guest",
    userAvatar: user?.photoURL || "",
    userId: user?.uid || "guest",
    timestamp: Date.now()
  };

  if (firebaseDb && user && user.uid !== 'mock-uid') {
    const { collection, addDoc } = await import('firebase/firestore');
    const docRef = await addDoc(collection(firebaseDb, "reviews"), review);
    return { id: docRef.id, ...review };
  } else {
    const localKey = `RUCHI_LOCAL_REVIEWS_${reviewData.restaurantId}`;
    const existing = JSON.parse(localStorage.getItem(localKey) || '[]');
    const id = `local-rev-${Date.now()}`;
    const newReview = { id, ...review };
    existing.unshift(newReview);
    localStorage.setItem(localKey, JSON.stringify(existing));
    return newReview;
  }
}

export async function editReview(reviewId, restaurantId, reviewData, user, firebaseDb) {
  if (firebaseDb && user && user.uid !== 'mock-uid') {
    const { doc, updateDoc } = await import('firebase/firestore');
    const docRef = doc(firebaseDb, "reviews", reviewId);
    await updateDoc(docRef, {
      rating: reviewData.rating,
      comment: reviewData.comment,
      photos: reviewData.photos || [],
      timestamp: Date.now()
    });
    return { id: reviewId, ...reviewData };
  } else {
    const localKey = `RUCHI_LOCAL_REVIEWS_${restaurantId}`;
    const existing = JSON.parse(localStorage.getItem(localKey) || '[]');
    const updated = existing.map(r => r.id === reviewId ? {
      ...r,
      rating: reviewData.rating,
      comment: reviewData.comment,
      photos: reviewData.photos || [],
      timestamp: Date.now()
    } : r);
    localStorage.setItem(localKey, JSON.stringify(updated));
    return { id: reviewId, ...reviewData };
  }
}

export async function deleteReview(reviewId, restaurantId, user, firebaseDb) {
  if (firebaseDb && user && user.uid !== 'mock-uid') {
    const { doc, deleteDoc } = await import('firebase/firestore');
    await deleteDoc(doc(firebaseDb, "reviews", reviewId));
  } else {
    const localKey = `RUCHI_LOCAL_REVIEWS_${restaurantId}`;
    const existing = JSON.parse(localStorage.getItem(localKey) || '[]');
    const filtered = existing.filter(r => r.id !== reviewId);
    localStorage.setItem(localKey, JSON.stringify(filtered));
  }
}

export async function likeReview(reviewId, restaurantId, user, firebaseDb) {
  const userId = user?.uid || "guest-id";
  if (firebaseDb && user && user.uid !== 'mock-uid') {
    const { doc, runTransaction } = await import('firebase/firestore');
    const docRef = doc(firebaseDb, "reviews", reviewId);
    await runTransaction(firebaseDb, async (transaction) => {
      const sfDoc = await transaction.get(docRef);
      if (!sfDoc.exists()) {
        throw new Error("Document does not exist!");
      }
      
      const data = sfDoc.data();
      const likedBy = data.likedBy || [];
      let likes = data.likes || 0;
      let newLikedBy = [...likedBy];
      
      if (likedBy.includes(userId)) {
        newLikedBy = newLikedBy.filter(id => id !== userId);
        likes = Math.max(0, likes - 1);
      } else {
        newLikedBy.push(userId);
        likes += 1;
      }
      transaction.update(docRef, { likes, likedBy: newLikedBy });
    });
  } else {
    const localKey = `RUCHI_LOCAL_REVIEWS_${restaurantId}`;
    const existing = JSON.parse(localStorage.getItem(localKey) || '[]');
    const updated = existing.map(r => {
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
    });
    localStorage.setItem(localKey, JSON.stringify(updated));
  }
}
