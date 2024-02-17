import React, { useState,useEffect,Component, Fragment,useCallback,useMemo,useRef } from 'react';
import L, { latLng } from 'leaflet';
import { MapContainer, TileLayer, Popup, Marker, useMapEvents,useMap} from "react-leaflet";


function ChangeMapView({ coords }) {
    const map = useMap();
    map.setView(coords, map.getZoom());
  
    return null;
  }

const MyMarker = props => {

    const initMarker = ref => {
        if (ref) {
            ref.leafletElement.openPopup()
        }
    }

    return <Marker ref={initMarker} {...props} />
};
var lati=[];

function MyComponent() {
     
    const map = useMapEvents({
      dragend: (e) => {
      }

    }); 
    return lati;
  }
  

  function LocationMarker() {
    const [position, setPosition] = useState(null)
    const [latitud, setLatitud] = useState(null)
    const [longitud,setLongitud] = useState(null)
    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
      },
    })
  
    return position === null ? null : (
      <Marker position={position}>
        <Popup>Estás aqui</Popup>
      </Marker>
    )
  }

  const center = {
    lat: 51.505,
    lng: -0.09,
  }
  
  function DraggableMarker() {
    const [draggable, setDraggable] = useState(false)
    const [position, setPosition] = useState(center)
    const markerRef = useRef(null)
    
    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
        
      },
    })
    const datolong="";
    const eventHandlers = useMemo(
      () => ({
        
        dragend(e) {
          const marker = markerRef.current
          if (marker != null) {
            var result = marker.getLatLng();  // but using the passed event is cleaner
           
            setPosition(marker.getLatLng())
            sessionStorage.setItem("longitud", result.lng) ;
            sessionStorage.setItem("latitud", result.lat) ;
          }
        },
      
      }),
      
      [],
      
    )
    
    const toggleDraggable = useCallback(() => {
      setDraggable((d) => !d)
    }, [])
    /** */
    const onMove = useCallback(() => {
     
    }, [map])
    useEffect(() => {
      map.on('move', onMove)
      return () => {
        map.off('move', onMove)
      }
    }, [map, onMove])
    
    /** */


sessionStorage.setItem("latitud", position.lat)
sessionStorage.setItem("longitud", position.lng)

    return (
      <Marker
      icon={customMarker}
        draggable={draggable}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}>
        <Popup minWidth={90}>
          <span onClick={toggleDraggable}>
            {draggable
              ? 'El marcador se puede mover'
              : 'Click aqui para mover el marcador'}
          </span>
        </Popup>
      </Marker>
    )
  }



const customMarker = L.icon({
    iconUrl:  process.env.PUBLIC_URL + "/assets/img/localizaicono2.png.png",
    iconSize: [50, 50],
    iconAnchor: [25, 5],
});

const customMarkerHouse = L.icon({
  iconUrl: "/assets/img/localizaicono2.png.png",
  iconSize: [50, 50],
  iconAnchor: [25, 5],
});
class Locationtab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPos: null,
            latitud:"",
            longitud:"",
            ready: false,
            where: { lat: '', lng: '' },
            error: null,
        };
        this.handleClick = this.handleClick.bind(this);
    }


    handleClick(e) {
        this.setState({ currentPos: e.latlng });
        
    }




   
  componentDidMount() {
    let geoOptions = {
      enableHighAccuracy: true,
      timeOut: 20000,
      maximumAge: 60 * 60 * 24,
    };
    this.setState({ ready: false, error: null });
    navigator.geolocation.getCurrentPosition(
      this.geoSuccess,
      this.geoFailure,
      geoOptions
    );
  }
  geoSuccess = (position) => {

    lati=position.coords.latitude;
    

    this.setState({
      ready: true,
      where: { lat: position.coords.latitude, lng: position.coords.longitude 
      },
      
    });
   
  };
  
  geoFailure = (err) => {
    this.setState({ error: err.message });
  };

   

    
    render() {
        const latitud = [this.state.latid ];
        const longitud = [ this.state.longid];
        return (
            <Fragment>
                
                <div className="form-group submit-listing-map">
                    
                    <MapContainer zoom={8} center={{ lat: 15.199999, lng: -86.241905 }}
                    >
                        <TileLayer
                            url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
                            attribution='© OpenStreetMap contributors'
                        />
                     
                        <DraggableMarker />
                      
                    </MapContainer>
                    
                </div>
                <div className="form-group">
                    <span className="acr-form-notice">Arrastre el marcador para elegir la <b>Latitud</b> y <b>Longitud</b> </span>
                 
                </div>
            </Fragment>
        );
    }
}

export default Locationtab ;

//<MyComponent/>
/*{this.props.lat !== undefined ? (
  <LocationMarker lat={this.props.lat} lng={this.props.lng} />
) : (
  ""
)}


  onClick={this.handleClick}>
*/