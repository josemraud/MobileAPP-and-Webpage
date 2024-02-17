import React, { Component, Fragment } from 'react';
import MetaTags from "react-meta-tags";
import Header from '../layouts/Headerfour';
import Footer from '../layouts/Footerthree';
import Content from '../sections/homefour/Content';

export const Homefour = () => {
  
        return (
            <Fragment>
                <MetaTags>
                    <title>Localiza | Inicio</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Header/>
                <Content/>
                <Footer/>
            </Fragment>
        );
  
}

export default Homefour;