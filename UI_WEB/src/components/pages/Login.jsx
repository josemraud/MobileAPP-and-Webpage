import React, { Component, Fragment } from "react";
import MetaTags from "react-meta-tags";
import Header from "../layouts/Headerfour";
import { Content } from "../sections/login/Content";

export const Login  = () => {
 
    return (
      <Fragment>
        <MetaTags>
          <title>Localiza HN | Ingresa</title>
          <meta name="description" content="#" />
        </MetaTags>
        <Header />
        <Content />
      </Fragment>
    );
  
}

export default Login;
