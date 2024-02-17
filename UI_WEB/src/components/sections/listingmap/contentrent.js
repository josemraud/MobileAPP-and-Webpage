import React, { Component } from "react";
import { Link } from "react-router-dom";
import { OverlayTrigger, Tooltip, NavLink } from "react-bootstrap";
import listing from "../../../data/listings.json";

import { InputText } from 'primereact/inputtext';
import Swal from "sweetalert2";
import {
  locationlist,
  pricerangelist,
  typelist,
} from "../../../data/select.json";
import Listingmap from "./Listingmap";
import Select2 from "react-select2-wrapper";
import classNames from "classnames";
import { db, st } from "../../../helper/firebase";
import Thumbnail from "./thumbnailimg";
import { BienesService } from '../../../service/BienesService';
import { FotosService } from '../../../service/FotosService';

import { PaisService } from '../../../service/PaisService';
import { RegionSerive } from "../../../service/RegionService";
import { InputNumber } from 'primereact/inputnumber';

import { Dropdown } from 'primereact/dropdown';
import { CiudadService } from "../../../service/CiudadService";
import { TipodebienService } from "../../../service/TipodebienService";
const gallerytip = <Tooltip>Gallery</Tooltip>;
const bedstip = <Tooltip>Habitaciones</Tooltip>;
const bathstip = <Tooltip>Baños</Tooltip>;
const areatip = <Tooltip>Mts2</Tooltip>;

let menorf="";
let mayorf="";
let id="";
let id_ciudad="";
let id_tipo_bien="";

const bienesservice = new BienesService();
const paisservice= new PaisService();
const regionesservice= new RegionSerive();
const ciudadesservice= new CiudadService();

const fotosservice = new FotosService();
const tipodebienservice = new TipodebienService();
class ContentRent extends Component {
  constructor(props) {
    super(props);
   
    this.unsubscribe = null;
    this.state = {
      itemsPerPage: 6,
      advancesearch: true,
      items: [],
      pictures: [],
      pais:[],
      regiones:[],
      ciudades:[],
      tiposbien:[],
      latLong: null,
      selectedCountry: null,
      selectedRegion: null,
      selectedCiudad: null,
      Selectedtipobien: null,
      menor: null,
      mayor: null,
    };
    this.advancetoggle = this.advancetoggle.bind(this);
    this.onCountryChange = this.onCountryChange.bind(this);
    this.onMenorChange = this.onMenorChange.bind(this);
    this.onMayorChange = this.onMayorChange.bind(this);
    this.onRegionChange = this.onRegionChange.bind(this);
    this.onCiudadChange = this.onCiudadChange.bind(this);
    this.onTipoChange = this.onTipoChange.bind(this);
    this.getbusqueda = this.getbusqueda.bind(this);
  }





getPais(){
  paisservice.getAllPaises().then(({ data }) => {
    const pais = data.map((pais) => {
      return {
        code: pais.id_pais,
        name: pais.nombre_pais,
      };
    });
    this.setState({		// use this function
       pais: pais,
  });
  });
}
componentDidMount(){

this.getPais();
this.getAllTipodebien();
 
}


getAllRegion = (id_pais) => {
  regionesservice.getAllRegion(id_pais).then(({ data }) => {
    const region = data.map((region) => {
      return {
        code: region.id_region,
        name: region.nombre_region,
      };
    });
    this.setState({		// use this function
      regiones: region,
 });
  });
};


onMenorChange(menor) {
  menorf=menor;
}

onMayorChange(mayor) {
  mayorf=mayor;
}
onCountryChange(e) {
  this.setState({ selectedCountry : e.value });
  this.getAllRegion(e.value.code);
}
onTipoChange(e) {
  this.setState({ Selectedtipobien : e.value });
  id_tipo_bien= e.value.code;
}
onCiudadChange(e) {
  this.setState({ selectedCiudad : e.value});
  id_ciudad= e.value.code;
}
onRegionChange(e) {
  this.setState({ selectedRegion : e.value });
  this.getAllCiudades(e.value.code);
}
getAllCiudades = (id_region) => {
  ciudadesservice.getAllCiudades(id_region).then(({ data }) => {
    const ciudad = data.map((ciudad) => {
      return {
        code: ciudad.id_ciudad,
        name: ciudad.nombre_ciudad,
      };
    });
    this.setState({		// use this function
      ciudades: ciudad,
 });
  });
};


