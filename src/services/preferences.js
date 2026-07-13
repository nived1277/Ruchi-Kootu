// RUCHI KOOTU - User Preference Learning Engine

const INITIAL_PREFERENCES = {
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

// Helper to determine dining time of day
export function getDiningTimeSegment(date = new Date()) {
  const hour = date.getHours();
  if (hour >= 6 && hour < 11) return "Breakfast";
  if (hour >= 11 && hour < 16) return "Lunch";
  return "Dinner";
}

// Helper to update weights inside preferences
export function updatePreferenceWeights(actionType, data, currentPrefs = {}) {
  const prefs = {
    cuisines: { ...INITIAL_PREFERENCES.cuisines, ...currentPrefs.cuisines },
    categories: { ...INITIAL_PREFERENCES.categories, ...currentPrefs.categories },
    budgets: { ...INITIAL_PREFERENCES.budgets, ...currentPrefs.budgets },
    distances: { ...INITIAL_PREFERENCES.distances, ...currentPrefs.distances },
    diningTimes: { ...INITIAL_PREFERENCES.diningTimes, ...currentPrefs.diningTimes },
    searchHistory: [...(currentPrefs.searchHistory || [])],
    favorites: [...(currentPrefs.favorites || [])],
    viewHistory: [...(currentPrefs.viewHistory || [])],
    visitHistory: [...(currentPrefs.visitHistory || [])]
  };

  const now = new Date();
  const timeSegment = getDiningTimeSegment(now);
  prefs.diningTimes[timeSegment] = (prefs.diningTimes[timeSegment] || 0) + 1;

  switch (actionType) {
    case 'SEARCH': {
      const query = data.toLowerCase().trim();
      if (!query) break;

      // Add to search history
      if (!prefs.searchHistory.includes(trimmedQuery => trimmedQuery === query)) {
        prefs.searchHistory = [query, ...prefs.searchHistory.filter(q => q !== query)].slice(0, 20);
      }

      // Check keywords and adjust weights
      if (query.includes("biryani") || query.includes("kebab") || query.includes("awadhi")) {
        prefs.cuisines["Royal Awadhi"] = (prefs.cuisines["Royal Awadhi"] || 0) + 10;
      }
      if (query.includes("french") || query.includes("bistro")) {
        prefs.cuisines["Contemporary French"] = (prefs.cuisines["Contemporary French"] || 0) + 10;
      }
      if (query.includes("japanese") || query.includes("sushi")) {
        prefs.cuisines["Artisanal Japanese"] = (prefs.cuisines["Artisanal Japanese"] || 0) + 10;
      }
      if (query.includes("nordic") || query.includes("botanical")) {
        prefs.cuisines["New Nordic & Botanical"] = (prefs.cuisines["New Nordic & Botanical"] || 0) + 10;
      }
      if (query.includes("south") || query.includes("kootu") || query.includes("kerala") || query.includes("dosa")) {
        prefs.cuisines["Modern South Indian"] = (prefs.cuisines["Modern South Indian"] || 0) + 10;
      }

      // Categories search match
      if (query.includes("cafe")) prefs.categories["Cafe"] = (prefs.categories["Cafe"] || 0) + 8;
      if (query.includes("bakery") || query.includes("bread")) prefs.categories["Bakery"] = (prefs.categories["Bakery"] || 0) + 8;
      if (query.includes("fast food") || query.includes("burger")) prefs.categories["Fast Food"] = (prefs.categories["Fast Food"] || 0) + 8;
      if (query.includes("restaurant") || query.includes("dining")) prefs.categories["Restaurant"] = (prefs.categories["Restaurant"] || 0) + 8;

      // Budget search match
      if (query.includes("budget") || query.includes("cheap") || query.includes("300")) {
        prefs.budgets["3"] = (prefs.budgets["3"] || 0) + 8; // lower fine-dining tier
      }
      break;
    }

    case 'VIEW': {
      const rest = data;
      if (!rest) break;

      // Log to view history
      prefs.viewHistory = [{ id: rest.id, name: rest.name, timestamp: now.getTime() }, ...prefs.viewHistory].slice(0, 30);

      // Increment category +5
      if (rest.category) {
        prefs.categories[rest.category] = (prefs.categories[rest.category] || 0) + 5;
      }
      // Increment cuisine +5
      if (rest.cuisine) {
        prefs.cuisines[rest.cuisine] = (prefs.cuisines[rest.cuisine] || 0) + 5;
      }
      // Increment budget +3
      if (rest.priceLevel) {
        prefs.budgets[rest.priceLevel] = (prefs.budgets[rest.priceLevel] || 0) + 3;
      }
      // Increment distance +3
      const distRange = rest.distance <= 1.0 ? "close" : rest.distance <= 3.0 ? "medium" : "far";
      prefs.distances[distRange] = (prefs.distances[distRange] || 0) + 3;
      break;
    }

    case 'FAVORITE': {
      const { restaurant: rest, isAdded } = data;
      if (!rest) break;

      if (isAdded) {
        if (!prefs.favorites.includes(rest.id)) {
          prefs.favorites.push(rest.id);
        }
        // Favorited: cuisine +15, category +15, budget +10, distance +10
        if (rest.cuisine) prefs.cuisines[rest.cuisine] = (prefs.cuisines[rest.cuisine] || 0) + 15;
        if (rest.category) prefs.categories[rest.category] = (prefs.categories[rest.category] || 0) + 15;
        if (rest.priceLevel) prefs.budgets[rest.priceLevel] = (prefs.budgets[rest.priceLevel] || 0) + 10;
        const distRange = rest.distance <= 1.0 ? "close" : rest.distance <= 3.0 ? "medium" : "far";
        prefs.distances[distRange] = (prefs.distances[distRange] || 0) + 10;
      } else {
        prefs.favorites = prefs.favorites.filter(id => id !== rest.id);
        // Decrease weights slightly on unfavorite
        if (rest.cuisine) prefs.cuisines[rest.cuisine] = Math.max(0, (prefs.cuisines[rest.cuisine] || 0) - 15);
        if (rest.category) prefs.categories[rest.category] = Math.max(0, (prefs.categories[rest.category] || 0) - 15);
      }
      break;
    }

    case 'VISIT': {
      const rest = data;
      if (!rest) break;

      prefs.visitHistory = [{ id: rest.id, name: rest.name, timestamp: now.getTime() }, ...prefs.visitHistory].slice(0, 30);
      
      // Visited: category +7, cuisine +7
      if (rest.category) prefs.categories[rest.category] = (prefs.categories[rest.category] || 0) + 7;
      if (rest.cuisine) prefs.cuisines[rest.cuisine] = (prefs.cuisines[rest.cuisine] || 0) + 7;
      break;
    }

    default:
      break;
  }

  return prefs;
}

// Sync preferences to Firebase or local storage
export async function syncPreferences(prefs, user, firebaseDb) {
  if (user && firebaseDb && user.uid !== 'mock-uid') {
    try {
      const { doc, setDoc } = await import('firebase/firestore');
      await setDoc(doc(firebaseDb, "users", user.uid), {
        ruchiPreferences: prefs
      }, { merge: true });
    } catch (err) {
      console.error("Firebase preferences sync failed:", err);
    }
  } else {
    // Guest fallback
    try {
      localStorage.setItem('RUCHI_GUEST_PREFERENCES', JSON.stringify(prefs));
    } catch (e) {
      console.error("LocalStorage save failed", e);
    }
  }
}

export function loadLocalPreferences() {
  try {
    const raw = localStorage.getItem('RUCHI_GUEST_PREFERENCES');
    return raw ? JSON.parse(raw) : { ...INITIAL_PREFERENCES };
  } catch {
    return { ...INITIAL_PREFERENCES };
  }
}
