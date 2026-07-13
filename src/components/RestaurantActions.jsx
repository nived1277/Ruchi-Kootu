import React from 'react';

export default function RestaurantActions({ restaurant, isFavorite, onToggleFavorite, showToast }) {
  if (!restaurant) return null;

  const {
    name,
    address,
    geometry,
    website,
    osmId,
    osmType
  } = restaurant;

  const lat = geometry?.location?.lat || restaurant.lat;
  const lng = geometry?.location?.lng || restaurant.lng;

  const cleanOsmId = (osmId || '').toString().replace('rest-', '');
  const cleanOsmType = osmType || 'node';
  const osmLink = `https://www.openstreetmap.org/${cleanOsmType}/${cleanOsmId}`;

  const handleNavigate = () => {
    if (lat && lng) {
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
    } else {
      window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + ' ' + (address || ''))}`, '_blank');
    }
  };

  const handleOpenOsm = () => {
    window.open(osmLink, '_blank');
  };

  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      if (showToast) showToast('Address copied to clipboard.');
    } else {
      if (showToast) showToast('No address registered to copy.');
    }
  };

  const handleShare = () => {
    const shareUrl = website || osmLink || window.location.href;
    navigator.clipboard.writeText(shareUrl);
    if (showToast) showToast(`Registry share link for "${name}" copied to clipboard.`);
  };

  const handleToggleFav = () => {
    if (onToggleFavorite) {
      onToggleFavorite();
      if (showToast) {
        showToast(isFavorite ? `Removed "${name}" from favorites.` : `Saved "${name}" to favorites.`);
      }
    }
  };

  return (
    <div className="flex flex-col gap-3 mt-4">
      {/* Primary Get Directions CTA */}
      <button
        onClick={handleNavigate}
        className="w-full py-3.5 rounded-xl text-[10px] uppercase tracking-[0.15em] font-semibold text-neutral-900 bg-gradient-to-r from-[#D4AF37] via-[#E5C483] to-[#C9A25C] shadow-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2 gold-glow-button"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
        <span>Get Directions</span>
      </button>

      {/* Grid Actions */}
      <div className="grid grid-cols-2 gap-2.5">
        <button
          onClick={handleOpenOsm}
          className="py-3 rounded-lg text-[10px] uppercase tracking-[0.1em] font-semibold text-gold border border-gold/30 bg-gold/5 hover:bg-gold/10 transition-all flex items-center justify-center gap-1.5"
        >
          <span>Open OSM</span>
        </button>
        <button
          onClick={handleCopyAddress}
          className="py-3 rounded-lg text-[10px] uppercase tracking-[0.1em] font-semibold text-neutral-300 border border-neutral-800 bg-neutral-900/40 hover:border-neutral-700 transition-all flex items-center justify-center gap-1.5"
        >
          <span>Copy Address</span>
        </button>
        <button
          onClick={handleShare}
          className="py-3 rounded-lg text-[10px] uppercase tracking-[0.1em] font-semibold text-neutral-300 border border-neutral-800 bg-neutral-900/40 hover:border-neutral-700 transition-all flex items-center justify-center gap-1.5"
        >
          <span>Share Lounge</span>
        </button>
        <button
          onClick={handleToggleFav}
          className={`py-3 rounded-lg text-[10px] uppercase tracking-[0.1em] font-semibold transition-all flex items-center justify-center gap-1.5 border ${
            isFavorite
              ? 'bg-gold/25 border-gold text-gold font-bold shadow-[0_0_12px_rgba(212,175,55,0.2)]'
              : 'border-neutral-800 bg-neutral-900/40 text-neutral-400 hover:text-gold hover:border-gold/35'
          }`}
        >
          <span>{isFavorite ? 'In Registry' : 'Save Registry'}</span>
        </button>
      </div>
    </div>
  );
}
