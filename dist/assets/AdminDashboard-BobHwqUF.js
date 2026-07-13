import{r,h as f,R as u}from"./index-Cvw9CRfK.js";const a=f.bind(u.createElement);function b({isOpen:d,onClose:i}){const[t,l]=r.useState(!1),[c,m]=r.useState([{id:1,name:"Rohit Sharma",email:"rohit@gmail.com",msg:"Loved the Royal Awadhi Biryani recommendation! The concierge is spot on.",status:"Pending"},{id:2,name:"Priya Nair",email:"priya@outlook.com",msg:"Valet parking status for Kuro Shiro needs an update in the amenities listing.",status:"Pending"},{id:3,name:"Vikram Dev",email:"vikram@dev.io",msg:"Outstanding interface. The Ruchi Score circular meter has a premium feel.",status:"Resolved"}]);if(!d)return null;const o=()=>{l(!0),setTimeout(()=>{i(),l(!1)},450)},n=(e,p)=>{m(x=>x.map(s=>s.id===e?{...s,status:p}:s))};return a`
    <div className=${`fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md transition-opacity duration-500 ${t?"opacity-0":"opacity-100"}`}>
      
      <!-- Close Overlay Backdrop -->
      <div className="absolute inset-0" onClick=${o}></div>

      <!-- Main Admin Panel Container -->
      <div className=${`relative w-full max-w-5xl h-[90vh] bg-[#0A0A0A] border border-gold/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-10 transition-transform duration-500 ease-in-out ${t?"scale-95 opacity-0":"scale-100 opacity-100"}`}>
        
        <!-- Header -->
        <div className="px-8 py-5 border-b border-gold/15 bg-gradient-to-r from-obsidian-light to-obsidian flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold font-semibold">Concierge Control</span>
            <h3 className="font-serif text-2xl text-neutral-100 font-light">Secure Telemetry Dashboard</h3>
          </div>
          <button 
            onClick=${o} 
            className="w-8 h-8 rounded-full glass-panel border border-gold/15 flex items-center justify-center hover:scale-105 transition-all text-neutral-400 hover:text-gold"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Dashboard Body (Scrollable) -->
        <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-8 bg-black/20">
          
          <!-- Key Metrics Grid -->
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-panel p-5 rounded-xl border border-gold/5 flex flex-col gap-1">
              <span className="text-[9px] uppercase tracking-wider text-neutral-500 font-semibold">Total Users Registered</span>
              <span className="text-2xl font-serif text-gold font-bold">1,482</span>
              <span className="text-[9px] text-emerald-500 mt-1 font-mono">↑ 12% this week</span>
            </div>
            <div className="glass-panel p-5 rounded-xl border border-gold/5 flex flex-col gap-1">
              <span className="text-[9px] uppercase tracking-wider text-neutral-500 font-semibold">Total Restaurant Views</span>
              <span className="text-2xl font-serif text-gold font-bold">14,290</span>
              <span className="text-[9px] text-emerald-500 mt-1 font-mono">↑ 18% this week</span>
            </div>
            <div className="glass-panel p-5 rounded-xl border border-gold/5 flex flex-col gap-1">
              <span className="text-[9px] uppercase tracking-wider text-neutral-500 font-semibold">Total Favorites Logged</span>
              <span className="text-2xl font-serif text-gold font-bold">2,891</span>
              <span className="text-[9px] text-neutral-500 mt-1 font-mono">2.1 per user average</span>
            </div>
            <div className="glass-panel p-5 rounded-xl border border-gold/5 flex flex-col gap-1">
              <span className="text-[9px] uppercase tracking-wider text-neutral-500 font-semibold">AI Concierge Queries</span>
              <span className="text-2xl font-serif text-gold font-bold">4,821</span>
              <span className="text-[9px] text-emerald-500 mt-1 font-mono">98% resolution rate</span>
            </div>
          </div>

          <!-- Mid section: Cuisine distribution & Hotspots heatmap -->
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <!-- Cuisine Analytics (CSS Bar charts) -->
            <div className="glass-panel p-6 rounded-xl border border-gold/10 flex flex-col gap-4">
              <div className="flex flex-col gap-0.5">
                <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-500 font-semibold font-sans">Advisory Distribution</span>
                <h4 className="font-serif text-base text-neutral-200">Cuisine Popularity Analysis</h4>
              </div>
              <div className="flex flex-col gap-3.5 mt-2">
                ${[{name:"Royal Awadhi",percentage:35,count:1687},{name:"Artisanal Japanese",percentage:25,count:1205},{name:"Modern South Indian",percentage:20,count:964},{name:"Contemporary French",percentage:12,count:578},{name:"New Nordic",percentage:8,count:387}].map(e=>a`
                  <div key=${e.name} className="flex flex-col gap-1">
                    <div className="flex justify-between text-xs font-light text-neutral-300">
                      <span>${e.name}</span>
                      <span className="font-mono text-gold font-semibold">${e.percentage}% (${e.count})</span>
                    </div>
                    <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden">
                      <div className="h-full bg-gold rounded-full" style=${{width:`${e.percentage}%`}}></div>
                    </div>
                  </div>
                `)}
              </div>
            </div>

            <!-- Heatmap locations -->
            <div className="glass-panel p-6 rounded-xl border border-gold/10 flex flex-col gap-4">
              <div className="flex flex-col gap-0.5">
                <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-500 font-semibold font-sans">Geographic Hotspots</span>
                <h4 className="font-serif text-base text-neutral-200">Search Density Heatmap</h4>
              </div>
              <div className="flex flex-col gap-3 mt-2">
                ${[{name:"Indiranagar quarters",count:2024,density:"High Density",color:"text-rose-400 bg-rose-500/10 border-rose-500/20"},{name:"Lavelle Road lounges",count:1349,density:"High Density",color:"text-rose-400 bg-rose-500/10 border-rose-500/20"},{name:"Koramangala central",count:864,density:"Moderate Density",color:"text-amber-400 bg-amber-500/10 border-amber-500/20"},{name:"Whitefield corridor",count:584,density:"Light Density",color:"text-emerald-400 bg-emerald-500/10 border-emerald-500/20"}].map(e=>a`
                  <div key=${e.name} className="flex items-center justify-between p-3 rounded-lg bg-[#121212]/30 border border-neutral-900">
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs text-neutral-200 font-medium">${e.name}</span>
                      <span className="text-[10px] text-neutral-500 font-mono mt-0.5">${e.count} inspection points</span>
                    </div>
                    <span className=${`text-[9px] font-mono uppercase px-2 py-0.5 rounded border shrink-0 ${e.color}`}>
                      ${e.density}
                    </span>
                  </div>
                `)}
              </div>
            </div>

          </div>

          <!-- Bottom: Restaurant Performance & User Feedback -->
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            <!-- Restaurant Performance (5 cols) -->
            <div className="lg:col-span-5 glass-panel p-6 rounded-xl border border-gold/10 flex flex-col gap-4">
              <div className="flex flex-col gap-0.5">
                <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-500 font-semibold font-sans">Lounge Telemetry</span>
                <h4 className="font-serif text-base text-neutral-200">Restaurant Performance Index</h4>
              </div>
              <div className="flex flex-col gap-3 mt-2">
                ${[{name:"Kuro Shiro",ruchi:96,views:840,favs:210},{name:"L'Ambroisie",ruchi:92,views:620,favs:180},{name:"Swarna Mahal",ruchi:89,views:480,favs:112},{name:"Noma Bangalore",ruchi:78,views:320,favs:64}].map(e=>a`
                  <div key=${e.name} className="flex justify-between items-center p-3 rounded-lg bg-[#121212]/30 border border-neutral-900">
                    <div className="flex flex-col">
                      <span className="text-xs text-neutral-200 font-medium font-serif">${e.name}</span>
                      <span className="text-[9px] text-neutral-500 font-mono mt-0.5">${e.views} views • ${e.favs} favorites</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-xs font-mono font-bold text-gold">${e.ruchi}</span>
                      <span className="text-[8px] text-neutral-600 uppercase font-mono tracking-widest">Ruchi Score</span>
                    </div>
                  </div>
                `)}
              </div>
            </div>

            <!-- Feedback management (7 cols) -->
            <div className="lg:col-span-7 glass-panel p-6 rounded-xl border border-gold/10 flex flex-col gap-4">
              <div className="flex flex-col gap-0.5">
                <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-500 font-semibold font-sans">Member registry feedback</span>
                <h4 className="font-serif text-base text-neutral-200">User Feedback Management</h4>
              </div>
              <div className="flex flex-col gap-3.5 mt-2">
                ${c.map(e=>a`
                  <div key=${e.id} className="p-4 rounded-xl bg-[#121212]/40 border border-neutral-900/60 flex flex-col gap-2">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col">
                        <span className="text-xs text-neutral-300 font-medium">${e.name} (${e.email})</span>
                      </div>
                      <span className=${`text-[9px] font-mono uppercase px-2 py-0.5 rounded border ${e.status==="Resolved"?"bg-emerald-500/10 text-emerald-400 border-emerald-500/20":e.status==="Escalated"?"bg-rose-500/10 text-rose-400 border-rose-500/20":"bg-amber-500/10 text-amber-400 border-amber-500/20"}`}>
                        ${e.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-400 font-light leading-relaxed">
                      "${e.msg}"
                    </p>
                    
                    <div className="flex gap-2 justify-end mt-1">
                      ${e.status!=="Resolved"&&a`
                        <button 
                          onClick=${()=>n(e.id,"Resolved")}
                          className="px-2.5 py-1 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 text-[9px] uppercase tracking-wider font-semibold transition-colors"
                        >
                          Resolve
                        </button>
                      `}
                      ${e.status!=="Escalated"&&a`
                        <button 
                          onClick=${()=>n(e.id,"Escalated")}
                          className="px-2.5 py-1 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 text-[9px] uppercase tracking-wider font-semibold transition-colors"
                        >
                          Escalate
                        </button>
                      `}
                    </div>
                  </div>
                `)}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  `}export{b as default};
