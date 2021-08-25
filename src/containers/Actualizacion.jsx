import React, { useState, useEffect, useContext, Suspense } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import { listado } from './../utils/ConexionAPI';
import AppContext from './../context/AppContext';
import {b64_to_utf8} from './../utils/UtileriasPagina';
import { useHistory, useLocation, withRouter } from 'react-router-dom';
const InfoUltimoCambio = React.lazy(() =>
  import('./../components/UltimosCambios/InfoUltimoCambio')
);

const Actualizacion = () => {
    const [actualizacionListado, setActualizacionListado] = useState([]);
    const { state, agregarUsuario } = useContext(AppContext);

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
    let jsListado = await listado('actualizacion/listado');
    setActualizacionListado(jsListado);
  };

  return (
    <Container fluid>
      <Row>
        <Col>
            <main>
                <h3 className="mt-5 text-dark text-center">Actualizaciones</h3>
                <Suspense fallback={<div>Loading...</div>}>
                    {actualizacionListado.map((consultaActualizacionTemp) => (
                        <InfoUltimoCambio
                            ultimoCambio={consultaActualizacionTemp}
                        />
                    ))}
                </Suspense>
            </main>
        </Col>
      </Row>
    </Container>
  );
};

export default withRouter(Actualizacion);
