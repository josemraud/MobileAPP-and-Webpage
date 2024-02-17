
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { OverlayTrigger, Tooltip, Dropdown, NavLink } from 'react-bootstrap';
import Slider from 'react-slick';
import listing from '../../../data/listings.json';
import { db, st} from "../../../helper/firebase";
import Thumbnail from "./thumbnailimg"
import { BienesService } from '../../../service/BienesService';
import Swal from "sweetalert2";
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
const bienesservice = new BienesService();
class Listingslider extends Component {
    
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
       
    
    return  bienesservice.getSeo().then(({ data }) => {
      if (data != null) {
        const venta = data.map((venta) => {
          return {
            desc_bien:venta.desc_bien,
            venta_renta:venta.venta_renta,
            bathrooms:venta.bathrooms,
            habitaciones:venta.habitaciones,
            dimensiones:venta.dimensiones,
            precio:venta.precio,
            id_bien:venta.id_bien,
            desc_tipo_bien:venta.desc_tipo_bien,
            direccion:venta.direccion,
          };
        
        });
        this.setState({
            isLoaded: true,
            items: venta
          });
      } else {
        Swal.fire(
          "Error con bienes!",
          "Error al listar todos los bienes!",
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
                            <h5 className="custom-primary">Encuentra aquí las propiedades mas destacadas de la semana.</h5>
                            <h2 className="title">Top Bienes</h2>
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
                                      <Thumbnail img={item.id_bien}/>
                                        <div className="listing-badges">
                                            {
                                                item.venta_renta === "Venta" ? <span className="listing-badge sale">En venta</span> : ''
                                            }                    
                                            {
                                                item.venta_renta === "Renta" ? <span className="listing-badge rent"> En Renta</span> : '' 
                                            } 
                                        </div>
                                        <div className="listing-controls">
                                        </div>
                                    </div>
                                    <div className="listing-body">
                                        <div className="listing-author">
                                            <div className="listing-author-body">
                                            </div>
                                        </div>
                                        <h5 className="listing-title"> <Link to={{ pathname: `/listing-details-v1/${item.id_bien}`}} title={item.direccion}>{item.direccion}</Link> </h5>
                                        
                                        <span className="listing-date">{item.desc_tipo_bien}</span>
                                        <span className="listing-price">$ {new Intl.NumberFormat().format((item.precio))}</span>
                                        <p className="listing-text">{item.desc_bien}</p>
                                        <div className="acr-listing-icons">
                                            <OverlayTrigger overlay={bedstip}>
                                                <div className="acr-listing-icon">
                                                    <i className="flaticon-bedroom" />
                                                    <span className="acr-listing-icon-value">{item.habitaciones}</span>
                                                </div>
                                            </OverlayTrigger>
                                            <OverlayTrigger overlay={bathstip}>
                                                <div className="acr-listing-icon">
                                                    <i className="flaticon-bathroom" />
                                                    <span className="acr-listing-icon-value">{item.bathrooms}</span>
                                                </div>
                                            </OverlayTrigger>
                                            <OverlayTrigger overlay={areatip}>
                                                <div className="acr-listing-icon">
                                                    <i className="flaticon-ruler" />
                                                    <span className="acr-listing-icon-value">{item.dimensiones} m²</span>
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

export default Listingslider;