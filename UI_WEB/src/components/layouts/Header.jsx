import React, { Fragment, useState } from "react";
import { Menu } from "./Menu";
import Mobilemenu from "./Mobilemenu";
import HeaderComponent from "../../helper/Navigationhelper";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { auth } from "../../helper/firebase";

class Header extends HeaderComponent {
  // export const Header = () => {
  render() {
    // Obtener el usuario de localstorage
    const token = localStorage.getItem("token") || "None";
    const stickyheader = this.state.isTop ? "sticky" : "";

    const logout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("firtName");
      localStorage.removeItem("lastName");
      localStorage.removeItem("cellphone");
      auth.signOut();
      window.location.reload();
    };

    return (
      <Fragment>
        {/* Aside (Mobile Navigation) */}
        <aside
          className={classNames("main-aside", { open: this.state.navtoggle })}
        >
          <div className="aside-title">
            <div className="aside-controls aside-trigger">
              <h4>Menu</h4>
              <div
                className="close-btn close-dark"
                onClick={this.navtoggleClass}
              >
                <span />
                <span />
              </div>
            </div>
          </div>
        </aside>
        <div
          className="aside-overlay aside-trigger"
          onClick={this.navtoggleClass}
        />
        {/* Header Start */}
        <header
          className={`main-header header-fw can-sticky header-1 ${stickyheader}`}
        >
          {/* Top Header Start */}
          <div className="top-header">
            <div className="top-header-inner">
              <ul className="social-media">
                <li>
                  <Link to="#">
                    <i className="fab fa-facebook-f" />
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <i className="fab fa-pinterest-p" />
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <i className="fab fa-linkedin-in" />
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <i className="fab fa-twitter" />
                  </Link>
                </li>
              </ul>
              {token == "None" ? (
                <ul className="top-header-nav">
                  <li>
                    <Link to="#" onClick={() => logout()}>
                      {token} | Cerrar Sesión
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
          {/* Top Header End */}
          <nav className="navbar">
            {/* Menu */}
            <Menu />
            <div className="header-controls">
              {token !== "None" ? (
                <ul className="header-controls-inner d-none d-lg-flex">
                  
                </ul>
              ) : (
                ""
              )}
              {/* Toggler */}
              <div
                className="aside-toggler aside-trigger"
                onClick={this.navtoggleClass}
              >
                <span />
                <span />
                <span />
              </div>
            </div>
          </nav>
        </header>
        {/* Header End */}
      </Fragment>
    );
  }
}

export default Header;
