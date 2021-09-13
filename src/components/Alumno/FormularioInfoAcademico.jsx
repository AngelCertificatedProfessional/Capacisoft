import React from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import { actualizarEspecifico } from '../../utils/ConexionAPI';
import swal from 'sweetalert';

const schema = yup.object({
  matricula: yup.string().required('La matricula es un campo requerido'),
  semestre: yup.number().positive('La carga academica tiene que ser mayor a 0').required('El semestre es un campo requerido'),
  cargaAcademica: yup.number().positive('La carga academica tiene que ser mayor a 1')
  .required('La carga academica es un campo obligatorio')
  .integer()
  .min(1, "La eddad tiene que ser mayor a 1"),
  universidadId: yup.string().required('Seleccione una univerisdad'),
  carrerId: yup.string().required('Seleccione una carrera'),
});

const FormularioInfoAcademico = ({
  accion,
  alumno,
  actualizarListado,
  cambiarVentana,
  universidadListado,
  carreraListado,
  setAlumno,
  setAccion,
}) => {
  return (
    <Formik
      validationSchema={schema}
      onSubmit={(values, e) => {
        (alumno.infoAcademico.universidadId = values.universidadId),
          (alumno.infoAcademico.carrerId = values.carrerId),
          (alumno.infoAcademico.matricula = values.matricula),
          (alumno.infoAcademico.semestre = values.semestre),
          (alumno.infoAcademico.cargaAcademica = values.cargaAcademica),
          (alumno.infoAcademico.estadoAlumno = values.estadoAlumno);
        setAlumno(alumno);
        if (accion === 3) {
          cambiarVentana(4);
        } else {
          actualizarEspecifico('alumno/actualizarInfoAcademico', alumno)
            .then(() => {
              swal({
                title: 'Alumno Modificado',
                text: 'Su Alumno se a modificado exitosamente',
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
        universidadId: alumno.infoAcademico.universidadId,
        carrerId: alumno.infoAcademico.carrerId,
        matricula: alumno.infoAcademico.matricula,
        semestre: alumno.infoAcademico.semestre,
        cargaAcademica: alumno.infoAcademico.cargaAcademica,
        estadoAlumno: alumno.infoAcademico.estadoAlumno,
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
            {accion === 3
              ? `Agregar Alumno 2/3`
              : `Modificar Información Alumno`}
          </h1>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Universidad del Alumno</Form.Label>
              <Form.Control
                as="select"
                name="universidadId"
                id="universidadId"
                value={values.universidadId}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!touched.universidadId && !!errors.universidadId}
              >
                <option key={'0'} value="">
                  --Seleccione un registro--
                </option>
                {universidadListado.map((consultaUniversidadesTemp, index) => (
                  <option key={index} value={consultaUniversidadesTemp._id}>
                    {consultaUniversidadesTemp.nombre}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.universidadId}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Carrera del Alumno</Form.Label>
              <Form.Control
                required
                as="select"
                type="select"
                name="carrerId"
                id="carrerId"
                value={values.carrerId}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!touched.carrerId && !!errors.carrerId}
              >
                <option key={'0'} value="">
                  --Seleccione un registro--
                </option>
                {carreraListado.map((consultaCarrerasTemp, index) => (
                  <option key={index} value={consultaCarrerasTemp._id}>
                    {consultaCarrerasTemp.nombreCarrera}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {errors.carrerId}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Matricula</Form.Label>
              <Form.Control
                placeholder="Matricula"
                name="matricula"
                id="matricula"
                value={values.matricula}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!touched.matricula && !!errors.matricula}
              />
              <Form.Control.Feedback type="invalid">
                {errors.matricula}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Estado del Alumno</Form.Label>
              <Form.Control
                as="select"
                name="estadoAlumno"
                id="estadoAlumno"
                value={values.estadoAlumno}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="1">Alumno</option>
                <option value="2">Alumno/Trabajador</option>
                <option value="3">Alumno/Servicio Social</option>
                <option value="4">Alumno/Servicio Social Segunda Etapa</option>
                <option value="5">Alumno/Practicas Profesinales</option>
                <option value="6">Alumno/Proyecto de vinculación</option>
                <option value="7">Alumno/Otros Proyectos</option>
                <option value="8">Trabajador</option>
                <option value="9">Desempleado</option>
              </Form.Control>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Carga Académica</Form.Label>
              <Form.Control
                type="number"
                placeholder="Carga Académica"
                name="cargaAcademica"
                id="cargaAcademica"
                value={values.cargaAcademica}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!touched.cargaAcademica && !!errors.cargaAcademica}
              />
              <Form.Control.Feedback type="invalid">
                {errors.cargaAcademica}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Semestre</Form.Label>
              <Form.Control
                type="number"
                placeholder="Semestre"
                name="semestre"
                id="semestre"
                value={values.semestre}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!touched.semestre && !!errors.semestre}
              />
              <Form.Control.Feedback type="invalid">
                {errors.semestre}
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
              {accion === 3 ? `Siguiente` : `Modificar`}
            </Button>
          </Form.Row>
        </Form>
      )}
    </Formik>
  );
};

export default FormularioInfoAcademico;
