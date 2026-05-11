
"use client";
import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const MapClickHandler = ({ onAddressSelect }) => {
  const [position, setPosition] = useState(null);

  useMapEvents({
    async click(e) {
      const { lat, lng } = e.latlng;
      setPosition(e.latlng);

      try {
        const response = await fetch(`/api/geocode?lat=${lat}&lon=${lng}`);
        const data = await response.json();

        if (data.success && data.address) {
          onAddressSelect(data.address);
        } else {
          const fallbackResponse = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=16&accept-language=ru`,
            {
              headers: {
                "User-Agent": "Your Transport App (your@email.com)",
              },
            }
          );

          const fallbackData = await fallbackResponse.json();
          if (fallbackData.display_name) {
            onAddressSelect(fallbackData.display_name);
          } else {
            onAddressSelect(`Координаты: ${lat.toFixed(6)}, ${lng.toFixed(6)}`);
          }
        }
      } catch (error) {
        console.error("Geocoding error:", error);
        onAddressSelect(`Координаты: ${lat.toFixed(6)}, ${lng.toFixed(6)}`);
      }
    },
  });

  return position ? <Marker position={position} /> : null;
};

const MapPicker = ({ onAddressSelect }) => {
  return (
    <MapContainer
      center={[52.038131, 113.496322]}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapClickHandler onAddressSelect={onAddressSelect} />
    </MapContainer>
  );
};

export default MapPicker;
