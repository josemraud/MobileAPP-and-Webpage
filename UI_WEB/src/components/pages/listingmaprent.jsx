import React, { Component, Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../layouts/Headerfour";
import ContentRent from "../sections/listingmap/contentrent";

class Listingmaprent extends Component {
  render() {
    return (
      <Fragment>
        <MetaTags>
          <title>Localiza  | Renta de Bienes</title>
          <meta name="description" content="#" />
        </MetaTags>
        <Header />
        <ContentRent />
      </Fragment>
    );
  }
}

export default Listingmaprent;
