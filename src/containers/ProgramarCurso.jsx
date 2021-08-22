import React, { useState, useEffect, useContext } from 'react';
import { Col, Row, Container,Button } from 'react-bootstrap';
import InfoProgramarCurso from './../components/ProgramarCurso/InfoProgramarCurso';
import FormularioProgramarCurso from './../components/ProgramarCurso/FormularioProgramarCurso';
import FormularioCalificacionAlumno from './../components/ProgramarCurso/FormularioCalificacionAlumno';
import SideBar from './../components/Generales/SideBar';
import initialState from './../utils/initialState';
import { listado, consultaById } from './../utils/ConexionAPI';
import { crearArregloColumnas } from './../utils/Tabla';
import Tabla from './../components/Generales/Tabla';
import AppContext from './../context/AppContext';
import moment from 'moment';
import { useHistory, useLocation, withRouter } from 'react-router-dom';

const ProgramarCurso = () => {
  const [accion, setAccion] = useState(0);
  const [programarCurso, setProgramarCurso] = useState({
    ...initialState.programarCurso,
  });
  const [programarCursoListado, setProgramarCursoListado] = useState([]);
  const [seleccionado, setSeleccionado] = useState(0);
  const [columnas, setColumnas] = useState([]);
  const [cursoListado, setCursoListado] = useState([]);
  const [periodoListado, setPeriodoListado] = useState([]);
  const { state, agregarUsuario } = useContext(AppContext);
  const [alumnoListado, setAlumnoListado] = useState([]);
  const [columnasAlumno, setColumnasAlumno] = useState([]);
  const [seleccionadoAlumno, setSeleccionadoAlumno] = useState(0);
  const [alumnoModificar, setAlumnoModificar] = useState();

  const cambiarVentana = (ventana) => {
    if (ventana === 2) {
      setProgramarCurso({ ...initialState.programarCurso });
    }
    setAccion(ventana);
  };

  let history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const { usuario } = state;
    if (usuario === null || usuario === undefined || usuario.usuario === '') {
      const usuarioSesionT = JSON.parse(sessionStorage.getItem('usuario'));
      if (
        (usuarioSesionT === null ||
          usuarioSesionT === undefined ||
          usuarioSesionT.usuario === '') &&
        location.pathname !== '/login'
      ) {
        history.push('/login');
      }
      agregarUsuario(usuarioSesionT);
    }

    setProgramarCurso({ ...initialState.programarCurso });
    actualizarListado();
  }, []);

  const actualizarListado = async () => {
    let jsListado = await listado('programarCurso/listado');
    setColumnas(crearArregloColumnas(jsListado));
    setProgramarCursoListado(jsListado);
    setAccion(0);

    jsListado = await listado('curso/listado');
    setCursoListado(jsListado);

    jsListado = await listado('periodo/listado');
    setPeriodoListado(jsListado);
  };

  const seleccionarRegistroFinal = (sIdAlumno) => {
    setSeleccionadoAlumno(sIdAlumno);
    //este metodo solo existe para que no truene el proceso de la tabla
  };

  const buscarRegistro = (sIdProgramarCurso) => {
    setSeleccionado(sIdProgramarCurso);
    consultaById('programarCurso/consultaById/', sIdProgramarCurso).then(
      (jsonProgramarCurso) => {
        jsonProgramarCurso.fechaInicioCurso = moment(
          jsonProgramarCurso.fechaInicioCurso
        ).format('YYYY-MM-DD');
        setColumnasAlumno(crearArregloColumnas(jsonProgramarCurso.alumnos));
        setAlumnoListado(jsonProgramarCurso.alumnos);
        setProgramarCurso(jsonProgramarCurso);
        setAccion(1);
      }
    );
  };

  const obtenerAlumnoEspecifico = async () => {
    const jsListado = await consultaById(
      'programarCurso/getAlumnoByProgramarCurso/',
      programarCurso._id+"/"+seleccionadoAlumno
    );
    jsListado.alumnos.fechaFinalizaCurso = moment(
      jsListado.alumnos.fechaFinalizaCurso
    ).format('YYYY-MM-DD');
    setAlumnoModificar(jsListado.alumnos);
    setAccion(4);
  };

  return (
    <Container fluid>
      <Row>
        <Col xs={10} md={3}>
          <SideBar
            cambiarVentana={cambiarVentana}
            listado={programarCursoListado}
            seleccionado={seleccionado}
            buscarRegistro={buscarRegistro}
            columnas={columnas}
            proceso="Programar Curso"
          />
        </Col>

        <Col xs={12} md={9}>
          <main className="pt-4">
            {accion === 1 && (
              <>
                <Row>
                  <Col>
                    <InfoProgramarCurso
                      programarCurso={programarCurso}
                      cambiarVentana={cambiarVentana}
                    />
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col>
                    <h2> Alumnos Enlistados</h2>
                    <Button className="mt-2 mb-2" onClick={() => obtenerAlumnoEspecifico()}> Agregar Calificacion Curso</Button>
                    <Tabla
                      listado={alumnoListado}
                      seleccionado={seleccionadoAlumno}
                      buscarRegistro={seleccionarRegistroFinal}
                      columnas={columnasAlumno}
                      proceso="Alumno"
                    />
                  </Col>
                </Row>
              </>
            )}
            {(accion === 2 || accion === 3) && (
              <FormularioProgramarCurso
                accion={accion}
                programarCurso={programarCurso}
                actualizarListado={actualizarListado}
                setProgramarCurso={setProgramarCurso}
                cursoListado = {cursoListado}
                periodoListado = {periodoListado}
              />
            )}

            {(accion === 4) && (
              <FormularioCalificacionAlumno
                alumno={alumnoModificar}
                idProgramarCurso = {programarCurso._id}
                actualizarListado={actualizarListado}
              />
            )}

          </main>
        </Col>
      </Row>
    </Container>
  );
};

export default withRouter(ProgramarCurso);
