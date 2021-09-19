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
const ReporteGastos = () => {
    const { state, agregarUsuario } = useContext(AppContext);
    const [periodoListadoGastos, setPeriodoListadoGastos] = useState([]);
    const [listadoColumnas, setListadoColumnas] = useState([]);
    const [periodoListado, setPeriodoListado] = useState([]);
    const [seleccionado, setSeleccionado] = useState(0);
    const [columnas, setColumnas] = useState([]);
    const [backgroundColor, setBackgroundColor] = useState([])
    const [borderColor, setBorderColor] = useState([])

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

  const seleccionarRegistro = async (sIdPeriodo) => {
    setSeleccionado(sIdPeriodo);
    const jsListado = await consultaById('programarCurso/listadoGastosByPeriodo/',sIdPeriodo);
    if(jsListado.length > 0){
        setPeriodoListadoGastos(jsListado.map((periodoX) => periodoX.total));
        setListadoColumnas(jsListado.map((periodoX) => periodoX._id))
        setBackgroundColor(jsListado.map((periodoX) => {
            if(periodoX.total <= 500){
                return 'rgba(15, 151, 9, 0.2)'
            }else if(periodoX.total > 500 && periodoX.total <= 1000){
                return 'rgba(255, 206, 86, 0.2)'
            }else if(periodoX.total > 1000){
                return 'rgba(243, 36, 3, 0.2)'
            }
        }))
        setBorderColor(jsListado.map((periodoX) => {
            if(periodoX.total <= 500){
                return 'rgba(15, 151, 9, 0.2)'
            }else if(periodoX.total > 500 && periodoX.total <= 1000){
                return 'rgba(255, 206, 86, 0.2)'
            }else if(periodoX.total > 1000){
                return 'rgba(243, 36, 3, 0.2)'
            }
        }))
        }else{
            setPeriodoListadoGastos([]);
            setListadoColumnas([]);
            setBackgroundColor([]);
            setBorderColor([]);
        }
  };

  return (
    <Container fluid>
      <Row>
        <Col xs={12} md={9}>
          <main className="pt-4">
              <>
                <Row>
                  <h1> Reporte de Gastos</h1>
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
                <Row>
                  <Col xs>
                    {periodoListadoGastos.length > 0 ? (
                      <Suspense fallback={<div>Loading...</div>}>
                        <BarChart
                          periodoLisJSON = {periodoListadoGastos}
                          listadoColumnas = {listadoColumnas}
                          backgroundColor = {backgroundColor}
                          borderColor = {borderColor}
                          titulo = 'Gastos por mes del periodo'
                        />
                      </Suspense>
                    ) : (
                      <h3> No se encontro informacion en este periodo</h3>
                    )}
                    
                  </Col>
                </Row>
              </>
          </main>
        </Col>
      </Row>
    </Container>
  );
};

export default withRouter(ReporteGastos);
