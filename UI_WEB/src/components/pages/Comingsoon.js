import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Content from '../sections/comingsoon/Content';
import Header from '../layouts/Headerfour';
import Footer from '../layouts/Footerthree';
import Services from '../sections/homefour/Services';
class Comingsoon extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Localiza | Centro Localiza</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Header/>
                <Content/>
                {/*<Services/> */}
                <Footer/>
            </Fragment>
            
        );
    }
}

export default Comingsoon;