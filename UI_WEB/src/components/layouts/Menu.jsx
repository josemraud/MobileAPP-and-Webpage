import React, { Fragment, useContext,useState,useEffect,useHistory } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../components/auth/AuthContext";
import { auth } from "../../helper/firebase";
import Swal from "sweetalert2";
//class Menu extends MenuComponent {
export const Menu = () => {
  // Importamos el context de Auth
    
    // Obtener el usuario de localstorage
    const token = localStorage.getItem("token") || "None";
    
    const logout = () => {
      
      localStorage.removeItem("token");
      auth.signOut();
    };
    
    
    

  return (
    
    <Fragment>
      {/* Logo */}
      <Link className="navbar-brand" to="/">
        <img src={"/assets/img/localizaicono2.png.png"} alt="logo" />
      </Link>
      {/* Menu */}
      
      <ul className="navbar-nav">
        <li className="menu-item menu-item-has-children">
          <Link to="/">Inicio</Link>
      
        </li>
        <li className="menu-item menu-item-has-children">
        {token == "None" ? (
          <Link to="/login">Bienes</Link>
          ) : (
            <Link to="#">Bienes</Link>
              
              
            )}
     
        
          {token !== "None" ? (
               <ul className="submenu">
               <li className="menu-item menu-item-has-children">
                 <Link to="#">Adquirir</Link>
                 <ul className="submenu">
                <li className="menu-item">
                  {" "}
                  <Link to="/listing-map">Compra</Link>
                </li>
                <li className="menu-item">
                  {" "}
                  <Link to="/listing-maprent">Renta</Link>
                </li>
                <li className="menu-item">
                  {" "}
                  <a target="blank" href="https://surei.sinap.hn/imagenes/consInscripcion.jsp?tsc=p&sistema=FP">Tomo de Incripcion</a>
                </li>
                <li className="menu-item">
                  {" "}
                  <a target="blank" href="https://surei.sinap.hn/consultas/folioreal/consInmuebles.jsp?tsc=p">Matricula</a>
                </li>
              </ul>
               </li>
               <li className="menu-item menu-item-has-children">
                 <Link to="/submit-listing">Venta</Link>
               </li>
               </ul>
              ) : (
              ""
                
                
              )}
             
            
              

                
              
        </li>
        <li className="menu-item menu-item-has-children">
        {token == "None" ? (
      
          <Link to="/login" >Vehículos</Link >
         
          ) : (
            <Link to="#">Vehículos</Link>
              
              
            )}
     
         
          {token !== "None" ? (
          <ul className="submenu">
            <li className="menu-item menu-item-has-children">
              <Link to="#">Compra</Link>
              <ul className="submenu">
                <li className="menu-item">
                  {" "}
                  <Link to="/listing-grid">Nuevos</Link>
                </li>
                <li className="menu-item">
                  {" "}
                  <Link to="/listing-grid-used">Usados</Link>
                </li>
                <li className="menu-item">
                  {" "}
                  <a target="blank" href="https://placas.ip.gob.hn/vehiculos">Consulta Vehicular</a>
                </li>
                
              </ul>
            </li>
            
            <li className="menu-item menu-item-has-children">
              <Link to="/submit-listingvehiculos">Venta</Link></li>
          </ul>
          
          ) : (
            ""
          )}
        </li>

    

        {/* Nosotros */}
        <li className="menu-item menu-item-has-children">
        <Link to="/about">Quienes Somos</Link>
        </li>

        {/* Preguntas Frecuentes  */}
        <li className="menu-item menu-item-has-children">
          <Link to="/faq">Preguntas Frecuentes</Link>
        </li>

  {/* Geo Localiza  */}
  <li className="menu-item menu-item-has-children">
          <Link to="/geo-locator">Geo Localiza</Link>
        </li>


         {/* Centro Localiza | FAC-04/02/21  */}
         <li className="menu-item menu-item-has-children">
          <Link to="/coming-soon">Centro Localiza</Link>
        </li>
     
      </ul>
    </Fragment>
  );
}
