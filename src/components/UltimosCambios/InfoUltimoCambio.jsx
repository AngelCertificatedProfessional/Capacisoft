import React from 'react';
import {Container, Row, Col } from 'react-bootstrap';

const InfoUltimoCambio = ({ ultimoCambio }) => {
  return (
    <>
        <Container fluid className="mt-3 bloque">
            <Row className="mt-1">
                <Col xs="auto">
                    <h6>Tarea:</h6> {ultimoCambio.tarea}
                </Col>
            </Row>
            <Row className="mb-1">
                <Col xs="auto">
                    <h6>Descripción:</h6> {ultimoCambio.descripcion}
                </Col>
            </Row>
        </Container>
    </>
  );
};

export default InfoUltimoCambio;