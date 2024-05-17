// Import CSS files
import "./maps.css";
import "leaflet/dist/leaflet.css";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import axios from "axios";
import { Icon, divIcon, point } from "leaflet";

import placeholderIconUrl from "./icons/placeholder.png";
import truckIconUrl from "./icons/truck.png";
import { useState } from "react";

const customIcon = new Icon({
  iconUrl: placeholderIconUrl,
  iconSize: [38, 38],
});

const customIcon2 = new Icon({
  iconUrl: truckIconUrl,
  iconSize: [38, 38],
});

const createClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true),
  });
};







const vans = [
  {
    geocode: [19.93054, 75.352478],
    popUp: "MH20BH5050",
  },{
    geocode: [19.90134, 75.3521478],
    popUp: "Van2",
  }
];

export default function LocationPicker() {
   const [locations,setLocations]=useState([]);
  useEffect(() => {
    // Fetch complaints from the backend
    const fetchComplaints = async () => {
     
        try {
            const response = await axios.get(`http://localhost:3001/complaints/all`);
           setLocations(response.data);
        } catch (error) {
            console.error('Error fetching complaints:', error);
        }
    };
    fetchComplaints();
}, []);

console.log(locations[1]);


  return (
    <div className="map-container">
      <MapContainer center={[18.6122063552147, 76.232]} zoom={5}>
        {/* OPEN STREET MAP TILES */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        
        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createClusterCustomIcon}
        >
          {locations.map((marker, index) => (
            <Marker key={index} position={marker.location} icon={customIcon}>
              <Popup>{`Phone ${marker.name}, (${marker.complaint})`}</Popup>
              
            </Marker>
          ))}
         
        </MarkerClusterGroup>
        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createClusterCustomIcon}
        >
          
           {vans.map((marker, index) => (
            <Marker key={index} position={marker.geocode} icon={customIcon2}>
              <Popup>{marker.popUp}</Popup>
              
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}
