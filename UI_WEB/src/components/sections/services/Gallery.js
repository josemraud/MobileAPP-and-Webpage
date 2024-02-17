import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import 'magnific-popup';

class Gallery extends Component {
    componentDidMount() {
        function popup() {
            $('.popup-youtube').magnificPopup({
                type: 'iframe'
            });
        }
        popup()
    }
    render() {
        return (
            <div className="section light-bg section-img-wrapper">
                <div className="section-imgs">
                    <img src={process.env.PUBLIC_URL + "/assets/img/AUTOS Y CASA_Mesa de trabajo 1 copia 2.jpg"} alt="img" />
                    <img src={process.env.PUBLIC_URL + "/assets/img/AUTOS Y CASA_Mesa de trabajo 1 copia.jpg"} alt="img" />
                </div>
                <div className="container">
                    <div className="section-title-wrap text-center">
                        <h5 className="custom-primary">Localiza</h5>
                        <h2 className="title">¿Qué es Localiza?</h2>
                        <p className="subtitle">
                         Aplicación de servicios inmobiliario y vehiculares que nace ante la imperiosa necesidad de brindar un espacio completo,
                         seguro y de calidad a las personas que deseen comprar o vender sus propiedades en Honduras y la región,
                         otorgando numerosas opciones a nuestros usuarios al alcance de un click.
                        </p>
                        <Link to="https://www.youtube.com/watch?v=1EtA3xmNjuo" className="btn-custom popup-youtube"> <i className="m-0 fas fa-play" /> </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Gallery;