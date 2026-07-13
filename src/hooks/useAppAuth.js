import { useState, useEffect, useRef, useCallback } from 'react';

export function useAppAuth(showToast, setFavorites, setCollections, setRecentlyViewed) {
  const [user, setUser] = useState(null);
  const [firebaseConfig, setFirebaseConfig] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('RUCHI_KOOTU_FIREBASE_CONFIG') || '{}');
    } catch {
      return {};
    }
  });

  const firebaseInstanceRef = useRef(null);

  useEffect(() => {
    if (!firebaseConfig.apiKey) {
      const cachedUser = localStorage.getItem('RUCHI_KOOTU_MOCK_USER');
      if (cachedUser) {
        setUser(JSON.parse(cachedUser));
      }
      return;
    }

    let authUnsubscribe = null;
    let docUnsubscribe = null;

    const setupFirebase = async () => {
      try {
        const { initializeApp } = await import('firebase/app');
        const { getAuth, onAuthStateChanged } = await import('firebase/auth');
        const { getFirestore, doc, onSnapshot } = await import('firebase/firestore');

        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        const db = getFirestore(app);
        firebaseInstanceRef.current = { app, auth, db };

        authUnsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
          if (firebaseUser) {
            const userData = {
              uid: firebaseUser.uid,
              displayName: firebaseUser.displayName,
              email: firebaseUser.email,
              photoURL: firebaseUser.photoURL
            };
            setUser(userData);

            docUnsubscribe = onSnapshot(doc(db, "users", firebaseUser.uid), (docSnap) => {
              if (docSnap.exists()) {
                const data = docSnap.data();
                if (data.favorites) setFavorites(data.favorites);
                if (data.collections) setCollections(data.collections);
                if (data.recentlyViewed) setRecentlyViewed(data.recentlyViewed);
              }
            });
          } else {
            setUser(null);
            if (docUnsubscribe) docUnsubscribe();
          }
        });
      } catch (err) {
        console.error("Firebase startup failed:", err);
      }
    };

    setupFirebase();

    return () => {
      if (authUnsubscribe) authUnsubscribe();
      if (docUnsubscribe) docUnsubscribe();
    };
  }, [firebaseConfig, setFavorites, setCollections, setRecentlyViewed]);

  const handleLogin = useCallback(async (isMock = false) => {
    if (isMock) {
      const mockUser = {
        uid: 'mock-uid',
        displayName: 'Concierge Member',
        email: 'member@ruchikootu.com',
        photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
      };
      setUser(mockUser);
      localStorage.setItem('RUCHI_KOOTU_MOCK_USER', JSON.stringify(mockUser));
      showToast("Logged in to simulated Concierge account.");
      return;
    }

    if (!firebaseInstanceRef.current) {
      showToast("Firebase must be configured to run Google authentication.");
      return;
    }

    try {
      const { signInWithPopup, GoogleAuthProvider } = await import('firebase/auth');
      const auth = firebaseInstanceRef.current.auth;
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      showToast("Google Sign In completed successfully.");
    } catch (err) {
      console.error(err);
      showToast("Authentication request failed.");
    }
  }, [showToast]);

  const handleLogout = useCallback(async () => {
    if (firebaseInstanceRef.current && user?.uid !== 'mock-uid') {
      const { signOut } = await import('firebase/auth');
      await signOut(firebaseInstanceRef.current.auth);
    }
    setUser(null);
    localStorage.removeItem('RUCHI_KOOTU_MOCK_USER');
    showToast("Logged out of Concierge Registry.");
  }, [user, showToast]);

  const handleUpdateProfile = useCallback(async (profileData) => {
    if (user && firebaseInstanceRef.current && user.uid !== 'mock-uid') {
      try {
        const { updateProfile } = await import('firebase/auth');
        const auth = firebaseInstanceRef.current.auth;
        await updateProfile(auth.currentUser, {
          displayName: profileData.displayName,
          photoURL: profileData.photoURL
        });
        setUser(prev => ({
          ...prev,
          displayName: profileData.displayName,
          photoURL: profileData.photoURL
        }));
        showToast("Profile credentials updated successfully.");
      } catch (err) {
        console.error(err);
        showToast("Failed to update Firebase profile.");
      }
    } else if (user) {
      const updatedUser = { ...user, displayName: profileData.displayName, photoURL: profileData.photoURL };
      setUser(updatedUser);
      localStorage.setItem('RUCHI_KOOTU_MOCK_USER', JSON.stringify(updatedUser));
      showToast("Simulated Profile credentials updated.");
    }
  }, [user, showToast]);

  const handleSaveFirebaseConfig = useCallback((config) => {
    localStorage.setItem('RUCHI_KOOTU_FIREBASE_CONFIG', JSON.stringify(config));
    setFirebaseConfig(config);
    showToast("Firebase configurations applied.");
  }, [showToast]);

  return {
    user,
    setUser,
    firebaseConfig,
    firebaseInstanceRef,
    handleLogin,
    handleLogout,
    handleUpdateProfile,
    handleSaveFirebaseConfig
  };
}
export default useAppAuth;
