import React, { Component, Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../layouts/Headerfour";
import Breadcrumb from "../layouts/Breadcrumb";
import Footer from "../layouts/Footerthree";
import Content from "../sections/submit-listing/Content";
export const Submitlisting  = () => {
  
    return (
      <Fragment>
        <MetaTags>
          <title>Localiza | Bienes</title>
          <meta name="description" content="#" />
        </MetaTags>
        <Header />
        <Breadcrumb breadcrumb={{ pagename: "Vende o Renta tus Bienes" }} />
        <Content />
        <Footer />
      </Fragment>
    );
 
}

export default Submitlisting;
