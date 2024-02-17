import React, { useContext, useState,useEffect } from "react";
import MetaTags from "react-meta-tags";
import Header from "../layouts/Header";
import Breadcrumb from "../layouts/Breadcrumb";
import Footer from "../layouts/Footer";
import Content from "../sections/contact/Content";
import { UserService } from "../../service/UserService";
import { Link, useHistory } from "react-router-dom";
import Swal from "sweetalert2";

//let llave = window.location.hash.substring(10);
//const slug = str.substring(str.indexOf('-') + 1); 

export const Confirmar = () => {
    const llave = window.location.hash;
    
  const history = useHistory();
  const [loading, setLoading] = useState(false);
    const userservice = new UserService();
    const slug = llave.substring(llave.indexOf('/') + 1);
    const i = slug.substring(slug.indexOf('/') + 1);
      console.log(i);

      const handleSubmit = async (event) => {
        event.preventDefault();
       
        console.log(i)
      await userservice
      .confirmUser(i)
            .then((resp) => {
              if (resp.code === 200) {
               
                Swal.fire("Se ha confirmado su correo!", resp.msg, "success");
                setLoading(true);
                history.push("/");
             
             
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












    return (
      <>
        <MetaTags>
          <title>Confirmacion</title>
          <meta name="description" content="#" />
        </MetaTags>
      
      <h1>Confirme su correo</h1>

      <button
            type="submit"
            className="btn-custom secondary btn-block"
            onClick={handleSubmit}
           // disabled={!allOk()}
          >
            Confirmar Correo
          </button>
      </>
    );
 
}

export default Confirmar;
