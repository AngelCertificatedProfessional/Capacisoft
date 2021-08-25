import React, { useState, useEffect, useContext, Suspense } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import initialState from './../utils/initialState';
import { listado, consultaById } from './../utils/ConexionAPI';
import { crearArregloColumnas } from './../utils/Tabla';
import AppContext from './../context/AppContext';
import {b64_to_utf8} from './../utils/UtileriasPagina';
import { useHistory, useLocation, withRouter } from 'react-router-dom';
import moment from 'moment';
const InfoAlumno = React.lazy(() =>
  import('./../components/Alumno/InfoAlumno')
);
const InfoContacto = React.lazy(() =>
  import('./../components/Alumno/InfoContacto')
);
const InfoAcademico = React.lazy(() =>
  import('./../components/Alumno/InfoAcademico')
);
const FormularioAlumno = React.lazy(() =>
  import('./../components/Alumno/FormularioAlumno')
);
const FormularioInfoAcademico = React.lazy(() =>
  import('./../components/Alumno/FormularioInfoAcademico')
);
const FormularioContacto = React.lazy(() =>
  import('./../components/Alumno/FormularioContacto')
);
const SideBar = React.lazy(() => import('./../components/Generales/SideBar'));

const Alumnos = () => {
  const [accion, setAccion] = useState(0);
  const [alumno, setAlumno] = useState({ ...initialState.alumno });
  const [alumnoListado, setAlumnoListado] = useState([]);
  const [seleccionado, setSeleccionado] = useState(0);
  const [columnas, setColumnas] = useState([]);
  const [universidadListado, setUniversidadListado] = useState([]);
  const [carreraListado, setCarreraListado] = useState([]);
  const { state, agregarUsuario } = useContext(AppContext);

  const cambiarVentana = (ventana) => {
    if (ventana === 2) {
      setAlumno({ ...initialState.alumno });
    }
    setAccion(ventana);
  };

  let history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const { usuario } = state;
    if (usuario === null || usuario === undefined || usuario.usuario === '') {
      const usuarioSesionT = JSON.parse(b64_to_utf8(sessionStorage.getItem('usuario')))
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

    setAlumno({ ...initialState.alumno });
    actualizarListado();
  }, []);

  const actualizarListado = async () => {
    let jsListado = await listado('alumno/listado');
    setColumnas(crearArregloColumnas(jsListado));
    setAlumnoListado(jsListado);
    setAccion(0);

    jsListado = await listado('universidad/listado');
    setUniversidadListado(jsListado);

    jsListado = await listado('carrera/listado');
    setCarreraListado(jsListado);
  };

  const buscarRegistro = (sIdAlumno) => {
    setSeleccionado(sIdAlumno);
    consultaById('alumno/consultaById/', sIdAlumno).then((jsAlumno) => {
      jsAlumno.creado = moment(jsAlumno.creado).format('DD/MM/YYYY hh:mm:ss');
      setAlumno(jsAlumno);
      setAccion(1);
    });
  };

  return (
    <Container fluid>
      <Row>
        <Col xs={10} md={3}>
          <Suspense fallback={<div>Loading...</div>}>
            <SideBar
              cambiarVentana={cambiarVentana}
              listado={alumnoListado}
              seleccionado={seleccionado}
              buscarRegistro={buscarRegistro}
              columnas={columnas}
              proceso="Alumno"
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
                      <InfoAlumno
                        alumno={alumno}
                        cambiarVentana={cambiarVentana}
                      />
                    </Suspense>
                  </Col>
                </Row>
                <Row>
                  <Col className="mt-3">
                    <Suspense fallback={<div>Loading...</div>}>
                      <InfoAcademico
                        alumno={alumno}
                        cambiarVentana={cambiarVentana}
                      />
                    </Suspense>
                  </Col>
                  <Col className="mt-3">
                    <Suspense fallback={<div>Loading...</div>}>
                      <InfoContacto
                        alumno={alumno}
                        cambiarVentana={cambiarVentana}
                      />
                    </Suspense>
                  </Col>
                </Row>
              </>
            )}
            {(accion === 2 || accion === 6) && (
              <Suspense fallback={<div>Loading...</div>}>
                <FormularioAlumno
                  accion={accion}
                  alumno={alumno}
                  actualizarListado={actualizarListado}
                  cambiarVentana={cambiarVentana}
                  setAlumno={setAlumno}
                  setAccion={setAccion}
                />
              </Suspense>
            )}
            {(accion === 3 || accion === 7) && (
              <Suspense fallback={<div>Loading...</div>}>
                <FormularioInfoAcademico
                  accion={accion}
                  alumno={alumno}
                  actualizarListado={actualizarListado}
                  cambiarVentana={cambiarVentana}
                  universidadListado={universidadListado}
                  carreraListado={carreraListado}
                  setAlumno={setAlumno}
                  setAccion={setAccion}
                />
              </Suspense>
            )}
            {(accion === 4 || accion === 8) && (
              <Suspense fallback={<div>Loading...</div>}>
                <FormularioContacto
                  accion={accion}
                  alumno={alumno}
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

export default withRouter(Alumnos);
