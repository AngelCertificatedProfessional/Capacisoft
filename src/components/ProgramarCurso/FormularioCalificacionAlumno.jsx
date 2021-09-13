import React from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import { actualizarEspecifico } from '../../utils/ConexionAPI';
import swal from 'sweetalert';
import moment from 'moment';

const schema = yup.object({
  calificacionCurso: yup.string().required('Seleccione un curso'),
  notasCurso: yup.string().required('Seleccione un periodo'),
});

const FormularioCalificacionAlumno = ({
  alumno,
  idProgramarCurso,
  actualizarListado,
  setAccion,
}) => {
  return (
    <Formik
      validationSchema={schema}
      onSubmit={(values, e) => {
        alumno.fechaFinalizaCurso = moment
          .utc(values.fechaFinalizaCurso, 'YYYY-MM-DD')
          .format('YYYY-MM-DD HH:mm');
        alumno.calificacionCurso = values.calificacionCurso;
        alumno.notasCurso = values.notasCurso;
        alumno._idProgramarCurso = idProgramarCurso;

        actualizarEspecifico(
          'programarCurso/actualizarProgramarCursoAlumno',
          alumno
        )
          .then(() => {
            swal({
              title: 'Alumno Programado Modificado',
              text: 'El alumno programado se a modificado exitosamente',
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
      }}
      initialValues={{
        fechaFinalizaCurso: alumno.fechaFinalizaCurso,
        calificacionCurso: alumno.calificacionCurso,
        notasCurso: alumno.notasCurso,
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
          <h1>Actalizar Calificacion del curso</h1>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Fecha Finalizo Curso</Form.Label>
              <Form.Control
                placeholder="Fecha de Finalizacion del curso"
                name="fechaFinalizaCurso"
                id="fechaFinalizaCurso"
                type="date"
                value={values.fechaFinalizaCurso}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={
                  !!touched.fechaFinalizaCurso && !!errors.fechaFinalizaCurso
                }
              />
              <Form.Control.Feedback type="invalid">
                {errors.fechaFinalizaCurso}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Calificación del curso</Form.Label>
              <Form.Control
                as="select"
                name="calificacionCurso"
                id="calificacionCurso"
                value={values.calificacionCurso}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="5">Muy Bueno</option>
                <option value="4">Bueno</option>
                <option value="3">Regular</option>
                <option value="2">Malo</option>
                <option value="1">Muy Malo</option>
              </Form.Control>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Notas del Curso</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Notas"
                style={{ height: '100px' }}
                name="notasCurso"
                id="notasCurso"
                value={values.notasCurso}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!touched.notasCurso && !!errors.notasCurso}
              />
            </Form.Group>
            <Form.Control.Feedback type="invalid">
              {errors.notasCurso}
            </Form.Control.Feedback>
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
              Actualizar
            </Button>
          </Form.Row>
        </Form>
      )}
    </Formik>
  );
};

export default FormularioCalificacionAlumno;
