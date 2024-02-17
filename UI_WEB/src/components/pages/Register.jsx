import React, { Component, Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../layouts/Headerfour";
import { RegisterContent } from "../sections/register/Content";

class Register extends Component {
  render() {
    return (
      <Fragment>
        <MetaTags>
          <title>Localiza HN | Registrarse</title>
          <meta name="description" content="#" />
        </MetaTags>
        <Header />
        <RegisterContent />
      </Fragment>
    );
  }
}

export default Register;
