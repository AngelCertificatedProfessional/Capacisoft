import React, { useState, useEffect, useContext, Suspense } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import initialState from './../utils/initialState';
import { listado, consultaById } from './../utils/ConexionAPI';
import { crearArregloColumnas } from './../utils/Tabla';
import AppContext from './../context/AppContext';
import { useHistory, useLocation, withRouter } from 'react-router-dom';
const InfoCarrera = React.lazy(() =>
  import('./../components/Carrera/InfoCarrera')
);
const FormularioCarrera = React.lazy(() =>
  import('./../components/Carrera/FormularioCarrera')
);
const SideBar = React.lazy(() => import('./../components/Generales/SideBar'));
import moment from 'moment';

const Carrera = () => {
  const [accion, setAccion] = useState(0);
  const [carrera, setCarrera] = useState({ ...initialState.carerra });
  const [carreraListado, setCarreraListado] = useState([]);
  const [seleccionado, setSeleccionado] = useState(0);
  const [columnas, setColumnas] = useState([]);
  const { state, agregarUsuario } = useContext(AppContext);

  const cambiarVentana = (ventana) => {
    if (ventana === 2) {
      setCarrera({ ...initialState.carerra });
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

    setCarrera({ ...initialState.carerra });
    actualizarListado();
  }, []);

  const actualizarListado = async () => {
    const jsListado = await listado('carrera/listado');
    setCarreraListado(jsListado);
    setColumnas(crearArregloColumnas(jsListado));
    setAccion(0);
  };

  const buscarRegistro = (sIdCarrera) => {
    setSeleccionado(sIdCarrera);
    consultaById('carrera/consultaById/', sIdCarrera).then((jsCarrera) => {
      jsCarrera.creado = moment(jsCarrera.creado).format('DD/MM/YYYY hh:mm:ss');
      setCarrera(jsCarrera);
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
              listado={carreraListado}
              seleccionado={seleccionado}
              buscarRegistro={buscarRegistro}
              columnas={columnas}
              proceso="Carrera"
            />
          </Suspense>
        </Col>
        <Col xs={12} md={9}>
          <main className="pt-4">
            {accion === 1 && (
              <Suspense fallback={<div>Loading...</div>}>
                <InfoCarrera
                  carrera={carrera}
                  cambiarVentana={cambiarVentana}
                />
              </Suspense>
            )}
            {(accion === 2 || accion === 3) && (
              <Suspense fallback={<div>Loading...</div>}>
                <FormularioCarrera
                  accion={accion}
                  carrera={carrera}
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

export default withRouter(Carrera);
