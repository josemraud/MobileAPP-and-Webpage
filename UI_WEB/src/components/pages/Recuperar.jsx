import React, { useContext, useState,useEffect } from "react";
import MetaTags from "react-meta-tags";
import Header from "../layouts/Header";
import Breadcrumb from "../layouts/Breadcrumb";
import Footer from "../layouts/Footer";
import Content from "../sections/contact/Content";
import { UserService } from "../../service/UserService";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { InputText } from 'primereact/inputtext';
//let llave = window.location.hash.substring(10);
//const slug = str.substring(str.indexOf('-') + 1); 
import emailjs from 'emailjs-com';
import{ init } from 'emailjs-com';
init("user_RAO4nxVWUrwtpLENlcFfK");

export const Recuperar = () => {
    const llave = window.location.hash;
    
  const history = useHistory();
  const [loading, setLoading] = useState(false);
    const userservice = new UserService();
    const slug = llave.substring(llave.indexOf('/') + 1);
    const i = slug.substring(slug.indexOf('/') + 1);
    const [correo, setcorreo] = useState("");
    
    const handleSubmit = async (event) => {
        event.preventDefault();
       
        console.log(correo)
      await userservice
      .recUser(correo)
            .then((resp) => {
              if (resp.code === 200) {
                emailjs.send("service_ht0xjsb","template_jjwudtk",{
                    from_name: "Localiza",
                    correo:correo,
                    message: 'Hola '+correo+' tu contraseña temporal es '+resp.password,
                    reply_to: correo,
                    });
                    Swal.fire(
                      "Te enviamos un correo con una contraseña temporal para que puedas cambiar tu contraseña!",
                      JSON.stringify(resp.msg),
                      "success",
                    );
                    history.push("/login");
               
              } else {
                Swal.fire(
                  "Error al confirmar!",
                  JSON.stringify(resp.msg),
                  "error",
                );
                
              }
            })
            .catch((error) => {
              Swal.fire("Error", error.msg, "error");
           
            });
       
      }
     








      const [value1, setValue1] = useState('');

      

    return (
      <>

<div className="card">
      <h1>Recuperar Contraseña</h1>


    
                <h5>Ingrese su correo</h5>
                <div className="p-grid p-fluid">
                    <div className="p-col-12 p-md-4">
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-user"></i>
                            </span>
                            <InputText placeholder="Correo" value={correo} name="correo" onChange={(e) => setcorreo(e.target.value)}/>
                        </div>
                    </div>
                    </div>

       
      <button
            type="submit"
            className="btn-custom secondary btn-block"
            onClick={handleSubmit}
           // disabled={!allOk()}
          >
        Solicitar cambio de contraseña
          </button>
          </div>
      </>
    );
 
}

export default Recuperar;
