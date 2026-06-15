import {
  GoogleMap,
  DirectionsRenderer,
  useJsApiLoader,
} from '@react-google-maps/api';

import { useEffect, useMemo, useState } from 'react';

const GOOGLE_MAPS_LIBRARIES = ['places'];

const containerStyle = {
  width: '100%',
  height: '400px',
};

// Default center: Houston, TX area
const fallbackCenter = {
  lat: 29.7604,
  lng: -95.3698,
};

export default function RouteMap({ pickupLocation, dropoffLocation }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: GOOGLE_MAPS_LIBRARIES,
  });

  const [directions, setDirections] = useState(null);
  const [mapInstance, setMapInstance] = useState(null);

  // Pass address strings directly to DirectionsService — Google resolves them
  // accurately, no need for a third-party geocoder like Nominatim.
  useEffect(() => {
    if (!isLoaded || !pickupLocation || !dropoffLocation) return;

    setDirections(null);

    const service = new window.google.maps.DirectionsService();

    service.route(
      {
        origin: pickupLocation,
        destination: dropoffLocation,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === 'OK') {
          setDirections(result);
        } else {
          console.warn('Directions error:', status);
        }
      }
    );
  }, [isLoaded, pickupLocation, dropoffLocation]);

  // Fit map to route bounds whenever directions change
  useEffect(() => {
    if (!mapInstance || !directions) return;
    const bounds = directions.routes[0]?.bounds;
    if (bounds) mapInstance.fitBounds(bounds);
  }, [mapInstance, directions]);

  const center = useMemo(() => {
    if (directions) {
      const leg = directions.routes[0]?.legs[0];
      if (leg) {
        return {
          lat: (leg.start_location.lat() + leg.end_location.lat()) / 2,
          lng: (leg.start_location.lng() + leg.end_location.lng()) / 2,
        };
      }
    }
    return fallbackCenter;
  }, [directions]);

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={11}
      onLoad={(map) => setMapInstance(map)}
      onUnmount={() => setMapInstance(null)}
    >
      {directions && (
        <DirectionsRenderer
          directions={directions}
          options={{
            polylineOptions: {
              strokeColor: '#1a2b5e',
              strokeWeight: 5,
            },
            suppressMarkers: false,
          }}
        />
      )}
    </GoogleMap>
  );
}
