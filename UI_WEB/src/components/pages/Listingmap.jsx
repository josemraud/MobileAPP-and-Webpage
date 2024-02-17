import React, { Component, Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../layouts/Headerfour";
import Content from "../sections/listingmap/Content";

class Listingmap extends Component {
  render() {
    return (
      <Fragment>
        <MetaTags>
          <title>Localiza  | Venta de Bienes</title>
          <meta name="description" content="#" />
        </MetaTags>
        <Header />
        <Content />
      </Fragment>
    );
  }
}

export default Listingmap;
