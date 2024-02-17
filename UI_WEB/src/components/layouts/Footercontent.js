import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class Footercontent extends Component {
    render() {
        return (
            <Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-4 col-sm-12 footer-widget">
                            <div className="footer-logo">
                                <img src={process.env.PUBLIC_URL + "/assets/img/localizaicono2.png.png"} alt="acres" />
                                
                            </div>
                            <p>“Tu futuro comienza con un click” </p>
                            <ul className="social-media">
                                    <li> <a target="blank" href="https://www.facebook.com/applocaliza"className="fab fa-facebook-f"></a> </li>
                                    <li>  <a target="blank" href="https://www.instagram.com/applocaliza/"className="fab fa-instagram" ></a> </li>
                                  
                                   
                            </ul>
                        </div>
                        <div className="col-lg-2 offset-md-1 col-md-4 col-sm-6 footer-widget">
                            <h5 className="widget-title">Contáctenos</h5>
                            <ul>
                                <li> <a target = "blank" href="https://api.whatsapp.com/send?phone=+50432763465"><i className="fab fa-whatsapp" /> WhatsApp</a> </li>
                                <li> <a href="mailto:soporte@applocaliza.com?Subject=Informacion"><i className="fas fa-envelope" /> Mail</a> </li>
                                
                            </ul>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-6 footer-widget">
                            <h5 className="widget-title">Legal</h5>
                            <ul>
                               
                                <li> <Link to="/legal">Políticas</Link> </li>
                            </ul>
                        </div> 
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-7">
                                <p className="m-0">© Copyright 2021 - <Link to="#">Localiza Technologies HN</Link> Todos los derechos reservados.</p>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Footercontent;
//  <li>  <a target="blank" href="https://www.linkedin.com/company/74699167"className="fab fa-linkedin-in" ></a> </li>