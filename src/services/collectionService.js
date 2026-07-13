// RUCHI KOOTU - Custom Restaurant Collections Service

export async function getCollections(user, firebaseDb) {
  if (firebaseDb && user && user.uid !== 'mock-uid') {
    try {
      const { doc, getDoc } = await import('firebase/firestore');
      const docSnap = await getDoc(doc(firebaseDb, "users", user.uid));
      if (docSnap.exists()) {
        const data = docSnap.data();
        return data.customCollections || {
          "My Favorites": [],
          "Weekend Spots": [],
          "Date Night": [],
          "Best Biryani": [],
          "Budget Food": []
        };
      }
    } catch (err) {
      console.warn("Firestore custom collections read failed:", err);
    }
  }

  try {
    const raw = localStorage.getItem('RUCHI_CUSTOM_COLLECTIONS');
    return raw ? JSON.parse(raw) : {
      "My Favorites": [],
      "Weekend Spots": [],
      "Date Night": [],
      "Best Biryani": [],
      "Budget Food": []
    };
  } catch {
    return {
      "My Favorites": [],
      "Weekend Spots": [],
      "Date Night": [],
      "Best Biryani": [],
      "Budget Food": []
    };
  }
}

export async function saveCollections(collections, user, firebaseDb) {
  if (firebaseDb && user && user.uid !== 'mock-uid') {
    try {
      const { doc, setDoc } = await import('firebase/firestore');
      await setDoc(doc(firebaseDb, "users", user.uid), {
        customCollections: collections
      }, { merge: true });
    } catch (err) {
      console.error("Firestore custom collections save failed:", err);
    }
  } else {
    try {
      localStorage.setItem('RUCHI_CUSTOM_COLLECTIONS', JSON.stringify(collections));
    } catch (e) {
      console.error("LocalStorage save failed for custom collections", e);
    }
  }
}
export default { getCollections, saveCollections };
