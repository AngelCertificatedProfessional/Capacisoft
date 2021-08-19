import React, { useState, useEffect } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import {
  actualizarEspecifico,
  consultaById,
} from '../../utils/ConexionAPI';
import swal from 'sweetalert';
import moment from 'moment';

const schema = yup.object({
  cursoId: yup.string().required('Seleccione un curso'),
  periodoId: yup.string().required('Seleccione un periodo'),
  tipoCurso: yup.string().required('Seleccione un tipo de curso'),
  precioFinal: yup.number(),
});

const FormularioCalificacionAlumno = ({
  alumno,
  idCursoProgramado,
  actualizarListado,
}) => {

  useEffect(() => {
    obtenerAlumnoEspecifico();
  }, []);
  
  const obtenerAlumnoEspecifico = async () => {s
    const jsListado = await consultaById(
      'programarCurso/getAlumno/',
      idCursoProgramado+"/"+alumno._id
      );
      setAlumnoListado(jsListado);
      setColumnasAlumno(crearArregloColumnas(jsListado));
      let arreglo = crearArregloColumnas(jsListado);
      arreglo.splice(arreglo.indexOf('alumnoBaja'), 1);
      setColumnasAlumnoFinal(arreglo);
  };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={(values, e) => {
        alumno.fechaFinalizaCursos = moment
          .utc(values.fechaInicioCurso, 'YYYY-MM-DD')
          .format('YYYY-MM-DD HH:mm');
        alumno.calificacionCurso = values.calificacionCurso;
        alumno.notasCurso = values.notasCurso;

        actualizarEspecifico(
          'programarCurso/actualizarProgramarCurso',
          programarCurso
        )
          .then(() => {
            swal({
              title: 'Curso Programado Modificado',
              text: 'Su curso progsramado se a modificado exitosamente',
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
        fechaFinalizaCursos: alumno.fechaFinalizaCursos,
        calificacionCurso: alumno.calificacionCurso,
        notasCurso: alumno.notasCurso,
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
            Actalizar Calificacion del curso
          </h1>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Fecha Finalizo Curso</Form.Label>
              <Form.Control
                placeholder="Fecha de Finalizacion del curso"
                name="fechaFinalizaCurso"
                id="fechaFinalizaCursos"
                type="date"
                value={values.fechaFinalizaCursos}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={
                  !!touched.fechaFinalizaCursos && !!errors.fechaFinalizaCursos
                }
              />
              <Form.Control.Feedback type="invalid">
                {errors.fechaFinalizaCursos}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Calificacion del curso</Form.Label>
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
