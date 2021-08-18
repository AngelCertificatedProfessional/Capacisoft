import React from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import { agregar, actualizar } from '../../utils/ConexionAPI';
import swal from 'sweetalert';

const schema = yup.object({
  nombre: yup.string(),
  abreviacion: yup.string(),
});

const FormularioUniversidad = ({ accion, universidad, actualizarListado }) => {
  return (
    <Formik
      validationSchema={schema}
      onSubmit={(values, e) => {
        universidad.nombre = values.nombre;
        universidad.abreviacion = values.abreviacion;
        if (accion === 2) {
          agregar('universidad/agregarUniversidad', universidad).then(() => {
            swal({
              title: 'Universidad Agregada',
              text: 'Su universidad se a agregado exitosamente',
              icon: 'success',
              button: 'OK',
            });
            actualizarListado();
          });
        } else {
          actualizar('universidad/actualizarUniversidad', universidad).then(
            () => {
              swal({
                title: 'Universidad Modificada',
                text: 'Su universidad se a modificado exitosamente',
                icon: 'success',
                button: 'OK',
              });
              actualizarListado();
            }
          );
        }
      }}
      initialValues={{
        nombre: universidad.nombre,
        abreviacion: universidad.abreviacion,
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
          <h1>Universidad</h1>
          <Row className="mb-3">
            <Form.Group as={Col} md="6">
              <Form.Label htmlFor="nombre">Nombre</Form.Label>
              <Form.Control
                placeholder="nombre"
                name="nombre"
                id="nombre"
                value={values.nombre}
                onChange={handleChange}
                onBlur={handleBlur}
                // isInvalid={!!formik.touched.clave && !!formik.errors.clave}
              />
            </Form.Group>

            <Form.Group as={Col} md="3">
              <Form.Label htmlFor="abreviacion"> Abreviacion</Form.Label>
              <Form.Control
                placeholder="abreviacion"
                name="abreviacion"
                id="abreviacion"
                value={values.abreviacion}
                onChange={handleChange}
                onBlur={handleBlur}
                // isInvalid={!!formik.touched.serie && !!formik.errors.serie}
              />
            </Form.Group>
            <Form.Control.Feedback type="invalid">
              {/* {formik.errors.abreviacion}    */}
            </Form.Control.Feedback>
          </Row>
          <Form.Row className="float-right">
            <Button variant="primary" type="submit">
              {accion === 2 ? 'Agregar' : 'Modificar'}
            </Button>
          </Form.Row>
        </Form>
      )}
    </Formik>
  );
};

export default FormularioUniversidad;
