import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const userIcon = L.divIcon({
  className: 'custom-user-marker',
  html: `<div class="relative flex items-center justify-center w-6 h-6">
    <span class="absolute inline-flex w-full h-full rounded-full bg-[#D4AF37] opacity-75 animate-ping"></span>
    <span class="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#D4AF37] border-2 border-[#050505]"></span>
  </div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12]
});

export default function UserMarker({ position }) {
  if (!position) return null;
  return (
    <Marker position={position} icon={userIcon}>
      <Popup>
        <div className="text-xs font-serif text-neutral-800">Your Detected Location</div>
      </Popup>
    </Marker>
  );
}
