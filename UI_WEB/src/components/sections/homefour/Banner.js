import React, { Component } from 'react';
import { locationlist, statuslist, pricerangelist, bedslist, bathroomslist, typelist, diameterlist } from '../../../data/select.json';
import Select2 from 'react-select2-wrapper';
import classNames from 'classnames';

class Banner extends Component {
    constructor(props) {
        super(props)
        this.state = {
            advancesearch: false
        }
        this.advancetoggle = this.advancetoggle.bind(this);
    }
    advancetoggle() {
        this.setState({
            advancesearch: !this.state.advancesearch
        })
    }
    render() {
        return (
            <div className="banner banner-1 banner-3 dark-overlay bg-cover bg-center" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/assets/img/banner/imagen1.png)" }}>
                <div className="container">
                    <div className="banner-item">
                        <div className="banner-inner">
                            <div className="banner-text">
                                <h1 className="title text-white">Localiza</h1>
                                <p className="subtitle text-white">Somos tu mejor opción para la compra, venta y renta de bienes inmuebles y compra-venta de vehículos nuevos o usados. Tu futuro comienza con un click.</p>
                            </div>
                        </div> 
                    </div> 
                </div> 
            </div>
        );
    }
}

export default Banner;