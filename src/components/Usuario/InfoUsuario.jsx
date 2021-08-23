import React, { Fragment } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';

const InfoUsuario = ({ usuario, cambiarVentana }) => {
  return (
    <Fragment>
      <Card
        style={{ width: '100%' }}
        className="shadow Secondary"
        bg="success"
        text={'white'}
      >
        <Card.Body>
          <Container>
            <Row>
              <Col>
                <Card.Title className="mtop-0 mbot-0 tituloCarta">
                  Información de Usuario
                </Card.Title>
              </Col>
              <Col xs="auto">
                <svg
                  width="2rem"
                  height="1rem"
                  viewBox="0 0 16 16"
                  className="bi bi-pencil iconoDerecha"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => cambiarVentana(3)}
                >
                  <path
                    fillRule="evenodd"
                    d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"
                  />
                </svg>
              </Col>
              <Col xs="auto">
                <svg
                  width="2rem"
                  height="1.2rem"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  onClick={() => cambiarVentana(4)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </Col>
            </Row>
            <Row>
              <Col xs>
                <Card.Text className="mtop-0 mbot-0 informacionAdicional">
                  Usuario: {usuario.usuario}
                </Card.Text>
              </Col>
            </Row>
            <Row>
              <Col xs>
                <Card.Text className="mtop-0 mbot-0 informacionAdicional">
                  Nombre: {usuario.nombre} {usuario.apellido}
                </Card.Text>
              </Col>
            </Row>
            <Row>
              <Col xs>
                <Card.Text className="mtop-0 mbot-0 informacionAdicional">
                  Creado El: {usuario.creado}
                </Card.Text>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </Fragment>
  );
};

export default InfoUsuario;