    getbusqueda() {
    bienesservice.getbusquedaRenta(id_ciudad,id_tipo_bien,menorf,mayorf).then(({ data }) => {
           const venta = data.map((venta) => {
          return {
            id_bien:venta.id_bien,
            desc_bien:venta.desc_bien,
            venta_renta:venta.venta_renta,
            bathrooms:venta.bathrooms,
            habitaciones:venta.habitaciones,
            dimensiones:venta.dimensiones,
            precio:venta.precio,
            latitud:venta.latitud,
            longitud:venta.longitud,
            venta_renta:venta.venta_renta,
          };
        });
        this.setState({
          isLoaded: true,
          items: venta
        });
       
    });
   this.setState({

    advancesearch:false,
   })
    
  };
 

  getAllTipodebien = () => {
    tipodebienservice.getAllTipodebien().then(({ data }) => {
      const tipodebien = data.map((tipodebien) => {
        return {
          code: tipodebien.id_tipo_bien,
          name: tipodebien.desc_tipo_bien,
        };
      });
      this.setState({
       
        tiposbien: tipodebien
      });
    });
  };
  advancetoggle() {
    this.setState({
      advancesearch: !this.state.advancesearch,
    });
  }
  cambioestado() {
    this.setState({
      
    });
  }


  // Apply latLong
  getLatLong(lat, long) {
    this.state.lat = lat;
    this.state.long = long;
    // this.refs.child.LocationMarker(long, lat);
    Swal.fire('Ahora debes tocar el mapa para redirigirte...');
  }

  triggerChildAlert() {
    this.refs.child.showAlert();
  }

