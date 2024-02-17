import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import agents from '../../../data/agents.json';

class Agentsslider extends Component {
    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
    }
    next() {
        this.slider.slickNext();
    }
    previous() {
        this.slider.slickPrev();
    }
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
                                        <p>Brindar un servicio profesional y de calidad a nuestros clientes en operaciones de intermediación inmobiliaria, dirigido a clientes que desean ofertar de cualquier manera sus bienes inmuebles y para aquellos que demanden el servicio, logrando a través de nuestra gestión la satisfacción y la seguridad de ambas partes en el proceso inmobiliario, contando para tal fin con personal altamente calificado y con amplitud de ofertas.
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
                                        <p>Aplicación pionera y líder en la modernización de los servicios de bienes y raíces efectuando operaciones de manera confiable, ágil, y moderna con altos niveles de eficiencia procurando la satisfacción y seguridad total de nuestros usuarios. 
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

export default Agentsslider;