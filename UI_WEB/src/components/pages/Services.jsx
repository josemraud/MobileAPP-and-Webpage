import React, { Component, Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../layouts/Headerfour";
import Breadcrumb from "../layouts/Breadcrumb";
import Footer from "../layouts/Footerthree";
import Content from "../sections/services/Content";

class Services extends Component {
  render() {
    return (
      <Fragment>
        <MetaTags>
          <title>Localiza | Acerca de Nosotros</title>
          <meta name="description" content="#" />
        </MetaTags>
        <Header />
        <Breadcrumb breadcrumb={{ pagename: "¿Quiénes Somos?" }} />
        <Content />
        <Footer />
      </Fragment>
    );
  }
}

export default Services;
