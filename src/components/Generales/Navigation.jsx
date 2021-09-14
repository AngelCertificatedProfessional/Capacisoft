import React, { useEffect, useContext } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
// import logo from '../images/hemolife.png'
import { Link } from 'react-router-dom';
import AppContext from './../../context/AppContext';
import initialState from './../../utils/initialState';
import {b64_to_utf8,utf8_to_b64} from './../../utils/UtileriasPagina';
import { useHistory, useLocation, withRouter } from 'react-router-dom';

const Navigation = () => {
  const { state, agregarUsuario } = useContext(AppContext);
  let history = useHistory();
  const { usuario } = state;
  const location = useLocation();
  useEffect(() => {
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
  }, []);

  const cerrarSesion = () => {
    agregarUsuario({ ...initialState.usuario });
    sessionStorage.setItem(
      'usuario',
      utf8_to_b64(JSON.stringify({ ...initialState.usuario }))
    );
    history.push('/login');
  };

  const opcionNavBar = () => {
    if (usuario === null || usuario === undefined || usuario.usuario === '') {
      return;
    } else {
      return (
        <>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Catalogos" id="collasible-nav-dropdown">
                <NavDropdown.Item as={Link} to="/usuario">
                  Usuarios
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/universidad">
                  Universidades
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/carrera">
                  Carreras
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/alumno">
                  Alumnos
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/temaCurso">
                  Tema de Curso
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/curso">
                  Curso
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/periodo">
                  Periodo
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Procesos" id="collasible-nav-dropdown">
                <NavDropdown.Item as={Link} to="/programarCurso">
                  Programar Curso
                </NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Reportes" id="collasible-nav-dropdown">
                <NavDropdown.Item as={Link} to="/reporteBaja">
                  Bajas
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/actualizacion">
                  Actualizaciones
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav className="ml-auto">
              <Nav.Link onClick={() => cerrarSesion()}>Cerrar Sesión</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </>
      );
    }
  };

  return (
    <Navbar bg="dark" variant="dark" sticky="top" expand="lg">
      {/* <Navbar.Brand as={Link} to="/">
                <img src={logo} width="150" height="30" alt="Hemolife"/>
            </Navbar.Brand> */}
      {usuario === null || usuario === undefined || usuario.usuario === '' ? (
        <Navbar.Brand as={Link} to="/login">
          Capacisoft
        </Navbar.Brand>
      ) : (
        <Navbar.Brand as={Link} to="/">
          Capacisoft
        </Navbar.Brand>
      )}
      {opcionNavBar()}
    </Navbar>
  );
};

export default withRouter(Navigation);
