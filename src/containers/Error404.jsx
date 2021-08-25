import React, { useEffect, useContext } from 'react';
import AppContext from '../context/AppContext';
import { useHistory, useLocation, withRouter } from 'react-router-dom';
import {b64_to_utf8} from './../utils/UtileriasPagina';

const FatalError = () => {
  const { state, agregarUsuario } = useContext(AppContext);
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
  }, []);

  return (
    <div className="text-center">
      <h1 className="Error_Text">
        Error: 404 No se encontro la pagina solictada
      </h1>
      {/* <img src={FatalErrorImg} alt="500 Unexpected Error" className="Error_Image" /> */}
    </div>
  );
};

export default withRouter(FatalError);
