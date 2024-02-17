import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { db, st} from "../../../helper/firebase";
import { BienesService } from '../../../service/BienesService';
import { FotosService } from '../../../service/FotosService';
import Display from './bannerdisplay';
import Imagen from "./bannerimg"
import "./watermark.css";
const bannerpost = [
    {
        img: 'assets/img/listing-single/1.jpg',
    },
    {
        img: 'assets/img/listing-single/1-2.jpg',
    }
]


const fotosservice = new FotosService();
const bienesservice = new BienesService();
let id="";
class Banner extends Component {
    constructor(props) {
        
        super(props);
        let cadena=window.location.hash
        let parametro = cadena.substring(21)
        id=parametro;
        this.unsubscribe = null;
        this.next=this.next.bind(this);
        this.previous=this.previous.bind(this);
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
    
    next(){
        this.slider.slickNext();
    }

    previous(){
        this.slider.slickPrev();
    }

  

    componentDidMount() {
             bienesservice.getOne(id).then(({ data }) => {
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
                     nombre_ciudad: venta.nombre_ciudad,
                 };
               });
               this.setState({
                 isLoaded: true,
                 items: venta
               });
             });
             fotosservice.getThBien(id).then(({ data }) => {
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
        

        const style = {
         

            content: 'COPYRIGHT, YOU SHALL NOT STEAL!',
            position: 'absolute',
            bottom: 0,
            right: 0,
            opacity: 0.5,
        
          }
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
                            <div  key={i} class="watermark"
                            >
                                <Display name={item.nombre_foto} />
                            
                            </div>
                        ))}
                    </Slider>
                    {items.map((item, i) => (
                        <div key={i}> 
                    <div className="acr-listing-details">
                        <div className="acr-listing-section">
                            <div className="acr-listing-section-body">
                                <div className="acr-listing-section-price">
                                    <span>{item.venta_renta}</span>
                                    <h3>$ {new Intl.NumberFormat().format((item.precio))}</h3>
                                </div>
                            </div>
                        </div>
                        <div className="acr-listing-section">
                            <div className="acr-listing-section-body">
                                <h4>{item.desc_bien}</h4>
                                <div className="acr-listing-icons">
                                    <div className="acr-listing-icon">
                                        <i className="flaticon-bedroom" />
                                        <span>Habitaciones</span>
                                        <span className="acr-listing-icon-value">{item.habitaciones}</span>
                                    </div>
                                    <div className="acr-listing-icon">
                                        <i className="flaticon-bathroom" />
                                        <span>Baños</span>
                                        <span className="acr-listing-icon-value">{item.bathrooms}</span>
                                    </div>
                                    <div className="acr-listing-icon">
                                        <i className="flaticon-ruler" />
                                        <span>Tamaño</span>
                                        <span className="acr-listing-icon-value">{item.dimensiones} m²</span>
                                    </div>
                                </div>
                                <p>
                                <i className="fas fa-map-marker-alt"/> {item.direccion}, {item.nombre_ciudad}
          </p>
                            </div>
                        </div>
                        
                    </div>
                    </div>
                    ))}
                </div>
            
            </div>
        );
    }
}

export default Banner;