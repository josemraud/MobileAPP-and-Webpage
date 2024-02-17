import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import serviceblock from '../../../data/services.json';

class Services extends Component {
    render() {
        return (
            <div className="section light-bg infographics-2 bg-norepeat bg-bottom" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/assets/img/misc/bldg.png )" }}>
                <div className="container">
                    <div className="section-title-wrap section-header">
                        <h5 className="custom-primary">¿Quiénes Somos?</h5>
                        <h2 className="title">Localiza</h2>
                                <p className="subtitle">
                                Localiza App es una plataforma digital que conecta a compradores y vendedores de bienes inmuebles y vehículos, 
                                garantizando un espacio seguro donde pueden encontrarse para cerrar la compra o venta de su propiedad.

                                </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Services;