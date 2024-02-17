import React, { Component, Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../layouts/Headerfour";
import Breadcrumb from "../layouts/Breadcrumb";
import Footer from "../layouts/Footer";
import Content from "../sections/listinggrid/Contentused";

export const Listinggridused  = () => {
 
    return (
      <Fragment>
        <MetaTags>
          <title>Localiza | Vehiculos Usados</title>
          <meta name="description" content="#" />
        </MetaTags>
        <Header />
        <Breadcrumb breadcrumb={{ pagename: "Vehiculos Usados" }} />
        <Content />
        <Footer />
      </Fragment>
    );
  
}

export default Listinggridused;
