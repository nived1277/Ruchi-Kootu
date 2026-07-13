// RUCHI KOOTU - Cinematic Hero Section
import React, { useState } from 'react';
import htm from 'htm';
const html = htm.bind(React.createElement);

export default function HeroSection({ onDetectLocation, onSearch, loading }) {
  const [searchValue, setSearchValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  return html`
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center bg-obsidian text-center px-4 overflow-hidden pt-20">
      
      <!-- Cinematic Background -->
      <div className="aurora-bg">
        <div className="aurora-glow-1"></div>
        <div className="aurora-glow-2"></div>
      </div>
      
      <!-- Ambient Dust Particle Simulation (CSS representation) -->
      <div className="absolute inset-0 bg-transparent pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-gold rounded-full animate-ping duration-1000"></div>
        <div className="absolute top-2/3 right-1/3 w-1.5 h-1.5 bg-gold rounded-full animate-ping duration-[3000ms]"></div>
        <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-gold rounded-full animate-pulse duration-[2000ms]"></div>
      </div>

      <!-- Hero Content -->
      <div className="max-w-4xl mx-auto z-10 flex flex-col items-center">
        
        <!-- Elegant serif title with letter spacing -->
        <h1 className="text-5xl md:text-8xl font-serif text-gold-gradient tracking-[0.25em] font-light uppercase select-none relative mb-4 pt-12 fade-in-up">
          Ruchi Kootu
        </h1>
        
        <!-- Draw-in animated gold divider line -->
        <div className="w-24 md:w-36 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent my-6 opacity-75 transform scale-x-0 transition-transform duration-1000 ease-out delay-1 animate-[scaleX_1s_ease-out_forwards]"></div>
        
        <!-- Luxury subtitle -->
        <p className="text-sm md:text-lg text-neutral-400 font-light max-w-xl leading-relaxed tracking-wider mb-10 fade-in-up delay-2">
          Discover the absolute finest dining around you using live location, trusted ratings, and intelligent recommendations.
        </p>

        <!-- CTA and Search Console -->
        <div className="w-full max-w-lg flex flex-col gap-6 items-center fade-in-up delay-3 px-4">
          
          <!-- Detect Location CTA -->
          <button 
            onClick=${onDetectLocation}
            disabled=${loading}
            className="w-full md:w-auto px-10 py-4 rounded-full text-xs uppercase tracking-[0.2em] font-semibold text-neutral-900 bg-gradient-to-r from-[#D4AF37] via-[#E5C483] to-[#C9A25C] shadow-lg shadow-yellow-950/20 gold-glow-button hover:scale-105 transition-all duration-700 ease-out flex items-center justify-center gap-3"
          >
            ${loading ? html`
              <span className="w-4 h-4 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin"></span>
              <span>Locating Residence...</span>
            ` : html`
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Detect My Location</span>
            `}
          </button>

          <!-- Fine Gold Inline Glass-Pill Search -->
          <form onSubmit=${handleSubmit} className="w-full relative">
            <input 
              type="text" 
              placeholder="Or search a place, cuisine, restaurant..." 
              value=${searchValue}
              onChange=${(e) => setSearchValue(e.target.value)}
              className="w-full px-6 py-3.5 pl-12 rounded-full bg-[#0A0A0A]/60 backdrop-blur-md text-xs tracking-wider text-neutral-300 placeholder-neutral-500 border border-gold/15 focus:border-gold/50 focus:outline-none focus:ring-0 transition-all duration-500"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button 
              type="submit" 
              className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-full bg-gold/10 hover:bg-gold/20 text-gold text-[10px] tracking-wider uppercase transition-all duration-300"
            >
              Search
            </button>
          </form>
          
        </div>
      </div>

      <!-- Subtle down indicator -->
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity duration-300">
        <span className="text-[9px] uppercase tracking-[0.25em] text-neutral-500 font-sans">Scroll to Reveal</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gold animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>

    </section>
  `;
}
