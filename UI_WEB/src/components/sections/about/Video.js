import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import 'magnific-popup';

class Video extends Component {
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
                    <img src={process.env.PUBLIC_URL + "/assets/img/A3.png"} alt="img" />
                    <img src={process.env.PUBLIC_URL + "/assets/img/megamenu.png"} alt="img" />
                </div>
                <div className="container">
                    <div className="section-title-wrap text-center">
                        <h5 className="custom-primary">Nuestra Manera</h5>
                        <h2 className="title">Mira como funciona Localiza</h2>
                        <p className="subtitle">
                        Aplicación de servicios inmobiliarios y venta de vehículos, nace ante la imperiosa necesidad de brindar un servicio pronto, seguro y confiable a las personas que desean adquirir bienes inmuebles o vehículos en Honduras centralizando la información en su plataforma y otorgando numerosas opciones a sus usuarios capaces de vender o comprar desde un edificio, terreno o apartamento hasta un automóvil nuevo o usado a solo un click de distancia.
                        </p>
                        <Link to="https://www.youtube.com/watch?v=XmT3S4qrIVk" className="btn-custom popup-youtube"> <i className="m-0 fas fa-play" /> </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Video;