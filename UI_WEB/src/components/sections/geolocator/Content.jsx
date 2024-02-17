import React, { useState,useEffect,Component, Fragment,useCallback,useMemo,useRef } from "react";
import Sidebar from "../../layouts/Blogsidebar";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import mapdata from "../../../data/mapdata.json";
import L from "leaflet";
import { Link } from "react-router-dom";
import { BienesService } from '../../../service/BienesService';
import { latLng } from "leaflet";
import Thumbnail from './thumbnailimg';
const customMarker = L.icon({
  iconUrl:  process.env.PUBLIC_URL + "/assets/img/localizaicono2.png.png",
  iconSize: [50, 50],
  iconAnchor: [25, 5],
});

const MyMarker = props => {

  const initMarker = ref => {
      if (ref) {
          ref.leafletElement.openPopup()
      }
  }

  return <Marker ref={initMarker} {...props} />
};
const customMarkerUser = L.icon({
  iconUrl:  process.env.PUBLIC_URL + "/assets/img/misc/icono.png",
  iconSize: [50, 50],
  iconAnchor: [25, 5],
});
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
          var result = marker.getLatLng();  
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
  


//L.circle([position.lat,position.lng]).addTo(map);
  return (
    <Marker
    icon={customMarkerUser}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}>
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
            ? 'Es tu ubicación'
            : 'Estas Aqui'}
        </span>
      </Popup>
    </Marker>
  )
}
const center = {
  lat: 51.505,
  lng: -0.09,
}



var lati=[];

const bienesservice = new BienesService();
class Content extends Component {

  constructor(props) {
    super(props);
   
  
    this.unsubscribe = null;
    this.state = {
      itemsPerPage: 6,
      advancesearch: false,
      mapdata: [],
      pictures: [],
      currentPos: null,
      latLong:[],
      ready: false,
      where: { lat: '', lng: '' },
      
    };
    this.handleClick = this.handleClick.bind(this);
  } 
  


  componentDidMount() {
    bienesservice.getVenta().then(({ data }) => {
           const venta = data.map((venta) => {
          return {
            id_bien:venta.id_bien,
            desc_bien:venta.desc_bien,
            venta_renta:venta.venta_renta,
            bathrooms:venta.bathrooms,
            habitaciones:venta.habitaciones,
            dimensiones:venta.dimensiones,
            precio:venta.precio,
            latitud:venta.latitud,
            longitud:venta.longitud,
            venta_renta:venta.venta_renta,
            direccion: venta.direccion,
          };
        });
        this.setState({
          isLoaded: true,
          mapdata: venta
          
        });
      
    });
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
    
  };



  handleClick(e) {
    this.setState({ currentPos: e.latlng });
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
    const { mapdata, itemsPerPage } = this.state;
    return (
      
      <div className="section">
        <div className="container">
          <h1>Toca el mapa y encuentra tu hogar</h1>
          <div className="row">
            <div className="col-lg-12">
              <div className="banner-map" style={{paddingLeft: '30px', paddingRight: '30px'}}>
                <MapContainer
                  className="markercluster-map map"
                  center={[  15.199999,  -86.241905]}
                  zoom={15}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  />  <DraggableMarker />
                  {mapdata.map((item, i) => (
                    <Marker
                      key={i}
                      position={[item.latitud,item.longitud]}
                      icon={customMarker}
                    
                    > 
                      <Popup>
                        <div className="mapboxgl-popup mapboxgl-popup-anchor-top">
                          <div className="mapboxgl-popup-tip" />
                          <Thumbnail img={item.id_bien}/>
                          <div className="acr-listing-popup-body">
                            <h5>
                              <Link to={{ pathname: `/listing-details-v1/${item.id_bien}`}} title={item.desc_bien}>
                                {item.desc_bien}
                              </Link>
                            </h5>
                            <span className="listing-price">
                            $ {new Intl.NumberFormat().format((item.precio))}
                            </span>
                            <p>
                              <i className="fas fa-map-marker-alt" />
                              {item.direccion}
                            </p>
                            <div className="location-popup-meta">
                              <span>
                                <i className="fas fa-bed" />
                                {item.habitaciones}
                              </span>
                              <span>
                                <i className="fas fa-bath" />
                                {item.bathrooms}
                              </span>x
                              <span>
                                <i className="fas fa-ruler-combined" />
                                {item.dimensiones}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                    
                  ))}
                
                </MapContainer>
               
              </div>
           </div>
          </div>
         </div>
       </div>
    );
  }
}

export default Content;