import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Calculator from './Calculator';
import Select2 from 'react-select2-wrapper';
import listing from '../../data/listings.json';
import { locationlist, statuslist, pricerangelist, bedslist, bathroomslist, typelist } from '../../data/select.json';
import { Collapse } from 'react-bootstrap';
import { db, st} from "../../helper/firebase";

class Shopsidebar extends Component {
    constructor(props) {
        super(props)
        this.ref = db.collection('vehiculos').where("SEO","==",true);
        this.unsubscribe = null;
        this.state = {
            items: [],
            open: true,
            open2: true,
            open3: true,
            
        }
    }
    datossiu = (querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          const { gasolina, descripcion, precio, marca,modelo,year,motor,kilometraje,estado,tipo } = doc.data();
          items.push({
            key: doc.id,
            doc, // DocumentSnapshot
            descripcion,
            precio,
            gasolina,
            marca,
            modelo,
            year,
            motor,
            kilometraje,
            estado, 
            tipo,
          });
        });
        this.setState({
          items
       });
      }
      //Esto es similar al useEffect
      componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.datossiu);
      }
    render() {
        const { open } = this.state;
        const { open2 } = this.state;
        const { open3 } = this.state;
        const { datos } = this.state;
        const obtenerDatos = async () => {
      
            try {
                const data = await db.collection('vehiculos').get()
                const arrayData = data.docs.map(doc => (
                    
                    
                    {id: doc.id, ...doc.data()}))
            } catch (error) {
            }
        }
        obtenerDatos()
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
                                        <label>Concesionaria: </label>
                                        <Select2 data={typelist} options={{
                                            placeholder: 'Cualquier Concesionaria',
                                        }} />
                                    </div>
                                    <button type="submit" className="btn-block btn-custom" name="button">Aplicar Filtros</button>
                                </form>
                            </div>
                        </div>
                    </Collapse>
                </div>
                <div className="sidebar-widget">
                    <div className="acr-collapse-trigger acr-custom-chevron-wrapper" onClick={() => this.setState({ open2: !open2 })}>
                        <h5>Top Vehículos</h5>
                        <div className="acr-custom-chevron">
                            <span />
                            <span />
                        </div>
                    </div>sssss
                    <Collapse in={this.state.open2}>
                        <div className="acr-collapsable">
                            {/* Listing Start */}
                            {items.map((item, i) =>  (
                                <div key={i} className="listing listing-list">
                                    <div className="listing-thumbnail">
                                        <Link to="/listing-details-v2"><img src={process.env.PUBLIC_URL + "/" + item.gridimg} alt="listing" /></Link>
                                    </div>
                                    <div className="listing-body">
                                        <h6 className="listing-title"> <Link to="/listing-details-v2" title={item.descripcion}>{item.descripcion}</Link> </h6>
                                        <span className="listing-price">{new Intl.NumberFormat().format((item.precio))}$ <span>Precio</span> </span>
                                        <span className="listing-date">{item.modelo}</span>
                                        <p className="listing-text">{item.gasolina} | {item.estado}</p>
                                    </div>
                                </div>
                            ))}
                            {/* Listing End */}
                        </div>
                    </Collapse>
                </div>
               
            </div>
        );
    }
}

export default Shopsidebar;