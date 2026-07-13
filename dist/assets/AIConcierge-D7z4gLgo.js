import{r,h as j,R as T}from"./index-Cvw9CRfK.js";const o=j.bind(T.createElement);function O({restaurants:N=[],onSelectRestaurant:$}){const[u,g]=r.useState(!1),[m,p]=r.useState([{id:"welcome",sender:"ai",text:"Greetings. I am your Ruchi Concierge, your private gastronomy advisor. How may I guide your dining journey today?",suggestions:["Best biryani near me","Romantic dinner tonight","Budget meals under ₹300","Family restaurants","Cafes for working","Late night food"]}]),[f,h]=r.useState(""),[b,x]=r.useState(!1),v=r.useRef(null),C=()=>{var s;(s=v.current)==null||s.scrollIntoView({behavior:"smooth"})};r.useEffect(()=>{C()},[m,b]);const d=s=>{const e=s||f.trim();if(!e)return;const n={id:Date.now().toString(),sender:"user",text:e};p(i=>[...i,n]),h(""),x(!0),setTimeout(()=>{x(!1);const i=L(e);p(l=>[...l,i])},1500)},L=s=>{const e=s.toLowerCase();let n=[...N],i="I have surveyed our elite gastronomy grid and found some distinguished selections:";const l=e.includes("biryani"),w=e.includes("romantic")||e.includes("date")||e.includes("intimate"),y=e.includes("budget")||e.includes("300")||e.includes("cheap")||e.includes("affordable"),k=e.includes("family")||e.includes("kids")||e.includes("group"),A=e.includes("cafe")||e.includes("coffee")||e.includes("work")||e.includes("laptop"),I=e.includes("late")||e.includes("night")||e.includes("midnight"),M=e.includes("japanese")||e.includes("sushi")||e.includes("ramen"),S=e.includes("french")||e.includes("bistro"),B=e.includes("awadhi")||e.includes("palace")||e.includes("mughlai")||e.includes("north"),D=e.includes("south")||e.includes("kootu")||e.includes("dosa"),F=e.includes("nordic")||e.includes("botanical")||e.includes("fermented");if(l)n=n.filter(t=>t.name.toLowerCase().includes("mahal")||t.cuisine.includes("Awadhi")||t.name.toLowerCase().includes("biryani")),i="Here are the finest royal Awadhi Dum Biryanis and slow-cooked rice delicacies nearby:";else if(M)n=n.filter(t=>t.cuisine.includes("Japanese")),i="Displaying our highly rated artisanal Japanese Omakase and sushi lounges:";else if(S)n=n.filter(t=>t.cuisine.includes("French")),i="Displaying the finest contemporary French gastronomy lounges:";else if(B)n=n.filter(t=>t.cuisine.includes("Awadhi")),i="Displaying royal Awadhi dining rooms:";else if(D)n=n.filter(t=>t.cuisine.includes("South")),i="Displaying modern South Indian alchemy lounges:";else if(F)n=n.filter(t=>t.cuisine.includes("Nordic")),i="Here are the botanical New Nordic smokehouses high above the skyline:";else if(w)n=n.filter(t=>t.rating>=4.7&&(t.priceLevel>=3||t.cuisine.includes("French")||t.cuisine.includes("Japanese"))),i="For an unforgettable, intimate dining affair tonight, I highly recommend these ambient lounges:";else if(y)n=n.filter(t=>t.priceLevel<=3),i="I've filtered our grid for exceptional meals that respect your parameters (under ₹300/₹500 tier):";else if(k)n=n.filter(t=>t.priceLevel>=3||t.cuisine.includes("South")||t.cuisine.includes("Awadhi")),i="Here are our premier recommendations for large gatherings and multi-generational family dining:";else if(A)n=n.filter(t=>t.cuisine.includes("Japanese")||t.cuisine.includes("Nordic")||t.name.toLowerCase().includes("kootu")),i="These serene settings provide the perfect lighting and connectivity for daytime focus and fine teas:";else if(I)n=n.filter(t=>t.isOpen||t.name.toLowerCase().includes("kootu")),i="Surveying midnight operations. These elite spaces remain open for late-night cravings:";else{const t=e.split(" ");n=n.filter(a=>t.some(c=>a.name.toLowerCase().includes(c)||a.cuisine.toLowerCase().includes(c)||a.address.toLowerCase().includes(c)))}if(n=n.slice(0,3),n.length===0)return{id:Date.now().toString(),sender:"ai",text:"I searched all nearby quarters, but couldn't locate any dining lounges matching those specific parameters. Try requesting a cuisine style (e.g. Japanese or Awadhi) or occasion (e.g. romantic date)."};const R=n.map(t=>{const a=[`✔ ${t.rating}★ Rating on Google Grid`,`✔ Selected for ${t.cuisine} excellence`];return t.distance<=1.5?a.push(`✔ Exceptionally close (only ${t.distance.toFixed(1)} km away)`):a.push(`✔ Convenient location (${t.distance.toFixed(1)} km away)`),t.isOpen?a.push("✔ Open and ready for arrivals"):a.push("✔ Perfect option for upcoming bookings"),y?a.push("✔ Moderate price levels (₹₹ - ₹₹₹)"):t.priceLevel>=4&&a.push("✔ Opulent fine-dining tasting menu"),w&&a.push("✔ Intimate dimly-lit seating arrangement"),k&&a.push("✔ Accommodating for larger parties"),{restaurant:t,reasons:a.slice(0,5)}});return{id:Date.now().toString(),sender:"ai",text:i,recommendations:R}};return o`
    <div className="fixed bottom-24 right-8 z-40 flex flex-col items-end gap-4 pointer-events-none select-none">
      
      <!-- Floating AI Chat Panel -->
      ${u&&o`
        <div className="pointer-events-auto w-80 sm:w-96 h-[500px] rounded-2xl border border-gold/20 bg-obsidian/90 backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden animate-[fadeInUp_300ms_cubic-bezier(0.4,0,0.2,1)_forwards] select-text">
          
          <!-- Header -->
          <div className="px-5 py-4 border-b border-gold/10 bg-gradient-to-r from-obsidian-light to-obsidian flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-obsidian"></span>
                <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5 text-gold animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-semibold text-neutral-200 tracking-wider">RUCHI CONCIERGE</span>
                <span className="text-[8px] text-neutral-500 uppercase tracking-widest font-mono font-semibold">AI Gastronomy Assistant</span>
              </div>
            </div>
            
            <button 
              onClick=${()=>g(!1)}
              className="text-neutral-500 hover:text-gold transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Messages scroll area -->
          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 scrollbar-thin">
            ${m.map(s=>o`
              <div key=${s.id} className=${`flex flex-col gap-2 max-w-[85%] ${s.sender==="user"?"self-end items-end":"self-start items-start"}`}>
                
                <!-- Text Bubble -->
                <div className=${`px-4 py-3 rounded-2xl text-xs leading-relaxed ${s.sender==="user"?"bg-gold/15 text-neutral-100 border border-gold/30 rounded-tr-none font-light":"bg-[#121212]/60 text-neutral-300 border border-neutral-900 rounded-tl-none font-light"}`}>
                  ${s.text}
                </div>

                <!-- Recommendation Cards -->
                ${s.recommendations&&s.recommendations.map(e=>{var n;return o`
                  <div 
                    key=${e.restaurant.id}
                    onClick=${()=>{$(e.restaurant),showToast&&showToast(`Locating ${e.restaurant.name} on the map.`)}}
                    className="w-full rounded-xl overflow-hidden bg-obsidian-dark border border-gold/10 p-3 hover:border-gold/40 transition-all duration-300 cursor-pointer flex flex-col gap-2 shadow-lg"
                  >
                    <div className="flex gap-3">
                      <img 
                        src=${((n=e.restaurant.images)==null?void 0:n[0])||"https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80"} 
                        className="w-12 h-12 rounded-lg object-cover shrink-0 bg-neutral-900 border border-neutral-800"
                      />
                      <div className="flex flex-col min-w-0 justify-center">
                        <span className="text-[11px] font-semibold text-neutral-200 truncate font-serif tracking-wide leading-tight group-hover:text-gold">${e.restaurant.name}</span>
                        <span className="text-[9px] text-gold font-mono uppercase tracking-widest mt-0.5">${e.restaurant.cuisine}</span>
                      </div>
                    </div>
                    
                    <div className="border-t border-neutral-900 pt-2 flex flex-col gap-1">
                      <span className="text-[8px] uppercase tracking-widest text-neutral-500 font-semibold font-sans">Recommended because:</span>
                      ${e.reasons.map((i,l)=>o`
                        <div key=${l} className="flex items-center gap-1.5 text-[10px] text-neutral-400 font-light">
                          <span className="text-emerald-500 shrink-0">✔</span>
                          <span>${i.replace("✔ ","")}</span>
                        </div>
                      `)}
                    </div>
                  </div>
                `})}

                <!-- Suggestion Chips (only on welcome or under instructions) -->
                ${s.suggestions&&o`
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    ${s.suggestions.map((e,n)=>o`
                      <button
                        key=${n}
                        onClick=${()=>d(e)}
                        className="px-2.5 py-1.5 rounded-full bg-gold/5 border border-gold/15 text-[9px] uppercase tracking-wider text-gold hover:bg-gold/15 hover:border-gold/40 transition-all duration-300"
                      >
                        ${e}
                      </button>
                    `)}
                  </div>
                `}
              </div>
            `)}

            <!-- Typing indicator -->
            ${b&&o`
              <div className="flex gap-1.5 items-center self-start bg-[#121212]/60 px-4 py-3 rounded-2xl rounded-tl-none border border-neutral-900">
                <span className="w-1.5 h-1.5 rounded-full bg-gold animate-bounce" style=${{animationDelay:"0ms"}}></span>
                <span className="w-1.5 h-1.5 rounded-full bg-gold animate-bounce" style=${{animationDelay:"150ms"}}></span>
                <span className="w-1.5 h-1.5 rounded-full bg-gold animate-bounce" style=${{animationDelay:"300ms"}}></span>
              </div>
            `}

            <div ref=${v} />
          </div>

          <!-- Input Bar -->
          <div className="p-3 border-t border-gold/10 bg-[#121212]/40 shrink-0 flex gap-2 items-center">
            <input
              type="text"
              placeholder="Ask about dishes, occasion, budget..."
              value=${f}
              onChange=${s=>h(s.target.value)}
              onKeyDown=${s=>s.key==="Enter"&&d()}
              className="flex-1 px-4 py-2.5 rounded-full bg-black/60 border border-gold/10 text-xs text-neutral-300 placeholder-neutral-500 focus:border-gold/40 focus:outline-none transition-all"
            />
            <button
              onClick=${()=>d()}
              className="w-9 h-9 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#C9A25C] flex items-center justify-center text-neutral-900 shadow-md hover:scale-105 transition-transform"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>

        </div>
      `}

      <!-- Floating Button (FAB) -->
      <button
        onClick=${()=>g(!u)}
        className="pointer-events-auto w-14 h-14 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#E5C483] to-[#C9A25C] shadow-2xl flex items-center justify-center text-neutral-900 border border-gold/40 hover:scale-105 hover:shadow-gold/25 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>

    </div>
  `}export{O as default};
