import React, { useState, useEffect } from 'react';
import { Form, Button, Col, Row, Pagination } from 'react-bootstrap';
import { Formik } from 'formik';
import { agregar, actualizarEspecifico } from '../../utils/ConexionAPI';
import swal from 'sweetalert';
import Tabla from '../../components/Generales/Tabla';
import { listado } from '../../utils/ConexionAPI';
import { crearArregloColumnas } from '../../utils/Tabla';

const FormularioTemaCurso = ({
  accion,
  curso,
  actualizarListado,
  setAccion,
}) => {
  const [temaCursoListado, setTemaCursoListado] = useState([]);
  const [columnasTemaCurso, setColumnasTemaCurso] = useState([]);
  const [temaCursoListadoFinal, setTemaCursoListadoFinal] = useState([]);
  const [seleccionado, setSeleccionado] = useState(0);
  const [seleccionadoFinal, setSeleccionadoFinal] = useState(0);

  const seleccionarRegistro = (sIdTemaCurso) => {
    setSeleccionado(sIdTemaCurso);
  };

  const seleccionarRegistroFinal = (sIdTemaCurso) => {
    setSeleccionadoFinal(sIdTemaCurso);
  };

  useEffect(() => {
    actualizarListadoCurso();
    setTemaCursoListadoFinal(curso.temaCurso);
  }, []);

  const actualizarListadoCurso = async () => {
    const jsListado = await listado('temaCurso/listado');
    setTemaCursoListado(jsListado);
    setColumnasTemaCurso(crearArregloColumnas(jsListado));
  };

  const agregarRegistroTabla = () => {
    const temaCurso = temaCursoListado.find(
      (temaCursoListado) => temaCursoListado._id === seleccionado
    );
    setTemaCursoListadoFinal([...temaCursoListadoFinal, temaCurso]);
  };

  const eliminarRegistroTabla = () => {
    const temaCurso = temaCursoListadoFinal.filter(
      (temaCursoListadoFinal) => temaCursoListadoFinal._id != seleccionadoFinal
    );
    setTemaCursoListadoFinal(temaCurso);
  };

  return (
    <Formik
      onSubmit={(values, e) => {
        curso.temaCurso = temaCursoListadoFinal;
        if (accion === 4) {
          agregar('curso/agregarCurso', curso)
            .then(() => {
              swal({
                title: 'Curso agregado',
                text: 'Su Curso se a agregado exitosamente',
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
          actualizarEspecifico('curso/actualizarTemaCurso', curso)
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
      initialValues={{}}
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
            {accion === 4
              ? `Agregar Curso 3/3`
              : `Modificar Información Tema del Curso`}
          </h1>
          <Row className="mb-3">
            <Pagination>
              <Pagination.Item
                onClick={() => eliminarRegistroTabla()}
              >{`<`}</Pagination.Item>
              <Pagination.Item
                onClick={() => agregarRegistroTabla()}
              >{`>`}</Pagination.Item>
            </Pagination>
          </Row>
          <Row className="mb-3">
            <Col>
              <Tabla
                listado={temaCursoListado}
                seleccionado={seleccionado}
                buscarRegistro={seleccionarRegistro}
                columnas={columnasTemaCurso}
                proceso="Tema Curso"
              />
            </Col>
            <Col>
              <Tabla
                listado={temaCursoListadoFinal}
                seleccionado={seleccionadoFinal}
                buscarRegistro={seleccionarRegistroFinal}
                columnas={columnasTemaCurso}
                proceso="Tema Curso"
              />
            </Col>
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
              {accion === 4 ? `Agregar` : `Modificar`}
            </Button>
          </Form.Row>
        </Form>
      )}
    </Formik>
  );
};

export default FormularioTemaCurso;
