import React, { useState, useEffect, useContext, Suspense } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import initialState from './../utils/initialState';
import { listado, consultaById } from './../utils/ConexionAPI';
import { crearArregloColumnas } from './../utils/Tabla';
import AppContext from './../context/AppContext';
import {b64_to_utf8} from './../utils/UtileriasPagina';
import moment from 'moment';
import { useHistory, useLocation, withRouter } from 'react-router-dom';
const InfoCurso = React.lazy(() => import('./../components/Curso/InfoCurso'));
const InfoDetalleCurso = React.lazy(() =>
  import('./../components/Curso/InfoDetalleCurso')
);
const InfoTemaCurso = React.lazy(() =>
  import('./../components/Curso/InfoTemaCurso')
);
const FormularioCurso = React.lazy(() =>
  import('./../components/Curso/FormularioCurso')
);
const FormularioDetalleCurso = React.lazy(() =>
  import('./../components/Curso/FormularioDetalleCurso')
);
const FormularioTemaCurso = React.lazy(() =>
  import('./../components/Curso/FormularioTemaCurso')
);
const SideBar = React.lazy(() => import('./../components/Generales/SideBar'));

const Curso = () => {
  const [accion, setAccion] = useState(0);
  const [curso, setCurso] = useState({ ...initialState.curso });
  const [cursoListado, setCursoListado] = useState([]);
  const [seleccionado, setSeleccionado] = useState(0);
  const [columnas, setColumnas] = useState([]);
  const { state, agregarUsuario } = useContext(AppContext);

  const cambiarVentana = (ventana) => {
    if (ventana === 2) {
      setCurso({ ...initialState.curso });
    }
    setAccion(ventana);
  };
  const { usuario } = state;
  let history = useHistory();
  const location = useLocation();
  useEffect(() => {
    if (usuario === null || usuario === undefined || usuario.usuario === '') {
      const usuarioSesionT = JSON.parse(b64_to_utf8(sessionStorage.getItem('usuario')));
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
    setCurso({ ...initialState.curso });
    actualizarListado();
  }, []);

  const actualizarListado = async () => {
    let jsListado = await listado('curso/listado');
    setColumnas(crearArregloColumnas(jsListado));
    setCursoListado(jsListado);
    setAccion(0);
  };

  const buscarRegistro = (sIdCurso) => {
    setSeleccionado(sIdCurso);
    consultaById('curso/consultaById/', sIdCurso).then((jsCurso) => {
      jsCurso.creado = moment(jsCurso.creado).format('DD/MM/YYYY hh:mm:ss');
      setCurso(jsCurso);
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
              listado={cursoListado}
              seleccionado={seleccionado}
              buscarRegistro={buscarRegistro}
              columnas={columnas}
              proceso="Curso"
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
                      <InfoCurso
                        curso={curso}
                        cambiarVentana={cambiarVentana}
                      />
                    </Suspense>
                  </Col>
                </Row>
                <Row>
                  <Col className="mt-3">
                    <Suspense fallback={<div>Loading...</div>}>
                      <InfoDetalleCurso
                        curso={curso}
                        cambiarVentana={cambiarVentana}
                      />
                    </Suspense>
                  </Col>
                  <Col className="mt-3">
                    <Suspense fallback={<div>Loading...</div>}>
                      <InfoTemaCurso
                        curso={curso}
                        cambiarVentana={cambiarVentana}
                      />
                    </Suspense>
                  </Col>
                </Row>
              </>
            )}
            {(accion === 2 || accion === 6) && (
              <Suspense fallback={<div>Loading...</div>}>
                <FormularioCurso
                  accion={accion}
                  curso={curso}
                  actualizarListado={actualizarListado}
                  cambiarVentana={cambiarVentana}
                  setCurso={setCurso}
                  setAccion={setAccion}
                />
              </Suspense>
            )}
            {(accion === 3 || accion === 7) && (
              <Suspense fallback={<div>Loading...</div>}>
                <FormularioDetalleCurso
                  accion={accion}
                  curso={curso}
                  actualizarListado={actualizarListado}
                  cambiarVentana={cambiarVentana}
                  setCurso={setCurso}
                  setAccion={setAccion}
                />
              </Suspense>
            )}
            {(accion === 4 || accion === 8) && (
              <Suspense fallback={<div>Loading...</div>}>
                <FormularioTemaCurso
                  accion={accion}
                  curso={curso}
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

export default withRouter(Curso);