  render() {
    const { items, itemsPerPage } = this.state;
    const { pais } = this.state;
    const { regiones } = this.state;
    const { ciudades } = this.state;
    const { menor } = this.state;
    const { mayor } = this.state;
    const { tiposbien } = this.state;
    const { selectedCountry } = this.state;
    const { selectedRegion } = this.state;
    const { selectedCiudad } = this.state;
    const { Selectedtipobien } = this.state;
    
    
    return (
      <div className="listing-map-wrapper">
        {/* Listings Start */}
        <div className="listing-main-wrapper">
          {/* Filter Start */}
          <div
            className={classNames("acr-filter-form", {
              "d-block": this.state.advancesearch,
            })}
          >
              <div className="acr-filter-form-header">
              <h4>Flitros</h4>
             
              <div
                className="close-btn close-dark filter-trigger"
                onClick={this.advancetoggle}
              >
                <span />
                <span />
              </div>
            </div>
            <h5>Llene todos los campos para realizar la busqueda</h5>
              <div className="row">
                <div className="col-lg-5 col-md-6">
                <label htmlFor="minmax-buttons">Pais</label>
                <br/>
                <Dropdown value={this.state.selectedCountry} options={pais} onChange={this.onCountryChange}  name="id_pais" optionLabel="name" placeholder="Seleccione un pais" />
                </div>

                <div className="col-lg-5 col-md-6">
                <label htmlFor="minmax-buttons">Region</label>
                <br/>
                <Dropdown value={this.state.selectedRegion} options={regiones} onChange={this.onRegionChange}  name="id_region" optionLabel="name" placeholder="Seleccione una region" />
                </div>
                <div className="col-lg-5 col-md-6">
                <label htmlFor="minmax-buttons">Ciudad</label>
                <br/>
                <Dropdown value={this.state.selectedCiudad} options={ciudades}  onChange={this.onCiudadChange}  name="id_ciudad" optionLabel="name" placeholder="Seleccione una ciudad" />
                </div>
                <br/>
                <br/>
                <div className="col-lg-5 col-md-6">
                <label htmlFor="minmax-buttons">Tipo de bien</label>
                <br/>
                <Dropdown value={this.state.Selectedtipobien} options={tiposbien}  onChange={this.onTipoChange}  name="id_tipo_bien" optionLabel="name" placeholder="Seleccione el tipo de bien" />
                </div>
                <div className="col-lg-5 col-md-6">
                            <label htmlFor="minmax-buttons">Menor</label>
                            <br/>
                            <InputText menor={this.state.menor} onChange={(e) => this.setState({menor: e.target.value})} />
                    {this.onMenorChange(this.state.menor)}     
                    </div>
                <div className="col-lg-5 col-md-6">
                            <label htmlFor="minmax-buttons">Mayor</label>
                            <br/>
                            <InputText mayor={this.state.mayor} onChange={(e) => this.setState({mayor: e.target.value})} />
                            {this.onMayorChange(this.state.mayor)}                
                    </div>
              </div>
              <br/>
                <br/>
              <div className="text-right">
                <button type="button" className="filter-trigger btn-custom" onClick={this.getbusqueda}>
                  Aplicar Filtros
                </button>
              </div>
              </div>
              <div className="acr-listing-filter-wrapper">
            <div className="row">
              <div className="col-lg-6 form-group">
                <div className="search-wrapper">
                 
                </div>
              </div>
              <div className="col-lg-6 form-group text-right">
                <button
                  type="button"
                  className="btn-custom-2 light-grey filter-trigger"
                  onClick={this.advancetoggle}
                >
                  Búsqueda Avanzada
                </button>
              </div>
            </div>
          </div>
          
         
          {/* Filter End */}
          <div className="row">
            {/* Listing Start */}
            {items.map((item, i) => (
              <div key={i} className="col-md-6 col-sm-6">
                <div className="listing">
                  <div className="listing-thumbnail">
                    <Thumbnail img={item.id_bien}/>
                    <div className="listing-badges">
                      {item.venta_renta === "Venta" ? (
                        <span className="listing-badge sale">En Venta</span>
                      ) : (
                        ""
                      )}

                      {item.venta_renta === "Renta" ? (
                        <span className="listing-badge rent"> Renta</span>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="listing-controls">
                      <Link
                        to="#"
                        className="fly-to-location"
                        data-lat={item.latitud}
                        data-lng={item.longitud}
                        onClick={() =>
                          this.getLatLong(item.latitud, item.longitud)
                        }
                      >
                        <i className="fas fa-map-marker-alt" />
                      </Link>
                    </div>
                  </div>
                  <div className="listing-body">
                    <div className="listing-author">
                      <div className="listing-author-body">
                        <p>
                          <Link to="#">{item.tipos}</Link>
                        </p>
                        <span className="listing-date">{item.desc_bien}</span>
                      </div>
                    </div>
                    <span className="listing-price">
                    $ {new Intl.NumberFormat().format((item.precio))}
                      <span></span>
                    </span>
                    <p>{item.objetivo}</p>
                    <div className="acr-listing-icons">
                      <OverlayTrigger overlay={bedstip}>
                        <div className="acr-listing-icon">
                          <i className="flaticon-bedroom" />
                          <span className="acr-listing-icon-value">
                            {item.habitaciones}
                          </span>
                        </div>
                      </OverlayTrigger>
                      <OverlayTrigger overlay={bathstip}>
                        <div className="acr-listing-icon">
                          <i className="flaticon-bathroom" />
                          <span className="acr-listing-icon-value">
                            {item.bathrooms}
                          </span>
                        </div>
                      </OverlayTrigger>
                      <OverlayTrigger overlay={areatip}>
                        <div className="acr-listing-icon">
                          <i className="flaticon-ruler" />
                          <span className="acr-listing-icon-value">
                            {new Intl.NumberFormat().format(item.dimensiones)}
                          </span>
                        </div>
                      </OverlayTrigger>
                    </div>
                    <div className="listing-gallery-wrapper">
                      <Link
                        to={{ pathname: `/listing-details-v1/${item.id_bien}` }}
                        className="btn-custom btn-sm secondary"
                      >
                        Ver Detalles
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Listing End */}
          </div>
        </div>
        {/* Listings End */}
        {/* Map Start */}
        <Listingmap lng={this.state.long} lat={this.state.lat} ref="child" />
        {/* Map End */}
      </div>
    );
  }
}

export default ContentRent;
