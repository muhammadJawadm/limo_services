import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useJsApiLoader,
} from '@react-google-maps/api';

import { useEffect, useMemo, useState } from 'react';

const libraries = ['places'];

const containerStyle = {
  width: '100%',
  height: '400px',
};

const fallbackCenter = {
  lat: 33.625,
  lng: 73.032,
};

export default function RouteMap({
  pickupLocation,
  dropoffLocation,
}) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [pickupCoords, setPickupCoords] = useState(null);
  const [dropoffCoords, setDropoffCoords] = useState(null);
  const [directions, setDirections] = useState(null);

  // -----------------------------
  // GEOCODE PICKUP
  // -----------------------------
  useEffect(() => {
    if (!pickupLocation) return;

    const controller = new AbortController();

    const load = async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(
            pickupLocation
          )}`,
          { signal: controller.signal }
        );

        const data = await res.json();

        if (data?.length > 0) {
          setPickupCoords({
            lat: Number(data[0].lat),
            lng: Number(data[0].lon),
          });
        } else {
          setPickupCoords(null);
        }
      } catch (err) {
        setPickupCoords(null);
        console.error('Error geocoding pickup location:', err);
      }
    };

    load();
    return () => controller.abort();
  }, [pickupLocation]);

  // -----------------------------
  // GEOCODE DROPOFF
  // -----------------------------
  useEffect(() => {
    if (!dropoffLocation) return;

    const controller = new AbortController();

    const load = async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(
            dropoffLocation
          )}`,
          { signal: controller.signal }
        );

        const data = await res.json();

        if (data?.length > 0) {
          setDropoffCoords({
            lat: Number(data[0].lat),
            lng: Number(data[0].lon),
          });
        } else {
          setDropoffCoords(null);
        }
      } catch (err) {
        setDropoffCoords(null);
        console.error('Error geocoding dropoff location:', err);
      }
    };

    load();
    return () => controller.abort();
  }, [dropoffLocation]);

  // -----------------------------
  // GET DIRECTIONS (REAL ROUTE)
  // -----------------------------
  useEffect(() => {
    if (!isLoaded) return;
    if (!pickupCoords || !dropoffCoords) return;

    const service = new window.google.maps.DirectionsService();

    service.route(
      {
        origin: pickupCoords,
        destination: dropoffCoords,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === 'OK') {
          setDirections(result);
        } else {
          console.log('Directions error:', status);
        }
      }
    );
  }, [pickupCoords, dropoffCoords, isLoaded]);

  // -----------------------------
  // MAP CENTER
  // -----------------------------
  const center = useMemo(() => {
    if (pickupCoords) return pickupCoords;
    return fallbackCenter;
  }, [pickupCoords]);

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={11}
    >
      {/* MARKERS */}
      {pickupCoords && <Marker position={pickupCoords} />}
      {dropoffCoords && <Marker position={dropoffCoords} />}

      {/* REAL ROUTE LINE */}
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