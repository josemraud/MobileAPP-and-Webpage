import React, { useContext, useState,useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Slider from "react-slick";
import Swal from "sweetalert2";
import { AuthContext } from "../../../contexts/AuthContext";
import { db } from "../../../helper/firebase";
import { Dropdown } from 'primereact/dropdown';

import { Calendar } from 'primereact/calendar';
import { PaisService } from "../../../service/PaisService";
import { UserService } from "../../../service/UserService";
import { InputNumber } from 'primereact/inputnumber';
import { Checkbox } from 'primereact/checkbox';
import emailjs from 'emailjs-com';
import{ init } from 'emailjs-com';
init("user_RAO4nxVWUrwtpLENlcFfK");


// Slides
const images = [
  {
    img: "assets/img/reg1-min.jpg",
   
  },
  {
    img: "assets/img/reg10-min.jpg",
  },
  {
    img: "assets/img/reg2-min.jpg",
  },
];

// Configuracion
const settings = {
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  dots: true,
  dotsClass: "d-flex slick-dots",
};


export const RegisterContent = () => {
  const [checked, setChecked] = useState(false);
  const [id, setid] = useState(null);
  // Importamos el context de Auth
  
  const URI = 'http://192.168.0.120:5000/api/v1/user/auth'+'/'+id+'/confirmed';
  const [date1, setDate1] = useState(null);
  function sendEmail(e) {
    e.preventDefault();
    emailjs.send("service_ht0xjsb","template_gzp65n9",{
      from_name: "Equipo Localiza",
      to_name: nombre,
      message: 'Hola'+nombre+'bienvenido a localiza, puedes seguir este enlace para confirmar tu correo'+' '+URI,
      reply_to: correo,
      });
   
  }



  const history = useHistory();

  // States


  const [loading, setLoading] = useState(false);
  const userservice = new UserService();
  const paisservice = new PaisService();
  const [value4, setValue4] = useState(1);
  const [value5, setValue5] = useState(1);
  const [value19, setValue19] = useState(1980);
  // Funcion de Registro
  const [formSignUp, setFormSignUp] = useState({
    correo: "",
    nombre: "",
    id_pais:"",
    fecha_nacimiento:"",
    telefono: "",
    password: "",
    apellido:"",
  });
  const fehca=value19+"-"+value4+"-"+value5;
 
  const { correo, password, nombre, apellido, telefono,id_pais } = formSignUp;
  useEffect(() => {
      setFormSignUp({
    
    ...formSignUp
  });
   },[])
   
const handleSubmit = async (event) => {
formSignUp.fecha_nacimiento=date1.toString();
formSignUp.correo=correo.toLowerCase().replace(/\s+/g, '');
  event.preventDefault();
 
  console.log(formSignUp)
await userservice
.newUser(formSignUp,
  {fecha_nacimiento:fehca})
      .then((resp) => {
        if (resp.code === 201) {
          emailjs.send("service_ht0xjsb","template_gzp65n9",{
            from_name: "Equipo Localiza",
            nombre: correo.toLowerCase().replace(/\s+/g, ''),
            message: 'Hola '+nombre+' '+apellido+'bienvenido a localiza, puedes seguir este enlace para confirmar tu correo'+' '+'http://www.applocaliza.com/#/confirm'+'/'+resp.id_usuario,
            reply_to: correo.toLowerCase().replace(/\s+/g, ''),
            });
          Swal.fire("Se ha enviado el correo de confirmación!", resp.msg, "success");
          setLoading(true);
          history.push("/");
       
       
        } else {
          Swal.fire(
            JSON.stringify(resp.msg),
            "error",
          );
          
        }
      })
      .catch((error) => {
        Swal.fire("Error", error.msg, "error");
     
      });
 
}


//Traer los paises 

const getUser = async (event) => {
  userservice.getUser(correo).then(({ data }) => {
    const user = data.map((user) => {
      return {
     id:user.id_usuario,
      };
    });
    setid(user);
    console.log(id);
  });


}
const [paises, setpaises] = useState([])
const getAllPaises = () => {
  paisservice.getAllPaises().then(({ data }) => {
    const pais = data.map((pais) => {
      return {
        code: pais.id_pais,
        name: pais.nombre_pais,
      };
    });
    setpaises(pais);
  });
};
useEffect(() => {
 getAllPaises();
},[])

const [SelectedPais, setSelectedPais] = useState([null]);
const onPaisChange = (e) => {
  if (e.value !== null) {
    setSelectedPais(e.value);
    setFormSignUp({
      ...formSignUp,
      id_pais: e.value.code,
    });
  } else {
    setSelectedPais(e.value);
  }
};
  // Cambios de los Inputs
  const handleOnChange = ({ target }) => {
    setFormSignUp({
      ...formSignUp,
      [target.name]: target.value,
    });
  };

  const allOk = () => {
    return formSignUp.correo.length > 3 && formSignUp.password.length > 3
      ? true
      : false;
  };
  const monthNavigatorTemplate = (e) => {
    return <Dropdown value={e.value} options={e.options} onChange={(event) => e.onChange(event.originalEvent, event.value)} style={{ lineHeight: 1 }} />;
}

const yearNavigatorTemplate = (e) => {
    return <Dropdown value={e.value} options={e.options} onChange={(event) => e.onChange(event.originalEvent, event.value)} className="p-ml-2" style={{ lineHeight: 1 }} />;
}

  return (
    <div className="acr-auth-container">
      <div className="acr-auth-content">
        <form>
          <div className="auth-text">
            <h3>Crea una cuenta en Localiza</h3>
            <p>
            </p>
          </div>
          <div className="form-group">
            <label>Nombres</label>
            <input
              type="text"
              className="form-control form-control-light"
              placeholder="Nombres"
              name="nombre"
              autoComplete="off"
              value={nombre}
              onChange={handleOnChange}
            />
          </div>
          <div className="form-group">
            <label>Apellidos</label>
            <input
              type="text"
              className="form-control form-control-light"
              placeholder="Apellidos"
              name="apellido"
              autoComplete="off"
              value={apellido}
              onChange={handleOnChange}
            />
          </div>
          <div className="form-group">
            <label>Correo Electrónico</label>
            <input
              type="email"
              className="form-control form-control-light"
              placeholder="Email Address"
              name="correo"
              autoComplete="off"
              value={correo}
              onChange={handleOnChange}
            />
          </div>
        
<label>País de Residencia</label>
<br />
<Dropdown className="form-group" value={SelectedPais} options={paises} onChange={onPaisChange} optionLabel="name" placeholder="Seleccione Pais" />
           <br />
          
<label>Fecha de Nacimiento</label>
<br />
<div className="p-field p-col-12 p-md-4">
                      
                        <Calendar className="form-group" id="navigatorstemplate" value={date1} onChange={(e) => setDate1((e.value.getFullYear()+'-'+e.value.getMonth()+'-'+e.value.getDay()))} monthNavigator yearNavigator yearRange="1900:2003" dateFormat="yy-mm-dd"
                            monthNavigatorTemplate={monthNavigatorTemplate} yearNavigatorTemplate={yearNavigatorTemplate} />
                    </div>
          <div className="form-group">
            <label>Celular</label>
            <input
              type="email"
              className="form-control form-control-light"
              placeholder="Celular"
              name="telefono"
              autoComplete="off"
              value={telefono}
              onChange={handleOnChange}
            />
          </div>
          <div className="form-group">
            <label>Constraseña</label>
            <input
              type="password"
              className="form-control form-control-light"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleOnChange}
            />
          </div>
          <div className="form-group">
                              <p className="text-center mb-0">
                                
                                     ¿Acepta los términos y condiciones?<Link to="/legal">Leer</Link>{" "}
                              </p>
                                    <div className="p-field-checkbox">
                                      <Checkbox classname="form-control" inputId="binary" checked={checked} onChange={e => setChecked(e.checked)} required/>
                                         
                                
                                      </div>
                                  </div>
          <button
            type="submit"
            className="btn-custom secondary btn-block"
            onClick={handleSubmit}
            disabled={!allOk()}
          >
            Crear Cuenta
          </button>
        
          <p className="text-center mb-0">
            Ya tienes una cuenta? <Link to="/login">Ingresa</Link>{" "}
          </p>
        </form>
      </div>
    </div>
  );
};
