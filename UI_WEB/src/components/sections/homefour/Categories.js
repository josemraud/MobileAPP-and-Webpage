import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { type } from '../../../data/category.json'

import { db, st} from "../../../helper/firebase";

let casas="";
let edificios="";
let terrenos="";

let aparamentos="";
let bodegas="";
let locales="";
class Categories extends Component {
    
        constructor(props) {
            super(props);
            let casaRef=db.collection("bienes").where("tipos","==","Casa").where("aprobado", "==","Aprobado").get().then(function(countCasa) { 
            casas=(countCasa.size); }); 
            
            let edificioRef=db.collection("bienes").where("tipos","==","Edificio").where("aprobado", "==","Aprobado").get().then(function(countEdificio) { 
                edificios=(countEdificio.size); }); 
               
                let terrenoRef=db.collection("bienes").where("tipos","==","Terreno").where("aprobado", "==","Aprobado").get().then(function(countTerreno) { 
                    terrenos=(countTerreno.size); }); 

                    let bodegaRef=db.collection("bienes").where("tipos","==","Bodega").where("aprobado", "==","Aprobado").get().then(function(countBodega) { 
                        bodegas=(countBodega.size); }); 

                        let apartamentoRef=db.collection("bienes").where("tipos","==","Apartamento").where("aprobado", "==","Aprobado").get().then(function(countApartamento) { 
                            aparamentos=(countApartamento.size); }); 

                            let localRef=db.collection("bienes").where("tipos","==","Local").where("aprobado", "==","Aprobado").get().then(function(countLocal) { 
                                locales=(countLocal.size); }); 
            this.unsubscribe = null;
            this.state = {
                items: [],
                loading: false
            };
           
        }

 
    render() {
        const {items} = this.state;
        return (
            <div className="section pt-0">
                <div className="container">
                    <div className="section-title-wrap section-header">
                        <h5 className="custom-primary">Categorías</h5>
                        <h2 className="title">Bienes</h2>
                    </div>
                    <div className="row">
                       <div className="col-lg-4 col-md-6">
                                <Link to="#" className="acr-category category-2">
                                    <i className={"fas fa-home"}  />
                                    <div className="acr-category-body">
                                        <h5>Casas</h5>
                                        <span>{casas} Disponibles</span>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <Link to="#" className="acr-category category-2">
                                    <i className={"fas fa-building"} />
                                    <div className="acr-category-body">
                                        <h5>Apartamentos</h5>
                                        <span>{aparamentos} Disponibles</span>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <Link to="#" className="acr-category category-2">
                                    <i className={"fas fa-store"} />
                                    <div className="acr-category-body">
                                        <h5>Locales</h5>
                                        <span>{locales} Disponibles</span>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <Link to="#" className="acr-category category-2">
                                <i className={"fas fa-tree"} />
                                        <div className="acr-category-body">
                                        <h5>Terrenos</h5>
                                        <span>{terrenos} Disponibles</span>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <Link to="#" className="acr-category category-2">
                                    <i className={"far fa-building"} />
                                    <div className="acr-category-body">
                                        <h5>Edificios</h5>
                                        <span>{edificios} Disponibles</span>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <Link to="#" className="acr-category category-2">
                                    <i className={"fas fa-warehouse"} />
                                    <div className="acr-category-body">
                                        <h5>Bodegas</h5>
                                        <span>{bodegas} Disponibles</span>
                                    </div>
                                </Link>
                            </div>
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default Categories;