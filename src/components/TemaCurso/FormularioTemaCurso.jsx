import React from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import { agregar, actualizar } from '../../utils/ConexionAPI';
import swal from 'sweetalert';

const schema = yup.object({
  temaCurso: yup.string().required('El tema del curso es un campo Obligatorio'),
});

const FormularioTemaCurso = ({
  accion,
  temaCurso,
  actualizarListado,
  setAccion,
}) => {
  return (
    <Formik
      validationSchema={schema}
      onSubmit={(values, e) => {
        temaCurso.temaCurso = values.temaCurso;
        if (accion === 2) {
          agregar('temaCurso/agregarTemaCurso', temaCurso).then(() => {
            swal({
              title: 'Tema del Curso Agregado',
              text: 'Su Tema del Curso se a agregado exitosamente',
              icon: 'success',
              button: 'OK',
            });
            actualizarListado();
          });
        } else {
          actualizar('temaCurso/actualizarTemaCurso', temaCurso).then(() => {
            swal({
              title: 'Tema del Curso Modificado',
              text: 'Su Tema del Curso se a modificado exitosamente',
              icon: 'success',
              button: 'OK',
            });
            actualizarListado();
          });
        }
      }}
      initialValues={{
        temaCurso: temaCurso.temaCurso,
      }}
      enableReinitialize
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
            {accion === 2
              ? `Agregar Tema del Curso`
              : `Modificar Información Tema del Curso`}
          </h1>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Nombre del Tema del Curso</Form.Label>
              <Form.Control
                placeholder="Nombre del Tema del Curso"
                name="temaCurso"
                id="temaCurso"
                value={values.temaCurso}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!touched.temaCurso && !!errors.temaCurso}
              />
              <Form.Control.Feedback type="invalid">
                {errors.temaCurso}
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

export default FormularioTemaCurso;
