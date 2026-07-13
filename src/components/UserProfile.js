// RUCHI KOOTU - Concierge Private Profile Dashboard
import React, { useState, useEffect } from 'react';
import htm from 'htm';
import UserInsights from './UserInsights.jsx';
import PreferenceSettings from './PreferenceSettings.jsx';
import NotificationSettings from './NotificationSettings.jsx';
const html = htm.bind(React.createElement);

export default function UserProfile({
  isOpen,
  onClose,
  user,
  onLogin,
  onLogout,
  onUpdateProfile,
  favorites = [],
  collections = {},
  recentlyViewed = [],
  firebaseConfig = {},
  onSaveFirebaseConfig,
  onSelectRestaurant,
  onOpenAdmin,
  preferences,
  onClearHistory,
  onResetPreferences,
  onExportData,
  notificationPreferences,
  onSaveNotificationPreferences
}) {
  const [isClosing, setIsClosing] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard"); // dashboard, collections, settings
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [avatarUrl, setAvatarUrl] = useState(user?.photoURL || "");
  
  // Firebase configuration input states
  const [apiKey, setApiKey] = useState(firebaseConfig.apiKey || "");
  const [authDomain, setAuthDomain] = useState(firebaseConfig.authDomain || "");
  const [projectId, setProjectId] = useState(firebaseConfig.projectId || "");
  const [appId, setAppId] = useState(firebaseConfig.appId || "");

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || "");
      setAvatarUrl(user.photoURL || "");
    }
  }, [user]);

  if (!isOpen) return null;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 450);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    onUpdateProfile && onUpdateProfile({ displayName, photoURL: avatarUrl });
  };

  const handleSaveConfig = (e) => {
    e.preventDefault();
    onSaveFirebaseConfig && onSaveFirebaseConfig({ apiKey, authDomain, projectId, appId });
  };

  // Find restaurants in collections
  const getRestaurantsInCollection = (collectionKey) => {
    const ids = collections[collectionKey] || [];
    return restaurants.filter(r => ids.includes(r.id));
  };

  const getRestaurantsInRecent = () => {
    return restaurants.filter(r => recentlyViewed.includes(r.id));
  };

  const isConfigured = !!firebaseConfig.apiKey;

  return html`
    <div className=${`fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md transition-opacity duration-500 ${isClosing ? 'opacity-0' : 'opacity-100'}`}>
      <div className="absolute inset-0" onClick=${handleClose}></div>
      
      <!-- Profile Modal Panel -->
      <div className=${`relative w-full max-w-3xl h-[620px] bg-[#0A0A0A] border border-gold/15 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-10 transition-transform duration-500 ease-in-out ${isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
        
        <!-- Header -->
        <div className="px-8 py-5 border-b border-gold/10 bg-gradient-to-r from-obsidian-light to-obsidian flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-semibold">Registry Dashboard</span>
            <h3 className="font-serif text-2xl text-neutral-100 font-light">Gastronomy Concierge</h3>
          </div>
          <button 
            onClick=${handleClose} 
            className="w-8 h-8 rounded-full glass-panel border border-gold/10 flex items-center justify-center hover:scale-105 transition-all text-neutral-400 hover:text-gold"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Logged Out View -->
        ${!user ? html`
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center gap-6 animate-[fadeIn_300ms_ease-out]">
            <div className="w-16 h-16 rounded-full bg-gold/5 border border-gold/20 flex items-center justify-center text-gold">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div className="flex flex-col gap-2 max-w-sm">
              <h4 className="font-serif text-xl text-neutral-200">Unlock Premium Concierge Registry</h4>
              <p className="text-xs text-neutral-500 leading-relaxed font-light">
                Sign in using your Google account to sync your favorite restaurants, custom dining collections, and concierge logs across devices.
              </p>
            </div>

            <div className="flex flex-col gap-3 w-64 mt-2">
              <button 
                onClick=${() => onLogin && onLogin(false)}
                className="py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5C483] to-[#C9A25C] text-neutral-900 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-lg shadow-yellow-950/20"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12.24 10.285V13.4h6.887C18.2 15.614 15.645 18 12.24 18c-3.86 0-7-3.14-7-7s3.14-7 7-7c1.7 0 3.25.61 4.47 1.625l2.437-2.437C17.312 1.696 14.933 1 12.24 1 6.58 1 2 5.58 2 11.24s4.58 10.24 10.24 10.24c5.795 0 10.254-4.074 10.254-10.24 0-.695-.08-1.355-.22-1.955H12.24z"/>
                </svg>
                <span>Google Sign In</span>
              </button>
              
              <button 
                onClick=${() => onLogin && onLogin(true)}
                className="py-3 rounded-xl border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-neutral-200 text-xs uppercase tracking-wider bg-[#121212]/40 transition-colors"
              >
                Simulate Demo Login
              </button>
            </div>
            
            <div className="text-[10px] text-neutral-600 font-mono mt-4 uppercase">
              ${isConfigured ? "Firebase Authenticator Initialized" : "Running in Secure Client Mode"}
            </div>
          </div>
        ` : html`
          <!-- Logged In View -->
          <div className="flex-1 flex overflow-hidden">
            
            <!-- Side Navigation -->
            <div className="w-56 border-r border-gold/10 p-6 flex flex-col justify-between shrink-0 bg-[#0B0B0B]">
              <div className="flex flex-col gap-1">
                <!-- User card -->
                <div className="flex items-center gap-3 pb-6 border-b border-neutral-900/60 mb-6">
                  <img src=${avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'} className="w-10 h-10 rounded-full object-cover border border-gold/20 shrink-0" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-[11px] font-semibold text-neutral-200 truncate leading-tight">${displayName || "Member"}</span>
                    <span className="text-[9px] text-neutral-500 truncate mt-0.5">${user.email}</span>
                  </div>
                </div>

                <!-- Nav list -->
                <button onClick=${() => setActiveTab("dashboard")} className=${`w-full text-left py-2.5 px-4 rounded-lg text-xs uppercase tracking-wider transition-colors flex items-center gap-2 ${activeTab === 'dashboard' ? 'bg-gold/10 text-gold font-semibold border border-gold/20' : 'text-neutral-400 hover:text-neutral-200'}`}>
                  <span>Dashboard</span>
                </button>
                <button onClick=${() => setActiveTab("collections")} className=${`w-full text-left py-2.5 px-4 rounded-lg text-xs uppercase tracking-wider transition-colors flex items-center gap-2 ${activeTab === 'collections' ? 'bg-gold/10 text-gold font-semibold border border-gold/20' : 'text-neutral-400 hover:text-neutral-200'}`}>
                  <span>Collections</span>
                </button>
                <button onClick=${() => setActiveTab("insights")} className=${`w-full text-left py-2.5 px-4 rounded-lg text-xs uppercase tracking-wider transition-colors flex items-center gap-2 ${activeTab === 'insights' ? 'bg-gold/10 text-gold font-semibold border border-gold/20' : 'text-neutral-400 hover:text-neutral-200'}`}>
                  <span>Insights</span>
                </button>
                <button onClick=${() => setActiveTab("settings")} className=${`w-full text-left py-2.5 px-4 rounded-lg text-xs uppercase tracking-wider transition-colors flex items-center gap-2 ${activeTab === 'settings' ? 'bg-gold/10 text-gold font-semibold border border-gold/20' : 'text-neutral-400 hover:text-neutral-200'}`}>
                  <span>Settings & Privacy</span>
                </button>
              </div>

              <button 
                onClick=${onLogout}
                className="w-full py-2.5 rounded-lg border border-red-500/10 hover:border-red-500/30 text-rose-500 text-xs uppercase tracking-wider transition-colors"
              >
                Log Out
              </button>
            </div>

            <!-- Tab Content -->
            <div className="flex-1 p-8 overflow-y-auto bg-black/20 flex flex-col gap-6">
              
              ${activeTab === 'dashboard' && html`
                <div className="flex flex-col gap-6 animate-[fadeIn_300ms_ease-out]">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-500">Concierge Overview</span>
                    <h4 className="font-serif text-xl text-neutral-200">Welcome back, ${displayName || 'Concierge Guest'}</h4>
                  </div>

                  <!-- Quick Stats -->
                  <div className="grid grid-cols-3 gap-4">
                    <div className="glass-panel p-4 rounded-xl border border-gold/5 flex flex-col gap-1 text-center">
                      <span className="text-[9px] uppercase tracking-wider text-neutral-500 font-semibold">Favorites</span>
                      <span className="text-xl font-serif text-gold font-bold">${favorites.length}</span>
                    </div>
                    <div className="glass-panel p-4 rounded-xl border border-gold/5 flex flex-col gap-1 text-center">
                      <span className="text-[9px] uppercase tracking-wider text-neutral-500 font-semibold">Collections</span>
                      <span className="text-xl font-serif text-gold font-bold">
                        ${Object.values(collections).reduce((acc, curr) => acc + (curr.length > 0 ? 1 : 0), 0)}
                      </span>
                    </div>
                    <div className="glass-panel p-4 rounded-xl border border-gold/5 flex flex-col gap-1 text-center">
                      <span className="text-[9px] uppercase tracking-wider text-neutral-500 font-semibold">Recent Visits</span>
                      <span className="text-xl font-serif text-gold font-bold">${recentlyViewed.length}</span>
                    </div>
                  </div>

                  <!-- Recently Viewed Section -->
                  <div className="flex flex-col gap-3 mt-2">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-500 font-semibold">Recently Inspected Lounges</span>
                    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
                      ${getRestaurantsInRecent().length > 0 ? getRestaurantsInRecent().map(rest => html`
                        <div 
                          key=${rest.id}
                          onClick=${() => {
                            onSelectRestaurant(rest);
                            handleClose();
                          }}
                          className="w-40 shrink-0 rounded-xl overflow-hidden bg-obsidian-light border border-neutral-900 p-2.5 flex flex-col gap-2 hover:border-gold/30 transition-all cursor-pointer"
                        >
                          <img src=${rest.images?.[0] || 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=150&q=80'} className="w-full h-20 object-cover rounded-lg" />
                          <div className="flex flex-col min-w-0">
                            <span className="text-[10px] font-semibold text-neutral-200 truncate font-serif">${rest.name}</span>
                            <span className="text-[8px] text-gold uppercase font-mono tracking-widest mt-0.5">${rest.cuisine}</span>
                          </div>
                        </div>
                      `) : html`
                        <span className="text-xs text-neutral-500 italic">No recent inspections logged.</span>
                      `}
                    </div>
                  </div>
                </div>
              `}

              ${activeTab === 'collections' && html`
                <div className="flex flex-col gap-6 animate-[fadeIn_300ms_ease-out]">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-500">Curated Folders</span>
                    <h4 className="font-serif text-xl text-neutral-200">Your Gastronomy Collections</h4>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    ${["Date Night", "Family Dining", "Cafes", "Hidden Gems"].map(colName => {
                      const colKey = colName.toLowerCase().replace(" ", "_");
                      const items = getRestaurantsInCollection(colKey);
                      return html`
                        <div key=${colKey} className="glass-panel p-5 rounded-xl border border-gold/10 flex flex-col gap-3">
                          <div className="flex justify-between items-center">
                            <h5 className="text-xs font-serif font-bold text-neutral-200">${colName}</h5>
                            <span className="text-[9px] font-mono text-gold px-2 py-0.5 rounded bg-gold/5 border border-gold/15">${items.length} Lounges</span>
                          </div>
                          
                          <div className="flex flex-col gap-1.5 mt-1.5">
                            ${items.length > 0 ? items.map(rest => html`
                              <div 
                                key=${rest.id}
                                onClick=${() => {
                                  onSelectRestaurant(rest);
                                  handleClose();
                                }}
                                className="text-[11px] text-neutral-400 hover:text-gold transition-colors font-light flex justify-between items-center cursor-pointer border-b border-neutral-900/40 pb-1"
                              >
                                <span className="truncate pr-4">${rest.name}</span>
                                <span className="text-[9px] font-mono text-neutral-600">${rest.cuisine}</span>
                              </div>
                            `) : html`
                              <span className="text-[10px] text-neutral-600 italic">No members logged in this folder yet.</span>
                            `}
                          </div>
                        </div>
                      `;
                    })}
                  </div>
                </div>
              `}

              ${activeTab === 'settings' && html`
                <div className="flex flex-col gap-8 animate-[fadeIn_300ms_ease-out]">
                  
                  <!-- Profile Form -->
                  <form onSubmit=${handleSaveProfile} className="flex flex-col gap-4">
                    <div className="border-b border-neutral-900 pb-2">
                      <h4 className="font-serif text-base text-neutral-200">Concierge Profile Settings</h4>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[8px] uppercase tracking-wider text-neutral-400 font-semibold">Display Name</label>
                        <input 
                          type="text"
                          value=${displayName}
                          onChange=${(e) => setDisplayName(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-lg bg-black/60 border border-gold/10 text-xs text-neutral-300 focus:border-gold/30 focus:outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[8px] uppercase tracking-wider text-neutral-400 font-semibold">Avatar Image URL</label>
                        <input 
                          type="text"
                          value=${avatarUrl}
                          onChange=${(e) => setAvatarUrl(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-lg bg-black/60 border border-gold/10 text-xs text-neutral-300 focus:border-gold/30 focus:outline-none"
                        />
                      </div>
                    </div>

                    <button 
                      type="submit"
                      className="py-2.5 w-40 rounded-xl bg-gold/10 hover:bg-gold/20 border border-gold/30 text-gold text-[10px] uppercase tracking-widest font-semibold transition-all"
                    >
                      Update Profile
                    </button>
                  </form>

                  <!-- Firebase Settings -->
                  <form onSubmit=${handleSaveConfig} className="flex flex-col gap-4">
                    <div className="border-b border-neutral-900 pb-2 flex items-center justify-between">
                      <h4 className="font-serif text-base text-neutral-200">Firebase Core Sync Credentials</h4>
                      <span className=${`text-[9px] px-2 py-0.5 rounded font-mono uppercase ${isConfigured ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-400/20' : 'bg-amber-500/10 text-amber-400 border border-amber-400/20'}`}>
                        ${isConfigured ? 'Configured' : 'Offline / Mock'}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[8px] uppercase tracking-wider text-neutral-400 font-semibold">API Key</label>
                        <input 
                          type="password"
                          value=${apiKey}
                          onChange=${(e) => setApiKey(e.target.value)}
                          placeholder="AIzaSy..."
                          className="w-full px-4 py-2.5 rounded-lg bg-black/60 border border-gold/10 text-xs text-neutral-300 focus:border-gold/30 focus:outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[8px] uppercase tracking-wider text-neutral-400 font-semibold">Auth Domain</label>
                        <input 
                          type="text"
                          value=${authDomain}
                          onChange=${(e) => setAuthDomain(e.target.value)}
                          placeholder="project-id.firebaseapp.com"
                          className="w-full px-4 py-2.5 rounded-lg bg-black/60 border border-gold/10 text-xs text-neutral-300 focus:border-gold/30 focus:outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[8px] uppercase tracking-wider text-neutral-400 font-semibold">Project ID</label>
                        <input 
                          type="text"
                          value=${projectId}
                          onChange=${(e) => setProjectId(e.target.value)}
                          placeholder="project-id"
                          className="w-full px-4 py-2.5 rounded-lg bg-black/60 border border-gold/10 text-xs text-neutral-300 focus:border-gold/30 focus:outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[8px] uppercase tracking-wider text-neutral-400 font-semibold">App ID</label>
                        <input 
                          type="text"
                          value=${appId}
                          onChange=${(e) => setAppId(e.target.value)}
                          placeholder="1:1234:web:abcd"
                          className="w-full px-4 py-2.5 rounded-lg bg-black/60 border border-gold/10 text-xs text-neutral-300 focus:border-gold/30 focus:outline-none"
                        />
                      </div>
                    </div>

                    <button 
                      type="submit"
                      className="py-2.5 w-40 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C9A25C] text-neutral-900 text-[10px] uppercase tracking-widest font-semibold transition-all"
                    >
                      Apply config
                    </button>
                  </form>

                  <!-- Notification Preferences -->
                  <div className="border-t border-neutral-900 pt-6">
                    <${NotificationSettings}
                      preferences=${notificationPreferences}
                      onSavePreferences=${onSaveNotificationPreferences}
                    />
                  </div>

                  <!-- Privacy Settings -->
                  <div className="border-t border-neutral-900 pt-6">
                    <${PreferenceSettings}
                      onClearHistory=${onClearHistory}
                      onResetPreferences=${onResetPreferences}
                      onExportData=${onExportData}
                      user=${user}
                    />
                  </div>

                  <!-- Admin Telemetry Access -->
                  <div className="border-t border-neutral-900 pt-6 mt-2 flex flex-col gap-4 font-sans">
                    <div className="flex flex-col gap-1.5">
                      <h5 className="font-serif text-sm text-neutral-300">Admin Telemetry Console</h5>
                      <span className="text-[10px] text-neutral-500 font-light">Enter registry authorization passcode to inspect system logs.</span>
                    </div>
                    <div className="flex gap-3 max-w-sm">
                      <input 
                        type="password"
                        placeholder="Passcode..."
                        id="admin-passcode-input"
                        className="flex-1 px-4 py-2 rounded-lg bg-black/60 border border-gold/10 text-xs text-neutral-300 focus:border-gold/30 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick=${() => {
                          const val = document.getElementById("admin-passcode-input").value;
                          if (val === "1997" || val === "admin") {
                            onOpenAdmin && onOpenAdmin();
                            handleClose();
                          } else {
                            alert("Invalid Authorization Passcode");
                          }
                        }}
                        className="px-4 py-2 rounded-lg bg-gold/10 border border-gold/30 hover:bg-gold/20 text-gold text-xs uppercase tracking-widest font-semibold transition-colors"
                      >
                        Authorize
                      </button>
                    </div>
                  </div>

                </div>
              `}

              ${activeTab === 'insights' && html`
                <${UserInsights}
                  preferences=${preferences}
                  restaurants=${restaurants}
                  onSelectRestaurant=${onSelectRestaurant}
                  onCloseProfile=${handleClose}
                />
              `}

            </div>

          </div>
        `}

      </div>
    </div>
  `;
}
