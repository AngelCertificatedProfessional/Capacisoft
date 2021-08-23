import React from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import { agregar, actualizar } from '../../utils/ConexionAPI';
import swal from 'sweetalert';

const schema = yup.object({
  nombreCarrera: yup.string().required(),
  nombreCoordinador: yup.string().required(),
  apellidoCoordinador: yup.string().required(),
  cantidadSemestres: yup.number().required().positive().integer(),
});

const FormularioCarrera = ({
  accion,
  carrera,
  actualizarListado,
  setAccion,
}) => {
  return (
    <Formik
      validationSchema={schema}
      onSubmit={(values, e) => {
        carrera.nombreCarrera = values.nombreCarrera;
        carrera.nombreCoordinador = values.nombreCoordinador;
        carrera.apellidoCoordinador = values.apellidoCoordinador;
        carrera.cantidadSemestres = values.cantidadSemestres;
        if (accion === 2) {
          agregar('carrera/agregarCarrera', carrera).then(() => {
            swal({
              title: 'Carrera Agregada',
              text: 'Su carrera se a agregado exitosamente',
              icon: 'success',
              button: 'OK',
            });
            actualizarListado();
          });
        } else {
          actualizar('carrera/actualizarCarrera', carrera).then(() => {
            swal({
              title: 'Carrera Modificada',
              text: 'Su carrera se a modificado exitosamente',
              icon: 'success',
              button: 'OK',
            });
            actualizarListado();
          });
        }
      }}
      initialValues={{
        nombreCarrera: carrera.nombreCarrera,
        nombreCoordinador: carrera.nombreCoordinador,
        apellidoCoordinador: carrera.apellidoCoordinador,
        cantidadSemestres: carrera.cantidadSemestres,
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <Form
          className="informacionUniversidad"
          onSubmit={handleSubmit}
          noValidate
        >
          {accion === 2 ? `Agregar Carrera` : `Modificar Carrera`}
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Nombre de la Carrera</Form.Label>
              <Form.Control
                placeholder="Nombre de la Carrera"
                name="nombreCarrera"
                id="nombreCarrera"
                value={values.nombreCarrera}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!touched.nombreCarrera && !!errors.nombreCarrera}
              />
              <Form.Control.Feedback type="invalid">
                {errors.nombreCarrera}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Cantidad de Semestres</Form.Label>
              <Form.Control
                type="number"
                placeholder="Cantidad de semestres"
                name="cantidadSemestres"
                id="cantidadSemestres"
                value={values.cantidadSemestres}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={
                  !!touched.cantidadSemestres && !!errors.cantidadSemestres
                }
              />
              <Form.Control.Feedback type="invalid">
                {errors.cantidadSemestres}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Nombre del Coordinador</Form.Label>
              <Form.Control
                placeholder="Nombre del Coordinador"
                name="nombreCoordinador"
                id="nombreCoordinador"
                value={values.nombreCoordinador}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={
                  !!touched.nombreCoordinador && !!errors.nombreCoordinador
                }
              />
              <Form.Control.Feedback type="invalid">
                {errors.nombreCoordinador}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Apellido del Coordinador</Form.Label>
              <Form.Control
                placeholder="Apellido del Coordinador"
                name="apellidoCoordinador"
                id="apellidoCoordinador"
                value={values.apellidoCoordinador}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={
                  !!touched.apellidoCoordinador && !!errors.apellidoCoordinador
                }
              />
              <Form.Control.Feedback type="invalid">
                {errors.apellidoCoordinador}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Form.Row className="float-right">
            <Button
              className="mr-2"
              onClick={() => setAccion(1)}
              variant="primary"
              type="button"
            >
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              {accion === 2 ? 'Agregar' : 'Modificar'}
            </Button>
          </Form.Row>
        </Form>
      )}
    </Formik>
  );
};

export default FormularioCarrera;
