import React, { Component,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { OverlayTrigger, Tooltip, Dropdown, NavLink, Accordion, Card } from 'react-bootstrap';
import listing from '../../../data/listings.json';
import $ from 'jquery';
import 'magnific-popup'
import classNames from 'classnames';
import { db, st} from "../../../helper/firebase";
import Display from "./display"
import { VehiculosService } from '../../../service/VehiculosService';
import { FotosService } from '../../../service/FotosService';




// Gallery
const listinggallery = [
    { img: 'assets/img/listing-single/2.jpg' },
    { img: 'assets/img/listing-single/3.jpg' },
    { img: 'assets/img/listing-single/4.jpg' },
    { img: 'assets/img/listing-single/5.jpg' },
];

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

const vehiculosservice = new VehiculosService();
const fotosservice = new FotosService();
let id="";

class Detail extends Component {
    
    constructor(props) {
        super(props);
       let cadena=window.location.hash
       let parametro = cadena.substring(21)
       id=parametro;
       
        this.unsubscribe = null;
        this.state = {
            items: [],
            foto: [],
            loading: false
        };
        this.handleClick = this.handleClick.bind(this);
    }
    
    showmoretoggle() {
        this.setState({
            showmore: !this.state.showmore
        })
    }
    componentDidMount() {
        function popup() {
            $('.gallery-thumb').magnificPopup({
                type: 'image',
                gallery: {
                    enabled: true
                },
            });
        }
        popup()
    };



   
   componentDidMount() {
    
             vehiculosservice.getOne(id).then(({ data }) => {
               const venta = data.map((venta) => {
                 return {
                    marca:venta.marca,
                    modelo:venta.modelo,
                    combustible:venta.combustible,
                    cabina:venta.cabina,
                    usado_nuevo:venta.usado_nuevo,
                    year:venta.year,
                    kilometraje:venta.kilometraje,
                    motor:venta.motor,
                    precio:venta.precio,
                    color:venta.color,
                    caja:venta.caja,
                    desc_tipo_vehiculo:venta.desc_tipo_vehiculo,
                    id_vehiculo:venta.id_vehiculo,
                 };
               });
               this.setState({
                 isLoaded: true,
                 items: venta
               });
             });

            
             fotosservice.getFotoVehiculo(id).then(({ data }) => {
               const foto = data.map((foto) => {
                 return {
                 nombre_foto:foto.nombre_foto,
                 };
               });
               this.setState({
                 //isLoaded: true,
                 foto: foto
               });
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
        $(window).on('hashchange', function() {
            window.location.reload();
          });
        const { items } = this.state;
        const { foto } = this.state;
        return (
            <div className="col-lg-8">
            {/* Content Start */}
            <div className="listing-content">
                <h4>Fotos del vehículo</h4>
                <div className="row">
                    {foto.map((foto, i) => (
                        <div key={i} >
                                <Display name={foto.nombre_foto} />
                        </div>
                    ))}
                </div>
            </div>
            {/* Content End */}
            {items.map((item, i) => (
                <div key={i} >
            <div className="section section-padding pt-0 acr-listing-features">
                <h4>Características</h4>
                {sessionStorage.setItem("vehiculo", item.id_vehiculo)}
                <div className="row">
                    <div className="col-lg-6 col-md-6">
                        <div className="listing-feature-wrapper">
                            <div className="listing-feature">
                                <i className="fas fa-truck" />
                                <h6 className="listing-feature-label">Tipo de Vehículo</h6>
                                <span className="listing-feature-value">{item.desc_tipo_vehiculo}</span>
                            </div>
                            <div className="listing-feature">
                                <i className="fas fa-building" />
                                <h6 className="listing-feature-label">Marca</h6>
                                <span className="listing-feature-value">{item.marca}</span>
                            </div>
                            <div className="listing-feature">
                                <i className="fas fa-car" />
                                <h6 className="listing-feature-label">Modelo</h6>
                                <span className="listing-feature-value">{item.modelo}</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="listing-feature">
                                <i className="fas fa-car-side" />
                                <h6 className="listing-feature-label">Cabina</h6>
                                <span className="listing-feature-value">{item.cabina}</span>
                            </div>
                        <div className="listing-feature-wrapper">
                            <div className="listing-feature">
                                <i className="fas fa-cogs" />
                                <h6 className="listing-feature-label">Motor</h6>
                                <span className="listing-feature-value">{item.motor}</span>
                            </div>
                            <div className="listing-feature">
                                <i className="fas fa-certificate" />
                                <h6 className="listing-feature-label">Estado</h6>
                                <span className="listing-feature-value">{item.usado_nuevo}</span>
                            </div>
                            
                        </div>
                    </div>
                </div>
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            
                            <div className="listing-feature">
                                <i className="fas fa-gas-pump" />
                                <h6 className="listing-feature-label">Combustible</h6>
                                <span className="listing-feature-value">{item.combustible}</span>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="listing-feature">
                                <i className="fas fa-wrench" />
                                <h6 className="listing-feature-label">Caja</h6>
                                <span className="listing-feature-value">{item.caja}</span>
                            </div>
                    </div>
                    
                    <div className="col-lg-6 col-md-6">
                            <div className="listing-feature">
                                <i className="fas fa-palette" />
                                <h6 className="listing-feature-label">Color</h6>
                                <span className="listing-feature-value">{item.color}</span>
                            </div>
                    </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="listing-feature">
                                <i className="fas fa-tachometer-alt" />
                                <h6 className="listing-feature-label">Kilometraje</h6>
                                <span className="listing-feature-value">{item.kilometraje}</span>
                            </div>
                    </div>
                </div>
            </div>                 
        </div>  
             ))}                   
        </div>
        );
    }
}

export default Detail;