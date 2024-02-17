import React, { Component } from "react";
import { Tab, Nav, Accordion, Card, NavLink } from "react-bootstrap";
import Sidebar from "../../layouts/Blogsidebar";
import { Formbox } from "../../layouts/Formbox";

class Content extends Component {
  render() {
    return (
      <div className="section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <Tab.Container defaultActiveKey="general">
                <Nav variant="tabs" className="nav nav-tabs">
                  <Nav.Item>
                    <Nav.Link eventKey="general">Generales</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="listings"> Explicación del Proceso</Nav.Link>
                  </Nav.Item>
                 
                </Nav>
                <Tab.Content>
                  <Tab.Pane eventKey="general">
                    <Accordion defaultActiveKey="0" className="with-gap">
                      <Card>
                        <Accordion.Collapse
                          eventKey="0"
                          className="collapseparent"
                        >
                          <Card.Body>
                            <p>
                              {" "}
                              Es una plataforma digital dedicada a la compra/venta/renta de bienes inmuebles y compra/venta de vehículos.
                            </p>
                          
                          </Card.Body>
                        </Accordion.Collapse>
                        <Card.Header>
                          <Accordion.Toggle
                            as={NavLink}
                            variant="link"
                            eventKey="0"
                          >
                          ¿Qué es Localiza App?
                          </Accordion.Toggle>
                        </Card.Header>
                        
                      </Card>
                      <Card>
                        <Accordion.Collapse
                          eventKey="1"
                          className="collapseparent"
                        >
                          <Card.Body>
                            <p>
                              {" "}
                              Publicar bienes inmuebles y vehículos para vender o buscar propiedades para comprar.
                            </p>
                           
                          </Card.Body>
                        </Accordion.Collapse>
                        <Card.Header>
                          <Accordion.Toggle
                            as={NavLink}
                            variant="link"
                            eventKey="1"
                          >
                           ¿Qué puedo hacer en Localiza?
                          </Accordion.Toggle>
                        </Card.Header>
                      </Card>
                      <Card>
                        <Accordion.Collapse
                          eventKey="2"
                          className="collapseparent"
                        >
                          <Card.Body>
                            <p>
                              {" "}
                               Colocar Nombre, numero de identidad, teléfono y correo electrónico,
                               recibirás un mensaje en tu bandeja de correo,
                               haces click en el link y se confirmara tu registro.
                            </p>
                          
                          </Card.Body>
                        </Accordion.Collapse>
                        <Card.Header>
                          <Accordion.Toggle
                            as={NavLink}
                            variant="link"
                            eventKey="2"
                          >
                            ¿Como me registro?
                          </Accordion.Toggle>
                        </Card.Header>
                      </Card>
                      
                    </Accordion>
                  </Tab.Pane>
                  <Tab.Pane eventKey="listings">
                    <Accordion defaultActiveKey="10" className="with-gap">
                      <Card>
                        <Accordion.Collapse
                          eventKey="10"
                          className="collapseparent"
                        >
                          <Card.Body>
                            <p>
                              {" "}
                              No, es una plataforma de registro gratuito.
                            </p>
                         
                          </Card.Body>
                        </Accordion.Collapse>
                        <Card.Header>
                          <Accordion.Toggle
                            as={NavLink}
                            variant="link"
                            eventKey="10"
                          >
                           ¿Tengo que pagar algo para registrarme?
                          </Accordion.Toggle>
                        </Card.Header>
                      </Card>
                     
                      <Card>
                        <Accordion.Collapse
                          eventKey="12"
                          className="collapseparent"
                        >
                          <Card.Body>
                            <p>
                              {" "}
                              No, debe pasar un proceso de verificación para comprobar que toda la información brindada es correcta,
                               guardando la seguridad y privacidad de todos nuestros usuarios.
                            </p>
                          
                          </Card.Body>
                        </Accordion.Collapse>
                        <Card.Header>
                          <Accordion.Toggle
                            as={NavLink}
                            variant="link"
                            eventKey="12"
                          >
                          ¿Podré ver mi propiedad en la página web en cuanto la registre?
                          </Accordion.Toggle>
                        </Card.Header>
                      </Card>

                      <Card>
                        <Accordion.Collapse
                          eventKey="11"
                          className="collapseparent"
                        >
                          <Card.Body>
                            <p>
                              {" "}
                              En un periodo máximo de 24 horas, si todo está en orden.
                            </p>
                          
                          </Card.Body>
                        </Accordion.Collapse>
                        <Card.Header>
                          <Accordion.Toggle
                            as={NavLink}
                            variant="link"
                            eventKey="11"
                          >
                        ¿En cuánto tiempo podré ver mi propiedad en la página web?
                          </Accordion.Toggle>
                        </Card.Header>
                      </Card>
                      
                    </Accordion>
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
              
            </div>
            {/* <div className="col-lg-4">
              <Sidebar />
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Content;
