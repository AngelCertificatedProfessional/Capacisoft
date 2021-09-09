import React, { useState, useEffect, useContext, Suspense } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import initialState from '../utils/initialState';
import { listado, consultaById } from '../utils/ConexionAPI';
import { crearArregloColumnas } from '../utils/Tabla';
import AppContext from './../context/AppContext';
import moment from 'moment';
import {b64_to_utf8} from './../utils/UtileriasPagina';
import { useHistory, useLocation, withRouter } from 'react-router-dom';
const InfoUsuario = React.lazy(() =>
  import('./../components/Usuario/InfoUsuario')
);
const FormularioUsuario = React.lazy(() =>
  import('./../components/Usuario/FormularioUsuario')
);
const CambiarContrasenas = React.lazy(() =>
  import('./../components/Usuario/CambiarContrasenas')
);
const SideBar = React.lazy(() => import('./../components/Generales/SideBar'));

const Usuario = () => {
  const [accion, setAccion] = useState(0);
  const [usuario, setUsuario] = useState({ ...initialState.usuario });
  const [usuarioListado, setUsuarioListado] = useState([]);
  const [seleccionado, setSeleccionado] = useState(0);
  const [columnas, setColumnas] = useState([]);
  const { state, agregarUsuario } = useContext(AppContext);

  const cambiarVentana = (ventana) => {
    if (ventana === 2) {
      setUsuario({ ...initialState.usuario });
    }
    setAccion(ventana);
  };

  let history = useHistory();
  const location = useLocation();

  useEffect(() => {
    setUsuario({ ...initialState.usuario });
    let usuarioSesionT = state.usuario;
    if (
      usuarioSesionT === null ||
      usuarioSesionT === undefined ||
      usuarioSesionT.usuario === ''
    ) {
      usuarioSesionT = JSON.parse(b64_to_utf8(sessionStorage.getItem('usuario')));
      if (
        (usuarioSesionT === null ||
          usuarioSesionT === undefined ||
          usuarioSesionT.usuario === '') &&
        location.pathname !== '/login'
      ) {
        history.push('/login');
      }
      agregarUsuario(usuarioSesionT);
      actualizarListado(usuarioSesionT);
    }else{
      actualizarListado();
    }
  }, []);

  const actualizarListado = async (usuarioSesionT) => {
    let tipoUsuario;
    if (
      usuarioSesionT === null ||
      usuarioSesionT === undefined ||
      usuarioSesionT.usuario === ''
    ) {
      tipoUsuario = state.usuario.tipoUsuario
    }else{
      tipoUsuario = usuarioSesionT.tipoUsuario
    }
    let jsListado = null;
    if(tipoUsuario === 1){
      jsListado = await listado('usuario/listado');
    }else{
      jsListado = await listado('usuario/listadoUsuarioById');
    }
    setColumnas(crearArregloColumnas(jsListado));
    setUsuarioListado(jsListado);
    setAccion(0);
  };

  const buscarRegistro = (sIdUsuario) => {
    setSeleccionado(sIdUsuario);
    consultaById('usuario/consultaById/', sIdUsuario).then((jsUsuario) => {
      jsUsuario.creado = moment(jsUsuario.creado).format('DD/MM/YYYY hh:mm:ss');
      setUsuario(jsUsuario);
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
              listado={usuarioListado}
              seleccionado={seleccionado}
              buscarRegistro={buscarRegistro}
              columnas={columnas}
              proceso="Usuario"
              tipoUsuario = {state.usuario.tipoUsuario}
            />
          </Suspense>
        </Col>
        <Col xs={12} md={9}>
          <main className="pt-4">
            {accion === 1 && (
              <Suspense fallback={<div>Loading...</div>}>
                <InfoUsuario
                  usuario={usuario}
                  cambiarVentana={cambiarVentana}
                  tipoUsuario = {state.usuario.tipoUsuario}
                />
              </Suspense>
            )}
            {(accion === 2 || accion === 3) && (
              <Suspense fallback={<div>Loading...</div>}>
                <FormularioUsuario
                  accion={accion}
                  usuario={usuario}
                  actualizarListado={actualizarListado}
                  setAccion={setAccion}
                  tipUsuarioSesion={state.usuario.tipoUsuario}
                />
              </Suspense>
            )}
            {accion === 4 && (
              <Suspense fallback={<div>Loading...</div>}>
                <CambiarContrasenas
                  usuario={usuario}
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

export default withRouter(Usuario);
