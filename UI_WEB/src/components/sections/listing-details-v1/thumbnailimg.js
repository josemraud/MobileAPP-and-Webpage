import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { OverlayTrigger, Tooltip, Dropdown, NavLink, Accordion, Card } from 'react-bootstrap';
import listing from '../../../data/listings.json';
import $ from 'jquery';
import 'magnific-popup'
import classNames from 'classnames';
import { db, st} from "../../../helper/firebase";
import Display from "./thumbnaildisplay"
import { FotosService } from '../../../service/FotosService';


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

const fotosservice = new FotosService();
let id="";
class Thumbnail extends Component {
    constructor(props) {
        super(props);
        id = props.img;
        this.unsubscribe = null;
        this.next=this.next.bind(this);
        this.previous=this.previous.bind(this);
        this.state = {
            foto: [],
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

    componentDidMount(){
        fotosservice.getThBien(this.props.img).then(({ data }) => {
            const foto = data.map((foto) => {
              return {
               nombre_foto:foto.nombre_foto,
               id_foto:foto.id_foto,
               id_vehiculo:foto.id_vehiculo,
              };
            });
            this.setState({
              isLoaded: true,
              foto: foto
            });
          });
    }

    next(){
        this.slider.slickNext();
    }

    previous(){
        this.slider.slickPrev();
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
        const { foto } = this.state;
        return (
          
                              <div>
                 
                            {/* Content Start */}
                            
                             {foto.map((item, i) => (
                                 <div key={i}>
                            <Display name={item.nombre_foto}/>
                            </div>
                            ))}
                            {/* Content End */}
                        </div>
        );
    }
}

export default Thumbnail;