import{j as e,r as p,h as J,R as Y}from"./index-Cvw9CRfK.js";function O({title:r,score:c,percentage:a,icon:o}){return e.jsxs("div",{className:"glass-panel p-4 rounded-xl border border-gold/10 flex flex-col gap-2 relative overflow-hidden group hover:border-gold/30 transition-all duration-300",children:[e.jsx("div",{className:"absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity text-gold text-lg",children:o||"✦"}),e.jsx("span",{className:"text-[9px] uppercase tracking-wider text-neutral-500 font-semibold font-mono",children:r}),e.jsxs("div",{className:"flex items-baseline gap-2 mt-1",children:[e.jsxs("span",{className:"text-xl font-serif text-gold-gradient font-bold",children:["+",c]}),a!==void 0&&e.jsxs("span",{className:"text-[10px] text-neutral-400 font-mono",children:["(",a,"%)"]})]}),a!==void 0&&e.jsx("div",{className:"w-full bg-neutral-900 h-1 rounded-full overflow-hidden mt-1.5",children:e.jsx("div",{className:"bg-gradient-to-r from-[#C9A25C] to-[#D4AF37] h-full rounded-full transition-all duration-1000",style:{width:`${a}%`}})})]})}function Q({preferences:r={},restaurants:c=[],onSelectRestaurant:a,onCloseProfile:o}){const n=r.cuisines||{},u=r.categories||{},y=r.diningTimes||{},f=r.budgets||{},C=r.distances||{},g=r.searchHistory||[],m=s=>{let l="None",v=-1;return Object.entries(s).forEach(([P,h])=>{h>v&&h>0&&(v=h,l=P)}),l},w=m(n),A=m(u),L=m(y),S=m(f),F=S!=="None"?"₹".repeat(Number(S)):"Any Budget",j=m(C),M=j==="close"?"Within 1 km":j==="medium"?"Within 3 km":j==="far"?"More than 3 km":"Any Distance",I=Object.entries(n).sort((s,l)=>l[1]-s[1]).slice(0,3),k=Object.entries(u).sort((s,l)=>l[1]-s[1]).slice(0,3),D=Object.values(n).reduce((s,l)=>s+l,0)||1,d=Object.values(u).reduce((s,l)=>s+l,0)||1,b=c.filter(s=>(r.favorites||[]).includes(s.id));return e.jsxs("div",{className:"flex flex-col gap-6 animate-[fadeIn_300ms_ease-out]",children:[e.jsxs("div",{className:"flex flex-col gap-1.5 border-b border-gold/10 pb-4",children:[e.jsx("span",{className:"text-[9px] uppercase tracking-[0.2em] text-neutral-500 font-semibold font-mono",children:"Gastronomy Metrics"}),e.jsx("h4",{className:"font-serif text-xl text-neutral-200",children:"Your Dining Persona"})]}),e.jsxs("div",{className:"grid grid-cols-2 sm:grid-cols-3 gap-4",children:[e.jsxs("div",{className:"glass-panel p-4 rounded-xl border border-gold/10 flex flex-col gap-1",children:[e.jsx("span",{className:"text-[8px] uppercase tracking-wider text-neutral-500 font-mono",children:"Favorite Cuisine"}),e.jsx("span",{className:"text-xs font-serif text-gold truncate font-semibold",children:w})]}),e.jsxs("div",{className:"glass-panel p-4 rounded-xl border border-gold/10 flex flex-col gap-1",children:[e.jsx("span",{className:"text-[8px] uppercase tracking-wider text-neutral-500 font-mono",children:"Favorite Category"}),e.jsx("span",{className:"text-xs font-serif text-gold truncate font-semibold",children:A})]}),e.jsxs("div",{className:"glass-panel p-4 rounded-xl border border-gold/10 flex flex-col gap-1",children:[e.jsx("span",{className:"text-[8px] uppercase tracking-wider text-neutral-500 font-mono",children:"Dining Schedule"}),e.jsx("span",{className:"text-xs font-serif text-gold truncate font-semibold",children:L})]}),e.jsxs("div",{className:"glass-panel p-4 rounded-xl border border-gold/10 flex flex-col gap-1",children:[e.jsx("span",{className:"text-[8px] uppercase tracking-wider text-neutral-500 font-mono",children:"Average Budget"}),e.jsx("span",{className:"text-xs font-serif text-gold truncate font-semibold",children:F})]}),e.jsxs("div",{className:"glass-panel p-4 rounded-xl border border-gold/10 flex flex-col gap-1",children:[e.jsx("span",{className:"text-[8px] uppercase tracking-wider text-neutral-500 font-mono",children:"Travel Distance"}),e.jsx("span",{className:"text-xs font-serif text-gold truncate font-semibold",children:M})]}),e.jsxs("div",{className:"glass-panel p-4 rounded-xl border border-gold/10 flex flex-col gap-1 col-span-2 sm:col-span-1",children:[e.jsx("span",{className:"text-[8px] uppercase tracking-wider text-neutral-500 font-mono",children:"Saved Lounges"}),e.jsxs("span",{className:"text-xs font-serif text-gold truncate font-semibold",children:[(r.favorites||[]).length," Mapped"]})]})]}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsx("span",{className:"text-[10px] uppercase tracking-widest text-neutral-500 font-mono",children:"Cuisine Preferences"}),e.jsx("div",{className:"flex flex-col gap-3",children:I.length>0?I.map(([s,l])=>e.jsx(O,{title:s,score:l,percentage:Math.round(l/D*100),icon:"🍛"},s)):e.jsx("span",{className:"text-xs text-neutral-500 italic",children:"No cuisine preferences logged yet."})})]}),e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsx("span",{className:"text-[10px] uppercase tracking-widest text-neutral-500 font-mono",children:"Category Preferences"}),e.jsx("div",{className:"flex flex-col gap-3",children:k.length>0?k.map(([s,l])=>e.jsx(O,{title:s,score:l,percentage:Math.round(l/d*100),icon:"🍽"},s)):e.jsx("span",{className:"text-xs text-neutral-500 italic",children:"No category preferences logged yet."})})]})]}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6 mt-2",children:[e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsx("span",{className:"text-[10px] uppercase tracking-widest text-neutral-500 font-mono",children:"Favorite Lounges"}),e.jsx("div",{className:"flex flex-col gap-2 max-h-48 overflow-y-auto pr-2 scrollbar-thin",children:b.length>0?b.map(s=>e.jsxs("div",{onClick:()=>{a(s),o&&o()},className:"p-3 rounded-lg bg-neutral-900/40 border border-neutral-800/60 hover:border-gold/30 transition-all cursor-pointer flex justify-between items-center",children:[e.jsx("span",{className:"text-xs text-neutral-300 font-medium truncate pr-4",children:s.name}),e.jsx("span",{className:"text-[9px] uppercase tracking-wider text-gold font-mono",children:s.cuisine})]},s.id)):e.jsx("span",{className:"text-xs text-neutral-500 italic",children:"No saved lounges."})})]}),e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsx("span",{className:"text-[10px] uppercase tracking-widest text-neutral-500 font-mono",children:"Recent Search Logs"}),e.jsx("div",{className:"flex flex-wrap gap-1.5",children:g.length>0?g.map((s,l)=>e.jsx("span",{className:"px-3 py-1 rounded bg-[#121212]/80 border border-neutral-800 text-[10px] text-neutral-400 font-mono",children:s},l)):e.jsx("span",{className:"text-xs text-neutral-500 italic",children:"No recent searches logged."})})]})]})]})}function X({onClearHistory:r,onResetPreferences:c,onExportData:a,user:o}){return e.jsxs("div",{className:"flex flex-col gap-6 animate-[fadeIn_300ms_ease-out] font-sans",children:[e.jsxs("div",{className:"flex flex-col gap-1.5 border-b border-neutral-900 pb-2",children:[e.jsx("h4",{className:"font-serif text-base text-neutral-200",children:"Concierge Privacy & Settings"}),e.jsx("span",{className:"text-[10px] text-neutral-500 font-light",children:"Manage your gastronomy profile history and learning metrics."})]}),e.jsxs("div",{className:"flex flex-col gap-5",children:[e.jsxs("div",{className:"flex items-center justify-between p-4 rounded-xl bg-neutral-900/20 border border-neutral-800/80",children:[e.jsxs("div",{className:"flex flex-col gap-1",children:[e.jsx("span",{className:"text-xs font-semibold text-neutral-200",children:"Export Gastronomy Data"}),e.jsx("span",{className:"text-[10px] text-neutral-500 font-light",children:"Download a JSON backup of your tracked preferences."})]}),e.jsx("button",{onClick:a,className:"px-4 py-2 rounded-lg bg-gold/10 hover:bg-gold/20 border border-gold/30 text-gold text-xs uppercase tracking-wider font-semibold transition-colors",children:"Export JSON"})]}),e.jsxs("div",{className:"flex items-center justify-between p-4 rounded-xl bg-neutral-900/20 border border-neutral-800/80",children:[e.jsxs("div",{className:"flex flex-col gap-1",children:[e.jsx("span",{className:"text-xs font-semibold text-neutral-200",children:"Clear Activity Logs"}),e.jsx("span",{className:"text-[10px] text-neutral-500 font-light",children:"Clears recently viewed list, searches, and visit logs."})]}),e.jsx("button",{onClick:r,className:"px-4 py-2 rounded-lg border border-red-500/30 hover:border-red-500/50 hover:bg-red-500/5 text-rose-400 text-xs uppercase tracking-wider font-semibold transition-all",children:"Clear History"})]}),e.jsxs("div",{className:"flex items-center justify-between p-4 rounded-xl bg-neutral-900/20 border border-neutral-800/80",children:[e.jsxs("div",{className:"flex flex-col gap-1",children:[e.jsx("span",{className:"text-xs font-semibold text-neutral-200",children:"Reset Learning Weights"}),e.jsx("span",{className:"text-[10px] text-neutral-500 font-light",children:"Completely clears your learned cuisine and category interests."})]}),e.jsx("button",{onClick:c,className:"px-4 py-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 text-xs uppercase tracking-wider font-semibold transition-all",children:"Reset Engine"})]})]})]})}function Z({preferences:r={},onSavePreferences:c}){const a=n=>{c({...r,[n]:!r[n]})},o=[{key:"aiNotifications",label:"AI Recommendations",description:"Alerts when personalized gastronomy briefs are resolved."},{key:"favorites",label:"Favorite Spot Updates",description:"Alerts when a saved lounge updates menus or schedules."},{key:"reviews",label:"Reviews Activity",description:"Alerts when new inspection reports are published on your favorites."},{key:"community",label:"Community Feedback",description:"Alerts when other food critics like your reviews."},{key:"trending",label:"Trending Alerts",description:"Notifies you of nearby trending fine dining hotspots."}];return e.jsxs("div",{className:"flex flex-col gap-5 animate-[fadeIn_300ms_ease-out] font-sans",children:[e.jsxs("div",{className:"flex flex-col gap-1 border-b border-neutral-900 pb-2",children:[e.jsx("h4",{className:"font-serif text-base text-neutral-200",children:"Alert Registry Settings"}),e.jsx("span",{className:"text-[10px] text-neutral-500 font-light",children:"Customize when you receive live updates."})]}),e.jsx("div",{className:"flex flex-col gap-4",children:o.map(({key:n,label:u,description:y})=>{const f=r[n]!==!1;return e.jsxs("div",{className:"flex items-center justify-between p-3.5 rounded-xl bg-neutral-900/10 border border-neutral-800/80",children:[e.jsxs("div",{className:"flex flex-col gap-0.5",children:[e.jsx("span",{className:"text-xs font-semibold text-neutral-200",children:u}),e.jsx("span",{className:"text-[10px] text-neutral-500 font-light",children:y})]}),e.jsx("button",{type:"button",onClick:()=>a(n),className:`w-9 h-5 rounded-full p-0.5 transition-colors duration-300 ${f?"bg-[#D4AF37]":"bg-neutral-800"}`,children:e.jsx("div",{className:`w-4 h-4 rounded-full bg-neutral-950 transition-transform duration-300 ${f?"translate-x-4":"translate-x-0"}`})})]},n)})})]})}const i=J.bind(Y.createElement);function te({isOpen:r,onClose:c,user:a,onLogin:o,onLogout:n,onUpdateProfile:u,favorites:y=[],collections:f={},recentlyViewed:C=[],firebaseConfig:g={},onSaveFirebaseConfig:m,onSelectRestaurant:w,onOpenAdmin:A,preferences:L,onClearHistory:S,onResetPreferences:F,onExportData:j,notificationPreferences:M,onSaveNotificationPreferences:I}){const[k,D]=p.useState(!1),[d,b]=p.useState("dashboard"),[s,l]=p.useState((a==null?void 0:a.displayName)||""),[v,P]=p.useState((a==null?void 0:a.photoURL)||""),[h,U]=p.useState(g.apiKey||""),[E,G]=p.useState(g.authDomain||""),[z,H]=p.useState(g.projectId||""),[T,K]=p.useState(g.appId||"");if(p.useEffect(()=>{a&&(l(a.displayName||""),P(a.photoURL||""))},[a]),!r)return null;const N=()=>{D(!0),setTimeout(()=>{c(),D(!1)},450)},V=t=>{t.preventDefault(),u&&u({displayName:s,photoURL:v})},W=t=>{t.preventDefault(),m&&m({apiKey:h,authDomain:E,projectId:z,appId:T})},q=t=>{const x=f[t]||[];return restaurants.filter($=>x.includes($.id))},B=()=>restaurants.filter(t=>C.includes(t.id)),_=!!g.apiKey;return i`
    <div className=${`fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md transition-opacity duration-500 ${k?"opacity-0":"opacity-100"}`}>
      <div className="absolute inset-0" onClick=${N}></div>
      
      <!-- Profile Modal Panel -->
      <div className=${`relative w-full max-w-3xl h-[620px] bg-[#0A0A0A] border border-gold/15 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-10 transition-transform duration-500 ease-in-out ${k?"scale-95 opacity-0":"scale-100 opacity-100"}`}>
        
        <!-- Header -->
        <div className="px-8 py-5 border-b border-gold/10 bg-gradient-to-r from-obsidian-light to-obsidian flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-semibold">Registry Dashboard</span>
            <h3 className="font-serif text-2xl text-neutral-100 font-light">Gastronomy Concierge</h3>
          </div>
          <button 
            onClick=${N} 
            className="w-8 h-8 rounded-full glass-panel border border-gold/10 flex items-center justify-center hover:scale-105 transition-all text-neutral-400 hover:text-gold"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Logged Out View -->
        ${a?i`
          <!-- Logged In View -->
          <div className="flex-1 flex overflow-hidden">
            
            <!-- Side Navigation -->
            <div className="w-56 border-r border-gold/10 p-6 flex flex-col justify-between shrink-0 bg-[#0B0B0B]">
              <div className="flex flex-col gap-1">
                <!-- User card -->
                <div className="flex items-center gap-3 pb-6 border-b border-neutral-900/60 mb-6">
                  <img src=${v||"https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"} className="w-10 h-10 rounded-full object-cover border border-gold/20 shrink-0" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-[11px] font-semibold text-neutral-200 truncate leading-tight">${s||"Member"}</span>
                    <span className="text-[9px] text-neutral-500 truncate mt-0.5">${a.email}</span>
                  </div>
                </div>

                <!-- Nav list -->
                <button onClick=${()=>b("dashboard")} className=${`w-full text-left py-2.5 px-4 rounded-lg text-xs uppercase tracking-wider transition-colors flex items-center gap-2 ${d==="dashboard"?"bg-gold/10 text-gold font-semibold border border-gold/20":"text-neutral-400 hover:text-neutral-200"}`}>
                  <span>Dashboard</span>
                </button>
                <button onClick=${()=>b("collections")} className=${`w-full text-left py-2.5 px-4 rounded-lg text-xs uppercase tracking-wider transition-colors flex items-center gap-2 ${d==="collections"?"bg-gold/10 text-gold font-semibold border border-gold/20":"text-neutral-400 hover:text-neutral-200"}`}>
                  <span>Collections</span>
                </button>
                <button onClick=${()=>b("insights")} className=${`w-full text-left py-2.5 px-4 rounded-lg text-xs uppercase tracking-wider transition-colors flex items-center gap-2 ${d==="insights"?"bg-gold/10 text-gold font-semibold border border-gold/20":"text-neutral-400 hover:text-neutral-200"}`}>
                  <span>Insights</span>
                </button>
                <button onClick=${()=>b("settings")} className=${`w-full text-left py-2.5 px-4 rounded-lg text-xs uppercase tracking-wider transition-colors flex items-center gap-2 ${d==="settings"?"bg-gold/10 text-gold font-semibold border border-gold/20":"text-neutral-400 hover:text-neutral-200"}`}>
                  <span>Settings & Privacy</span>
                </button>
              </div>

              <button 
                onClick=${n}
                className="w-full py-2.5 rounded-lg border border-red-500/10 hover:border-red-500/30 text-rose-500 text-xs uppercase tracking-wider transition-colors"
              >
                Log Out
              </button>
            </div>

            <!-- Tab Content -->
            <div className="flex-1 p-8 overflow-y-auto bg-black/20 flex flex-col gap-6">
              
              ${d==="dashboard"&&i`
                <div className="flex flex-col gap-6 animate-[fadeIn_300ms_ease-out]">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-500">Concierge Overview</span>
                    <h4 className="font-serif text-xl text-neutral-200">Welcome back, ${s||"Concierge Guest"}</h4>
                  </div>

                  <!-- Quick Stats -->
                  <div className="grid grid-cols-3 gap-4">
                    <div className="glass-panel p-4 rounded-xl border border-gold/5 flex flex-col gap-1 text-center">
                      <span className="text-[9px] uppercase tracking-wider text-neutral-500 font-semibold">Favorites</span>
                      <span className="text-xl font-serif text-gold font-bold">${y.length}</span>
                    </div>
                    <div className="glass-panel p-4 rounded-xl border border-gold/5 flex flex-col gap-1 text-center">
                      <span className="text-[9px] uppercase tracking-wider text-neutral-500 font-semibold">Collections</span>
                      <span className="text-xl font-serif text-gold font-bold">
                        ${Object.values(f).reduce((t,x)=>t+(x.length>0?1:0),0)}
                      </span>
                    </div>
                    <div className="glass-panel p-4 rounded-xl border border-gold/5 flex flex-col gap-1 text-center">
                      <span className="text-[9px] uppercase tracking-wider text-neutral-500 font-semibold">Recent Visits</span>
                      <span className="text-xl font-serif text-gold font-bold">${C.length}</span>
                    </div>
                  </div>

                  <!-- Recently Viewed Section -->
                  <div className="flex flex-col gap-3 mt-2">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-500 font-semibold">Recently Inspected Lounges</span>
                    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
                      ${B().length>0?B().map(t=>{var x;return i`
                        <div 
                          key=${t.id}
                          onClick=${()=>{w(t),N()}}
                          className="w-40 shrink-0 rounded-xl overflow-hidden bg-obsidian-light border border-neutral-900 p-2.5 flex flex-col gap-2 hover:border-gold/30 transition-all cursor-pointer"
                        >
                          <img src=${((x=t.images)==null?void 0:x[0])||"https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=150&q=80"} className="w-full h-20 object-cover rounded-lg" />
                          <div className="flex flex-col min-w-0">
                            <span className="text-[10px] font-semibold text-neutral-200 truncate font-serif">${t.name}</span>
                            <span className="text-[8px] text-gold uppercase font-mono tracking-widest mt-0.5">${t.cuisine}</span>
                          </div>
                        </div>
                      `}):i`
                        <span className="text-xs text-neutral-500 italic">No recent inspections logged.</span>
                      `}
                    </div>
                  </div>
                </div>
              `}

              ${d==="collections"&&i`
                <div className="flex flex-col gap-6 animate-[fadeIn_300ms_ease-out]">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-500">Curated Folders</span>
                    <h4 className="font-serif text-xl text-neutral-200">Your Gastronomy Collections</h4>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    ${["Date Night","Family Dining","Cafes","Hidden Gems"].map(t=>{const x=t.toLowerCase().replace(" ","_"),$=q(x);return i`
                        <div key=${x} className="glass-panel p-5 rounded-xl border border-gold/10 flex flex-col gap-3">
                          <div className="flex justify-between items-center">
                            <h5 className="text-xs font-serif font-bold text-neutral-200">${t}</h5>
                            <span className="text-[9px] font-mono text-gold px-2 py-0.5 rounded bg-gold/5 border border-gold/15">${$.length} Lounges</span>
                          </div>
                          
                          <div className="flex flex-col gap-1.5 mt-1.5">
                            ${$.length>0?$.map(R=>i`
                              <div 
                                key=${R.id}
                                onClick=${()=>{w(R),N()}}
                                className="text-[11px] text-neutral-400 hover:text-gold transition-colors font-light flex justify-between items-center cursor-pointer border-b border-neutral-900/40 pb-1"
                              >
                                <span className="truncate pr-4">${R.name}</span>
                                <span className="text-[9px] font-mono text-neutral-600">${R.cuisine}</span>
                              </div>
                            `):i`
                              <span className="text-[10px] text-neutral-600 italic">No members logged in this folder yet.</span>
                            `}
                          </div>
                        </div>
                      `})}
                  </div>
                </div>
              `}

              ${d==="settings"&&i`
                <div className="flex flex-col gap-8 animate-[fadeIn_300ms_ease-out]">
                  
                  <!-- Profile Form -->
                  <form onSubmit=${V} className="flex flex-col gap-4">
                    <div className="border-b border-neutral-900 pb-2">
                      <h4 className="font-serif text-base text-neutral-200">Concierge Profile Settings</h4>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[8px] uppercase tracking-wider text-neutral-400 font-semibold">Display Name</label>
                        <input 
                          type="text"
                          value=${s}
                          onChange=${t=>l(t.target.value)}
                          className="w-full px-4 py-2.5 rounded-lg bg-black/60 border border-gold/10 text-xs text-neutral-300 focus:border-gold/30 focus:outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[8px] uppercase tracking-wider text-neutral-400 font-semibold">Avatar Image URL</label>
                        <input 
                          type="text"
                          value=${v}
                          onChange=${t=>P(t.target.value)}
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
                  <form onSubmit=${W} className="flex flex-col gap-4">
                    <div className="border-b border-neutral-900 pb-2 flex items-center justify-between">
                      <h4 className="font-serif text-base text-neutral-200">Firebase Core Sync Credentials</h4>
                      <span className=${`text-[9px] px-2 py-0.5 rounded font-mono uppercase ${_?"bg-emerald-500/10 text-emerald-400 border border-emerald-400/20":"bg-amber-500/10 text-amber-400 border border-amber-400/20"}`}>
                        ${_?"Configured":"Offline / Mock"}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[8px] uppercase tracking-wider text-neutral-400 font-semibold">API Key</label>
                        <input 
                          type="password"
                          value=${h}
                          onChange=${t=>U(t.target.value)}
                          placeholder="AIzaSy..."
                          className="w-full px-4 py-2.5 rounded-lg bg-black/60 border border-gold/10 text-xs text-neutral-300 focus:border-gold/30 focus:outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[8px] uppercase tracking-wider text-neutral-400 font-semibold">Auth Domain</label>
                        <input 
                          type="text"
                          value=${E}
                          onChange=${t=>G(t.target.value)}
                          placeholder="project-id.firebaseapp.com"
                          className="w-full px-4 py-2.5 rounded-lg bg-black/60 border border-gold/10 text-xs text-neutral-300 focus:border-gold/30 focus:outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[8px] uppercase tracking-wider text-neutral-400 font-semibold">Project ID</label>
                        <input 
                          type="text"
                          value=${z}
                          onChange=${t=>H(t.target.value)}
                          placeholder="project-id"
                          className="w-full px-4 py-2.5 rounded-lg bg-black/60 border border-gold/10 text-xs text-neutral-300 focus:border-gold/30 focus:outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[8px] uppercase tracking-wider text-neutral-400 font-semibold">App ID</label>
                        <input 
                          type="text"
                          value=${T}
                          onChange=${t=>K(t.target.value)}
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
                    <${Z}
                      preferences=${M}
                      onSavePreferences=${I}
                    />
                  </div>

                  <!-- Privacy Settings -->
                  <div className="border-t border-neutral-900 pt-6">
                    <${X}
                      onClearHistory=${S}
                      onResetPreferences=${F}
                      onExportData=${j}
                      user=${a}
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
                        onClick=${()=>{const t=document.getElementById("admin-passcode-input").value;t==="1997"||t==="admin"?(A&&A(),N()):alert("Invalid Authorization Passcode")}}
                        className="px-4 py-2 rounded-lg bg-gold/10 border border-gold/30 hover:bg-gold/20 text-gold text-xs uppercase tracking-widest font-semibold transition-colors"
                      >
                        Authorize
                      </button>
                    </div>
                  </div>

                </div>
              `}

              ${d==="insights"&&i`
                <${Q}
                  preferences=${L}
                  restaurants=${restaurants}
                  onSelectRestaurant=${w}
                  onCloseProfile=${N}
                />
              `}

            </div>

          </div>
        `:i`
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
                onClick=${()=>o&&o(!1)}
                className="py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5C483] to-[#C9A25C] text-neutral-900 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-lg shadow-yellow-950/20"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12.24 10.285V13.4h6.887C18.2 15.614 15.645 18 12.24 18c-3.86 0-7-3.14-7-7s3.14-7 7-7c1.7 0 3.25.61 4.47 1.625l2.437-2.437C17.312 1.696 14.933 1 12.24 1 6.58 1 2 5.58 2 11.24s4.58 10.24 10.24 10.24c5.795 0 10.254-4.074 10.254-10.24 0-.695-.08-1.355-.22-1.955H12.24z"/>
                </svg>
                <span>Google Sign In</span>
              </button>
              
              <button 
                onClick=${()=>o&&o(!0)}
                className="py-3 rounded-xl border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-neutral-200 text-xs uppercase tracking-wider bg-[#121212]/40 transition-colors"
              >
                Simulate Demo Login
              </button>
            </div>
            
            <div className="text-[10px] text-neutral-600 font-mono mt-4 uppercase">
              ${_?"Firebase Authenticator Initialized":"Running in Secure Client Mode"}
            </div>
          </div>
        `}

      </div>
    </div>
  `}export{te as default};
