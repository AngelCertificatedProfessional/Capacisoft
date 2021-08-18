import React from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import { actualizarEspecifico } from '../../utils/ConexionAPI';
import swal from 'sweetalert';

const schema = yup.object({
  urlCurso: yup
    .string()
    .url('La liga tiene que ser una ruta validad')
    .required('El URL es un campo requerido'),
  precio: yup.number().required('El precio es un campo obligatorio'),
  horas: yup.number().required('Las horas es un campo obligatorio'),
  proveeCertificado: yup.boolean(),
  herramientas: yup
    .string()
    .required('Las herramientas es un campo obligatorio'),
});

const FormularioDetalleCurso = ({
  accion,
  curso,
  actualizarListado,
  cambiarVentana,
  setCurso,
}) => {
  return (
    <Formik
      validationSchema={schema}
      onSubmit={(values, e) => {
        curso.detalleCurso.urlCurso = values.urlCurso;
        curso.detalleCurso.precio = values.precio;
        curso.detalleCurso.horas = values.horas;
        curso.detalleCurso.proveeCertificado = values.proveeCertificado;
        curso.detalleCurso.herramientas = values.herramientas;
        setCurso(curso);
        if (accion === 3) {
          cambiarVentana(4);
        } else {
          actualizarEspecifico('curso/actualizarDetalleCurso', curso)
            .then(() => {
              swal({
                title: 'Detalle del curso Modificado',
                text: 'Su Curso se a modificado exitosamente',
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
        urlCurso: curso.detalleCurso.urlCurso,
        precio: curso.detalleCurso.precio,
        horas: curso.detalleCurso.horas,
        proveeCertificado: curso.detalleCurso.proveeCertificado,
        herramientas: curso.detalleCurso.herramientas,
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
            {accion === 3
              ? `Curso 2/3`
              : `Modificar Informacion Detalle del Curso`}
          </h1>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>URL del Curso</Form.Label>
              <Form.Control
                placeholder="URL Curso"
                name="urlCurso"
                id="urlCurso"
                value={values.urlCurso}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!touched.urlCurso && !!errors.urlCurso}
              />
              <Form.Control.Feedback type="invalid">
                {errors.urlCurso}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Este curso provee un certificado</Form.Label>
              <Form.Check
                type="checkbox"
                className="mb-2"
                required
                name="proveeCertificado"
                id="proveeCertificado"
                defaultChecked={values.proveeCertificado}
                value={values.proveeCertificado}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Certificado"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Precio</Form.Label>
              <Form.Control
                placeholder="Precio"
                name="precio"
                id="precio"
                value={values.precio}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!touched.precio && !!errors.precio}
              />
              <Form.Control.Feedback type="invalid">
                {errors.precio}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Horas</Form.Label>
              <Form.Control
                placeholder="Horas"
                name="horas"
                id="horas"
                value={values.horas}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!touched.horas && !!errors.horas}
              />
              <Form.Control.Feedback type="invalid">
                {errors.horas}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Herramientas del curso</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Agregar una herramientas"
                style={{ height: '100px' }}
                name="herramientas"
                id="herramientas"
                value={values.herramientas}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!touched.herramientas && !!errors.herramientas}
              />
            </Form.Group>
            <Form.Control.Feedback type="invalid">
              {errors.descripcion}
            </Form.Control.Feedback>
          </Row>
          <Form.Row className="float-right">
            <Button variant="primary" type="submit">
              {accion === 3 ? `Siguiente` : `Modificar`}
            </Button>
          </Form.Row>
        </Form>
      )}
    </Formik>
  );
};

export default FormularioDetalleCurso;
