import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { OverlayTrigger, Tooltip, Dropdown, NavLink, Accordion, Card } from 'react-bootstrap';
import listing from '../../../data/listings.json';
import $ from 'jquery';
import 'magnific-popup';
import classNames from 'classnames';
import { db, st} from "../../../helper/firebase";
import firebase from "firebase"


const storage = firebase.storage().ref()

let name = "";
class Display extends Component {
    constructor(props) {
        super(props);
        name=props.name;
        this.state = {
            image: '',
            loading: false
        };
       this.getImage('image');
    }

   getImage (image) {
        storage.child(`bienes/${name}`).getDownloadURL().then((url) => {
          this.state.image = url
          this.setState(this.state)
          
        })
      }

      //Esto es similar al useEffect
    render() {
        $(window).on('hashchange', function() {
            window.location.reload();
          });
        return (
            <div >
                 
                            {/* Content Start */}
                            <div class="watermark">
                               
                            <img className="imgdos" src={this.state.image} alt="" />
                          
                            </div>
                            {/* Content End */}
                            
                                                  
                        </div>
        );
    }
}

export default Display;