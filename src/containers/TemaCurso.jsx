import React, { useState, useEffect, useContext, Suspense } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import SideBar from '../components/Generales/SideBar';
import initialState from '../utils/initialState';
import { listado, consultaById } from '../utils/ConexionAPI';
import { crearArregloColumnas } from '../utils/Tabla';
import AppContext from './../context/AppContext';
import {b64_to_utf8} from './../utils/UtileriasPagina';
import { useHistory, useLocation, withRouter } from 'react-router-dom';
import moment from 'moment';
const InfoTemaCurso = React.lazy(() =>
  import('../components/TemaCurso/InfoTemaCurso')
);
const FormularioTemaCurso = React.lazy(() =>
  import('./../components/TemaCurso/FormularioTemaCurso')
);
const TemaCurso = () => {
  const [accion, setAccion] = useState(0);
  const [temaCurso, setTemaCurso] = useState({ ...initialState.temaCurso });
  const [temaCursoListado, setTemaCursoListado] = useState([]);
  const [seleccionado, setSeleccionado] = useState(0);
  const [columnas, setColumnas] = useState([]);
  const { state, agregarUsuario } = useContext(AppContext);

  const cambiarVentana = (ventana) => {
    if (ventana === 2) {
      setTemaCurso({ ...initialState.temaCurso });
    }
    setAccion(ventana);
  };

  let history = useHistory();
  const location = useLocation();

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

    setTemaCurso({ ...initialState.temaCurso });
    actualizarListado();
  }, []);

  const actualizarListado = async () => {
    const jsListado = await listado('temaCurso/listado');
    setTemaCursoListado(jsListado);
    setColumnas(crearArregloColumnas(jsListado));
    setAccion(0);
  };

  const buscarRegistro = (sIdTemaCurso) => {
    setSeleccionado(sIdTemaCurso);
    consultaById('temaCurso/consultaById/', sIdTemaCurso).then(
      (jsTemaCurso) => {
        jsTemaCurso.creado = moment(jsTemaCurso.creado).format(
          'DD/MM/YYYY hh:mm:ss'
        );
        setTemaCurso(jsTemaCurso);
        setAccion(1);
      }
    );
  };

  return (
    <Container fluid>
      <Row>
        <Col xs={10} md={3}>
          <Suspense fallback={<div>Loading...</div>}>
            <SideBar
              cambiarVentana={cambiarVentana}
              listado={temaCursoListado}
              seleccionado={seleccionado}
              buscarRegistro={buscarRegistro}
              columnas={columnas}
              proceso="Tema Curso"
              tipoUsuario = {state.usuario.tipoUsuario}
            />
          </Suspense>
        </Col>
        <Col xs={12} md={9}>
          <main className="pt-4">
            {accion === 1 && (
              <Suspense fallback={<div>Loading...</div>}>
                <InfoTemaCurso
                  temaCurso={temaCurso}
                  cambiarVentana={cambiarVentana}
                  tipoUsuario = {state.usuario.tipoUsuario}
                />
              </Suspense>
            )}
            {(accion === 2 || accion === 3) && (
              <Suspense fallback={<div>Loading...</div>}>
                <FormularioTemaCurso
                  accion={accion}
                  temaCurso={temaCurso}
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

export default withRouter(TemaCurso);
