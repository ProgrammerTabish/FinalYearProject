// Import CSS files
import "./maps.css";
import "leaflet/dist/leaflet.css";

import firebase from 'firebase/compat/app'; // Update import to compat/app
import 'firebase/compat/database'; // Update import to compat/database

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import axios from "axios";
import { Icon, divIcon, point } from "leaflet";

import placeholderIconUrl from "./icons/placeholder.png";
import truckIconUrl from "./icons/truck.png";
import { useState } from "react";


// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzNhpGzzDnMKgRVg16k_KDSfUUdZwDqOw",
  authDomain: "city-garbage-management-system.firebaseapp.com",
  databaseURL: "https://city-garbage-management-system-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "city-garbage-management-system",
  storageBucket: "city-garbage-management-system.appspot.com",
  messagingSenderId: "492493682222",
  appId: "1:492493682222:web:e2d288b716993bf39c11bf",
  measurementId: "G-DBKDKH1ND6"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

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
  }
];

export default function LocationPicker() {
   
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  
  useEffect(() => {
    const latRef = firebase.database().ref('/gps/lat');
    const lngRef = firebase.database().ref('/gps/lng');

    latRef.on('value', (snapshot) => {
      setLatitude(snapshot.val());
    });

    lngRef.on('value', (snapshot) => {
      setLongitude(snapshot.val());
    });

    return () => {
      latRef.off();
      lngRef.off();
    };
  }, []);



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
    <div className="map-container ">
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

        {latitude !== null && longitude !== null && (
  <Marker position={[latitude, longitude]} icon={customIcon2}>
    <Popup>This is your van</Popup>
  </Marker>
)}

        {/* <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createClusterCustomIcon}
        >
          
           {vans.map((marker, index) => (
            <Marker key={index} position={[latitude,longitude]} icon={customIcon2}>
              <Popup>This is your van</Popup>
            </Marker>
          ))}
        </MarkerClusterGroup> */}
      </MapContainer>
           <div className="m-4 p-4 bg-purple-200 rounded-l">
              <h2 className="text-xl font-semibold mb-4">Van Details</h2>
              {/* Replace with actual van details or coordinates display */}
              <div>
                <p>Latitude: {latitude}</p>
                <p>Longitude: {longitude}</p>
               
              </div>
            </div>
      
    </div>
  );
}
