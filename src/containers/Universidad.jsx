import React, { useState, useEffect, useContext, Suspense } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import initialState from './../utils/initialState';
import { listado, consultaById } from './../utils/ConexionAPI';
import { crearArregloColumnas } from './../utils/Tabla';
import AppContext from './../context/AppContext';
import moment from 'moment';
import { useHistory, useLocation, withRouter } from 'react-router-dom';

const InfoUniversidad = React.lazy(() =>
  import('./../components/Universidad/InfoUniversidad')
);
const FormularioUniversidad = React.lazy(() =>
  import('./../components/Universidad/FormularioUniversidad')
);
const SideBar = React.lazy(() => import('./../components/Generales/SideBar'));

const Universidad = () => {
  const [accion, setAccion] = useState(0);
  const [universidad, setUniversidad] = useState({
    ...initialState.universidad,
  });
  const [universidadListado, setUniversidadListado] = useState([]);
  const [seleccionado, setSeleccionado] = useState(0);
  const [columnas, setColumnas] = useState([]);
  const { state, agregarUsuario } = useContext(AppContext);

  const cambiarVentana = (ventana) => {
    if (ventana === 2) {
      setUniversidad({ ...initialState.universidad });
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

    setUniversidad({ ...initialState.universidad });
    actualizarListado();
  }, []);

  const actualizarListado = async () => {
    const jsListado = await listado('universidad/listado');
    setUniversidadListado(jsListado);
    setColumnas(crearArregloColumnas(jsListado));
    setAccion(0);
  };

  const buscarRegistro = (sIdUniversidad) => {
    setSeleccionado(sIdUniversidad);
    consultaById('universidad/consultaById/', sIdUniversidad).then(
      (jsUniversidad) => {
        jsUniversidad.creado = moment(jsUniversidad.creado).format(
          'DD/MM/YYYY hh:mm:ss'
        );
        setUniversidad(jsUniversidad);
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
              listado={universidadListado}
              seleccionado={seleccionado}
              buscarRegistro={buscarRegistro}
              columnas={columnas}
              proceso="Universidad"
            />
          </Suspense>
        </Col>
        <Col xs={12} md={9}>
          <main className="pt-4">
            {accion === 1 && (
              <Suspense fallback={<div>Loading...</div>}>
                <InfoUniversidad
                  universidad={universidad}
                  cambiarVentana={cambiarVentana}
                />
              </Suspense>
            )}
            {(accion === 2 || accion === 3) && (
              <Suspense fallback={<div>Loading...</div>}>
                <FormularioUniversidad
                  accion={accion}
                  universidad={universidad}
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

export default withRouter(Universidad);
