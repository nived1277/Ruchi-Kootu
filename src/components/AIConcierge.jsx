import React, { useState, useEffect } from 'react';

export default function AIConcierge({ query, setQuery, isProcessing }) {
  const [inputValue, setInputValue] = useState(query || "");
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('RUCHI_RECENT_AI_SEARCHES') || '[]');
    } catch {
      return [];
    }
  });

  // Sync internal input value if parent query is cleared or updated externally
  useEffect(() => {
    setInputValue(query || "");
  }, [query]);

  const suggestions = [
    "Best biryani under ₹300",
    "Quiet cafe for work",
    "Romantic dinner",
    "Family restaurant",
    "Open now"
  ];

  const saveRecentSearch = (search) => {
    const trimmed = search.trim();
    if (!trimmed) return;
    const filtered = recentSearches.filter(s => s.toLowerCase() !== trimmed.toLowerCase());
    const updated = [trimmed, ...filtered].slice(0, 10);
    setRecentSearches(updated);
    try {
      localStorage.setItem('RUCHI_RECENT_AI_SEARCHES', JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save search history", e);
    }
  };

  const handleSearchExecute = (val) => {
    const targetVal = val !== undefined ? val : inputValue;
    const trimmed = targetVal.trim();
    if (!trimmed) return;

    saveRecentSearch(trimmed);
    setInputValue(trimmed);
    setQuery(trimmed);
  };

  const handleClear = () => {
    setInputValue("");
    setQuery("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchExecute();
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full bg-[#0A0A0A]/40 border border-gold/10 p-5 rounded-2xl glass-panel relative overflow-hidden animate-[fadeInUp_500ms_ease-out]">
      {/* Premium accent border indicator */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/45 to-transparent" />
      
      <div className="flex items-center gap-2">
        <span className="text-xs text-gold animate-pulse">✨</span>
        <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold font-mono">
          Ruchi AI Concierge Advisor
        </span>
        {isProcessing && (
          <span className="text-[9px] uppercase tracking-widest text-neutral-400 font-mono animate-pulse ml-auto flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-bounce"></span>
            Consulting AI...
          </span>
        )}
      </div>

      {/* Primary search input row */}
      <div className="flex gap-2 w-full items-center">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Ask RUCHI AI anything..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={isProcessing}
            className={`
              w-full px-5 py-3.5 pl-12 pr-10 rounded-xl bg-black/60 text-xs tracking-wider text-neutral-200 placeholder-neutral-500 border focus:outline-none transition-all duration-300
              ${isProcessing ? 'border-gold/30 bg-neutral-900/30' : 'border-gold/15 focus:border-gold/45'}
            `}
          />
          {/* AI Icon */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gold">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          
          {/* Clear button inside input */}
          {inputValue && (
            <button
              onClick={handleClear}
              disabled={isProcessing}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-gold transition-colors duration-300 disabled:opacity-30"
              title="Clear search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Gold Search Button */}
        <button
          onClick={() => handleSearchExecute()}
          disabled={isProcessing || !inputValue.trim()}
          className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C9A25C] text-neutral-950 text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none shadow-lg shadow-gold/10"
        >
          {isProcessing ? (
            <span className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
              Searching
            </span>
          ) : (
            "Search"
          )}
        </button>
      </div>

      {/* Suggested chips (Secondary) */}
      <div className="flex flex-wrap gap-1.5 items-center">
        <span className="text-[9px] text-neutral-500 font-mono tracking-wider">Suggestions:</span>
        {suggestions.map((s, idx) => (
          <button
            key={idx}
            onClick={() => handleSearchExecute(s)}
            disabled={isProcessing}
            className="px-2.5 py-1 rounded-full bg-gold/5 border border-gold/15 text-[9px] uppercase tracking-wider text-neutral-400 hover:text-gold hover:bg-gold/10 hover:border-gold/35 transition-all duration-300 font-medium"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Recent Searches History */}
      {recentSearches.length > 0 && (
        <div className="flex flex-col gap-2 border-t border-gold/5 pt-3">
          <div className="flex items-center justify-between">
            <span className="text-[9px] text-neutral-500 font-mono uppercase tracking-wider">Recent Searches</span>
            <button
              onClick={() => {
                setRecentSearches([]);
                localStorage.removeItem('RUCHI_RECENT_AI_SEARCHES');
              }}
              className="text-[8px] text-neutral-600 hover:text-gold uppercase tracking-wider font-mono transition-colors"
            >
              Clear History
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {recentSearches.map((search, idx) => (
              <button
                key={idx}
                onClick={() => handleSearchExecute(search)}
                disabled={isProcessing}
                className="px-2 py-0.5 rounded bg-neutral-900/60 border border-neutral-800 text-[9px] text-neutral-400 hover:text-gold hover:border-gold/30 transition-all font-mono"
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
