import React, { Component, Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../layouts/Headerfour";
import Breadcrumb from "../layouts/Breadcrumbvehiculo";
import Footer from "../layouts/Footerthree";
import Content from "../sections/submit-listing-vehiculos/Content";

export const Submitlistingvehiculos  = () => {
  
    return (
      <Fragment>
        <MetaTags>
          <title>Localiza HN | Venta de Vehículos</title>
          <meta name="description" content="#" />
        </MetaTags>
        <Header />
        <Breadcrumb breadcrumb={{ pagename: "Vende tu vehículo" }} />
        <Content />
        <Footer />
      </Fragment>
    );
  
}

export default Submitlistingvehiculos;
