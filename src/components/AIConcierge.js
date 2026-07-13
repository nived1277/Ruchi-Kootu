// RUCHI KOOTU - Premium AI Concierge Chat Assistant
import React, { useState, useEffect, useRef } from 'react';
import htm from 'htm';
const html = htm.bind(React.createElement);

export default function AIConcierge({ restaurants = [], onSelectRestaurant }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      sender: "ai",
      text: "Greetings. I am your Ruchi Concierge, your private gastronomy advisor. How may I guide your dining journey today?",
      suggestions: [
        "Best biryani near me",
        "Romantic dinner tonight",
        "Budget meals under ₹300",
        "Family restaurants",
        "Cafes for working",
        "Late night food"
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textToSend) => {
    const text = textToSend || inputValue.trim();
    if (!text) return;

    // Add user message
    const userMsg = {
      id: Date.now().toString(),
      sender: "user",
      text
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI thinking and reply
    setTimeout(() => {
      setIsTyping(false);
      const parsedReply = parseQueryAndRecommend(text);
      setMessages(prev => [...prev, parsedReply]);
    }, 1500);
  };

  // Natural Language Parser
  const parseQueryAndRecommend = (query) => {
    const q = query.toLowerCase();
    let matches = [...restaurants];
    let replyText = "I have surveyed our elite gastronomy grid and found some distinguished selections:";
    
    // Parse filters
    const isBiryani = q.includes("biryani");
    const isRomantic = q.includes("romantic") || q.includes("date") || q.includes("intimate");
    const isBudget = q.includes("budget") || q.includes("300") || q.includes("cheap") || q.includes("affordable");
    const isFamily = q.includes("family") || q.includes("kids") || q.includes("group");
    const isCafe = q.includes("cafe") || q.includes("coffee") || q.includes("work") || q.includes("laptop");
    const isLateNight = q.includes("late") || q.includes("night") || q.includes("midnight");
    
    // Specific cuisine searches
    const isJapanese = q.includes("japanese") || q.includes("sushi") || q.includes("ramen");
    const isFrench = q.includes("french") || q.includes("bistro");
    const isAwadhi = q.includes("awadhi") || q.includes("palace") || q.includes("mughlai") || q.includes("north");
    const isSouth = q.includes("south") || q.includes("kootu") || q.includes("dosa");
    const isNordic = q.includes("nordic") || q.includes("botanical") || q.includes("fermented");

    // Filter logic
    if (isBiryani) {
      matches = matches.filter(r => r.name.toLowerCase().includes("mahal") || r.cuisine.includes("Awadhi") || r.name.toLowerCase().includes("biryani"));
      replyText = "Here are the finest royal Awadhi Dum Biryanis and slow-cooked rice delicacies nearby:";
    } else if (isJapanese) {
      matches = matches.filter(r => r.cuisine.includes("Japanese"));
      replyText = "Displaying our highly rated artisanal Japanese Omakase and sushi lounges:";
    } else if (isFrench) {
      matches = matches.filter(r => r.cuisine.includes("French"));
      replyText = "Displaying the finest contemporary French gastronomy lounges:";
    } else if (isAwadhi) {
      matches = matches.filter(r => r.cuisine.includes("Awadhi"));
      replyText = "Displaying royal Awadhi dining rooms:";
    } else if (isSouth) {
      matches = matches.filter(r => r.cuisine.includes("South"));
      replyText = "Displaying modern South Indian alchemy lounges:";
    } else if (isNordic) {
      matches = matches.filter(r => r.cuisine.includes("Nordic"));
      replyText = "Here are the botanical New Nordic smokehouses high above the skyline:";
    } else if (isRomantic) {
      matches = matches.filter(r => r.rating >= 4.7 && (r.priceLevel >= 3 || r.cuisine.includes("French") || r.cuisine.includes("Japanese")));
      replyText = "For an unforgettable, intimate dining affair tonight, I highly recommend these ambient lounges:";
    } else if (isBudget) {
      matches = matches.filter(r => r.priceLevel <= 3);
      replyText = "I've filtered our grid for exceptional meals that respect your parameters (under ₹300/₹500 tier):";
    } else if (isFamily) {
      matches = matches.filter(r => r.priceLevel >= 3 || r.cuisine.includes("South") || r.cuisine.includes("Awadhi"));
      replyText = "Here are our premier recommendations for large gatherings and multi-generational family dining:";
    } else if (isCafe) {
      matches = matches.filter(r => r.cuisine.includes("Japanese") || r.cuisine.includes("Nordic") || r.name.toLowerCase().includes("kootu"));
      replyText = "These serene settings provide the perfect lighting and connectivity for daytime focus and fine teas:";
    } else if (isLateNight) {
      matches = matches.filter(r => r.isOpen || r.name.toLowerCase().includes("kootu"));
      replyText = "Surveying midnight operations. These elite spaces remain open for late-night cravings:";
    } else {
      // General keyword search fallback
      const keywords = q.split(" ");
      matches = matches.filter(r => 
        keywords.some(k => 
          r.name.toLowerCase().includes(k) || 
          r.cuisine.toLowerCase().includes(k) || 
          r.address.toLowerCase().includes(k)
        )
      );
    }

    // Sort by match score
    matches = matches.slice(0, 3);

    if (matches.length === 0) {
      return {
        id: Date.now().toString(),
        sender: "ai",
        text: "I searched all nearby quarters, but couldn't locate any dining lounges matching those specific parameters. Try requesting a cuisine style (e.g. Japanese or Awadhi) or occasion (e.g. romantic date)."
      };
    }

    // Map matches to recommendations with reasoning
    const recommendations = matches.map(r => {
      const reasons = [
        `✔ ${r.rating}★ Rating on Google Grid`,
        `✔ Selected for ${r.cuisine} excellence`
      ];

      if (r.distance <= 1.5) {
        reasons.push(`✔ Exceptionally close (only ${r.distance.toFixed(1)} km away)`);
      } else {
        reasons.push(`✔ Convenient location (${r.distance.toFixed(1)} km away)`);
      }

      if (r.isOpen) {
        reasons.push("✔ Open and ready for arrivals");
      } else {
        reasons.push("✔ Perfect option for upcoming bookings");
      }

      if (isBudget) {
        reasons.push("✔ Moderate price levels (₹₹ - ₹₹₹)");
      } else if (r.priceLevel >= 4) {
        reasons.push("✔ Opulent fine-dining tasting menu");
      }

      if (isRomantic) {
        reasons.push("✔ Intimate dimly-lit seating arrangement");
      }
      if (isFamily) {
        reasons.push("✔ Accommodating for larger parties");
      }

      return {
        restaurant: r,
        reasons: reasons.slice(0, 5) // Top 5 reasons
      };
    });

    return {
      id: Date.now().toString(),
      sender: "ai",
      text: replyText,
      recommendations
    };
  };

  return html`
    <div className="fixed bottom-24 right-8 z-40 flex flex-col items-end gap-4 pointer-events-none select-none">
      
      <!-- Floating AI Chat Panel -->
      ${isOpen && html`
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
              onClick=${() => setIsOpen(false)}
              className="text-neutral-500 hover:text-gold transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Messages scroll area -->
          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 scrollbar-thin">
            ${messages.map(msg => html`
              <div key=${msg.id} className=${`flex flex-col gap-2 max-w-[85%] ${msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'}`}>
                
                <!-- Text Bubble -->
                <div className=${`px-4 py-3 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === 'user' 
                    ? 'bg-gold/15 text-neutral-100 border border-gold/30 rounded-tr-none font-light' 
                    : 'bg-[#121212]/60 text-neutral-300 border border-neutral-900 rounded-tl-none font-light'
                }`}>
                  ${msg.text}
                </div>

                <!-- Recommendation Cards -->
                ${msg.recommendations && msg.recommendations.map(rec => html`
                  <div 
                    key=${rec.restaurant.id}
                    onClick=${() => {
                      onSelectRestaurant(rec.restaurant);
                      showToast && showToast(`Locating ${rec.restaurant.name} on the map.`);
                    }}
                    className="w-full rounded-xl overflow-hidden bg-obsidian-dark border border-gold/10 p-3 hover:border-gold/40 transition-all duration-300 cursor-pointer flex flex-col gap-2 shadow-lg"
                  >
                    <div className="flex gap-3">
                      <img 
                        src=${rec.restaurant.images?.[0] || 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80'} 
                        className="w-12 h-12 rounded-lg object-cover shrink-0 bg-neutral-900 border border-neutral-800"
                      />
                      <div className="flex flex-col min-w-0 justify-center">
                        <span className="text-[11px] font-semibold text-neutral-200 truncate font-serif tracking-wide leading-tight group-hover:text-gold">${rec.restaurant.name}</span>
                        <span className="text-[9px] text-gold font-mono uppercase tracking-widest mt-0.5">${rec.restaurant.cuisine}</span>
                      </div>
                    </div>
                    
                    <div className="border-t border-neutral-900 pt-2 flex flex-col gap-1">
                      <span className="text-[8px] uppercase tracking-widest text-neutral-500 font-semibold font-sans">Recommended because:</span>
                      ${rec.reasons.map((reason, idx) => html`
                        <div key=${idx} className="flex items-center gap-1.5 text-[10px] text-neutral-400 font-light">
                          <span className="text-emerald-500 shrink-0">✔</span>
                          <span>${reason.replace("✔ ", "")}</span>
                        </div>
                      `)}
                    </div>
                  </div>
                `)}

                <!-- Suggestion Chips (only on welcome or under instructions) -->
                ${msg.suggestions && html`
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    ${msg.suggestions.map((suggestion, idx) => html`
                      <button
                        key=${idx}
                        onClick=${() => handleSend(suggestion)}
                        className="px-2.5 py-1.5 rounded-full bg-gold/5 border border-gold/15 text-[9px] uppercase tracking-wider text-gold hover:bg-gold/15 hover:border-gold/40 transition-all duration-300"
                      >
                        ${suggestion}
                      </button>
                    `)}
                  </div>
                `}
              </div>
            `)}

            <!-- Typing indicator -->
            ${isTyping && html`
              <div className="flex gap-1.5 items-center self-start bg-[#121212]/60 px-4 py-3 rounded-2xl rounded-tl-none border border-neutral-900">
                <span className="w-1.5 h-1.5 rounded-full bg-gold animate-bounce" style=${{ animationDelay: '0ms' }}></span>
                <span className="w-1.5 h-1.5 rounded-full bg-gold animate-bounce" style=${{ animationDelay: '150ms' }}></span>
                <span className="w-1.5 h-1.5 rounded-full bg-gold animate-bounce" style=${{ animationDelay: '300ms' }}></span>
              </div>
            `}

            <div ref=${messagesEndRef} />
          </div>

          <!-- Input Bar -->
          <div className="p-3 border-t border-gold/10 bg-[#121212]/40 shrink-0 flex gap-2 items-center">
            <input
              type="text"
              placeholder="Ask about dishes, occasion, budget..."
              value=${inputValue}
              onChange=${(e) => setInputValue(e.target.value)}
              onKeyDown=${(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 px-4 py-2.5 rounded-full bg-black/60 border border-gold/10 text-xs text-neutral-300 placeholder-neutral-500 focus:border-gold/40 focus:outline-none transition-all"
            />
            <button
              onClick=${() => handleSend()}
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
        onClick=${() => setIsOpen(!isOpen)}
        className="pointer-events-auto w-14 h-14 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#E5C483] to-[#C9A25C] shadow-2xl flex items-center justify-center text-neutral-900 border border-gold/40 hover:scale-105 hover:shadow-gold/25 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>

    </div>
  `;
}
