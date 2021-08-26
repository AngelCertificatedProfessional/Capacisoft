import React, { Fragment } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';

const InfoAlumno = ({ alumno, cambiarVentana,tipoUsuario }) => {
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
                  Información del Alumno
                </Card.Title>
              </Col>
              {tipoUsuario === 1 && (
                <Col xs="auto">
                  <svg
                    width="2em"
                    height="1em"
                    viewBox="0 0 16 16"
                    className="bi bi-pencil"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => cambiarVentana(6)}
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"
                    />
                  </svg>
                
                </Col>
               )}
            </Row>
            <Row>
              <Col xs>
                <Card.Text className="mtop-0 mbot-0 informacionAdicional">
                  Alumno: {alumno.nombreAlumno} {alumno.apellidoAlumno}
                </Card.Text>
              </Col>
              <Col xs>
                <Card.Text className="mtop-0 mbot-0 informacionAdicional">
                  Edad: {alumno.edad}
                </Card.Text>
              </Col>
            </Row>
            <Row>
              <Col xs>
                <Card.Text className="mtop-0 mbot-0 informacionAdicional">
                  Creado El: {alumno.creado}
                </Card.Text>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </Fragment>
  );
};

export default InfoAlumno;
