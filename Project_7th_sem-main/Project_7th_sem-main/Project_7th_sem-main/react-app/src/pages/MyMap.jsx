import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "./MyMap.css"; // Import your CSS file

export default function MyMap({ setCordinates }) {
  const [markerPosition, setMarkerPosition] = useState(null);

  const handleMapClick = (event) => {
    const { lat, lng } = event.latlng;
    setMarkerPosition([lat, lng]);
    setCordinates([lat, lng]);
    console.log(`Marker dropped at: Lat ${lat}, Lng ${lng}`);
  };

  return (
    <MapContainer
      center={[19.87393439059482, 75.34561157226564]}
      zoom={12}
      className="map-container"
      style={{ height: "400px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* User-dropped Marker with Popup */}
      {markerPosition && (
        <Marker
          position={markerPosition}
          draggable={true}
          eventHandlers={{ dragend: handleMapClick }}
        >
          <Popup>A marker dropped by the user.</Popup>
        </Marker>
      )}

      {/* Event listener for map click */}
      <MapClickHandler onMapClick={handleMapClick} />
    </MapContainer>
  );
}

function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click: (event) => {
      onMapClick(event);
    },
  });

  return null; // Render nothing, as this component is only used for handling events
}
