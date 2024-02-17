import React, { Component } from 'react';
import Display from "./thumbnaildisplay"
import {REACT_APP_REQ} from '@env'

class GalleryList extends Component {
    constructor(props) {
        super(props);
        this.unsubscribe = null;
        this.state = {
            foto: [],
            loading: false
        };
       
    }

    componentDidMount() {
        let id_vehiculo = this.props.img;
        fetch(REACT_APP_REQ+`/vehicle/pics/${id_vehiculo}`, {
           method: 'GET',
           headers: {'Content-Type': 'application/json'}
        })
        .then((response) => response.json())
        .then((responseJson) => {
           this.setState({
              foto: responseJson.data,
           })
        })
        .catch((error) => {
           console.error(error);
        });
        
    }
    render() {
        const { foto } = this.state;
        return (
                            
            foto.map((item, i) => (
          <Display name={item.nombre_foto}/>
          ))
        );
    }
}

export default GalleryList;