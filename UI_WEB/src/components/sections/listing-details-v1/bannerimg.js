import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { OverlayTrigger, Tooltip, Dropdown, NavLink, Accordion, Card } from 'react-bootstrap';
import listing from '../../../data/listings.json';
import $ from 'jquery';
import 'magnific-popup'
import classNames from 'classnames';
import { db, st} from "../../../helper/firebase";
import Display from "./bannerdisplay"


const gallerytip = (
    <Tooltip>
        Gallery
    </Tooltip>
);
const bedstip = (
    <Tooltip>
        Beds
    </Tooltip>
);
const bathstip = (
    <Tooltip>
        Bathrooms
    </Tooltip>
);
const areatip = (
    <Tooltip>
        Square Feet
    </Tooltip>
);



class Imagen extends Component {
    constructor(props) {
        super(props);
        this.unsubscribe = null;
        this.next=this.next.bind(this);
        this.previous=this.previous.bind(this);
        this.state = {
            items: [],
            loading: false
        };
        this.handleClick = this.handleClick.bind(this);
       
    }

    showmoretoggle() {
        this.setState({
            showmore: !this.state.showmore
        })
    }
    componentDidMount() {
        function popup() {
            $('.gallery-thumb').magnificPopup({
                type: 'image',
                gallery: {
                    enabled: true
                },
            });
        }
        popup()
        
    };
    next(){
        this.slider.slickNext();
    }

    previous(){
        this.slider.slickPrev();
    }


    /*datossiu = (querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
          const { casa, name } = doc.data();
          items.push({
            key: doc.id,
            doc, // DocumentSnapshot
            casa,
            name,
          });
        });
        this.setState({
          items
       });
      }*/
      //Esto es similar al useEffect
      componentDidMount() {
        //this.unsubscribe = this.ref.onSnapshot(this.datossiu);
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
                loading: true
            });
          
        }, 2000);

    }
    render() {
        $(window).on('hashchange', function() {
            window.location.reload();
          });
        const { items } = this.state;
        return (
          
          <div>
                 
                            {/* Content Start */}
                            
                             {items.map((item, i) => (
                            <Display casa = {item.casa} name={item.name}/>
                            
                            ))}
                            {/* Content End */}
                            
                                                  
                        </div>
        );
    }
}

export default Imagen;