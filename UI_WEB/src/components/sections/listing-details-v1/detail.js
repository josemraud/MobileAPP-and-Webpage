import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { OverlayTrigger, Tooltip, Dropdown, NavLink, Accordion, Card } from 'react-bootstrap';
import listing from '../../../data/listings.json';
import $ from 'jquery';
import 'magnific-popup'
import classNames from 'classnames';
import { db, st} from "../../../helper/firebase";
import Imagen from "./imagen.jsx"
import Display from "./display"
import { BienesService } from '../../../service/BienesService';
import { FotosService } from '../../../service/FotosService';



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

const bienesservice = new BienesService();
const fotosservice = new FotosService();
let id="";
class Detail extends Component {
    constructor(props) {
        super(props);
        let cadena=window.location.hash
        let parametro = cadena.substring(21)
        id = parametro;
        //this.ref = 
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
    next(){
        this.slider.slickNext();
    }

    previous(){
        this.slider.slickPrev();
    }

f
   
      //Esto es similar al useEffect
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
                    desc_tipo_bien:venta.desc_tipo_bien,
                };
              });
              this.setState({
                isLoaded: true,
                items: venta
              });
            });
           
            fotosservice.getFotoBien(id).then(({ data }) => {
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
                loading: true
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
                 <h4>Fotos de la propiedad</h4>
                            {/* Content Start */}
                            {foto.map((foto, i) => (
                            <div className="listing-content">
                                
                                <div key={i}>
                                <Display name={foto.nombre_foto} />
                                </div>
                            </div>
                            ))}
                            {/* Content End */}
                            {items.map((item, i) => (
                                
                                <div key={i}>
                                     <div className="section section-padding pt-0 acr-listing-features">
                                      <h4>Características</h4>
                                     <div className="row">
                                         <div className="col-lg-6 col-md-6">
                                             <div className="listing-feature-wrapper">
                                                 <div className="listing-feature">
                                                     {sessionStorage.setItem("bien", item.id_bien)}
                                                     <i className="flaticon-picture" />
                                                     <h6 className="listing-feature-label">Tipo de Propiedad</h6>
                                                     <span className="listing-feature-value">{item.desc_tipo_bien}</span>
                                                 </div>
                                                 <div className="listing-feature">
                                                     <i className="flaticon-bathroom" />
                                                     <h6 className="listing-feature-label">Baños</h6>
                                                     <span className="listing-feature-value">{item.bathrooms}</span>
                                                 </div>
                                             </div>
                                         </div>
                                         <div className="col-lg-6 col-md-6">
                                             <div className="listing-feature">
                                                     <i className="flaticon-ruler" />
                                                     <h6 className="listing-feature-label">Tamaño</h6>
                                                     <span className="listing-feature-value">{item.dimensiones}</span>
                                                 </div>
                                             <div className="listing-feature-wrapper">
                                                 
                                                 <div className="listing-feature">
                                                     <i className="flaticon-pillow" />
                                                     <h6 className="listing-feature-label">Habitaciones</h6>
                                                     <span className="listing-feature-value">{item.habitaciones}</span>
                                                 </div>
                                                 
                                             </div>
                                         </div>
                                     </div>
                                         <div className="row">
                                             <div className="col-lg-6 col-md-6">
                                                 
                                                 <div className="listing-feature">
                                                     <i className="flaticon-garage" />
                                                     <h6 className="listing-feature-label">Garaje</h6>
                                                     <span className="listing-feature-value">{item.parqueo}</span>
                                                 </div>
                                             </div>
                                             <div className="col-lg-6 col-md-6">
                                                 <div className="listing-feature">
                                                     <i className="flaticon-stairs" />
                                                     <h6 className="listing-feature-label">Pisos</h6>
                                                     <span className="listing-feature-value">{item.pisos}</span>
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