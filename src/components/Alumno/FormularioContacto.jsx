import React from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import { agregar, actualizarEspecifico } from '../../utils/ConexionAPI';
import swal from 'sweetalert';

const schema = yup.object({
  correo: yup
    .string()
    .required('El correo es un campo requerido')
    .email('Escriba un correo valido'),
  github: yup.string().url('Escriba una direccion valido'),
  linkedIn: yup.string().url('Escriba una direccion valida'),
});

const FormularioContacto = ({ accion, alumno, actualizarListado }) => {
  return (
    <Formik
      validationSchema={schema}
      onSubmit={(values, e) => {
        alumno.contacto.correo = values.correo;
        alumno.contacto.github = values.github;
        alumno.contacto.linkedIn = values.linkedIn;
        if (accion === 4) {
          agregar('alumno/agregarAlumno', alumno)
            .then(() => {
              swal({
                title: 'Alumno Modificado',
                text: 'Su Alumno se a agregado exitosamente',
                icon: 'success',
                button: 'OK',
              });
              actualizarListado();
            })
            .catch((error) => {
              swal({
                title: 'Error',
                text: error,
                icon: 'error',
                button: 'OK',
              });
            });
        } else {
          actualizarEspecifico('alumno/actualizarInfoContacto', alumno)
            .then(() => {
              swal({
                title: 'Contacto Modificado',
                text: 'Su contacto se a modificado exitosamente',
                icon: 'success',
                button: 'OK',
              });
              actualizarListado();
            })
            .catch((error) => {
              swal({
                title: 'Error',
                text: error,
                icon: 'error',
                button: 'OK',
              });
            });
        }
      }}
      initialValues={{
        correo: alumno.contacto.correo,
        github: alumno.contacto.github,
        linkedIn: alumno.contacto.linkedIn,
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
          <h1>
            {accion === 4 ? `Alumno 2/3` : `Modificar Informacion Alumno`}
          </h1>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Correo</Form.Label>
              <Form.Control
                placeholder="Correo"
                name="correo"
                id="correo"
                value={values.correo}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!touched.correo && !!errors.correo}
              />
              <Form.Control.Feedback type="invalid">
                {errors.correo}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>GitHub</Form.Label>
              <Form.Control
                placeholder="GitHub"
                name="github"
                id="github"
                value={values.github}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!touched.github && !!errors.github}
              />
              <Form.Control.Feedback type="invalid">
                {errors.github}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>linkedIn</Form.Label>
              <Form.Control
                placeholder="linkedIn"
                name="linkedIn"
                id="linkedIn"
                value={values.linkedIn}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!touched.linkedIn && !!errors.linkedIn}
              />
              <Form.Control.Feedback type="invalid">
                {errors.linkedIn}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Form.Row className="float-right">
            <Button variant="primary" type="submit">
              {accion === 4 ? `Agregar` : `Modificar`}
            </Button>
          </Form.Row>
        </Form>
      )}
    </Formik>
  );
};

export default FormularioContacto;
