import React from 'react';

export default function RestaurantInfo({ restaurant }) {
  if (!restaurant) return null;

  const {
    name,
    category,
    cuisine,
    distance,
    address,
    geometry,
    osmId,
    osmType,
    isOpen,
    rating,
    reviewCount,
    priceLevel
  } = restaurant;

  const cleanOsmId = (osmId || '').toString().replace('rest-', '');
  const cleanOsmType = osmType || 'node';
  const osmLink = `https://www.openstreetmap.org/${cleanOsmType}/${cleanOsmId}`;

  const lat = geometry?.location?.lat || restaurant.lat;
  const lng = geometry?.location?.lng || restaurant.lng;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="font-serif text-3xl md:text-4xl text-neutral-100 font-light tracking-wide leading-tight">
          {name}
        </h2>
        
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-neutral-400">
          {rating && (
            <div className="flex items-center gap-1 text-gold">
              <span className="font-mono font-semibold">{rating}</span>
              <span className="text-neutral-500 font-mono">({reviewCount || 0} reviews)</span>
            </div>
          )}
          {rating && <span className="text-neutral-800">•</span>}
          {priceLevel && (
            <>
              <span className="font-mono text-gold font-semibold">{"₹".repeat(priceLevel)}</span>
              <span className="text-neutral-800">•</span>
            </>
          )}
          <span className="font-mono">{distance ? `${distance.toFixed(2)} km away` : 'Calculating...'}</span>
          <span className="text-neutral-800">•</span>
          <span className={`font-mono uppercase text-[10px] tracking-wider px-2 py-0.5 rounded-full ${isOpen ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-400/20' : 'bg-rose-500/10 text-rose-400 border border-rose-400/20'}`}>
            {isOpen ? 'Open Now' : 'Closed'}
          </span>
        </div>
      </div>

      <div className="h-[1px] bg-gradient-to-r from-gold/30 via-transparent to-transparent w-full"></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#121212]/40 p-5 rounded-xl border border-neutral-900">
        <div className="flex flex-col gap-1">
          <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-500 font-semibold">Category</span>
          <span className="text-xs text-neutral-200 font-medium">{category || 'Restaurant'}</span>
        </div>

        {cuisine && (
          <div className="flex flex-col gap-1">
            <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-500 font-semibold">Cuisine</span>
            <span className="text-xs text-neutral-200 font-medium">{cuisine}</span>
          </div>
        )}

        <div className="flex flex-col gap-1 sm:col-span-2">
          <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-500 font-semibold">Address</span>
          <span className="text-xs text-neutral-300 font-light leading-relaxed">{address || 'No address details registered.'}</span>
        </div>

        {lat && lng && (
          <div className="flex flex-col gap-1 sm:col-span-2">
            <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-500 font-semibold">Coordinates</span>
            <span className="text-xs text-neutral-400 font-mono">Lat: {Number(lat).toFixed(6)}, Lng: {Number(lng).toFixed(6)}</span>
          </div>
        )}

        <div className="flex flex-col gap-1 sm:col-span-2 border-t border-neutral-900/60 pt-3 mt-1">
          <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-500 font-semibold">OpenStreetMap Reference</span>
          <div className="flex flex-wrap items-center justify-between gap-2 mt-1">
            <span className="text-xs text-neutral-400 font-mono">OSM ID: {cleanOsmId}</span>
            <a
              href={osmLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-gold hover:underline font-semibold flex items-center gap-0.5"
            >
              OpenStreetMap Link
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
