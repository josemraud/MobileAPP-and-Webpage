import React, { Component, Fragment } from 'react';
import Bluecta from '../../layouts/Bluecta';
import Gallery from './Gallery';
import Info from './Info';
import Services from './Services';

class Content extends Component {
    render() {
        return (
            <Fragment>
            <Services/>
                <Info/>
                <Gallery/>
            </Fragment>
        );
    }
}

export default Content;