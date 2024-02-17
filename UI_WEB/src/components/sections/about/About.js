import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class About extends Component {
    render() {
        return (
            <div className="section"> 
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 mb-lg-30 acr-dots-wrapper acr-single-img-wrapper">
                            <img src={process.env.PUBLIC_URL + "/assets/img/localiza.png"} alt="img" />
                            <div className="acr-dots" />
                        </div>
                        <div className="col-lg-6">
                            <div className="section-title-wrap mr-lg-30">
                                <h5 className="custom-primary">Nosotros</h5>
                                <h2 className="title">Localiza, provee el mejor servicio relacionado a bienes y raices</h2>
                                <p className="subtitle">
                                Aplicación de servicios inmobiliarios y venta de vehículos, nace ante la imperiosa necesidad de brindar un servicio pronto, seguro y confiable a las personas que desean adquirir bienes inmuebles o vehículos en Honduras centralizando la información en su plataforma y otorgando numerosas opciones a sus usuarios capaces de vender o comprar desde un edificio, terreno o apartamento hasta un automóvil nuevo o usado a solo un click de distancia. 

                                </p>
                              
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default About;