import React, { Component, Fragment } from "react";
import MetaTags from "react-meta-tags";
import Headerfour from "../layouts/Headerfour";
import Breadcrumb from "../layouts/Breadcrumb";
import Footerthree from "../layouts/Footerthree";
import Content from "../sections/geolocator/Content";

class GeoLocator extends Component {
  render() {
    return (
      <Fragment>
        <MetaTags>
          <title>Localiza HN | GeoLocator</title>
          <meta name="description" content="#" />
        </MetaTags>
        <Headerfour />
      
        <Content />
        <Footerthree />
      </Fragment>
    );
  }
}

export default GeoLocator;
