import React, { useContext, useState,useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Slider from "react-slick";
import Swal from "sweetalert2";
import  AuthContext  from "../../auth/AuthContext";
import { db, st} from "../../../helper/firebase";
import {login} from "../../auth/AuthContext";
import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login';
 
// Slides
const images = [
  {
    img: "assets/img/log.png",
    
  },
  {
    img: "assets/img/log2.png",
   
  },
  {
    img: "assets/img/log.png",
    
  },
];

// Configuracion incial
const settings = {
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  dots: true,
  dotsClass: "d-flex slick-dots",
};

export const Content = () => {
 





  const {login}  = useContext(AuthContext);
 
 
  const [formSignIn, setFormSignIn] = useState({
    correo: "",
    password: "",
  });
  const { correo, password } = formSignIn;
  const [loading, setLoading] = useState(false);
  let history = useHistory();
  // Envio del Formulario
  const handleSubmit = async (event) => {
    event.preventDefault();

    const { correo, password } = formSignIn;
    const respData = await login(correo.toLowerCase().replace(/\s+/g, ''), password);
    
    if (!respData.ok) {
      Swal.fire("Error al ingresar", respData.msg, "error");
    } else {
      history.replace('/');
    }
  };

  const allOk = () => {
    return formSignIn.correo.length >= 2 && formSignIn.password.length >= 2
      ? true
      : false;
  };

  // Cambios de los Inputs
  const handleOnChange = ({ target }) => {
    setFormSignIn({
      ...formSignIn,
      [target.name]: target.value,
    });
  };



  return (
    <div className="acr-auth-container">
      <div className="acr-auth-content">
        <form method="post">
          <div className="auth-text">
            <h3>Ingresa a Lozaliza HN</h3>
            <p>
            </p>
          </div>
          <div className="form-group">
            <label>Usuario</label>
            <input
              type="text"
              className="form-control form-control-light"
              placeholder="correo"
              name="correo"
               autoComplete="off"
              value={formSignIn.correo}
              onChange={handleOnChange}
              autoFocus
            />
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              className="form-control form-control-light"
              placeholder="Password"
              name="password"
              value={formSignIn.password}
              onChange={handleOnChange}
            />
          </div>
          <div className="form-group">
            <Link to="/recuperar" className="forgot-password">
              Has olvidado tu contraseña?
            </Link>
          </div>
          <button
            type="submit"
            className="btn-custom secondary btn-block"
            onClick={handleSubmit}
          >
            Ingresar
          </button>
          <div className="auth-seperator">
              <span>O</span>
            </div>
          
          <p className="text-center mb-0">
            No tienes cuenta aun? <Link to="/register">Crear una cuenta</Link>{" "}
          </p>
        </form>
      </div>
      <div className="acr-auth-bg">
        <Slider className="acr-auth-bg-slider acr-cs-bg-slider" {...settings}>
          {images.map((item, i) => (
            <div key={i}>
              <div
                className="acr-cs-bg-item bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url(" + process.env.PUBLIC_URL + "/" + item.img + ")",
                }}
              >
                <div className="acr-auth-quote">
                  <h6>{item.title}</h6>
                  <p>{item.text}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};
