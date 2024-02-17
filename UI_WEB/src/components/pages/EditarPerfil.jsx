import React, { Component,Fragment } from "react";
import MetaTags from "react-meta-tags";
import Headerfour  from "../layouts/Headerfour";
import Breadcrumb from "../layouts/Breadcrumb";
import Footerthree from "../layouts/Footerthree";
import Content from "../sections/editar/content";
import Header from '../layouts/Headerfour';
import Footer from '../layouts/Footerthree';

export const EditarPerfil  = () =>  {
  
    return (
      <Fragment>
        <MetaTags>
          <title>Localiza HN | Editar Perfil</title>
          <meta name="description" content="#" />
        </MetaTags>
        <Header/>
        <Content/>
        <Footer/>
      </Fragment>
      
    );
    
};

export default EditarPerfil;