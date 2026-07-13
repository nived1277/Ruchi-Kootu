// RUCHI KOOTU - Custom Geolocation React Hook
import { useState, useCallback } from 'react';

export function useGeolocation() {
  const [coordinates, setCoordinates] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const detectLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError("GEOLOCATION_NOT_SUPPORTED");
      return;
    }

    setLoading(true);
    setError(null);

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setLoading(false);
      },
      (err) => {
        console.warn("Geolocation error:", err);
        if (err.code === err.PERMISSION_DENIED) {
          setError("LOCATION_DENIED");
        } else {
          setError("POSITION_UNAVAILABLE");
        }
        setLoading(false);
      },
      options
    );
  }, []);

  return { coordinates, error, setError, loading, detectLocation, setCoordinates };
}

