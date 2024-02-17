import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { type } from '../../../data/category.json';

import { db, st} from "../../../helper/firebase";



let sedans="";
let pickups="";
let camionetas="";

let camiones="";
let buses="";
let motos="";
class CategoriesV extends Component {
    constructor(props) {
        super(props);
        let casaRef=db.collection("vehiculos").where("tipo","==","Sedan").where("aprobado", "==","Aprobado").get().then(function(countCasa) { 
            sedans=(countCasa.size); }); 
        
        let edificioRef=db.collection("vehiculos").where("tipo","==","Pick-up").where("aprobado", "==","Aprobado").get().then(function(countEdificio) { 
            pickups=(countEdificio.size); }); 
           
            let terrenoRef=db.collection("vehiculos").where("tipo","==","Bus").where("aprobado", "==","Aprobado").get().then(function(countTerreno) { 
                buses=(countTerreno.size); }); 

                let bodegaRef=db.collection("vehiculos").where("tipo","==","Camioneta").where("aprobado", "==","Aprobado").get().then(function(countBodega) { 
                    camionetas=(countBodega.size); }); 

                    let apartamentoRef=db.collection("vehiculos").where("tipo","==","Camión").where("aprobado", "==","Aprobado").get().then(function(countApartamento) { 
                        camiones=(countApartamento.size); }); 

                        let localRef=db.collection("vehiculos").where("tipo","==","Motocicleta").where("aprobado", "==","Aprobado").get().then(function(countLocal) { 
                            motos=(countLocal.size); }); 
        this.unsubscribe = null;
        this.state = {
            items: [],
            loading: false
        };
       
    }
   
    render() {
        return (
            <div className="section pt-0">
                <div className="container">
                    <div className="section-title-wrap section-header">
                        <h5 className="custom-primary">Categorías</h5>
                        <h2 className="title">Vehículos</h2>
                    </div>
                    <div className="row">
                       <div className="col-lg-4 col-md-6">
                                <Link to="#" className="acr-category category-2">
                                    <i className={"fas fa-car"} />
                                    <div className="acr-category-body">
                                        <h5>Turismos</h5>
                                        <span>{sedans} Disponibles</span>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <Link to="#" className="acr-category category-2">
                                    <i className={"fas fa-truck-pickup"} />
                                    <div className="acr-category-body">
                                        <h5>Pick-Ups</h5>
                                        <span>{pickups} Disponibles</span>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <Link to="#" className="acr-category category-2">
                                    <i className={"fas fa-car-side"} />
                                    <div className="acr-category-body">
                                        <h5>Camionetas</h5>
                                        <span>{camionetas} Disponibles</span>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <Link to="#" className="acr-category category-2">
                                <i className={"fas fa-truck"} />
                                        <div className="acr-category-body">
                                        <h5>Camiones</h5>
                                        <span>{camiones} Disponibles</span>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <Link to="#" className="acr-category category-2">
                                    <i className={"fas fa-bus"} />
                                    <div className="acr-category-body">
                                        <h5>Buses</h5>
                                        <span>{buses} Disponibles</span>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <Link to="#" className="acr-category category-2">
                                    <i className={"fas fa-motorcycle"} />
                                    <div className="acr-category-body">
                                        <h5>Motos</h5>
                                        <span>{motos} Disponibles</span>
                                    </div>
                                </Link>
                            </div>
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default CategoriesV;