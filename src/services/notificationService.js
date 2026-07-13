// RUCHI KOOTU - Notification Service

const DEFAULT_PREFERENCES = {
  aiNotifications: true,
  favorites: true,
  reviews: true,
  community: true,
  trending: true
};

export async function subscribeNotifications(user, firebaseDb, onUpdate) {
  if (firebaseDb && user && user.uid !== 'mock-uid') {
    try {
      const { collection, query, where, onSnapshot, orderBy } = await import('firebase/firestore');
      const q = query(
        collection(firebaseDb, "notifications"), 
        where("userId", "==", user.uid),
        orderBy("timestamp", "desc")
      );
      return onSnapshot(q, (snapshot) => {
        const notifs = [];
        snapshot.forEach((doc) => {
          notifs.push({ id: doc.id, ...doc.data() });
        });
        onUpdate(notifs);
      }, (error) => {
        console.error("Firestore notifications subscription error:", error);
      });
    } catch (err) {
      console.warn("Firestore subscription failed, falling back to local storage:", err);
    }
  }

  // Local storage guest implementation
  const loadLocal = () => {
    try {
      const raw = localStorage.getItem('RUCHI_GUEST_NOTIFICATIONS') || '[]';
      onUpdate(JSON.parse(raw));
    } catch {
      onUpdate([]);
    }
  };

  loadLocal();

  const handleStorageChange = (e) => {
    if (e.key === 'RUCHI_GUEST_NOTIFICATIONS') {
      loadLocal();
    }
  };

  window.addEventListener('storage', handleStorageChange);
  return () => {
    window.removeEventListener('storage', handleStorageChange);
  };
}

export async function addNotification(notificationData, user, firebaseDb) {
  const notif = {
    userId: user?.uid || 'guest',
    type: notificationData.type || 'announcement', 
    title: notificationData.title,
    description: notificationData.description,
    read: false,
    timestamp: Date.now(),
    icon: notificationData.icon || '🔔'
  };

  if (firebaseDb && user && user.uid !== 'mock-uid') {
    const { collection, addDoc } = await import('firebase/firestore');
    const docRef = await addDoc(collection(firebaseDb, "notifications"), notif);
    return { id: docRef.id, ...notif };
  } else {
    try {
      const existing = JSON.parse(localStorage.getItem('RUCHI_GUEST_NOTIFICATIONS') || '[]');
      const id = `local-notif-${Date.now()}`;
      const newNotif = { id, ...notif };
      existing.unshift(newNotif);
      localStorage.setItem('RUCHI_GUEST_NOTIFICATIONS', JSON.stringify(existing));
      window.dispatchEvent(new Event('storage'));
      return newNotif;
    } catch (e) {
      console.error("Guest addNotification failed:", e);
      return notif;
    }
  }
}

export async function markNotificationRead(id, currentList, user, firebaseDb) {
  if (firebaseDb && user && user.uid !== 'mock-uid') {
    const { doc, updateDoc } = await import('firebase/firestore');
    await updateDoc(doc(firebaseDb, "notifications", id), { read: true });
  } else {
    const updated = currentList.map(n => n.id === id ? { ...n, read: true } : n);
    localStorage.setItem('RUCHI_GUEST_NOTIFICATIONS', JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
  }
}

export async function deleteNotification(id, currentList, user, firebaseDb) {
  if (firebaseDb && user && user.uid !== 'mock-uid') {
    const { doc, deleteDoc } = await import('firebase/firestore');
    await deleteDoc(doc(firebaseDb, "notifications", id));
  } else {
    const filtered = currentList.filter(n => n.id !== id);
    localStorage.setItem('RUCHI_GUEST_NOTIFICATIONS', JSON.stringify(filtered));
    window.dispatchEvent(new Event('storage'));
  }
}

export async function getNotificationPreferences(user, firebaseDb) {
  if (firebaseDb && user && user.uid !== 'mock-uid') {
    try {
      const { doc, getDoc } = await import('firebase/firestore');
      const snap = await getDoc(doc(firebaseDb, "users", user.uid));
      if (snap.exists() && snap.data().notificationPreferences) {
        return snap.data().notificationPreferences;
      }
    } catch (err) {
      console.warn("Firestore notification preferences load failed:", err);
    }
  }

  try {
    const raw = localStorage.getItem('RUCHI_NOTIFICATION_PREFERENCES');
    return raw ? JSON.parse(raw) : { ...DEFAULT_PREFERENCES };
  } catch {
    return { ...DEFAULT_PREFERENCES };
  }
}

export async function saveNotificationPreferences(prefs, user, firebaseDb) {
  if (firebaseDb && user && user.uid !== 'mock-uid') {
    try {
      const { doc, setDoc } = await import('firebase/firestore');
      await setDoc(doc(firebaseDb, "users", user.uid), {
        notificationPreferences: prefs
      }, { merge: true });
    } catch (err) {
      console.error("Firestore notification preferences save failed:", err);
    }
  } else {
    try {
      localStorage.setItem('RUCHI_NOTIFICATION_PREFERENCES', JSON.stringify(prefs));
    } catch (e) {
      console.error("LocalStorage notification preferences save failed:", e);
    }
  }
}
