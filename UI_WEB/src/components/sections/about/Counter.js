import React, { Component } from 'react';

const counter = [
    {
        icon: "En venta",
        value: 24934,
        title: "Bienes Inmuebles"
    },
    {
        icon: "Vehiculos usados",
        value: 11350,
        title: "Usuarios vendiendo"
    },
    {
        icon: "En renta",
        value: 4658,
        title: "Bienes en renta"
    },
    {
        icon: "Vehiculos nuevos",
        value: 67335,
        title: "Agencias vendiendo"
    }
]

class Counter extends Component {
    render() {
        return (
            <div className="section section-padding bg-cover bg-center bg-parallax dark-overlay dark-overlay-2" style={{ backgroundImage: "url(" + process.env.PUBLIC_URL + "/assets/img/bienesraices.jpg)" }}>
                <div className="container">
                    <div className="row">
                        {counter.map((item, i) => (
                            <div key={i} className="col-lg-3 col-md-6 col-sm-6">
                                <div className="acr-infographic-item">
                                    <i className={"flaticon-" + item.icon + ""} />
                                    <h4>{new Intl.NumberFormat().format((item.value))}</h4>
                                    <p>{item.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default Counter;