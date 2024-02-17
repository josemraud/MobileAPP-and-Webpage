import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Info extends Component {
    render() {
        return (
            <div className="section pt-0 agents ">
                <div className="container" >
                    <div className="section-title-wrap section-header flex-header">
                        <div className="section-title-text">
                            <h5 className="custom-primary">Generalidades</h5>
                        </div>
                    </div>
                    <div className="row" >
                                <div className="acr-agent col-lg-6">
                                    <div className="acr-dots-wrapper acr-agent-thumb">
                                        <div className="acr-dots" />
                                        <Link to="/agent-details"><img src={process.env.PUBLIC_URL + "/assets/img/localiza.png "} alt="agent" /></Link>
                                    </div>
                                    <br></br>
                                    <div className="acr-agent-body">
                                        <h4>Misión</h4>
                                        <p>
                                        Brindar un servicio profesional y seguro a nuestros clientes en operaciones de compra y venta de bienes inmuebles y vehículos,
                                         así como proveer una plataforma para todo aquel que desee generar ingresos adicionales por medio de la intermediación del sector inmobiliario y vehicular, 
                                         encontrando una amplia oferta y demanda de estos bienes.
                                        </p>
                                    </div>
                                </div>

                                <div className="acr-agent col-lg-6 ">
                                    <div className="acr-dots-wrapper acr-agent-thumb">
                                        <div className="acr-dots" />
                                        <Link to="/agent-details"><img src={process.env.PUBLIC_URL + "/assets/img/localiza.png "} alt="agent" /></Link>
                                    </div>
                                     <br></br>
                                    <div className="acr-agent-body">
                                        <h4>Visión</h4>
                                        <p>
                                         Ser pioneros y lideres en la región, modernizando la oferta y demanda de bienes inmuebles y vehículos, efectuando operaciones de manera ágil,
                                         confiable y eficiente, procurando la satisfacción de todos los involucrados en el proceso.
                                        </p>
                                    </div>
                                </div>
                        </div>
                        {/* Agent End */}
                    
                </div>
            </div>
        );
    }
}

export default Info;