import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Calculator from './Calculator';
import Select2 from 'react-select2-wrapper';
import listing from '../../data/listings.json';
import { locationlist, statuslist, pricerangelist, bedslist, bathroomslist, typelist } from '../../data/select.json';
import { Collapse } from 'react-bootstrap';
import { db, st} from "../../helper/firebase";
import { BienesService } from '../../service/BienesService';
import { VehiculosService } from '../../service/VehiculosService';


const vehiculosservice = new VehiculosService;
class Shopsidebarused extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            items: [],
            open: true,
            open2: true,
            open3: true,
            
        }
    }
   
      componentDidMount() {
        vehiculosservice.getSeo().then(({ data }) => {
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
        
     });
      }
    render() {
        const { open } = this.state;
        const { open2 } = this.state;
        const { open3 } = this.state;
        const { datos } = this.state;
      
        const { items } = this.state;
        return (
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
                            <div className="acr-filter-form">
                                <form>
                                    <div className="acr-custom-select form-group">
                                        <label>Ubicación: </label>
                                        <Select2 data={locationlist} options={{
                                            placeholder: 'Ubicación',
                                        }} />
                                    </div>
                                   
                                    <div className="acr-custom-select form-group">
                                        <label>Rango de precio: </label>
                                        <Select2 data={pricerangelist} options={{
                                            placeholder: 'Precios',
                                        }} />
                                    </div>
                                    <div className="acr-custom-select form-group">
                                        <label>Año: </label>
                                        <Select2 data={bedslist} options={{
                                            placeholder: 'Año',
                                        }} />
                                    </div>
                                  
                                    <div className="acr-custom-select form-group">
                                        <label>Marca: </label>
                                        <Select2 data={typelist} options={{
                                            placeholder: 'Marca',
                                        }} />
                                    </div>
                                    <button type="submit" className="btn-block btn-custom" name="button">Aplicar Filtros</button>
                                </form>
                            </div>
                        </div>
                    </Collapse>
                </div>
               
            </div>
        );
    }
}

export default Shopsidebarused;