import React, { useEffect, useState } from 'react';
import { Tab, Nav, NavDropdown } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import Locationtab from './Locationtab';
import PrimeReact from 'primereact/api';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import Swal from "sweetalert2";
import { Link } from 'react-router-dom';
import { AuthContext } from "../../../contexts/AuthContext";
import { db, st} from "../../../helper/firebase";
import { BienesService } from '../../../service/BienesService';
import { TipodebienService } from '../../../service/TipodebienService';
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css"
import { PaisService } from '../../../service/PaisService';
import { RegionSerive } from '../../../service/RegionService';
import { CiudadService } from '../../../service/CiudadService';
import {v4 as uuidv4} from 'uuid';
import { Checkbox } from 'primereact/checkbox';
// Features
const features = [
  { id: 1, icon: "bone", title: "Pet Friendly" },
  { id: 2, icon: "chair", title: "Furnished" },
  { id: 3, icon: "fan", title: "Cooling" },
  { id: 4, icon: "garage", title: "Parking" },
  { id: 5, icon: "mailbox", title: "Mailbox" },
  { id: 6, icon: "eye", title: "City View" },
];
function Content(props) {
const [files, setFiles] = useState([]);

let bienesservice = new BienesService();
const tipodebienservice = new TipodebienService();
const [checked, setChecked] = useState(false);
  let [FormBien, setFormBien] = useState({
    desc_bien: "",
    bathrooms: "",
    dimensiones: "",
    direccion: "",
    habitaciones: "",
    id_ciudad:"",
    id_tipo_bien:"",
    id_usuario: parseInt(localStorage.getItem("sesh")),
    longitud: "",
    latitud: "",
    identidad_propietario: "",
    nombre_propietario: "",
    parqueo: "",
    pisos: "",
    precio: "",
    seo: false,
    venta_renta: ""
  }
  
  );
  
  let {desc_bien,direccion,latitud,longitud,dimensiones,habitaciones,bathrooms,pisos,parqueo,identidad_propietario,nombre_propietario
    ,precio,venta_renta,aprobado,seo,id_tipo_bien,id_ciudad,id_usuario } = FormBien;



  const { getRootProps, getInputProps } = useDropzone({
      accept: 'image/*',
      onDrop: acceptedFiles => {
          setFiles(acceptedFiles.map(file => Object.assign(file, {
              preview: URL.createObjectURL(file)
          })));
      }
  });
//El correo de la persona que registro el bien 
let correo_vendedor = localStorage.getItem("user");
let newDate = new Date();

const [Tiposbien, setTiposbien] = useState([]);
const [SelectedTipobien, setSelectedTipobien] = useState([null]);
  // GET de tipos de bien
  const getAllTipodebien = () => {
    tipodebienservice.getAllTipodebien().then(({ data }) => {
      const tipodebien = data.map((tipodebien) => {
        return {
          code: tipodebien.id_tipo_bien,
          name: tipodebien.desc_tipo_bien,
        };
      });
      setTiposbien(tipodebien);
    });
  };
  const onTipodebienChange = (e) => {
    if (e.value !== null) {
      setSelectedTipobien(e.value);
      setFormBien({
        ...FormBien,
        id_tipo_bien: e.value.code,
      });
    } else {
      setSelectedTipobien(e.value);
    }
  };

const handleSubmit = async (event) => {
 
    event.preventDefault();
    FormBien.longitud=longitud;
    FormBien.latitud=latitud;
    if(checked==true){
await bienesservice
        .newBien(FormBien)
        .then((resp) => {
          if (resp.code === 201) {
            Swal.fire("Solicitud Enviada!", resp.msg, "success");
            let veh = resp.id_bien;
            files.forEach((foto) => {
              let myuuid = uuidv4();
              var newFileName = "BI-"+veh+"-"+myuuid+".jpg";
              const storageRef = st.ref(`/bienes/${newFileName}`);
              const task = storageRef.put(foto);
              task.on("state-changed", (snapshot) => {
              });
              // Ingresa las Fotos a DB
             
              let formFoto=({
                id_bien: veh,
                nombre_foto: newFileName,
              })
              bienesservice.newPic(formFoto)
              window.location.reload();
            });



          
          } else {
            Swal.fire(
              "Error al registrar Bien!",
              JSON.stringify(resp.msg),
              "error",
            );
            
          }
        })
        .catch((error) => {
          Swal.fire("Error", error.msg, "error");
       
        });
      } else{
        Swal.fire(
          "Error, tiene que aceptar los terminos y condiciones!",
        
          "error",
        );
        
      }
   
}

  
// Cambios de los Inputs
const handleOnChange = ({ target }) => {
  setFormBien({
    ...FormBien,
    [target.name]: target.value,
  });
};



const thumbs = files.map((file) => (
  <div className="thumb" key={file.name}>
    <div className="thumbInner">
      <img src={file.preview} alt="img" />
    </div>
  </div>
));
const cleanForm = () => {
  setFormBien({
    desc_bien: "",
    bathrooms: "",
    dimensiones: "",
    direccion: "",
    habitaciones: "",
    id_ciudad:"",
    id_tipo_bien:"",
    id_usuario: parseInt(localStorage.getItem("sesh")),
    longitud: "",
    latitud: "",
    identidad_propietario: "",
    nombre_propietario: "",
    parqueo: "",
    pisos: "",
    precio: "",
    seo: false,
    venta_renta: ""
  });
};
useEffect(() => {
  getAllTipodebien();
  getAllPaises();
}, []);
useEffect(
  
  () => () => {
   
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach((file) => URL.revokeObjectURL(file.preview));


  
  },


  
  [files]

);
const paisservice = new PaisService();
const [SelectedPais, setSelectedPais] = useState([null]);
const [Paises, setPaises] = useState([]);


// GET de paises
const getAllPaises = () => {
  paisservice.getAllPaises().then(({ data }) => {

    const pais = data.map((pais) => {
      return {
        code: pais.id_pais,
        name: pais.nombre_pais,
      };
    });
    setPaises(pais);
  });
};


const regionesservice = new RegionSerive();
const [Region, setRegion] = useState([]);
const [SelectedRegion, setSelectedRegion] = useState([null]);
// GET de regiones
const getAllRegion = (id_pais) => {
  regionesservice.getAllRegion(id_pais).then(({ data }) => {

    const region = data.map((region) => {
      return {
        code: region.id_region,
        name: region.nombre_region,
      };
    });
    setRegion(region);
  });
};


const ciudadservice = new CiudadService();
const [Ciudad, setCiudad] = useState([]);
const [SelectedCiudad, setSelectedCiudad] = useState([null]);

 // GET de ciudades
const getAllCiudades = (id_region) => {
  ciudadservice.getAllCiudades(id_region).then(({ data }) => {

    const ciudad = data.map((ciudad) => {
      return {
        code: ciudad.id_ciudad,
        name: ciudad.nombre_ciudad,
      };
    });
    setCiudad(ciudad);
  });
};

//DROPDOWNS-------------------------------------------------------------------------

const onPaisChange = (e) => {
  setSelectedPais(e.value);
  getAllRegion(e.value.code)
  }
  const onRegionChange = (e) => {
      setSelectedRegion(e.value);
      getAllCiudades(e.value.code)
      }
      const onCiudadChange = (e) => {
          if (e.value !== null) {
            setSelectedCiudad(e.value);
            setFormBien({
              ...FormBien,
              id_ciudad: e.value.code,
            });
          } else {
            setSelectedCiudad(e.value);
          }
        };
   

return (
  <div className="section">
      <div className="container">
          <div className="row">
              <Tab.Container defaultActiveKey="tab1">
                  {/* Tabs Start */}
                  <div className="col-md-4">
                      <Nav variant="tabs" className="nav nav-tabs tab-cards">
                          <Nav.Item>
                              <Nav.Link eventKey="tab1"><span>01</span> Informacion Basica</Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                              <Nav.Link eventKey="tab2"><span>02</span> Galeria</Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                              <Nav.Link eventKey="tab3"><span>03</span> Ubicacion</Nav.Link>
                          </Nav.Item>
                         
                          <Nav.Item>
                              <Nav.Link eventKey="tab5"><span>04</span> Detalles</Nav.Link>
                          </Nav.Item>
                      </Nav>
                  </div>
                  {/* Tabs End */}
                  {/* Tab Content Start */}
                  <div className="col-md-8">
                      <form>
                          <Tab.Content className="m-0">
                              <Tab.Pane eventKey="tab1">
                              <div className="row">
                                      <div className="col-md-12 form-group">
                                          <label>Descripcion Del Bien</label>
                                          <textarea type="text" className="form-control" placeholder="Descripción del Bien" name="desc_bien" value={desc_bien}  autoComplete="off"onChange={handleOnChange} minLength="5" maxLength="100" required/>
                                      </div>
                                     
                                      
                                            <div className="col-md-6">
                                          <label>Tipo Bien</label>
                                            <br/>
                                         
                                          <Dropdown classname="dropdown-demo" placeholder="Seleccione el tipo de bien"
                                             name="id_tipo_bien"
                                             value={SelectedTipobien}
                                             options={Tiposbien}
                                             onChange={onTipodebienChange}
                                             optionLabel="name"/>
                                       
                                      </div>
                                      
                                      
                              
                                    
                                      <div className="col-md-6 form-group">
                                          <label>Habitaciones*</label>
                                          <InputText type="text" className="form-control" placeholder="Numero de habitaciones" name="habitaciones"  value={habitaciones}   autoComplete="off"   onChange={handleOnChange} minLength="1" maxLength="4" required keyfilter="money"/>
                                      </div>
                                      <div className="col-md-6 form-group">
                                          <label>Baños*</label>
                                          <InputText type="text" className="form-control" placeholder="Baños" name="bathrooms" value={bathrooms}  autoComplete="off"   onChange={handleOnChange} minLength="1" maxLength="4" required keyfilter="money"/>
                                      </div>
                                     
                                      <div className="col-md-6 form-group">
                                          <label>Pisos*</label>
                                          <InputText type="text" className="form-control" placeholder="Numero de pisos" name="pisos"  value={pisos}   autoComplete="off"   onChange={handleOnChange} minLength="1" maxLength="4" required keyfilter="money" />
                                      </div>
                                      <div className="col-md-6">
                                          <label>Garaje/Parqueo*</label>
                                          
                                          <InputText className="form-control" name="parqueo" placeholder="Parqueos" value={parqueo} onChange={handleOnChange} keyfilter="money" maxLength="4" />
                                       
                                      </div>
                                      <div className="col-md-12">

                                      <a>
                                     *En caso de ser un terreno, colocar valor 0
                                  </a>
                                      </div>
                                     
                                  </div>
                              </Tab.Pane>
                              <Tab.Pane eventKey="tab2">
                                 
                                  <div className="form-group">
                                      <label>Galeria de Fotos</label>
                                      <div {...getRootProps({ className: 'dropzone' })}>
                                          <input {...getInputProps()} />
                                          <div className="dropzone-msg dz-message needsclick">
                                              <i className="fas fa-cloud-upload-alt" />
                                              <h5 className="dropzone-msg-title">Arrastre las imágenes o toque aquí para seleccionarlas.</h5>
                                          </div>
                                      </div>
                                      <aside className="thumbsContainer">
                                          {thumbs}
                                      </aside>  
                                  </div>
                              </Tab.Pane>
                              <Tab.Pane eventKey="tab3">
                                  <Locationtab/>
                                  <div className="row">
                                    
                                
                                    <div className="col-md-12 form-group">
                                                <label>Direccion</label>
                                                <input type="text" className="form-control" placeholder="Direccion" name="direccion" value={direccion} onChange={handleOnChange} minLength="1" maxLength="100" required/>
                                            </div>
                                          
                                        <div className="col-md-6">
                                                <label>Pais</label>
                                                <br/>
                                                <Dropdown classname="dropdown-demo" placeholder="Seleccione un Pais"
                                             name="id_pais"
                                             value={SelectedPais}
                                             options={Paises}
                                             onChange={onPaisChange}
                                             optionLabel="name"/>
                                            </div>
                                            <div className="col-md-6">
                                                <label>Region</label>
                                                <br/>
                                                <Dropdown classname="dropdown-demo" placeholder="Seleccione una Region"
                                             name="id_region"
                                             value={SelectedRegion}
                                             options={Region}
                                             onChange={onRegionChange}
                                             optionLabel="name"/>
                                            </div>
                                            <div className="col-md-6">
                                                <label>Ciudad</label>
                                                <br/>
                                                <Dropdown classname="dropdown-demo" placeholder="Seleccione una Ciudad"
                                             name="id_ciudad"
                                             value={SelectedCiudad}
                                             options={Ciudad}
                                             onChange={onCiudadChange}
                                             optionLabel="name"/>
                                            </div>

                               
                                </div>          
                              </Tab.Pane>
                              <Tab.Pane eventKey="tab4">
                                  <div className="row">
                                      {features.map((item, i) => (
                                          <div key={i} className="col-lg-4 col-md-6 col-sm-6">
                                              <label className="acr-listing-feature">
                                                  <input type="checkbox" name={"feature" + item.id + ""} />
                                                  <i className="acr-feature-check fas fa-check" />
                                                  <i className={"acr-listing-feature-icon flaticon-" + item.icon + ""} />
                                                  {item.title}
                                              </label>
                                          </div>
                                      ))}
                                  </div>
                              </Tab.Pane>
                              <Tab.Pane eventKey="tab5">
                              <div className="row">
                                      <div className="col-md-6 form-group">
                                          <label>Dimensiones m²</label>
                                          <InputText type="text" className="form-control" placeholder="Dimensiones Area²" name="dimensiones" value={dimensiones}   autoComplete="off"    onChange={handleOnChange} minLength="1" maxLength="20" required className="form-control" keyfilter="money"/>
                                      </div>
                                      <div className="col-md-6 form-group">
                                                <label>Identidad del propietario</label>
                                                <InputText type="text" className="form-control" placeholder="0000-0000-00000" name="identidad_propietario" value={identidad_propietario} onChange={handleOnChange} minLength="5" maxLength="20" required/>
                                            </div>
                                    
                                      <div className="col-md-12 form-group">
                                          <label>Propietario Actual</label>
                                          <input type="text" className="form-control" placeholder="Nombre Completo" name="nombre_propietario" value={nombre_propietario}  autoComplete="off"    onChange={handleOnChange} minLength="1" maxLength="25" required/>
                                      </div>
                                    

                                      <div className="col-md-6">
                                          <label>Objetivo</label>
                                          <select className="form-control" name="venta_renta" value={venta_renta} onChange={handleOnChange} required>
                                          <option value="1">Seleccione una opción</option>
                                              <option value="Venta">Venta</option>
                                              <option value="Renta">Renta</option>
                                              
                                          </select>
                                      </div>
                                    
                                      <div className="col-md-6 form-group">
                                          <label>Precio (Dólares)</label>
                                          <div className="input-group">
                                              <div className="input-group-prepend">
                                                  <span className="input-group-text">$</span>
                                              </div>
                                              <InputText type="text" className="form-control" name="precio" placeholder="Precio"  value={precio} autoComplete="off"    onChange={handleOnChange} minLength="1" maxLength="100" required keyfilter="money"/>
                                          </div>
                                      </div>
                                    
                                     
                                  </div>
                                  <div className="form-group">
                                  <div className="p-field-checkbox">
                                      <Checkbox classname="form-control" inputId="binary" checked={checked} onChange={e => setChecked(e.checked)} required/>    
                                      <b  htmlFor="termsAndConditions">         Acepto los <Link target="_blank" to={{ pathname: `/legal`}}>Términos y Condiciones</Link></b>

                                      </div>
                                  </div>
                                  <button type="submit" className="btn-custom" name="submit" onClick={longitud=sessionStorage.getItem("longitud"), latitud=sessionStorage.getItem("latitud"), handleSubmit} >Enviar Solicitud</button>
                              </Tab.Pane>
                          </Tab.Content>
                      </form>
                  </div>
              </Tab.Container>
              {/* Tab Content End */}
          </div>
      </div>
  </div>
);

}
export default Content;