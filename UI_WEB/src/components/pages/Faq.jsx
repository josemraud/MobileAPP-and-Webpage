import React, { Component, Fragment } from "react";
import MetaTags from "react-meta-tags";
import Headerfour from "../layouts/Headerfour";
import Breadcrumb from "../layouts/Breadcrumb";
import Footerthree from "../layouts/Footerthree";
import Content from "../sections/faq/Content";

class Faq extends Component {
  render() {
    return (
      <Fragment>
        <MetaTags>
          <title>Localiza HN | Preguntas Frecuentes</title>
          <meta name="description" content="#" />
        </MetaTags>
        <Headerfour />
        <Breadcrumb breadcrumb={{ pagename: "Preguntas Frecuentes" }} />
        <Content />
        <Footerthree />
      </Fragment>
    );
  }
}

export default Faq;
