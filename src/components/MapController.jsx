import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

export default function MapController({ center, zoom, selectedRestaurant, markerRefs }) {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);

  useEffect(() => {
    if (selectedRestaurant && markerRefs.current[selectedRestaurant.id]) {
      const marker = markerRefs.current[selectedRestaurant.id];
      const timeoutId = setTimeout(() => {
        map.setView(marker.getLatLng(), 15, { animate: true });
        marker.openPopup();
        const element = marker.getElement();
        if (element) {
          element.classList.add('animate-bounce');
          element.style.transformOrigin = 'bottom center';
          setTimeout(() => {
            element.classList.remove('animate-bounce');
          }, 1500);
        }
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [selectedRestaurant, map, markerRefs]);

  return null;
}
