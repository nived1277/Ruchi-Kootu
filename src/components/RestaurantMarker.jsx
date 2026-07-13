import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const getRestaurantIcon = (isSelected) => {
  return L.divIcon({
    className: 'custom-restaurant-marker',
    html: isSelected
      ? `<div class="w-5 h-5 rounded-full bg-white border-[4px] border-[#D4AF37] shadow-lg shadow-gold/50 transition-all duration-300"></div>`
      : `<div class="w-3.5 h-3.5 rounded-full bg-[#D4AF37] border-2 border-[#050505] hover:scale-125 transition-all duration-300"></div>`,
    iconSize: isSelected ? [20, 20] : [14, 14],
    iconAnchor: isSelected ? [10, 10] : [7, 7]
  });
};

export default function RestaurantMarker({ restaurant, isSelected, onSelect, markerRef }) {
  const pos = restaurant.geometry && restaurant.geometry.location
    ? [restaurant.geometry.location.lat, restaurant.geometry.location.lng]
    : (restaurant.lat && restaurant.lng ? [restaurant.lat, restaurant.lng] : null);

  if (!pos) return null;

  const osmIdPart = restaurant.id.replace('rest-', '');
  const osmLink = `https://www.openstreetmap.org/${restaurant.osmType || 'node'}/${osmIdPart}`;

  return (
    <Marker
      position={pos}
      icon={getRestaurantIcon(isSelected)}
      ref={markerRef}
      eventHandlers={{
        click: () => onSelect && onSelect(restaurant)
      }}
    >
      <Popup>
        <div className="text-xs font-sans text-neutral-900 p-1 flex flex-col gap-1 select-text">
          <div className="font-semibold text-neutral-900 leading-tight">{restaurant.name}</div>
          <div className="text-[10px] text-neutral-500 font-medium mt-0.5">Category: {restaurant.category || 'Restaurant'}</div>
          <div className="text-[10px] text-neutral-500 font-medium">Distance: {restaurant.distance ? `${restaurant.distance.toFixed(2)} km` : 'N/A'}</div>
          <a
            href={osmLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-[#D4AF37] hover:underline mt-1 font-semibold flex items-center gap-0.5"
            onClick={(e) => e.stopPropagation()}
          >
            View on OpenStreetMap
          </a>
        </div>
      </Popup>
    </Marker>
  );
}
