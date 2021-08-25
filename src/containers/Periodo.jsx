import React, { useState, useEffect, useContext, Suspense } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import initialState from './../utils/initialState';
import { listado, consultaById } from './../utils/ConexionAPI';
import { crearArregloColumnas } from './../utils/Tabla';
import moment from 'moment';
import AppContext from './../context/AppContext';
import {b64_to_utf8} from './../utils/UtileriasPagina';
import { useHistory, useLocation, withRouter } from 'react-router-dom';
const Tabla = React.lazy(() => import('./../components/Generales/Tabla'));
const InfoPeriodo = React.lazy(() =>
  import('./../components/Periodo/InfoPeriodo')
);
const FormularioPeriodo = React.lazy(() =>
  import('./../components/Periodo/FormularioPeriodo')
);
const SideBar = React.lazy(() => import('./../components/Generales/SideBar'));

const Periodo = () => {
  const [accion, setAccion] = useState(0);
  const [periodo, setPeriodo] = useState({ ...initialState.periodo });
  const [alumnoListado, setAlumnoListado] = useState([]);
  const [periodoListado, setPeriodoListado] = useState([]);
  const [seleccionado, setSeleccionado] = useState(0);
  const [columnas, setColumnas] = useState([]);
  const [columnasAlumno, setColumnasAlumno] = useState([]);
  const [seleccionadoAlumno, setSeleccionadoAlumno] = useState(0);
  const { state, agregarUsuario } = useContext(AppContext);
  let history = useHistory();
  const location = useLocation();

  const cambiarVentana = (ventana) => {
    if (ventana === 2) {
      setPeriodo({ ...initialState.periodo });
    }
    setAccion(ventana);
  };

  useEffect(() => {
    const { usuario } = state;
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

    setPeriodo({ ...initialState.periodo });
    actualizarListado();
  }, []);

  const actualizarListado = async () => {
    const jsListado = await listado('periodo/listado');
    setPeriodoListado(jsListado);
    setColumnas(crearArregloColumnas(jsListado));
    setAccion(0);
  };

  const buscarRegistro = (sIdPeriodo) => {
    setSeleccionado(sIdPeriodo);
    consultaById('periodo/consultaById/', sIdPeriodo).then((periodo) => {
      periodo.creado = moment(periodo.creado).format('DD/MM/YYYY hh:mm:ss');
      periodo.fechaInicio = moment(periodo.fechaInicio).format('YYYY-MM-DD');
      periodo.fechaFinal = moment(periodo.fechaFinal).format('YYYY-MM-DD');
      setColumnasAlumno(crearArregloColumnas(periodo.alumnos));
      setAlumnoListado(periodo.alumnos);
      setPeriodo(periodo);
      setAccion(1);
    });
  };

  const seleccionarRegistroFinal = (sIdAlumno) => {
    setSeleccionadoAlumno(sIdAlumno);
    //este metodo solo existe para que no truene el proceso de la tabla
  };

  return (
    <Container fluid>
      <Row>
        <Col xs={10} md={3}>
          <Suspense fallback={<div>Loading...</div>}>
            <SideBar
              cambiarVentana={cambiarVentana}
              listado={periodoListado}
              seleccionado={seleccionado}
              buscarRegistro={buscarRegistro}
              columnas={columnas}
              proceso="Periodo"
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
                      <InfoPeriodo
                        periodo={periodo}
                        cambiarVentana={cambiarVentana}
                      />
                    </Suspense>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col>
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
                <FormularioPeriodo
                  accion={accion}
                  periodo={periodo}
                  actualizarListado={actualizarListado}
                  seleccionado={seleccionado}
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

export default withRouter(Periodo);
