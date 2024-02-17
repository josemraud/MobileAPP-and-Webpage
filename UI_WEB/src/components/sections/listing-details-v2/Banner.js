import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { db, st} from "../../../helper/firebase";
import { FotosService } from '../../../service/FotosService';
import { VehiculosService } from '../../../service/VehiculosService';
import Imagen from "./bannerimg"
import Display from './bannerdisplay';

const bannerpost = [
    {
        img: 'assets/img/listing-single/1.jpg',
    },
    {
        img: 'assets/img/listing-single/1-2.jpg',
    }
]
const vehiculosservice = new VehiculosService();
const fotosservice = new FotosService();
let id="";
class Banner extends Component {
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
                    id_vehiculo:venta.id_vehiculo,
                    desc_vehiculo:venta.desc_vehiculo,
                 };
               });
               this.setState({
                 isLoaded: true,
                 items: venta
               });
               fotosservice.getThVehiculo(id).then(({ data }) => {
                const foto = data.map((foto) => {
                  return {
                   nombre_foto:foto.nombre_foto,
                   id_foto:foto.id_foto,
                   id_vehiculo:foto.id_vehiculo,
                  };
                });
                this.setState({
                  isLoaded: true,
                  foto: foto
                });
              });
             });
            };





            







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
    next() {
        this.slider.slickNext();
    }
    previous() {
        this.slider.slickPrev();
    }
    render() {
        const { items } = this.state;
        const { foto } = this.state;
        const settings = {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: false,
            fade: true,
        }
        return (
            <div className="banner banner-2 slider-no-padding">
                <div className="banner-item">
                    <Slider className="banner-slider" ref={c => (this.slider = c)} {...settings}>
                        {foto.map((item, i) => (
                            <div key={i}>
                               <Display name={item.nombre_foto}/>
                            </div>
                        ))}
                    </Slider>
                    {items.map((item, i) => (
                        <div key={i}>
                    <div className="acr-listing-details">
                        <div className="acr-listing-section">
                            <div className="acr-listing-section-body">
                                <div className="acr-listing-section-price">
                                    <span>{item.usado_nuevo}</span>
                                    <h3>$ {new Intl.NumberFormat().format((item.precio))}</h3>
                                </div>
                            </div>
                        </div>
                        <div className="acr-listing-section">
                            <div className="acr-listing-section-body">
                                <h4>{item.marca} {item.modelo} {item.year}</h4>
                                <div className="acr-listing-icons">
                                    <div className="acr-listing-icon">
                                        <i className="fas fa-car-side" />
                                        <span>Cabina</span>
                                        <span className="acr-listing-icon-value">{item.cabina}</span>
                                    </div>
                                    <div className="acr-listing-icon">
                                        <i className="fas fa-cogs" />
                                        <span>Motor</span>
                                        <span className="acr-listing-icon-value">{item.motor}</span>
                                    </div>
                                    <div className="acr-listing-icon">
                                        <i className="fas fa-palette" />
                                        <span>Color</span>
                                        <span className="acr-listing-icon-value">{item.color}</span>
                                    </div>
                                </div>
                                <p>
                                {item.desc_vehiculo}
          </p>
                            </div>
                        </div>
                        
                    </div></div>
                    ))}
                </div>
               
            </div>
        );
    }
}

export default Banner;