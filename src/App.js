// RUCHI KOOTU - Application Core Orchestrator
import React, { useState, useMemo, useEffect, useCallback, Suspense, lazy } from 'react';
import htm from 'htm';
import { usePreferences } from './hooks/usePreferences.js';
import { useNearbyRestaurants } from './hooks/useNearbyRestaurants.js';
import { useAIConcierge } from './hooks/useAIConcierge.js';
import { useNotifications } from './hooks/useNotifications.js';
import { computeRuchiScore } from './utils/ruchiScore.js';

const generateAISummary = (rest) => `Selected for its exceptional ${rest.cuisine} offerings and elite ambiance.`;

// Custom Hooks
import { useAppAuth } from './hooks/useAppAuth.js';
import { useAppSearch } from './hooks/useAppSearch.js';
import { useAppFilters } from './hooks/useAppFilters.js';
import { useAppCollections } from './hooks/useAppCollections.js';

// Components
import TopPicks from './components/TopPicks.jsx';
import AIConcierge from './components/AIConcierge.jsx';
import AIThinking from './components/AIThinking.jsx';
import AIResponse from './components/AIResponse.jsx';
import RecommendedSection from './components/RecommendedSection.jsx';
import FloatingNavbar from './components/FloatingNavbar.js';
import HeroSection from './components/HeroSection.js';
import FilterSortControls from './components/FilterSortControls.js';
import RestaurantCard from './components/RestaurantCard.js';
import ErrorBoundary from './components/ErrorBoundary.js';

const RestaurantDetail = lazy(() => import('./components/RestaurantDetails.jsx'));
const MapView = lazy(() => import('./components/MapView.jsx'));
const FloatingAIConcierge = lazy(() => import('./components/AIConcierge.js'));
const UserProfile = lazy(() => import('./components/UserProfile.js'));
const AdminDashboard = lazy(() => import('./components/AdminDashboard.js'));

const html = htm.bind(React.createElement);

const MapSkeleton = () => html`<div className="w-full h-[500px] rounded-2xl border border-gold/15 bg-neutral-950 flex flex-col items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-gold/20 border-t-gold animate-spin" /><span className="text-[9px] uppercase tracking-widest text-neutral-500 mt-3 font-mono">Calibrating Concierge Radar...</span></div>`;
const DetailSkeleton = () => html`<div className="fixed inset-0 z-50 flex items-center justify-end bg-black/85 backdrop-blur-md"><div className="w-full max-w-2xl h-full bg-[#0A0A0A] border-l border-gold/15 p-8 flex flex-col gap-6"><div className="h-60 bg-neutral-900 rounded-xl w-full" /></div></div>`;
const ConciergeSkeleton = () => html`<div className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center animate-pulse" />`;

