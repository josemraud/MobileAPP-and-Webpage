import React, { Component, Fragment } from 'react';
import Agentsslider from './Agentsslider';

import About from './About';
import Counter from './Counter';
import Video from './Video';

class Content extends Component {
    render() {
        return (
            <Fragment>
                <About />
                <Counter />
                <div className="section pb-0">
                    <Agentsslider />
                </div>
                <Video />
             
            </Fragment>
        );
    }
}

export default Content;