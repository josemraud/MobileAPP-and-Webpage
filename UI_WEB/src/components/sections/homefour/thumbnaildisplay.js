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

let casa = "";
let name = "";
class Display extends Component {
    constructor(props) {
        super(props);
        casa=props.casa;
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


     
    render() {
        $(window).on('hashchange', function() {
            window.location.reload();
          });
        return (
            <div >
                 
                            {/* Content Start */}
                            <div>
                               
                            <img className="thumbnailtop" src={this.state.image}/>
                            </div>
                            {/* Content End */}
                            
                                                  
                        </div>
        );
    }
}

export default Display;