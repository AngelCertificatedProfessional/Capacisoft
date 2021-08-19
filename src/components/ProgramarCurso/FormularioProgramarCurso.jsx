import React, { useState, useEffect } from 'react';
import { Form, Button, Col, Row, Pagination } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import {
  actualizar,
  agregar,
  consultaById,
} from '../../utils/ConexionAPI';
import swal from 'sweetalert';
import moment from 'moment';
import { crearArregloColumnas } from '../../utils/Tabla';
import Tabla from './../../components/Generales/Tabla';

const schema = yup.object({
  cursoId: yup.string().required('Seleccione un curso'),
  periodoId: yup.string().required('Seleccione un periodo'),
  tipoCurso: yup.string().required('Seleccione un tipo de curso'),
  precioFinal: yup.number(),
});

const FormularioProgramarCurso = ({
  accion,
  programarCurso,
  actualizarListado,
  setProgramarCurso,
  cursoListado,
  periodoListado,
}) => {
  const [alumnoListado, setAlumnoListado] = useState([]);
  const [columnasAlumno, setColumnasAlumno] = useState([]);
  const [alumnoListadoFinal, setAlumnoListadoFinal] = useState([]);
  const [columnasAlumnoFinal, setColumnasAlumnoFinal] = useState([]);
  const [seleccionado, setSeleccionado] = useState(0);
  const [seleccionadoFinal, setSeleccionadoFinal] = useState(0);
  const [precioTotal, setPrecioTotal] = useState(0);

  const seleccionarRegistro = (sIdAlumno) => {
    setSeleccionado(sIdAlumno);
  };

  const seleccionarRegistroFinal = (sIdAlumno) => {
    setSeleccionadoFinal(sIdAlumno);
  };

  useEffect(() => {
    actualizarListadoAlumno(programarCurso.periodoId,true);
  }, []);
  
  const actualizarListadoAlumno = async (sIdPeriodo,bPrimeraVez) => {
    if (sIdPeriodo === '') {
      return;
    }
    const jsListado = await consultaById(
      'periodo/listadoAlumnosByPeriodo/',
      sIdPeriodo
      );
      setAlumnoListado(jsListado);
      setColumnasAlumno(crearArregloColumnas(jsListado));
      let arreglo = crearArregloColumnas(jsListado);
      arreglo.splice(arreglo.indexOf('alumnoBaja'), 1);
      setColumnasAlumnoFinal(arreglo);
    if(bPrimeraVez){
      setAlumnoListadoFinal(programarCurso.alumnos);
      actualizarPrecioTotal(programarCurso.precioFinal, programarCurso.alumnos.length);
    }else{
      setAlumnoListadoFinal([]);
      actualizarPrecioTotal(0, 0);
    }
  };

  const agregarRegistroTabla = (nPrecioFinal) => {
    const alumno = alumnoListado.find(
      (alumnoListado) => alumnoListado._id === seleccionado
    );
    delete alumno['alumnoBaja'];
    setAlumnoListadoFinal([...alumnoListadoFinal, alumno]);
    actualizarPrecioTotal(nPrecioFinal, alumnoListadoFinal.length + 1);
  };

  const eliminarRegistroTabla = (nPrecioFinal) => {
    const alumno = alumnoListadoFinal.filter(
      (alumnoListadoFinal) => alumnoListadoFinal._id != seleccionadoFinal
    );
    setAlumnoListadoFinal(alumno);
    actualizarPrecioTotal(nPrecioFinal, alumno.length);
  };

  const actualizarPrecioTotal = (nPrecioFinal, nTamano) => {
    setPrecioTotal(nTamano * nPrecioFinal);
  };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={(values, e) => {
        programarCurso.cursoId = values.cursoId;
        programarCurso.fechaInicioCurso = moment
          .utc(values.fechaInicioCurso, 'YYYY-MM-DD')
          .format('YYYY-MM-DD HH:mm');
        programarCurso.periodoId = values.periodoId;
        programarCurso.tipoCurso = values.tipoCurso;
        programarCurso.precioFinal = values.precioFinal;
        programarCurso.alumnos = alumnoListadoFinal;
        setProgramarCurso(programarCurso);
        if (accion === 2) {
          agregar('programarCurso/createProgramarCurso', programarCurso)
            .then(() => {
              swal({
                title: 'Curso Programado Agregado',
                text: 'Su Curso Programado se a agregado exitosamente',
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
          actualizar(
            'programarCurso/actualizarProgramarCurso',
            programarCurso
          )
            .then(() => {
              swal({
                title: 'Curso Programado Modificado',
                text: 'Su curso programado se a modificado exitosamente',
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
        cursoId: programarCurso.cursoId,
        fechaInicioCurso: programarCurso.fechaInicioCurso,
        periodoId: programarCurso.periodoId,
        tipoCurso: programarCurso.tipoCurso,
        precioFinal: programarCurso.precioFinal,
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
            {accion === 2 ? `Programar Curso` : `Modificar Informacion Alumno`}
          </h1>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Curso</Form.Label>
              <Form.Control
                as="select"
                name="cursoId"
                id="cursoId"
                value={values.cursoId}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!touched.cursoId && !!errors.cursoId}
              >
                <option key={'0'} value="">
                  --Seleccione un registro--
                </option>
                {cursoListado.map((consultaCursoListado, index) => (
                  <option key={index} value={consultaCursoListado._id}>
                    {consultaCursoListado.nombreCurso}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.cursoId}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Fecha Inicio Curso</Form.Label>
              <Form.Control
                placeholder="Fecha Inicio"
                name="fechaInicioCurso"
                id="fechaInicioCurso"
                type="date"
                value={values.fechaInicioCurso}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={
                  !!touched.fechaInicioCurso && !!errors.fechaInicioCurso
                }
              />
              <Form.Control.Feedback type="invalid">
                {errors.fechaInicioCurso}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Periodo</Form.Label>
              <Form.Control
                as="select"
                name="periodoId"
                id="periodoId"
                value={values.periodoId}
                onChange={handleChange}
                onBlur={handleBlur}
                onChange={(
                  e // call the built-in handleChange for formik
                ) => {
                  handleChange(e);
                  actualizarListadoAlumno(e.currentTarget.value,false);
                }}
                onBlur={handleBlur}
                isInvalid={!!touched.periodoId && !!errors.periodoId}
              >
                <option key={'0'} value="">
                  --Seleccione un registro--
                </option>
                {periodoListado.map((consultaPeriodoId, index) => (
                  <option key={index} value={consultaPeriodoId._id}>
                    {consultaPeriodoId.periodo}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.cursoId}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Tipo de Curso</Form.Label>
              <Form.Control
                as="select"
                name="tipoCurso"
                id="tipoCurso"
                value={values.tipoCurso}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="1">Teorico</option>
                <option value="2">Practico</option>
                <option value="3">Teorico y Practico</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Precio Final</Form.Label>
              <Form.Control
                placeholder="Precio Final"
                name="precioFinal"
                id="precioFinal"
                value={values.precioFinal}
                onChange={(
                  e // call the built-in handleChange for formik
                ) => {
                  handleChange(e);
                  actualizarPrecioTotal(
                    e.currentTarget.value,
                    alumnoListadoFinal.length
                  );
                }}
                onBlur={handleBlur}
                isInvalid={!!touched.precioFinal && !!errors.precioFinal}
              />
              <Form.Control.Feedback type="invalid">
                {errors.precioFinal}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Precio Total</Form.Label>
              <Form.Control
                placeholder="Precio Total"
                name="precioTotal"
                id="precioTotal"
                value={precioTotal}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled
              />
            </Form.Group>
          </Row>
          <h2>Agregar Alumnos al Curso</h2>
          <Row className="mb-3">
            <Pagination>
              <Pagination.Item
                onClick={() => eliminarRegistroTabla(values.precioFinal)}
              >{`<`}</Pagination.Item>
              <Pagination.Item
                onClick={() => agregarRegistroTabla(values.precioFinal)}
              >{`>`}</Pagination.Item>
            </Pagination>
          </Row>
          <Row className="mb-3">
            <Col>
              <Tabla
                listado={alumnoListado}
                seleccionado={seleccionado}
                buscarRegistro={seleccionarRegistro}
                columnas={columnasAlumno}
                proceso="Alumno"
              />
            </Col>
            <Col>
              <Tabla
                listado={alumnoListadoFinal}
                seleccionado={seleccionadoFinal}
                buscarRegistro={seleccionarRegistroFinal}
                columnas={columnasAlumnoFinal}
                proceso="Alumno"
              />
            </Col>
          </Row>
          <Form.Row className="float-right">
            <Button variant="primary" type="submit">
              {accion === 2 ? `Agregar` : `Modificar`}
            </Button>
          </Form.Row>
        </Form>
      )}
    </Formik>
  );
};

export default FormularioProgramarCurso;
