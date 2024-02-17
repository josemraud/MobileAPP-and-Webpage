import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import Services from './Services';

const images = [
    { img: 'assets/img/img15.jpg' },
    { img: 'assets/img/img5.jpeg' },
    { img: 'assets/img/img4.jpeg' },
];
const customMarker = L.icon({
    iconUrl:  process.env.PUBLIC_URL + "/assets/img/localizaicono2.png.png",
    iconSize: [50, 50],
    iconAnchor: [25, 5],
  });
  



  

class Content extends Component {
    render() {
        const settings = {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            mapdata: [],
            autoplay: true,
            dots: true,
            dotsClass: "d-flex slick-dots",
        }
        return (
            <div className="acr-cs-container">
                <div className="acr-cs-content">
                <div className="acr-cs-content-body">
                        <div className="acr-cs-text">
                            <h1 className="title">Centro <span className="custom-primary">Localiza</span> </h1>
                            <Services/>
                             <p className="subtitle">Anillo Periférico, frente a Nacional de Ingenieros Coliseum, Tegucigalpa, Honduras.</p>
                        </div>


                        <div className="row">
            <div className="col-lg-12">
              <div className="banner-map" style={{paddingLeft: '30px', paddingRight: '30px'}}>
                <MapContainer
                  className="markercluster-map map"
                  center={[14.0823733,-87.1597415]}
                  zoom={15}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  /> 
                    <Marker
                   
                      position={[14.0823733,-87.1597415]}
                      icon={customMarker}
                    
                    > 
                    
                    </Marker>
                    
      
                
                </MapContainer>
               
              </div>
           </div>


           
          </div>

















                        <div className="acr-cs-newsletter">
                            <p><span>Nuestro personal te brindará información</span></p>
                            <p className="subtitle">Correo: soporte@applocaliza.com</p>
                            <p className="subtitle">Teléfono: +50422638712</p>
                            <p className="subtitle">Celular: +50432763465</p>
                        </div>
                    </div>
               </div>

















                <div className="acr-cs-bg">
                    <Slider className="acr-cs-bg-slider" {...settings}>
                        {images.map((item, i) => (
                            <div key={i}>
                                <div className="acr-cs-bg-item bg-cover bg-center" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/" + item.img + ")" }} />
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        );
    }
}

export default Content;