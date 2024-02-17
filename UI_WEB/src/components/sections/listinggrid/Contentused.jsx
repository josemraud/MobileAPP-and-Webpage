import React, {Component,Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { OverlayTrigger, Tooltip, NavLink } from 'react-bootstrap';
import { Dropdown } from 'primereact/dropdown';
import Sidebar from '../../layouts/Shopsidebarused';
import listing from '../../../data/listings.json';
import classNames from 'classnames';
import Loader from '../../layouts/Loader';
import { db, st} from "../../../helper/firebase";
import ThumbnailVehiculo from "./thumbnailimgVehiculo"
import { Collapse } from 'react-bootstrap';
import { VehiculosService } from '../../../service/VehiculosService';
import Swal from "sweetalert2";
import { TipoVehiculoService } from '../../../service/TipoVehiculoService';
import { PaisService } from '../../../service/PaisService';
import { RegionSerive } from '../../../service/RegionService';
import { CiudadService } from '../../../service/CiudadService';

import { InputText } from 'primereact/inputtext';
const gallerytip = (
    <Tooltip>
        Gallery
    </Tooltip>
);
const gridtip = (
    <Tooltip>
        Grid
    </Tooltip>
);
const listtip = (
    <Tooltip>
        List
    </Tooltip>
);
const maptip = (
    <Tooltip>
        Map
    </Tooltip>
);
const bedstip = (
    <Tooltip>
        Kilometraje
    </Tooltip>
);
const bathstip = (
    <Tooltip>
        Motor
    </Tooltip>
);
const areatip = (
    <Tooltip>
       Precio
    </Tooltip>
);
let menorf="";
let mayorf="";
let id="";
let id_ciudad="";
let id_tipo_vehiculo="";
const tipovehiculosservice = new TipoVehiculoService();
const vehiculosservice = new VehiculosService();
const paisservice = new PaisService();
const regionesservice = new RegionSerive();
const ciudadesservice = new CiudadService();
class Contentused extends Component {
    constructor(props) {
        super(props);
        this.unsubscribe = null;
        this.state = {
            items: [],
            open: true,
            pais:[],
            regiones:[],
            ciudades:[],
            tiposv:[],
            selectedCountry: null,
            selectedRegion: null,
            selectedCiudad: null,
            Selectedtipovehiculo: null,
            menor: null,
            mayor: null,
            currentPage: 1,
            itemsPerPage: 2,
            loading: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.onCountryChange = this.onCountryChange.bind(this);
        this.onMenorChange = this.onMenorChange.bind(this);
        this.onMayorChange = this.onMayorChange.bind(this);
        this.onRegionChange = this.onRegionChange.bind(this);
        this.onCiudadChange = this.onCiudadChange.bind(this);
        this.onTipoChange = this.onTipoChange.bind(this);
        this.getbusqueda = this.getbusqueda.bind(this);
    }
   
      componentDidMount() {
     
this.getPais();
this.getAllTipov();
      }

      getAllTipov = () => {
        tipovehiculosservice.getAllTipovehiculo().then(({ data }) => {
          const tipodev = data.map((tipodev) => {
            return {
              code: tipodev.id_tipo_vehiculo,
              name: tipodev.desc_tipo_vehiculo,
            };
          });
          this.setState({
           
            tiposv: tipodev
          });
        });
      };



   getbusqueda(){
    return vehiculosservice.getbusqueda(id_ciudad,id_tipo_vehiculo,menorf,mayorf).then(({ data }) => {
        if (data != null) {
          const venta = data.map((venta) => {
            return {
              marca:venta.marca,
              modelo:venta.modelo,
              combustible:venta.combustible,
              usado_nuevo:venta.usado_nuevo,
              year:venta.year,
              kilometraje:venta.kilometraje,
              motor:venta.motor,
              precio:venta.precio,
              color:venta.color,
              id_vehiculo:venta.id_vehiculo,
            
            };
          
          });
          this.setState({
              isLoaded: true,
              items: venta
            });
            this.setState({
               open:false,
            });
        } else {
          Swal.fire(
            "Error con vehiculos!",
            "Error al listar todos los vehiculo!",
            "error"
          );
        }
      });
   }









    handleClick(event) {
        var paginationContent = event.target.closest('.pagination-content');

        if (paginationContent) {
            paginationContent.scrollIntoView();
        }

        this.setState({
            loading: true
        });
        setTimeout(() => {
            this.setState({
                currentPage: Number(event.target.getAttribute('data-page')),
                loading: false
            });
        }, 2000);

    }

    getPais(){
        paisservice.getAllPaises().then(({ data }) => {
          const pais = data.map((pais) => {
            return {
              code: pais.id_pais,
              name: pais.nombre_pais,
            };
          });
          this.setState({		
             pais: pais,
        });
        });
      }

      
      
      getAllRegion = (id_pais) => {
        regionesservice.getAllRegion(id_pais).then(({ data }) => {
          const region = data.map((region) => {
            return {
              code: region.id_region,
              name: region.nombre_region,
            };
          });
          this.setState({		
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
        this.setState({ Selectedtipovehiculo : e.value });
        id_tipo_vehiculo= e.value.code;
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
          this.setState({	
            ciudades: ciudad,
       });
        });
      };


    render() {
        const { items, currentPage, itemsPerPage } = this.state;
        const { open } = this.state;
       const indexOfLastitem = currentPage * itemsPerPage;
       const indexOfFirstitem = indexOfLastitem - itemsPerPage;
       const currentitems = items.slice(indexOfFirstitem, indexOfLastitem);
       const { pais } = this.state;
       const { regiones } = this.state;
       const { ciudades } = this.state;
       const { menor } = this.state;
       const { mayor } = this.state;
       const { tiposv } = this.state;

        const renderitems = currentitems.map((item, i) => {
          
            return <div key={i} className="col-md-6">

                <div className="listing">
                    <div className="listing-thumbnail">
                    <ThumbnailVehiculo img={item.id_vehiculo}/>
                        <div className="listing-badges">
                       
                        </div>
                    </div>
                    <div className="listing-body">
                        
                        <h5 className="listing-title"> <Link to="/listing-details-v2" title={item.marca}>{item.marca + ' ' + item.modelo + ' ' + item.year}</Link> </h5>
                        <span className="listing-price">$ {new Intl.NumberFormat().format((item.precio))}</span>
                        <p className="listing-text">{item.combustible}</p>
                        <p className="listing-text">{item.usado_nuevo}</p>
                        <div className="acr-listing-icons">
                        <OverlayTrigger overlay={areatip}>
                                                <div className="acr-listing-icon">
                                                    <i className="fas fa-calendar" />
                                                    <span className="acr-listing-icon-value">{new Intl.NumberFormat().format((item.year))}</span>
                                                </div>
                                            </OverlayTrigger>
                                            <OverlayTrigger overlay={bedstip}>
                                                <div className="acr-listing-icon">
                                                    <i className="fas fa-tachometer-alt" />
                                                    <span className="acr-listing-icon-value">{new Intl.NumberFormat().format((item.kilometraje))}KM</span>
                                                </div>
                                            </OverlayTrigger>

                                            <OverlayTrigger overlay={bathstip}>
                                                <div className="acr-listing-icon">
                                                    <i className="fas fa-cogs" />
                                                    <span className="acr-listing-icon-value">{new Intl.NumberFormat().format((item.motor))} </span>
                                                </div>
                                            </OverlayTrigger>
                        </div>
                        <div className="listing-gallery-wrapper">
                            <Link to={{ pathname: `/listing-details-v2/${item.id_vehiculo}`}} className="btn-custom btn-sm secondary">Ver Detalles</Link>
                           
                        </div>
                    </div>
                </div>
            </div>
        });
        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(items.length / itemsPerPage); i++) {
            pageNumbers.push(i);
        }
        const renderPagination = pageNumbers.map(number => {
            const activeCondition = this.state.currentPage === number ? 'active' : ''
            return (
                <Fragment key={number}>
                    {pageNumbers.length > 1 ? <li className={classNames("page-item", { "active": activeCondition })}>
                        <Link className="page-link" to="#" data-page={number} onClick={this.handleClick}>{number}</Link>
                    </li> : ''}
                </Fragment>
            );
        });

        return (
          
            <div className="section pagination-content">
                <div className="container">
                    <div className="row">
                        {/* Sidebar Start */}
                        <div className="col-lg-4">
                         

                        <div className="sidebar sidebar-left">
                <div className="sidebar-widget">
                    <div className="acr-collapse-trigger acr-custom-chevron-wrapper" onClick={() => this.setState({ open: !open })}>
                        <h5> Filtros</h5>
                        <div className="acr-custom-chevron">
                            
                            <span />
                            
                            <span />
                        </div>
                    </div>
                    <Collapse in={this.state.open}>
                        
                        <div className="acr-collapsable">
                            
                    <h6>Llene todos los campos para realizar la busqueda</h6>
                            <div className="acr-filter-form">
                                <form>
                                    <div className="acr-custom-select form-group">
                                    <div className="p-mb-3 p-text-bold">Pais</div>
                                        
                                        <Dropdown value={this.state.selectedCountry} options={pais} onChange={this.onCountryChange}  name="id_pais" optionLabel="name" placeholder="Seleccione un pais"  />
                                    </div>
                                   
                                    <div className="acr-custom-select form-group">
                                    <div className="p-mb-3 p-text-bold">Region</div>
                                        
                                        <Dropdown value={this.state.selectedRegion} options={regiones} onChange={this.onRegionChange}  name="id_region" optionLabel="name" placeholder="Seleccione una region"/>
                                    </div>
                                    
                                    <div className="acr-custom-select form-group">
                                    <div className="p-mb-3 p-text-bold">Ciudad</div>
                                        
                                        <Dropdown value={this.state.selectedCiudad} options={ciudades}  onChange={this.onCiudadChange}  name="id_ciudad" optionLabel="name" placeholder="Seleccione una ciudad"  />
                                    </div>

                                    <div className="acr-custom-select form-group">
                                    <div className="p-mb-3 p-text-bold">Tipo</div>
                                       
                                        <Dropdown value={this.state.Selectedtipovehiculo} options={tiposv}  onChange={this.onTipoChange}  name="id_tipo_vehiculo" optionLabel="name" placeholder="Seleccione el tipo de bien" />
                                    </div>
                                  
                                    <div className="acr-custom-select form-group">
                                    <div className="p-mb-3 p-text-bold">Precio Menor</div>
                                       
                                    <InputText menor={this.state.menor} onChange={(e) => this.setState({menor: e.target.value})} />
                                                {this.onMenorChange(this.state.menor)}     
                                        
                                      
                                    </div>
                                    <div className="acr-custom-select form-group">
                                    <div className="p-mb-3 p-text-bold">Precio Mayor</div>
                                       
                                  <InputText mayor={this.state.mayor} onChange={(e) => this.setState({mayor: e.target.value})} />
                                    {this.onMayorChange(this.state.mayor)}           
                                        
                                      
                                    </div>
                <button type="button" className="filter-trigger btn-custom" onClick={this.getbusqueda}>
                  Aplicar Filtros
                </button>
                                </form>
                            </div>
                        </div>
                        </Collapse>
                </div>
               
            </div>























                        </div>
                        {/* Sidebar End */}
                        {/* Posts Start */}
                        <div className="col-lg-8">
                            {/* Controls Start */}
                          
                           
                            <div className="row">
                                {/* Listing Start */}
                                {this.state.loading === false ? renderitems : <Loader />}
                                {/* Listing End */}
                            </div>
                            {/* Pagination Start */}
                            {pageNumbers.length > 1 ?
                                <ul className="pagination">
                                    {/* Prev */}
                                    {/* to show previous, we need to be on the 2nd or more page */}
                                    {pageNumbers.length > 1 && this.state.currentPage !== 1 ?
                                        <li className="page-item">
                                            <Link className="page-link" to="#" data-page={this.state.currentPage - 1} onClick={this.handleClick}>
                                                <i className="fas fa-chevron-left" />
                                            </Link>
                                        </li>
                                        : ''}
                                    {/* Prev */}
                                    {renderPagination}
                                    {/* Next */}
                                    {/* to show next, we should not be on the last page */}
                                    {pageNumbers.length > 1 && this.state.currentPage !== pageNumbers.length ? <li className="page-item">
                                        <Link className="page-link" to="#" data-page={parseInt(this.state.currentPage + 1)} onClick={this.handleClick}>
                                            <i className="fas fa-chevron-right" />
                                        </Link>
                                    </li>
                                        : ''}
                                    {/* Next */}
                                </ul> : ''}
                            {/* Pagination End */}
                        </div>
                        {/* Posts End */}
                    </div>
                </div>
            </div>
        );
    }
}

export default Contentused;
