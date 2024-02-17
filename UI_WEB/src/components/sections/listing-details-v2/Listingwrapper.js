import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { OverlayTrigger, Tooltip, Dropdown, NavLink, Accordion, Card } from 'react-bootstrap';
import listing from '../../../data/listings.json';
import $ from 'jquery';
import 'magnific-popup'
import classNames from 'classnames';
import { db, st} from "../../../helper/firebase";
import Detail from "./detail"
import emailjs from "emailjs-com"
import Swal from "sweetalert2"
import Thumbnail from './thumbnailimg';
import { VehiculosService } from '../../../service/VehiculosService';
import { CitasService } from '../../../service/CitasService';

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

let form=({

    id_vehiculo: parseInt(sessionStorage.getItem("vehiculo")),
    id_usuario: parseInt(localStorage.getItem("sesh")),
});

const citasservice = new CitasService();
const vehiculosservice = new VehiculosService();
const sendEmail = async(event) => {
    event.preventDefault();
    try{
        await citasservice.CitaVehiculo(form).then((resp)  => {
            if (resp.code === 201) {
                        
                Swal.fire("Correo Enviado...", "Nuestro equipo se pondra en contacto contigo");
            }
        });
    }
    catch(error){
        Swal.fire("Error...", "Algo salió mal"); 
    }
}


class Listingwrapper extends Component {
    constructor(props) {
        super(props);
      
        this.unsubscribe = null;
        this.state = {
            items: [],
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
        vehiculosservice.getSeo().then(({ data }) => {
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
            color:venta.color,
            id_vehiculo:venta.id_vehiculo,
           };
         });
         this.setState({
           isLoaded: true,
           items: venta
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
        const { items } = this.state;
        return (
            <div className="section listing-wrapper">
                <div className="container">
                    <div className="row">
                        <Detail/>
                        {/* Sidebar Start */}
                        <div className="col-lg-4">
                        <div className="sidebar-widget">
                                    <h5>Contacta a nuestros agentes</h5>
                                     {/* Author Start */}
                                     <div className="media sidebar-author listing-agent">
                                        <Link to="#"><img src="/assets/img/localizaicono2.png.png" alt="logo"></img></Link>
                                        <div className="media-body">
                                            <button
                                                type="submit"
                                                className="btn-custom secondary btn-block"
                                                onClick={sendEmail}
                                            >
                                                Solicitar Cita
                                            </button>
                                        </div>
                                    </div>
                                    {/* Author End */}
                                </div>
                                <div className="sidebar-widget">
                                    <h5>Top Vehiculos</h5>
                                    {/* Listing Start */}
                                    {items.map((item, i) => (
                                        <div key={i} className="listing listing-list">
                                        <div className="listing-thumbnail">
                                            <Link to={{ pathname: `/listing-details-v2/${item.id_vehiculo}`}}><Thumbnail img={item.id_vehiculo}/></Link>
                                        </div>
                                        <div className="listing-body">
                                            <h6 className="listing-title"> <Link to={{ pathname: `/listing-details-v2/${item.id_vehiculo}`}} title={item.id_vehiculo}>{item.marca + ' ' + item.modelo + ' ' + item.year}</Link> </h6>
                                            <span className="listing-price">{item.objetivo}: ${new Intl.NumberFormat().format((item.precio))} <span></span> </span>
                                        </div>
                                    </div>
                                    ))}
                                    {/* Listing End */}
                                </div>
                                
                        </div>
                        {/* Sidebar End */}
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default Listingwrapper;