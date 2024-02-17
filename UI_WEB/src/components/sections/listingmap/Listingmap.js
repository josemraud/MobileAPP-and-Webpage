import React, { Component, useState } from "react";
import L from "leaflet";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import mapdata from "../../../data/mapdata.json";

const customMarker = L.icon({
  iconUrl: process.env.PUBLIC_URL + "/assets/img/misc/marker.png",
  iconSize: [50, 50],
  iconAnchor: [25, 5],
});

const customMarkerHouse = L.icon({
  iconUrl: process.env.PUBLIC_URL + "/assets/img/localizaicono2.png.png",
  iconSize: [50, 50],
  iconAnchor: [25, 5],
});

const LocationMarker = (coords) => {
  
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
  
      setPosition({ lat: coords.lat, lng: coords.lng });
      map.flyTo({ lat: coords.lat, lng: coords.lng }, 18);
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={customMarkerHouse}>
      <Popup>
        <h4>Esta sera tu nueva Casa!!!</h4>
      </Popup>
    </Marker>
  );
 
};

class Listingmap extends Component {
  showAlert = () => {
    alert("Hola Mundo ...");
  };

  render() {
    return (
      <div className="listing-map">
        <MapContainer
          className="markercluster-map map"
          zoom={8}
          center={{ lat: 15.199999, lng: -86.241905 }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
        
          {this.props.lat !== undefined ? (
            <LocationMarker lat={this.props.lat} lng={this.props.lng} />
          ) : (
            ""
          )}
        </MapContainer>
      </div>
    );
  }
}

export default Listingmap;