export default function App() {
  const [toasts, setToasts] = useState([]);
  const showToast = useCallback((message) => {
    const id = Date.now() + Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 5000);
  }, []);

  const [isOnline, setIsOnline] = useState(navigator.onLine);
  useEffect(() => {
    const onOnline = () => { setIsOnline(true); showToast("Online mode active."); };
    const onOffline = () => { setIsOnline(false); showToast("Offline mode active."); };
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    return () => { window.removeEventListener('online', onOnline); window.removeEventListener('offline', onOffline); };
  }, [showToast]);

  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('RUCHI_KOOTU_FAVORITES') || '[]');
    } catch {
      return [];
    }
  });
  const [collections, setCollections] = useState({
    date_night: [],
    family_dining: [],
    cafes: [],
    hidden_gems: []
  });
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  const filters = useAppFilters();
  const search = useAppSearch(showToast);
  
  const { user, firebaseConfig, firebaseInstanceRef, handleLogin, handleLogout, handleUpdateProfile, handleSaveFirebaseConfig } = useAppAuth(
    showToast,
    setFavorites,
    setCollections,
    setRecentlyViewed
  );

  const collectionsHook = useAppCollections(
    user,
    firebaseInstanceRef,
    showToast,
    favorites,
    setFavorites,
    collections,
    setCollections,
    recentlyViewed,
    setRecentlyViewed
  );

  const { preferences, trackSearch, trackView, trackFavorite, trackVisit, clearHistory, resetPreferences, exportPersonalData } = usePreferences(user, firebaseInstanceRef.current?.db);
  const { placesData, placesLoading, placesError } = useNearbyRestaurants(search.coordinates, filters.searchRadius);

  const { notifications, unreadCount, preferences: notificationPreferences, markAsRead, deleteNotification, savePreferences: saveNotificationPreferences, sendTestNotification } = useNotifications(user, firebaseInstanceRef.current?.db, (n) => showToast(`${n.icon} ${n.title}: ${n.description}`));

  const handleSelectRestaurant = useCallback((rest) => {
    if (!rest) { setSelectedRestaurant(null); return; }
    trackView(rest);
    const ruchiScoreObj = computeRuchiScore(rest, { userLocation: search.coordinates, searchQuery: search.debouncedSearchQuery, favorites, preferences });
    const popularDishes = rest.cuisine?.includes("Japanese") ? ["Toro Tuna Sashimi", "A5 Miyazaki Wagyu Nigiri"] : ["Signature Tasting Platter", "Molecular Rasam Elixir"];
    const updatedRest = { ...rest, ruchiScore: ruchiScoreObj.score, ruchiReasons: ruchiScoreObj.reasons, popularDishes, amenities: ["Valet Parking", "Sommelier Service"], loadingDetails: false, aiSummary: generateAISummary(rest) };
    setSelectedRestaurant(updatedRest);
  }, [search.coordinates, search.debouncedSearchQuery, favorites, preferences, trackView]);

  const filteredRestaurants = useMemo(() => {
    return placesData.filter(rest => {
      if (filters.selectedCuisines.length > 0 && !filters.selectedCuisines.includes(rest.cuisine)) return false;
      if (filters.selectedBudget !== "All" && rest.priceLevel !== filters.selectedBudget) return false;
      if (filters.openNowOnly && !rest.isOpen) return false;
      if (rest.rating < filters.minRating) return false;
      if (rest.distance > filters.maxDistance) return false;
      return true;
    });
  }, [placesData, filters.selectedCuisines, filters.selectedBudget, filters.openNowOnly, filters.minRating, filters.maxDistance]);

  const { parsedIntent, isProcessing, restaurants: scoredRestaurants, source } = useAIConcierge(filteredRestaurants, search.debouncedSearchQuery, search.coordinates, favorites, preferences);

  const processedRestaurants = useMemo(() => {
    if (filters.sortBy === "ruchiScore") return scoredRestaurants;
    return [...scoredRestaurants].sort((a, b) => filters.sortBy === "distance" ? a.distance - b.distance : b.rating - a.rating);
  }, [scoredRestaurants, filters.sortBy]);

  const isDashboardActive = search.coordinates !== null || search.geoError !== null;

  return html`
    <${ErrorBoundary}>
      <div className="relative min-h-screen bg-obsidian-dark text-neutral-100 flex flex-col selection:bg-gold/20 selection:text-gold">
        ${!isOnline && html`<div className="sticky top-0 z-50 bg-rose-500/10 border-b border-rose-500/20 py-2 text-center text-[10px] uppercase tracking-widest text-rose-400 font-semibold">Registry Offline</div>`}
        <${FloatingNavbar} resetView=${() => search.setCoordinates(null)} hasCoordinates=${isDashboardActive} user=${user} onOpenProfile=${() => setShowProfileModal(true)} unreadCount=${unreadCount} notifications=${notifications} onMarkRead=${markAsRead} onDelete=${deleteNotification} />
        
        ${!isDashboardActive ? html`
          <${HeroSection} onDetectLocation=${search.handleDetectLocation} onSearch=${(q) => search.handleSearchSubmit(q, sendTestNotification)} loading=${search.geoLoading} />
        ` : html`
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 pt-32 pb-16 flex flex-col gap-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gold/10 pb-6">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-semibold">Concierge Advisory</span>
                <h2 className="font-serif text-3xl font-light">${search.searchQuery ? html`Curated Search: <span className="text-gold">"${search.searchQuery}"</span>` : 'Personalized Selections'}</h2>
              </div>
              <form onSubmit=${(e) => { e.preventDefault(); search.handleSearchSubmit(search.searchQuery, sendTestNotification); }} className="w-full md:w-80 relative">
                <input type="text" placeholder="Search lounge..." value=${search.searchQuery} onChange=${(e) => search.setSearchQuery(e.target.value)} className="w-full px-5 py-2.5 rounded-full bg-[#121212]/40 text-xs text-neutral-300 border border-gold/15 focus:border-gold/50 focus:outline-none" />
              </form>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 flex flex-col gap-6">
                <${AIConcierge} query=${search.searchQuery} setQuery=${(q) => search.handleSearchSubmit(q, sendTestNotification)} isProcessing=${isProcessing} />
                <${FilterSortControls} ...${filters} />
                <${Suspense} fallback=${html`<${MapSkeleton} />`}><${MapView} userCoordinates=${search.coordinates} restaurants=${processedRestaurants} selectedRestaurant=${selectedRestaurant} onSelectRestaurant=${handleSelectRestaurant} /></${Suspense}>
              </div>
              <div className="lg:col-span-5 flex flex-col gap-6">
                <div className="flex justify-between text-xs text-gold font-mono"><span>Available Dining Logs</span><span>${placesLoading ? "Searching..." : "${processedRestaurants.length} lounges mapped"}</span></div>
                <div className="flex flex-col gap-6">
                  ${placesLoading ? html`<div className="w-full h-40 bg-neutral-900 animate-pulse rounded-2xl" />` : search.geoError ? html`<div className="text-center py-12 text-neutral-500">Location Access Required</div>` : processedRestaurants.map(rest => html`<${RestaurantCard} key=${rest.id} restaurant=${rest} onClick=${() => handleSelectRestaurant(rest)} isSelected=${selectedRestaurant && selectedRestaurant.id === rest.id} onNavigate=${() => trackVisit(rest)} />`)}
                </div>
              </div>
            </div>
          </main>
        `}
        ${selectedRestaurant && html`<${Suspense} fallback=${html`<${DetailSkeleton} />`}><${RestaurantDetail} restaurant=${selectedRestaurant} onClose=${() => setSelectedRestaurant(null)} isFavorite=${favorites.includes(selectedRestaurant.id)} onToggleFavorite=${() => collectionsHook.handleToggleFavorite(selectedRestaurant.id)} showToast=${showToast} collections=${collections} onToggleCollection=${collectionsHook.handleToggleCollection} onAddToRecentlyViewed=${collectionsHook.handleAddToRecentlyViewed} user=${user} firebaseDb=${firebaseInstanceRef.current?.db} /></${Suspense}>`}
        <${Suspense} fallback=${null}><${UserProfile} isOpen=${showProfileModal} onClose=${() => setShowProfileModal(false)} user=${user} onLogin=${handleLogin} onLogout=${handleLogout} onUpdateProfile=${handleUpdateProfile} favorites=${favorites} collections=${collections} recentlyViewed=${recentlyViewed} firebaseConfig=${firebaseConfig} onSaveFirebaseConfig=${handleSaveFirebaseConfig} restaurants=${processedRestaurants} onSelectRestaurant=${handleSelectRestaurant} onOpenAdmin=${() => setShowAdminModal(true)} preferences=${preferences} onClearHistory=${clearHistory} onResetPreferences=${resetPreferences} onExportData=${exportPersonalData} notificationPreferences=${notificationPreferences} onSaveNotificationPreferences=${saveNotificationPreferences} /></${Suspense}>
        ${showAdminModal && html`<${Suspense} fallback=${null}><${AdminDashboard} isOpen=${showAdminModal} onClose=${() => setShowAdminModal(false)} /></${Suspense}>`}
        <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-3 pointer-events-none">${toasts.map(t => html`<div key=${t.id} className="pointer-events-auto glass-panel-gold p-4 rounded-xl border border-gold/20 flex gap-3 text-xs text-neutral-200"><span>${t.message}</span><button onClick=${() => setToasts(prev => prev.filter(item => item.id !== t.id))}>✕</button></div>`)}</div>
        <${Suspense} fallback=${html`<${ConciergeSkeleton} />`}><${FloatingAIConcierge} restaurants=${processedRestaurants} onSelectRestaurant=${handleSelectRestaurant} /></${Suspense}>
      </div>
    </${ErrorBoundary}>
  `;
}
