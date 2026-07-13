import React, { useRef } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import MapController from './MapController.jsx';
import UserMarker from './UserMarker.jsx';
import RestaurantMarker from './RestaurantMarker.jsx';

export default function MapView({
  userCoordinates,
  restaurants = [],
  selectedRestaurant,
  onSelectRestaurant
}) {
  if (!userCoordinates) return null;
  const center = [userCoordinates.lat, userCoordinates.lng];
  const zoom = 15;
  const markerRefs = useRef({});

  return (
    <div className="relative w-full h-[500px] rounded-2xl overflow-hidden border border-gold/15 shadow-xl select-none group z-0">
      <MapContainer
        center={center}
        zoom={zoom}
        zoomControl={true}
        className="w-full h-full bg-[#050505]"
      >
        <MapController
          center={center}
          zoom={zoom}
          selectedRestaurant={selectedRestaurant}
          markerRefs={markerRefs}
        />
        
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />

        <UserMarker position={center} />

        {restaurants.map((rest) => (
          <RestaurantMarker
            key={rest.id}
            restaurant={rest}
            isSelected={selectedRestaurant && selectedRestaurant.id === rest.id}
            onSelect={onSelectRestaurant}
            markerRef={(ref) => {
              if (ref) {
                markerRefs.current[rest.id] = ref;
              } else {
                delete markerRefs.current[rest.id];
              }
            }}
          />
        ))}
      </MapContainer>

      {/* Map Overlay HUD indicator */}
      <div className="absolute top-6 left-6 z-10 glass-panel px-4 py-2.5 rounded-xl border border-gold/15 flex flex-col gap-1 pointer-events-none">
        <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-500 font-semibold">Concierge Grid Mapping</span>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-gold"></span>
            <span className="text-[10px] text-neutral-300 font-mono">Dining Lounge</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
            <span className="text-[10px] text-neutral-400 font-mono">Your Location</span>
          </div>
        </div>
      </div>
    </div>
  );
}
