import React, { Fragment } from 'react';
import {Menu} from './Menu';
import Mobilemenu from './Mobilemenu';
import HeaderComponent from '../../helper/Navigationhelper';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
class Headerfour extends HeaderComponent {
    render() {
        const token = localStorage.getItem("token") || "None";
        const user = localStorage.getItem("user") || "None";
        const stickyheader = this.state.isTop ? "sticky" : "";
        const logout = () => {
        localStorage.removeItem("token");
        <Link to="/login"></Link>;
    };


        return (
            <Fragment>
                {/* Aside (Mobile Navigation) */}
                <aside className={classNames("main-aside", { "open": this.state.navtoggle })}>
                    <div className="aside-title">
                        <div className="aside-controls aside-trigger">
                            <h4>Menu</h4>
                            <div className="close-btn close-dark" onClick={this.navtoggleClass} >
                                <span />
                                <span />
                            </div>
                        </div>
                    </div>
                    <Mobilemenu />
                </aside>
                <div className="aside-overlay aside-trigger" onClick={this.navtoggleClass} />
                {/* Header Start */}
                <header className="main-header">
                    {/* Top Header Start */}
                    <div className="top-header">
                        <div className="container">
                            <div className="top-header-inner">
                                <ul className="social-media">
                                    <li> <a target="blank" href="https://www.facebook.com/applocaliza"className="fab fa-facebook-f"></a> </li>
                                    <li>  <a target="blank" href="https://www.instagram.com/applocaliza/"className="fab fa-instagram" ></a> </li>
                                  
                                   
                                   
                                </ul>
                                {token !== "None" ? (
                                <ul className="top-header-nav">
                                <li>
                                    <Link to={{ pathname: `/`}} onClick={() => logout()}>
                                    {user} | Cerrar Sesión
                                    </Link>
                                </li>
                                <li>
                                    <Link to={{ pathname: `/editar`}} >
                                    Editar Perfil
                                    </Link>
                                </li>
                                </ul>
                            ) : (
                                <ul className="top-header-nav">
                                <li>
                                    <Link to="/login"> Iniciar Sesión</Link>
                                </li>
                                <li>|</li>
                                <li>
                                    <Link to="/register"> Crear Cuenta</Link>
                                </li>
                                </ul>
                            )}
                            </div>
                        </div>
                    </div>
                    {/* Top Header End */}
                    <nav className="navbar">
                        <div className="container">
                            {/* Menu */}
                            <Menu />
                            
                            <div className="header-controls">
                            {token !== "None" ? (
                                <ul className="header-controls-inner d-none d-lg-flex">
                                <li>
                               
                                </li>
                                </ul>
                            ) : (
                                ""
                            )}
                            
                            <div
                                className="aside-toggler aside-trigger"
                                onClick={this.navtoggleClass}
                            >
                                <span />
                                <span />
                                <span />
                            </div>
                        </div> 
                        </div>
                    </nav>
                </header>
                {/* Header End */}
            </Fragment>
        );
    }
}

export default Headerfour;
//  <li>  <a target="blank" href="https://www.linkedin.com/company/74699167"className="fab fa-linkedin-in" ></a> </li>