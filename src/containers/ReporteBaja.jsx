import React, { useState, useEffect, useContext, Suspense } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import { crearArregloColumnas } from './../utils/Tabla';
import Tabla from './../components/Generales/Tabla';
// import initialState from './../utils/initialState';
import { listado, consultaById } from './../utils/ConexionAPI';
// import { crearArregloColumnas } from './../utils/Tabla';
import AppContext from './../context/AppContext';
import {b64_to_utf8} from './../utils/UtileriasPagina';
import { useHistory, useLocation, withRouter } from 'react-router-dom';
// import moment from 'moment';
const BarChart = React.lazy(() =>
  import('./../components/Reportes/BarChart')
);
const ReporteBaja = () => {
    const { state, agregarUsuario } = useContext(AppContext);
    const [periodoListadoBaja, setPeriodoListadoBaja] = useState([]);
    const [listadoColumnas, setListadoColumnas] = useState([]);
    const [periodoListado, setPeriodoListado] = useState([]);
    const [seleccionado, setSeleccionado] = useState(0);
    const [columnas, setColumnas] = useState([]);
//   const [alumno, setAlumno] = useState({ ...initialState.alumno });

//   const cambiarVentana = (ventana) => {
//     if (ventana === 2) {
//       setAlumno({ ...initialState.alumno });
//     }
//   };

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
    actualizarListado();
  }, []);

  const actualizarListado = async () => {
    const jsListado = await listado('periodo/listado');
    setPeriodoListado(jsListado);
    setColumnas(crearArregloColumnas(jsListado));
  };

  const seleccionarRegistro = async (sIdAlumno) => {
    setSeleccionado(sIdAlumno);
    const jsListado = await listado('periodo/listadoBajasByPeriodo');
    if(jsListado.length > 0){
      setPeriodoListadoBaja(jsListado.map((periodoX) => periodoX.alumnos));
      setListadoColumnas(jsListado.map((periodoX) => periodoX._id))
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col xs={12} md={9}>
          <main className="pt-4">
              <>
                <Row>
                  <Col>
                    <Suspense fallback={<div>Loading...</div>}>
                      <BarChart
                        periodoLisJSON = {periodoListadoBaja}
                        listadoColumnas = {listadoColumnas}
                      />
                    </Suspense>
                  </Col>
                </Row>
                <Row>
                  <Tabla
                    listado={periodoListado}
                    seleccionado={seleccionado}
                    buscarRegistro={seleccionarRegistro}
                    columnas={columnas}
                    proceso="Periodo"
                  />
                </Row>
              </>
          </main>
        </Col>
      </Row>
    </Container>
  );
};

export default withRouter(ReporteBaja);
