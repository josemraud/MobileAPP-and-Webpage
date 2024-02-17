import React, { Component, Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../layouts/Headerfour";
import Breadcrumb from "../layouts/Breadcrumb";
import Footer from "../layouts/Footer";
import Content from "../sections/listinggrid/Content";

export const Listinggrid  = () => {
 
    return (
      <Fragment>
        <MetaTags>
          <title>Localiza | Vehiculos Nuevos</title>
          <meta name="description" content="#" />
        </MetaTags>
        <Header />
        <Breadcrumb breadcrumb={{ pagename: "Vehiculos Nuevos" }} />
        <Content />
        <Footer />
      </Fragment>
    );
  
}

export default Listinggrid;
