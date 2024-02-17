import React, { Component, Fragment } from "react";
import MetaTags from "react-meta-tags";
import Headerfour  from "../layouts/Headerfour";
import Breadcrumb from "../layouts/Breadcrumb";
import Footerthree from "../layouts/Footerthree";
import Content from "../sections/about/Content";

export const About  = () =>  {
  
    return (
      <Fragment>
        <MetaTags>
          <title>Localiza HN | Nosotros</title>
          <meta name="description" content="#" />
        </MetaTags>
        <Content/>
      </Fragment>
    );
    
  
};
