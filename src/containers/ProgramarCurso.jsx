import React, { useState, useEffect, useContext, Suspense } from 'react';
import { Col, Row, Container, Button } from 'react-bootstrap';
import initialState from './../utils/initialState';
import { listado, consultaById } from './../utils/ConexionAPI';
import { crearArregloColumnas } from './../utils/Tabla';
import AppContext from './../context/AppContext';
import moment from 'moment';
import { useHistory, useLocation, withRouter } from 'react-router-dom';
const Tabla = React.lazy(() => import('./../components/Generales/Tabla'));
const InfoProgramarCurso = React.lazy(() =>
  import('./../components/ProgramarCurso/InfoProgramarCurso')
);
const FormularioProgramarCurso = React.lazy(() =>
  import('./../components/ProgramarCurso/FormularioProgramarCurso')
);
const FormularioCalificacionAlumno = React.lazy(() =>
  import('./../components/ProgramarCurso/FormularioCalificacionAlumno')
);
const SideBar = React.lazy(() => import('./../components/Generales/SideBar'));

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
        jsonProgramarCurso.creado = moment(jsonProgramarCurso.creado).format(
          'DD/MM/YYYY hh:mm:ss'
        );
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
      programarCurso._id + '/' + seleccionadoAlumno
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
          <Suspense fallback={<div>Loading...</div>}>
            <SideBar
              cambiarVentana={cambiarVentana}
              listado={programarCursoListado}
              seleccionado={seleccionado}
              buscarRegistro={buscarRegistro}
              columnas={columnas}
              proceso="Programar Curso"
            />
          </Suspense>
        </Col>

        <Col xs={12} md={9}>
          <main className="pt-4">
            {accion === 1 && (
              <>
                <Row>
                  <Col>
                    <Suspense fallback={<div>Loading...</div>}>
                      <InfoProgramarCurso
                        programarCurso={programarCurso}
                        cambiarVentana={cambiarVentana}
                      />
                    </Suspense>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col>
                    <h2> Alumnos Enlistados</h2>
                    <Button
                      className="mt-2 mb-2"
                      onClick={() => obtenerAlumnoEspecifico()}
                    >
                      {' '}
                      Agregar Calificación Curso
                    </Button>
                    <Suspense fallback={<div>Loading...</div>}>
                      <Tabla
                        listado={alumnoListado}
                        seleccionado={seleccionadoAlumno}
                        buscarRegistro={seleccionarRegistroFinal}
                        columnas={columnasAlumno}
                        proceso="Alumno"
                      />
                    </Suspense>
                  </Col>
                </Row>
              </>
            )}
            {(accion === 2 || accion === 3) && (
              <Suspense fallback={<div>Loading...</div>}>
                <FormularioProgramarCurso
                  accion={accion}
                  programarCurso={programarCurso}
                  actualizarListado={actualizarListado}
                  setProgramarCurso={setProgramarCurso}
                  cursoListado={cursoListado}
                  periodoListado={periodoListado}
                  setAccion={setAccion}
                />
              </Suspense>
            )}

            {accion === 4 && (
              <Suspense fallback={<div>Loading...</div>}>
                <FormularioCalificacionAlumno
                  alumno={alumnoModificar}
                  idProgramarCurso={programarCurso._id}
                  actualizarListado={actualizarListado}
                  setAccion={setAccion}
                />
              </Suspense>
            )}
          </main>
        </Col>
      </Row>
    </Container>
  );
};

export default withRouter(ProgramarCurso);
