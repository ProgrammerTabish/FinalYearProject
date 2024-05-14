// Import CSS files
import "./maps.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

import { Icon, divIcon, point } from "leaflet";

import placeholderIconUrl from "./icons/placeholder.png";
import truckIconUrl from "./icons/truck.png";
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

const markers = [
  {
    geocode: [19.901054, 75.352478],
    popUp: "Hello, I am pop up 1",
  },{
    geocode: [19.90134, 75.3521478],
    popUp: "Hello, I am pop up 2",
  },{
    geocode: [19.901404, 75.3523478],
    popUp: "Hello, I am pop up 3",
  },{
    geocode: [19.901504, 75.3522478],
    popUp: "Hello, I am pop up 4",
  },{
    geocode: [19.901654, 75.3524478],
    popUp: "Hello, I am pop up 5",
  },
];
const vans = [
  {
    geocode: [19.93054, 75.352478],
    popUp: "MH20BH5050",
  },{
    geocode: [19.40134, 75.3521478],
    popUp: "Van2",
  },{
    geocode: [19.501404, 75.3523478],
    popUp: "Van3",
  },{
    geocode: [19.701504, 75.3522478],
    popUp: "van4",
  },{
    geocode: [19.801654, 75.3524478],
    popUp: "van5",
  },
];

export default function LocationPicker() {
  return (
    <div className="map-container">
      <MapContainer center={[18.6122063552147, 76.232]} zoom={5}>
        {/* OPEN STREET MAP TILES */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Uncomment the following line for simpler TileLayer options */}
        {/* <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}

        {/* Marker Cluster Group */}
        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createClusterCustomIcon}
        >
          {markers.map((marker, index) => (
            <Marker key={index} position={marker.geocode} icon={customIcon}>
              <Popup>{marker.popUp}</Popup>
            </Marker>
          ))}
           {/* {vans.map((marker, index) => (
            <Marker key={index} position={marker.geocode} icon={customIcon2}>
              <Popup>{marker.popUp}</Popup>
            </Marker>
          ))} */}
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
