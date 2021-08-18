import React, { useState, useEffect, useContext } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import InfoUsuario from '../components/Usuario/InfoUsuario';
import FormularioUsuario from '../components/Usuario/FormularioUsuario';
import CambiarContrasenas from '../components/Usuario/CambiarContrasenas';
import SideBar from '../components/Generales/SideBar';
import initialState from '../utils/initialState';
import { listado, consultaById } from '../utils/ConexionAPI';
import { crearArregloColumnas } from '../utils/Tabla';
import AppContext from './../context/AppContext';
import { useHistory, useLocation, withRouter } from 'react-router-dom';

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
    let usuarioSesionT = state.usuario;
    if (
      usuarioSesionT === null ||
      usuarioSesionT === undefined ||
      usuarioSesionT.usuario === ''
    ) {
      usuarioSesionT = JSON.parse(sessionStorage.getItem('usuario'));
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
    setUsuario({ ...initialState.usuario });
    actualizarListado();
  }, []);

  const actualizarListado = async () => {
    const jsListado = await listado('usuario/listado');
    setColumnas(crearArregloColumnas(jsListado));
    setUsuarioListado(jsListado);
    setAccion(0);
  };

  const buscarRegistro = (sIdUsuario) => {
    setSeleccionado(sIdUsuario);
    consultaById('usuario/consultaById/', sIdUsuario).then((jsUsuario) => {
      setUsuario(jsUsuario);
      setAccion(1);
    });
  };

  return (
    <Container fluid>
      <Row>
        <Col xs={10} md={3}>
          <SideBar
            cambiarVentana={cambiarVentana}
            listado={usuarioListado}
            seleccionado={seleccionado}
            buscarRegistro={buscarRegistro}
            columnas={columnas}
            proceso="Usuario"
          />
        </Col>
        <Col xs={12} md={9}>
          <main className="pt-4">
            {accion === 1 && (
              <InfoUsuario usuario={usuario} cambiarVentana={cambiarVentana} />
            )}
            {(accion === 2 || accion === 3) && (
              <FormularioUsuario
                accion={accion}
                usuario={usuario}
                actualizarListado={actualizarListado}
              />
            )}
            {accion === 4 && (
              <CambiarContrasenas
                usuario={usuario}
                actualizarListado={actualizarListado}
              />
            )}
          </main>
        </Col>
      </Row>
    </Container>
  );
};

export default Usuario;
