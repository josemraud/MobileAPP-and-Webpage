import React, { Suspense } from "react";
// Se cambio la directiva BrowserRouter > HashRouter
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Submitlistingvehicles from "./components/pages/Submitlistingvehiculos";
import { AuthProvider } from "../src/components/auth/AuthContext";
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Preloader
const Preloader = React.lazy(() => import("./components/layouts/Preloader"));

// Home Pages

const Homefour = React.lazy(() => import("./components/pages/Homefour"));


// Pages
const About = React.lazy(() => import("./components/pages/About"));
const Services = React.lazy(() => import("./components/pages/Services"));
const Faq = React.lazy(() => import("./components/pages/Faq"));
const Legal = React.lazy(() => import("./components/pages/Legal"));

const Contact = React.lazy(() => import("./components/pages/Contact"));
const Comingsoon = React.lazy(() => import("./components/pages/Comingsoon"));
const Error = React.lazy(() => import("./components/pages/Error"));
const Login = React.lazy(() => import("./components/pages/Login"));
const Register = React.lazy(() => import("./components/pages/Register"));
const Confirmar = React.lazy(() => import("./components/pages/confirmar"));
const Recuperar = React.lazy(() => import("./components/pages/Recuperar"));
const EditarPerfil = React.lazy(() => import("./components/pages/EditarPerfil"));

const GeoLocator = React.lazy(() => import("./components/pages/GeoLocator"));
// Listings
const Listinggridused = React.lazy(() => import("./components/pages/Listinggridused"));
const Listinggrid = React.lazy(() => import("./components/pages/Listinggrid"));

const Listingmap = React.lazy(() => import("./components/pages/Listingmap"));
const Listingmaprent = React.lazy(() => import("./components/pages/listingmaprent"));

const Listingdetailsone = React.lazy(() =>
  import("./components/pages/Listingdetailsone")
);
const Listingdetailstwo = React.lazy(() =>
  import("./components/pages/Listingdetailstwo")
);

const Submitlisting = React.lazy(() =>
  import("./components/pages/Submitlisting")
);

const Submitlistingvehiculos = React.lazy(() =>
  import("./components/pages/Submitlistingvehiculos")
);




export const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<div></div>}>
          <Preloader />
          <Switch>
            {/* Homepages */}
         
            <Route exact path="/" component={Homefour} />
        
            {/* Pages */}
            <Route path="/about" component={Services} />
            <Route path="/services" component={Services} />
            <Route path="/faq" component={Faq} />
          
            <Route path="/contact" component={Contact} />
            <Route path="/coming-soon" component={Comingsoon} />
            <Route path="/error-404" component={Error} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/confirm/:id" component={Confirmar} />
            <Route path="/recuperar/" component={Recuperar} />
            <Route path="/editar" component={EditarPerfil} />
          
            <Route path="/geo-locator" component={GeoLocator} />
            {/* Listings */}
            <Route path="/listing-grid-used" component={Listinggridused} />
            <Route path="/listing-grid" component={Listinggrid} />
            <Route path="/legal" component={Legal} />
            <Route path="/listing-map" component={Listingmap} />
            <Route path="/listing-maprent" component={Listingmaprent} />
            <Route path="/listing-details-v1/:id" component={Listingdetailsone} />
            <Route path="/listing-details-v2/:id" component={Listingdetailstwo} />
          
            <Route path="/submit-listing" component={Submitlisting} />
            <Route path="/submit-listingvehiculos" component={Submitlistingvehiculos} />
        
       
          </Switch>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}
