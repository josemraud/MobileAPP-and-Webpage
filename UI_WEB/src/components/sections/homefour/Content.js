import React, { Component, Fragment } from 'react';
import Banner from './Banner';
import Categories from './Categories';
import CategoriesV from './CategoriesVehiculos';
import Blockcta from '../../layouts/Blockcta';
import App from '../../layouts/App';
import Faqs from './Faqs';
import Services from './Services';
import Listingslider from './Listingslider';
import Listingslider2 from './ListingsliderVehiculos';

class Content extends Component {
    render() {
        return (
            <Fragment>
                
                <Banner /> 
                {/*<Categories/>
                  <Blockcta />
                  <Blockcta />
                */}
                <div className="section section-padding pt-0">
                  
                </div>
                <Listingslider/>

                 {/*<CategoriesV/>*/}
                <div className="section section-padding pt-0">
                  
                </div>

                <Listingslider2/>
                
               
                {/**  estos servicios de momento no deberia ir mejor en quienes somos.
                <Services/> */}
                <div className="acr-footer footer-2">
                    <App />
                </div>
            </Fragment>
        );
    }
}

export default Content;