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
import { BienesService } from '../../../service/BienesService';
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

let tipo = "Vehiculo";
let correo = localStorage.getItem("user");
let nombre = "";
let apellido = "";
let celular = "";
let bien = "";
const form=({

    id_bien: parseInt(sessionStorage.getItem("bien")),
    id_usuario: parseInt(localStorage.getItem("sesh")),
});
let llave = window.location.hash.substring(21);
const bienesservice = new BienesService();
const citasservice = new CitasService();

const sendEmail = async(event) => {
    event.preventDefault();
    try{
        await citasservice.CitaBien(form).then((resp)  => {
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
            form:[],
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
        bienesservice.getSeo().then(({ data }) => {
            const venta = data.map((venta) => {
           return {
            id_bien:venta.id_bien,
            desc_bien:venta.desc_bien,
            venta_renta:venta.venta_renta,
            bathrooms:venta.bathrooms,
            habitaciones:venta.habitaciones,
            dimensiones:venta.dimensiones,
            precio:venta.precio,
            direccion:venta.direccion,
            pisos:venta.pisos,
            parqueo:venta.parqueo,
           };
         });
         this.setState({
           isLoaded: true,
           items: venta,
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
                                    <h5>Top Bienes</h5>
                                    {/* Listing Start */}
                                    {items.map((item, i) => (
                                        <div key={i} className="listing listing-list">
                                        <div className="listing-thumbnail">
                                            <Link to={{ pathname: `/listing-details-v1/${item.id_bien}`}}><Thumbnail img={item.id_bien}/></Link>
                                        </div>
                                        <div className="listing-body">
                                            <h6 className="listing-title"> <Link to={{ pathname: `/listing-details-v1/${item.id_bien}`}} title={item.id_bien}>{item.direccion}</Link> </h6>
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