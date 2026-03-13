import { useEffect, useMemo, useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const rawalpindi = [33.5651, 73.0169];
const islamabad = [33.6844, 73.0479];

function RoutePath() {
  const map = useMap();
  const routingControlRef = useRef(null);

  useEffect(() => {
    routingControlRef.current = L.Routing.control({
      waypoints: [L.latLng(rawalpindi[0], rawalpindi[1]), L.latLng(islamabad[0], islamabad[1])],
      routeWhileDragging: false,
      show: false,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      lineOptions: {
        styles: [{ color: '#1a2b5e', opacity: 0.9, weight: 6 }],
      },
      createMarker: () => null,
    }).addTo(map);

    const routingContainer = routingControlRef.current.getContainer();
    if (routingContainer) {
      routingContainer.style.display = 'none';
    }

    return () => {
      if (routingControlRef.current) {
        map.removeControl(routingControlRef.current);
      }
    };
  }, [map]);

  return null;
}

export default function RouteMap() {
  const mapCenter = useMemo(() => [33.625, 73.032], []);

  return (
    <MapContainer
      center={mapCenter}
      zoom={11}
      scrollWheelZoom
      className="w-full h-96"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={rawalpindi}>
        <Popup>Rawalpindi (Pindi)</Popup>
      </Marker>

      <Marker position={islamabad}>
        <Popup>Islamabad</Popup>
      </Marker>

      <RoutePath />
    </MapContainer>
  );
}
