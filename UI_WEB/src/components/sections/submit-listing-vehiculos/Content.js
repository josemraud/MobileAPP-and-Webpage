import React, { useEffect, useState } from 'react';
import PrimeReact from 'primereact/api';
import { Tab, Nav } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import Locationtab from './Locationtab';
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";
import { AuthContext } from "../../../contexts/AuthContext";
import { db,st } from "../../../helper/firebase";
import { VehiculosService } from '../../../service/VehiculosService';
import { TipoVehiculoService } from '../../../service/TipoVehiculoService';
import { PaisService } from '../../../service/PaisService';
import { RegionSerive } from '../../../service/RegionService';
import { Dropdown } from 'primereact/dropdown';
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/bootstrap4-light-blue/theme.css"
import { CiudadService } from '../../../service/CiudadService';
import { UserService } from '../../../service/UserService';
import {v4 as uuidv4} from 'uuid';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';

let correo_vendedor = localStorage.getItem("user");
let newDate = new Date();
function Content(props) {
    const [files, setFiles] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });
    
    const [checked, setChecked] = useState(false);
   const vehiculosservice = new VehiculosService();
    // Funcion de insertar vehiculo
 const handleSubmit = async (event) => {
    event.preventDefault();
    if(checked==true){
await vehiculosservice
        .newVehiculo(formVehiculo)
        .then((resp) => {
          if (resp.code === 201) {
            let veh = resp.id_vehiculo;
            files.forEach((foto) => {
              let myuuid = uuidv4();
              var newFileName = "VH-"+veh+"-"+myuuid+".jpg";
              const storageRef = st.ref(`/vehiculos/${newFileName}`);
              const task = storageRef.put(foto);
              task.on("state-changed", (snapshot) => {
              });
              // Ingresa las Fotos a DB
             
              let formFoto=({
                id_vehiculo: veh,
                nombre_foto: newFileName,
              })
              vehiculosservice.newPic(formFoto)
              
            Swal.fire("Solicitud Realizada", resp.msg, "success");
              cleanForm();
              window.location.reload();
            });
          } 
          else 
          {
            Swal.fire(
              "Error al registrar Vehiculo!",
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
  };
  // Cambios de los Inputs
  const handleOnChange = ({ target }) => {
    setFormVehiculo({
      ...formVehiculo,
      [target.name]: target.value,
    });
  };



//********************************Buscar ID*************************************** */
const userservice = new UserService();
let varcorreo = localStorage.getItem("user");
const [User, setUser] = useState([{}]);




const getUser = () => {
    userservice.getUser(varcorreo).then(({ data }) => {
      
      const user = data.map((user) => {
        return {
          code: user.id_usuario,
          
        };
      });
      setUser(user);
      sessionStorage.setItem('id', (user[0].code));
    });
  };

//*********************************************************************** */

  // States
const [formVehiculo, setFormVehiculo] = useState({
    desc_vehiculo: "",
    cabina: "",
    color: "",
    caja: "",
    combustible: "",
    kilometraje: "",
    marca: "",
    modelo: "",
    motor: "",
    placa: "",
    year: "",
    id_ciudad: "",
    id_tipo_vehiculo: "",
    id_usuario: parseInt(sessionStorage.getItem("id")),
    identidad_propietario: "",
    nombre_propietario: "",
    precio: "",
    seo: false,
    usado_nuevo: "Usado"
    
  });
  const { 
      desc_vehiculo,cabina,color,caja,combustible,kilometraje,marca,modelo,motor,placa
      ,year,id_ciudad,identidad_propietario,id_tipo_vehiculo,id_usuario,precio,seo,usado_nuevo,nombre_propietario,
  } = formVehiculo;
    const thumbs = files.map(file => (
        <div className="thumb" key={file.name}>
            <div className="thumbInner">
                <img
                    src={file.preview}
                    alt="img"
                />
            </div>
        </div>
    ));
    const cleanForm = () => {
        setFormVehiculo({
          desc_vehiculo: "",
          cabina: "",
          color: "",
          caja: "",
          combustible: "",
          kilometraje: "",
          marca: "",
          modelo: "",
          motor: "",
          placa: "",
          year: "",
          id_ciudad: "",
          id_tipo_vehiculo: "",
          id_usuario: parseInt(sessionStorage.getItem("id")),
          identidad_propietario: "",
          nombre_propietario: "",
          precio: "",
          seo: false,
          usado_nuevo: "Usado"
        });
      };

    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);



const tipodevehiculoservice = new TipoVehiculoService();
const [Tipovehiculo, setTipovehiculo] = useState([]);
const [SelectedTipovehiculo, setSelectedTipoveiculo] = useState([null]);
  // GET de tipo de vehiculo
  const getAllTipovehiculo = () => {
    tipodevehiculoservice.getAllTipovehiculo().then(({ data }) => {
      const tipovehiculo = data.map((tipovehiculo) => {
        return {
          code: tipovehiculo.id_tipo_vehiculo,
          name: tipovehiculo.desc_tipo_vehiculo,
        };
      });
      setTipovehiculo(tipovehiculo);
    });
  };
  const onTipovehiculoChange = (e) => {
    if (e.value !== null) {
      setSelectedTipoveiculo(e.value);
      setFormVehiculo({
        ...formVehiculo,
        id_tipo_vehiculo: e.value.code,
      });
    } else {
      setSelectedTipoveiculo(e.value);
    }
  };



  useEffect(() => {
    getAllTipovehiculo();
    getAllPaises();
    getUser();
  }, []);

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
              setFormVehiculo({
                ...formVehiculo,
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
                                    <Nav.Link eventKey="tab1"><span>01</span> Informarción Basica</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="tab2"><span>02</span> Galeria</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="tab3"><span>03</span> Ubicación</Nav.Link>
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
                                                <label>Descripcion Vehiculo</label>
                                                <textarea name="desc_vehiculo" rows={4} className="form-control" minLength="2" maxLength="100" placeholder="Descripción del Vehículo" value={desc_vehiculo} onChange={handleOnChange} required/>
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label>Placa</label>
                                                <input type="text" className="form-control" placeholder="PPP-0000" name="placa" value={placa} onChange={handleOnChange} minLength="5" maxLength="100" required/>
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label>Marca</label>
                                               
                                              
                                                <input type="text" className="form-control" placeholder="Marca" name="marca" value={marca} onChange={handleOnChange} minLength="1" maxLength="100" required/>
                                          
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label>Modelo</label>
                                                <input type="text" className="form-control" placeholder="Modelo" name="modelo" value={modelo} onChange={handleOnChange} minLength="1" maxLength="100" required/>
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label>Año</label>
                                                <input type="text" className="form-control" placeholder="Año" name="year" value={year} onChange={handleOnChange} minLength="4" maxLength="100" required />
                                            </div>
                                            <div className="col-md-6">
                                                <label>Tipo de Vehículo</label>
                                                <br/>
                                                <Dropdown classname="dropdown-demo" placeholder="Tipo de Vehículo"
                                             name="id_tipo_vehiculo"
                                             value={SelectedTipovehiculo}
                                             options={Tipovehiculo}
                                             onChange={onTipovehiculoChange}
                                             optionLabel="name"/>
                                            </div>
                                            <div className="col-md-6">
                                                <label>Combustible</label>
                                                <select className="form-control" name="combustible"value={combustible} onChange={handleOnChange}>
                                                    <option value="1">Seleccione una opción</option>
                                                    <option value="Gasolina">Gasolina</option>
                                                    <option value="Diesel">Diesel</option>
                                                    <option value="Gas">Gas</option>
                                                    <option value="Eléctrico">Eléctrico</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label>Motor</label>
                                                <input type="text" className="form-control" placeholder="Motor" name="motor" value={motor} onChange={handleOnChange} minLength="1" maxLength="100" required/>
                                            </div>
                    
                                        </div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="tab2">
                                        <div className="form-group">
                                        </div>
                                        <div className="form-group">
                                            <label>Galería de Fotos</label>
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
                                        <div className="row">
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
                                    
                                    <Tab.Pane eventKey="tab5">
                                    

                                        <div className="row">
                                        <div className="col-md-6">
                                                <label>Caja</label>
                                                <select className="form-control" name="caja"value={caja} onChange={handleOnChange}required>
                                                    <option value="1">Seleccione una opción</option>
                                                    <option value="Mecánica">Mecánica</option>
                                                    <option value="Automática">Automática</option>
                                                    <option value="Tritónica">Tritónica</option>
                                                </select>
                                        </div>
                                        <div className="col-md-6">
                                                <label>Cabina</label>
                                                <select className="form-control" name="cabina"value={cabina} onChange={handleOnChange}required>
                                                    <option value="1">Seleccione una opción</option>
                                                    <option value="Cabina Sencilla">Cabina sencilla</option>
                                                    <option value="Cabina doble">cabina soble</option>
                                                    <option value="Cabina y media">Cabina y media</option>
                                                </select>
                                            </div>
                                           
                                            <div className="col-md-6 form-group">
                                            <label>Color</label>
                                                <input type="text" className="form-control" placeholder="Color" name="color" value={color} onChange={handleOnChange} minLength="1" maxLength="100" required/>
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label>Identidad del propietario</label>
                                                <input type="text" className="form-control" placeholder="0000-0000-00000" name="identidad_propietario" value={identidad_propietario} onChange={handleOnChange} minLength="5" maxLength="100" required/>
                                            </div>
                                                              
                                            <div className="col-md-6 form-group">
                                                <label>Nombre del propietario</label>
                                                <input type="text" className="form-control" placeholder="0000-0000-00000" name="nombre_propietario" value={nombre_propietario} onChange={handleOnChange} minLength="5" maxLength="100" required/>
                                            </div>

                                            <div className="col-md-6 form-group">
                                                <label>KM/H</label>
                                                <InputText type="text" className="form-control" placeholder="Kilometraje" name="kilometraje" value={kilometraje} onChange={handleOnChange} minLength="1" maxLength="100" required keyfilter="money"/>
                                            </div>

                                            <div className="col-md-6 form-group">
                                                <label>Precio (Dólares)</label>
                                                <div className="input-group">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text">$</span>
                                                    </div>
                                                    <InputText type="text" className="form-control" name="precio" placeholder="Precio" value={precio} onChange={handleOnChange} minLength="1" maxLength="100" required keyfilter="money"/>
                                                </div>
                                            </div>
                                        
                                        
                                        
                                        </div>
                                        


                                        <div className="form-group">
                                          <div className="p-field-checkbox">
                                          <Checkbox classname="form-control" inputId="binary" checked={checked} onChange={e => setChecked(e.checked)} required/>    
                                      <b  htmlFor="termsAndConditions">         Acepto los <Link target="_blank" to={{ pathname: `/legal`}}>Términos y Condiciones</Link></b>


                                       </div>
                                      </div>

                                        <button type="submit" className="btn-custom" name="submit" onClick={handleSubmit}>Solicitar Publicación</button>
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