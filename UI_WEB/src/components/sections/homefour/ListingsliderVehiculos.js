import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { OverlayTrigger, Tooltip, Dropdown, NavLink } from 'react-bootstrap';
import Slider from 'react-slick';
import listing from '../../../data/listings.json';
import { db, st} from "../../../helper/firebase";

import ThumbnailVehiculo from "./thumbnailimgVehiculo"
import { BienesService } from '../../../service/BienesService';
import Swal from "sweetalert2";
import { VehiculosService } from '../../../service/VehiculosService';
const gallerytip = (
    <Tooltip>
        Gallery
    </Tooltip>
);
const bedstip = (
    <Tooltip>
        Beds
    </Tooltip>
);
const bathstip = (
    <Tooltip>
        Bathrooms
    </Tooltip>
);
const areatip = (
    <Tooltip>
        Square Feet
    </Tooltip>
);



const token = localStorage.getItem("token") || "None";

const vehiculosservice = new VehiculosService();

class Listingslider2 extends Component {
    
    constructor(props) {
        super(props);
      
        this.unsubscribe = null;
        this.next=this.next.bind(this);
        this.previous=this.previous.bind(this);
        this.state = {
            items: [],
            loading: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    next(){
        this.slider.slickNext();
    }

    previous(){
        this.slider.slickPrev();
    }


   
    
      componentDidMount() {
        return vehiculosservice.getSeo().then(({ data }) => {
            if (data != null) {
              const venta = data.map((venta) => {
                return {
                  marca:venta.marca,
                  modelo:venta.modelo,
                  combustible:venta.combustible,
                  usado_nuevo:venta.usado_nuevo,
                  year:venta.year,
                  kilometraje:venta.kilometraje,
                  motor:venta.motor,
                  precio:venta.precio,
                  id_vehiculo:venta.id_vehiculo,
                
                };
              
              });
              this.setState({
                  isLoaded: true,
                  items: venta
                });
            } else {
              Swal.fire(
                "Error con vehiculos!",
                "Error al listar todos los vehiculo!",
                "error"
              );
            }
          });
      }
    handleClick(event) {
        var paginationContent = event.target.closest('.pagination-content');

        if (paginationContent) {
            paginationContent.scrollIntoView();
        }

        this.setState({
            loading: true
        });
        setTimeout(() => {
            this.setState({
                currentPage: Number(event.target.getAttribute('data-page')),
                loading: false
            });
        }, 2000);

    }           
render() {
        const settings = {
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: false,
            dots: false,
            responsive: [
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        }

        const { items } = this.state;
        return (
            <div className="section section-padding pt-0 listings">
                <div className="container">
                    <div className="section-title-wrap section-header flex-header">
                        <div className="section-title-text">
                            <h5 className="custom-primary">Encuentra aquí los vehículos destacados de la semana.</h5>
                            <h2 className="title">Top Vehículos</h2>
                        </div>
                        <div className="acr-arrows primary-arrows">
                            <i className="slider-prev fas fa-arrow-left slick-arrow" onClick={this.previous} />
                            <i className="slider-next fas fa-arrow-right slick-arrow" onClick={this.next} />
                        </div>
                    </div>
                    <Slider className="listings-slider" ref={c => (this.slider = c)} {...settings}>
                        {/* Listing Start */}
                        {items.map((item, i) => (
                            <div key={i} className="col-12">
                                <div className="listing">
                                    <div className="listing-thumbnail">
                                        <ThumbnailVehiculo img={item.id_vehiculo}/>
                                        <div className="listing-badges">
                                        <span className="listing-badge sale">En venta</span> : ''
                                        </div>
                                        <div className="listing-controls">
                                        </div>
                                    </div>
                                    <div className="listing-body">
                                        <div className="listing-author">
                                            <div className="listing-author-body">
                                            <h5 className="listing-title"> <Link to={{ pathname: `/listing-details-v2/${item.id_vehiculo}`}} title={item.marca + ' ' + item.modelo + ' ' + item.year}>{item.marca + ' ' + item.modelo + ' ' + item.year}</Link> </h5>
                                               
                                                <span className="listing-date">{item.usado_nuevo}</span>
                                            </div>
                                           
                                        </div>
                                        <p> <Link to="#">{item.tipo}</Link> </p>
                                        <span className="listing-price">$ {new Intl.NumberFormat().format((item.precio))}</span>
                                        <p className="listing-text">{item.combustible}</p>
                                        <div className="acr-listing-icons">
                                            <OverlayTrigger overlay={areatip}>
                                                <div className="acr-listing-icon">
                                                    <i className="fas fa-calendar" />
                                                    <span className="acr-listing-icon-value">{new Intl.NumberFormat().format((item.year))}</span>
                                                </div>
                                            </OverlayTrigger>
                                            <OverlayTrigger overlay={areatip}>
                                                <div className="acr-listing-icon">
                                                    <i className="fas fa-tachometer-alt" />
                                                    <span className="acr-listing-icon-value">{new Intl.NumberFormat().format((item.kilometraje))}KM</span>
                                                </div>
                                            </OverlayTrigger>

                                            <OverlayTrigger overlay={areatip}>
                                                <div className="acr-listing-icon">
                                                    <i className="fas fa-cogs" />
                                                    <span className="acr-listing-icon-value">{new Intl.NumberFormat().format((item.motor))} </span>
                                                </div>
                                            </OverlayTrigger>
                                        </div>
                                        <div className="listing-gallery-wrapper">
                                        {token == "None" ? (
                                            <Link to={{ pathname: `/login`}} className="btn-custom btn-sm secondary">Ver Mas</Link>
                                            ) : (
                                                <Link to={{ pathname: `/listing-details-v1/${item.id_bien}`}} className="btn-custom btn-sm secondary">Ver Mas</Link>
                                                
                                                
                                                )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/* Listing End */}
                    </Slider>
                </div>
            </div>
        );
    }
}

export default Listingslider2;