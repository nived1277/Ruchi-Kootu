// RUCHI KOOTU - Boutique Restaurant Card Component
import React from 'react';
import htm from 'htm';
import RuchiScoreBadge from './RuchiScoreBadge.jsx';
import RecommendationReason from './RecommendationReason.jsx';
const html = htm.bind(React.createElement);

export default function RestaurantCard({ restaurant, onClick, isSelected, onNavigate }) {
  const {
    id,
    osmId,
    name,
    category,
    cuisine,
    rating,
    reviewCount,
    priceLevel,
    distance,
    estimatedTravelTime,
    ruchiScore,
    isOpen,
    image,
    photos,
    address,
    geometry,
    matchScore,
    conciergeNote
  } = restaurant;

  const cardRef = React.useRef(null);

  React.useEffect(() => {
    if (isSelected && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [isSelected]);

  // Resolve restaurant image url
  let imageUrl = 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80';
  if (photos && photos.length > 0) {
    if (typeof photos[0].getUrl === 'function') {
      imageUrl = photos[0].getUrl({ maxWidth: 500, maxHeight: 350 });
    } else if (photos[0].html_attributions) {
      imageUrl = photos[0].photo_reference ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&photoreference=${photos[0].photo_reference}` : imageUrl;
    }
  } else if (image) {
    imageUrl = image;
  }

  // Get color for Ruchi Score threshold
  const getScoreColor = (score) => {
    if (score >= 90) return '#D4AF37'; // Gold
    if (score >= 75) return '#10B981'; // Green
    if (score >= 60) return '#F59E0B'; // Orange
    return '#EF4444'; // Red
  };

  // Render rating gold stars
  const renderStars = () => {
    const stars = [];
    const val = rating || 0;
    const fullStars = Math.floor(val);
    const hasHalf = val % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(html`
          <svg key=${i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-gold">
            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
          </svg>
        `);
      } else if (i === fullStars && hasHalf) {
        stars.push(html`
          <svg key=${i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-gold/60">
            <path d="M12 1.677v16.677c-.332 0-.655.09-.942.264l-4.627 2.826c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006c.448-1.077 1.976-1.077 2.424 0z" />
          </svg>
        `);
      } else {
        stars.push(html`
          <svg key=${i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5 text-neutral-700">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499c.15-.319.642-.319.792 0l2.082 5.007a.9.9 0 00.659.479l5.404.433c.353.028.495.464.24.697l-3.905 3.344a.9.9 0 00-.259.797l1.257 5.273c.082.346-.285.614-.586.434l-4.805-2.936a.9.9 0 00-.83 0l-4.805 2.936c-.301.18-.668-.088-.586-.434l1.257-5.273a.9.9 0 00-.259-.797L3.58 10.808c-.255-.233-.114-.669.24-.697l5.404-.433a.9.9 0 00.659-.479l2.08-5.007z" />
          </svg>
        `);
      }
    }
    return stars;
  };

  const handleDirectionsClick = (e) => {
    e.stopPropagation();
    if (onNavigate) onNavigate();
    if (geometry && geometry.location) {
      const lat = typeof geometry.location.lat === 'function' ? geometry.location.lat() : geometry.location.lat;
      const lng = typeof geometry.location.lng === 'function' ? geometry.location.lng() : geometry.location.lng;
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
    } else {
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + ' ' + (address || ''))}`, '_blank');
    }
  };

  const formattedDistance = typeof distance === 'number' ? distance.toFixed(1) : distance;
  
  const scoreColor = getScoreColor(ruchiScore || 85);
  const strokeOffset = 100 - (ruchiScore || 85);

  const circularIndicator = html`<${RuchiScoreBadge} score=${ruchiScore || 85} />`;

  const cleanOsmId = (osmId || id || '').toString().replace('rest-', '');

  return html`
    <div 
      ref=${cardRef}
      onClick=${onClick}
      tabIndex="0"
      role="button"
      aria-label=${`Inspect details for ${name}, rated ${rating || 0} stars with Ruchi Score of ${ruchiScore || 85}`}
      onKeyDown=${(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick && onClick();
        }
      }}
      className=${`
        group relative rounded-2xl overflow-hidden cursor-pointer
        shimmer-sweep glass-panel
        transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1)
        hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)]
        focus:outline-none focus:ring-2 focus:ring-gold/50
        ${isSelected ? 'border-gold/50 shadow-[0_0_20px_rgba(212,175,55,0.15)] ring-1 ring-gold/20' : 'border-gold/8'}
      `}
    >
      <!-- Restaurant Image with Vignette Overlay -->
      <div className="relative h-48 w-full overflow-hidden bg-neutral-900">
        <img 
          src=${imageUrl} 
          alt=${name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
          onError=${(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80';
          }}
        />
        <!-- Dark gradient overlay for text readability -->
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent"></div>
        
        <!-- Category & Cuisine Pill Tags (Floating on image) -->
        <div className="absolute top-4 left-4 flex gap-1.5 flex-wrap">
          ${category && html`
            <span className="glass-panel px-3 py-1 rounded-full text-[9px] uppercase tracking-widest text-gold font-semibold border border-gold/30">
              ${category}
            </span>
          `}
          ${cuisine && html`
            <span className="glass-panel px-3 py-1 rounded-full text-[9px] uppercase tracking-widest text-neutral-300 font-medium border border-neutral-700">
              ${cuisine}
            </span>
          `}
        </div>

        <!-- AI Match Score Badge -->
        ${matchScore && html`
          <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/15 backdrop-blur-md border border-gold/30">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse"></span>
            <span className="text-[10px] font-semibold text-gold tracking-wide">${matchScore}% Match</span>
          </div>
        `}
      </div>

      <!-- Restaurant Info Details -->
      <div className="p-6 flex flex-col justify-between">
        <div>
          <!-- Title & Ruchi Score Circle Row -->
          <div className="flex items-start justify-between gap-4 mb-2">
            <div className="flex flex-col gap-1 min-w-0">
              <h3 className="font-serif text-lg text-neutral-100 group-hover:text-gold transition-colors duration-500 tracking-wide leading-tight truncate">
                ${name}
              </h3>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className=${`w-1.5 h-1.5 rounded-full ${isOpen ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
                <span className="text-[9px] uppercase tracking-widest text-neutral-400 font-mono">${isOpen ? 'Open' : 'Closed'}</span>
              </div>
            </div>
            ${circularIndicator}
          </div>

          <!-- Rating and Price Row -->
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <div className="flex gap-0.5">${renderStars()}</div>
              <span className="text-[11px] text-neutral-400 font-mono">(${reviewCount || 0})</span>
            </div>
            ${priceLevel && html`
              <span className="text-[11px] font-mono text-gold tracking-widest uppercase font-semibold">
                ${"₹".repeat(priceLevel)}
              </span>
            `}
          </div>

          <!-- Address details -->
          ${address && html`
            <p className="text-[11px] text-neutral-400 font-light leading-relaxed mb-2 line-clamp-2">
              ${address}
            </p>
          `}

          <!-- Why Recommended Section -->
          <${RecommendationReason} reasons=${restaurant.ruchiReasons} />

          <!-- OpenStreetMap ID Details -->
          <div className="text-[10px] text-neutral-500 font-mono tracking-wider mb-3">
            OSM ID: ${cleanOsmId}
          </div>

          <!-- Concierge AI recommendation snippet -->
          ${conciergeNote && html`
            <p className="text-[11px] text-neutral-400 italic font-light border-l border-gold/30 pl-3 leading-relaxed mb-4">
              "${conciergeNote}"
            </p>
          `}
        </div>

        <!-- Premium CTA Action Buttons -->
        <div className="flex gap-2.5 mb-4 mt-2">
          <button 
            onClick=${(e) => {
              e.stopPropagation();
              onClick && onClick();
            }}
            className="flex-1 py-2 rounded-lg bg-gold/10 hover:bg-gold/20 border border-gold/30 hover:border-gold/60 text-[10px] uppercase tracking-wider text-gold font-semibold transition-all duration-300 flex items-center justify-center gap-1.5"
          >
            <span>View on Map</span>
          </button>
          <button 
            onClick=${handleDirectionsClick}
            className="flex-1 py-2 rounded-lg border border-gold/20 hover:border-gold/50 text-[10px] uppercase tracking-wider text-neutral-300 hover:text-gold font-medium bg-[#121212]/30 transition-all duration-300 flex items-center justify-center gap-1.5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <span>Navigate</span>
          </button>
        </div>

        <!-- Distance Footer -->
        <div className="flex items-center justify-between pt-4 border-t border-neutral-900/60 text-[10px] tracking-wider text-neutral-500 font-mono uppercase">
          <div className="flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-gold/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>${isOpen ? "Available Now" : "Opens Tomorrow"}</span>
          </div>
          <div className="flex flex-col items-end">
            <span>${formattedDistance ? `${formattedDistance} km away` : 'Calculating...'}</span>
            ${estimatedTravelTime && html`<span className="text-[9px] text-neutral-500 font-sans tracking-normal normal-case mt-0.5">${estimatedTravelTime} min drive</span>`}
          </div>
        </div>
      </div>
    </div>
  `;
}
