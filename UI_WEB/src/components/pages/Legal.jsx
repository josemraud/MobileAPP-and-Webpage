import React, { Component, Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../layouts/Headerfour";
import Breadcrumb from "../layouts/Breadcrumb";
import Footer from "../layouts/Footerthree";
import Content from "../sections/legal/Content";

class Legal extends Component {
  render() {
    return (
      <Fragment>
        <MetaTags>
          <title>Plaza | Legal</title>
          <meta name="description" content="#" />
        </MetaTags>
        <Header />
        <Breadcrumb breadcrumb={{ pagename: "Legal" }} />
        <Content />
        <Footer />
      </Fragment>
    );
  }
}

export default Legal;
