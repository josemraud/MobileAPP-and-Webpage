import React, { Component, Fragment } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";

const MyMarker = props => {

    const initMarker = ref => {
        if (ref) {
            ref.leafletElement.openPopup()
        }
    }

    return <Marker ref={initMarker} {...props} />
};

const customMarker = L.icon({
    iconUrl: process.env.PUBLIC_URL + "/assets/img/misc/marker.png",
    iconSize: [50, 50],
    iconAnchor: [25, 5],
});
class Locationtab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPos: null
        };
        this.handleClick = this.handleClick.bind(this);
    }


    handleClick(e) {
        this.setState({ currentPos: e.latlng });
    }
    render() {
        return (
            <Fragment>
                <div className="form-group submit-listing-map">
                    <MapContainer zoom={8} center={{ lat: 15.199999, lng: -86.241905 }} onClick={this.handleClick}>
                        <TileLayer
                            url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
                        />
                        {this.state.currentPos && <MyMarker position={this.state.currentPos} icon={customMarker}>
                            <Popup position={this.state.currentPos}>
                                Current location: <pre>{JSON.stringify(this.state.currentPos, null, 2)}</pre>
                            </Popup>
                        </MyMarker>}
                    </MapContainer>
                </div>
                <div className="form-group">
                    <span className="acr-form-notice">Drag and drop the marker to identify your <b>Latitude</b> and <b>Longitude</b> </span>
                </div>
            </Fragment>
        );
    }
}

export default Locationtab;