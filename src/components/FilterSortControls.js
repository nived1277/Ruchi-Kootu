// RUCHI KOOTU - Advanced Luxury Filter & Sort Controls
import React, { useState } from 'react';
import htm from 'htm';
const html = htm.bind(React.createElement);

export default function FilterSortControls({ 
  selectedCuisines = [], setSelectedCuisines,
  selectedBudget, setSelectedBudget,
  openNowOnly, setOpenNowOnly,
  sortBy, setSortBy,
  searchRadius, setSearchRadius,
  minRating, setMinRating,
  maxDistance, setMaxDistance,
  dietaryPreference, setDietaryPreference,
  filterFamilyFriendly, setFilterFamilyFriendly,
  filterParking, setFilterParking,
  filterOutdoor, setFilterOutdoor
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const cuisines = ["Modern South Indian", "Contemporary French", "Royal Awadhi", "Artisanal Japanese", "New Nordic & Botanical"];
  
  const budgets = [
    { label: "All Budgets", value: "All" },
    { label: "Fine Dining (₹₹₹)", value: 3 },
    { label: "Royal/Ultra (₹₹₹₹)", value: 4 }
  ];

  const sortOptions = [
    { label: "Ruchi Score", value: "ruchiScore" },
    { label: "Rating", value: "rating" },
    { label: "Distance", value: "distance" },
    { label: "Popularity", value: "popularity" },
    { label: "Review Count", value: "reviewCount" }
  ];

  const handleToggleCuisine = (cuisine) => {
    if (selectedCuisines.includes(cuisine)) {
      setSelectedCuisines(selectedCuisines.filter(c => c !== cuisine));
    } else {
      setSelectedCuisines([...selectedCuisines, cuisine]);
    }
  };

  const handleCloseDrawer = () => {
    setIsClosing(true);
    setTimeout(() => {
      setDrawerOpen(false);
      setIsClosing(false);
    }, 450);
  };

  // Count active advanced filters
  let activeFilterCount = 0;
  if (selectedCuisines.length > 0) activeFilterCount++;
  if (selectedBudget !== "All") activeFilterCount++;
  if (openNowOnly) activeFilterCount++;
  if (minRating > 3.0) activeFilterCount++;
  if (maxDistance < 10.0) activeFilterCount++;
  if (dietaryPreference !== "All") activeFilterCount++;
  if (filterFamilyFriendly) activeFilterCount++;
  if (filterParking) activeFilterCount++;
  if (filterOutdoor) activeFilterCount++;

  return html`
    <div className="flex flex-col gap-4 mb-6">
      
      <!-- Search and Drawer Hot-bar -->
      <div className="flex gap-3">
        
        <!-- Search bar input is handled by main page, but we show a quick controls button -->
        <button
          onClick=${() => setDrawerOpen(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-xl glass-panel border border-gold/15 hover:border-gold/30 text-[11px] uppercase tracking-wider text-neutral-300 transition-all font-medium bg-[#0A0A0A]/40 shrink-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          <span>Advanced Filters</span>
          ${activeFilterCount > 0 && html`
            <span className="w-4 h-4 rounded-full bg-gold text-neutral-950 flex items-center justify-center text-[9px] font-bold font-mono">
              ${activeFilterCount}
            </span>
          `}
        </button>

        <!-- Quick Sort Select -->
        <div className="flex-1 relative">
          <select
            value=${sortBy}
            onChange=${(e) => setSortBy(e.target.value)}
            className="w-full bg-[#0A0A0A]/40 border border-gold/15 rounded-xl px-5 py-3 text-[11px] uppercase tracking-wider text-neutral-300 focus:border-gold/30 focus:outline-none appearance-none cursor-pointer font-medium"
          >
            ${sortOptions.map(opt => html`
              <option key=${opt.value} value=${opt.value} className="bg-neutral-950 text-neutral-300">
                Sort by: ${opt.label}
              </option>
            `)}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gold">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

      </div>

      <!-- Advanced Filter Drawer (Slide out from Left) -->
      ${drawerOpen && html`
        <div className=${`fixed inset-0 z-50 flex items-center justify-start bg-black/80 backdrop-blur-md transition-opacity duration-500 ${isClosing ? 'opacity-0' : 'opacity-100'}`}>
          
          <!-- Close click backdrop -->
          <div className="absolute inset-0" onClick=${handleCloseDrawer}></div>

          <!-- Drawer panel -->
          <div className=${`relative w-full max-w-sm h-full bg-[#0A0A0A] border-r border-gold/15 shadow-2xl flex flex-col z-10 transition-transform duration-500 ease-in-out ${isClosing ? '-translate-x-full' : 'translate-x-0'}`}>
            
            <!-- Header -->
            <div className="px-6 py-5 border-b border-gold/10 flex items-center justify-between shrink-0 bg-obsidian">
              <div className="flex items-center gap-2">
                <span className="text-[9px] uppercase tracking-[0.2em] text-gold font-semibold">Refine Search</span>
                <h4 className="font-serif text-lg text-neutral-100 font-light">Advanced Filters</h4>
              </div>
              <button 
                onClick=${handleCloseDrawer}
                className="w-8 h-8 rounded-full glass-panel border border-gold/10 flex items-center justify-center hover:scale-105 transition-all text-neutral-400 hover:text-gold"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Drawer Scrollable Body -->
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              
              <!-- Multi-select Cuisines -->
              <div className="flex flex-col gap-3">
                <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-semibold">Cuisine Specialties</span>
                <div className="flex flex-col gap-2">
                  ${cuisines.map(c => {
                    const isChecked = selectedCuisines.includes(c);
                    return html`
                      <label key=${c} className="flex items-center gap-3 cursor-pointer text-xs text-neutral-300 hover:text-gold transition-colors select-none font-light">
                        <input 
                          type="checkbox" 
                          checked=${isChecked}
                          onChange=${() => handleToggleCuisine(c)}
                          className="rounded border-gold/20 bg-neutral-900 text-gold focus:ring-0 focus:ring-offset-0 focus:outline-none w-4 h-4 cursor-pointer"
                        />
                        <span>${c}</span>
                      </label>
                    `;
                  })}
                </div>
              </div>

              <!-- Budget Selector -->
              <div className="flex flex-col gap-3">
                <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-semibold">Budget Tier</span>
                <div className="flex bg-[#121212]/50 p-1 rounded-xl border border-neutral-800">
                  ${budgets.map(b => html`
                    <button
                      key=${b.value}
                      onClick=${() => setSelectedBudget(b.value)}
                      className=${`
                        flex-1 py-1.5 px-2 rounded-lg text-[9px] tracking-widest uppercase transition-all duration-500
                        ${selectedBudget === b.value
                          ? 'bg-gold text-neutral-900 font-semibold shadow-md'
                          : 'text-neutral-400 hover:text-neutral-200'
                        }
                      `}
                    >
                      ${b.value === 3 ? "₹₹₹" : b.value === 4 ? "₹₹₹₹" : "All"}
                    </button>
                  `)}
                </div>
              </div>

              <!-- Rating Slider -->
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-semibold">Minimum Rating</span>
                  <span className="text-xs font-mono font-bold text-gold">${minRating.toFixed(1)} ★</span>
                </div>
                <input 
                  type="range" 
                  min="3.0" 
                  max="5.0" 
                  step="0.1"
                  value=${minRating}
                  onChange=${(e) => setMinRating(parseFloat(e.target.value))}
                  className="w-full accent-gold h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <!-- Distance Slider -->
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-semibold">Maximum Distance</span>
                  <span className="text-xs font-mono font-bold text-gold">${maxDistance.toFixed(1)} km</span>
                </div>
                <input 
                  type="range" 
                  min="0.5" 
                  max="10.0" 
                  step="0.5"
                  value=${maxDistance}
                  onChange=${(e) => {
                    const val = parseFloat(e.target.value);
                    setMaxDistance(val);
                    setSearchRadius(val * 1000); // sync radius in meters
                  }}
                  className="w-full accent-gold h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <!-- Veg / Non-Veg Dietary -->
              <div className="flex flex-col gap-3">
                <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-semibold">Dietary Selection</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick=${() => setDietaryPreference("All")}
                    className=${`py-2 rounded-xl text-[10px] uppercase tracking-wider transition-all border ${dietaryPreference === 'All' ? 'bg-gold/15 border-gold text-gold font-semibold' : 'bg-neutral-900/60 border-neutral-800 text-neutral-400'}`}
                  >
                    All Options
                  </button>
                  <button
                    onClick=${() => setDietaryPreference("Veg")}
                    className=${`py-2 rounded-xl text-[10px] uppercase tracking-wider transition-all border ${dietaryPreference === 'Veg' ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 font-semibold' : 'bg-neutral-900/60 border-neutral-800 text-neutral-400'}`}
                  >
                    Vegetarian
                  </button>
                </div>
              </div>

              <!-- Toggle Switches Grid -->
              <div className="flex flex-col gap-4 border-t border-neutral-900/60 pt-4">
                
                <!-- Open now toggle -->
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs text-neutral-300 font-light">Open Immediately</span>
                  </div>
                  <button
                    onClick=${() => setOpenNowOnly(!openNowOnly)}
                    className=${`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none ${openNowOnly ? 'bg-gold' : 'bg-neutral-800'}`}
                  >
                    <span className=${`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-300 ease-in-out ${openNowOnly ? 'translate-x-4 bg-neutral-950' : 'translate-x-0 bg-neutral-400'}`}></span>
                  </button>
                </div>

                <!-- Family Friendly toggle -->
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs text-neutral-300 font-light">Family Friendly Settings</span>
                  </div>
                  <button
                    onClick=${() => setFilterFamilyFriendly(!filterFamilyFriendly)}
                    className=${`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none ${filterFamilyFriendly ? 'bg-gold' : 'bg-neutral-800'}`}
                  >
                    <span className=${`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-300 ease-in-out ${filterFamilyFriendly ? 'translate-x-4 bg-neutral-950' : 'translate-x-0 bg-neutral-400'}`}></span>
                  </button>
                </div>

                <!-- Parking Available toggle -->
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs text-neutral-300 font-light">Parking Services</span>
                  </div>
                  <button
                    onClick=${() => setFilterParking(!filterParking)}
                    className=${`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none ${filterParking ? 'bg-gold' : 'bg-neutral-800'}`}
                  >
                    <span className=${`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-300 ease-in-out ${filterParking ? 'translate-x-4 bg-neutral-950' : 'translate-x-0 bg-neutral-400'}`}></span>
                  </button>
                </div>

                <!-- Outdoor Seating toggle -->
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs text-neutral-300 font-light">Outdoor Seating</span>
                  </div>
                  <button
                    onClick=${() => setFilterOutdoor(!filterOutdoor)}
                    className=${`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none ${filterOutdoor ? 'bg-gold' : 'bg-neutral-800'}`}
                  >
                    <span className=${`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-300 ease-in-out ${filterOutdoor ? 'translate-x-4 bg-neutral-950' : 'translate-x-0 bg-neutral-400'}`}></span>
                  </button>
                </div>

              </div>

            </div>

            <!-- Apply / Reset Footer -->
            <div className="p-6 border-t border-gold/10 flex gap-3 bg-obsidian shrink-0">
              <button
                onClick=${() => {
                  setSelectedCuisines([]);
                  setSelectedBudget("All");
                  setOpenNowOnly(false);
                  setMinRating(3.0);
                  setMaxDistance(10.0);
                  setSearchRadius(3000);
                  setDietaryPreference("All");
                  setFilterFamilyFriendly(false);
                  setFilterParking(false);
                  setFilterOutdoor(false);
                }}
                className="flex-1 py-3 rounded-xl border border-neutral-800 text-neutral-400 hover:text-neutral-200 text-xs uppercase tracking-wider transition-colors font-semibold"
              >
                Reset All
              </button>
              <button
                onClick=${handleCloseDrawer}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C9A25C] text-neutral-900 font-bold text-xs uppercase tracking-wider"
              >
                Apply Filters
              </button>
            </div>

          </div>

        </div>
      `}

    </div>
  `;
}
