import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  subscribeNotifications, 
  markNotificationRead, 
  deleteNotification as serviceDeleteNotification,
  getNotificationPreferences,
  saveNotificationPreferences,
  addNotification
} from '../services/notificationService.js';

export function useNotifications(user = null, firebaseDb = null, onNewNotification = null) {
  const [notifications, setNotifications] = useState([]);
  const [preferences, setPreferences] = useState({
    aiNotifications: true,
    favorites: true,
    reviews: true,
    community: true,
    trending: true
  });

  const previousCountRef = useRef(0);

  // Load preferences
  useEffect(() => {
    const fetchPrefs = async () => {
      const p = await getNotificationPreferences(user, firebaseDb);
      setPreferences(p);
    };
    fetchPrefs();
  }, [user, firebaseDb]);

  // Subscribe to real-time notifications
  useEffect(() => {
    let unsubscribe = null;
    const setup = async () => {
      unsubscribe = await subscribeNotifications(user, firebaseDb, (updated) => {
        setNotifications(updated);
        
        // Count unread and trigger toast on new notifications
        const unreadList = updated.filter(n => !n.read);
        if (unreadList.length > previousCountRef.current) {
          const newest = unreadList[0];
          if (newest && onNewNotification) {
            onNewNotification(newest);
          }
        }
        previousCountRef.current = unreadList.length;
      });
    };

    setup();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user, firebaseDb, onNewNotification]);

  const markAsRead = useCallback(async (id) => {
    await markNotificationRead(id, notifications, user, firebaseDb);
  }, [notifications, user, firebaseDb]);

  const deleteNotif = useCallback(async (id) => {
    await serviceDeleteNotification(id, notifications, user, firebaseDb);
  }, [notifications, user, firebaseDb]);

  const updatePreferences = useCallback(async (newPrefs) => {
    setPreferences(newPrefs);
    await saveNotificationPreferences(newPrefs, user, firebaseDb);
  }, [user, firebaseDb]);

  const sendTestNotification = useCallback(async (type, title, description, icon) => {
    const prefKey = type === 'ai' ? 'aiNotifications' : type;
    if (preferences[prefKey] === false) {
      console.log(`Notification of type ${type} blocked by preferences.`);
      return;
    }
    await addNotification({ type, title, description, icon }, user, firebaseDb);
  }, [preferences, user, firebaseDb]);

  const unreadCount = notifications.filter(n => !n.read).length;

  return {
    notifications,
    unreadCount,
    preferences,
    markAsRead,
    deleteNotification: deleteNotif,
    savePreferences: updatePreferences,
    sendTestNotification
  };
}
export default useNotifications;
