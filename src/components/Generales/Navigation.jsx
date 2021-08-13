import React, {useEffect,useContext,useState} from 'react' 
import { Navbar,Nav,NavDropdown,Image } from 'react-bootstrap'
// import logo from '../images/hemolife.png'
import { Link } from 'react-router-dom'
import AppContext from '../../context/AppContext';
import initialState from '../../utils/initialState'
import { useHistory,useLocation,withRouter,Redirect } from "react-router-dom";


const Navigation = () => {
    const { state, agregarUsuario } = useContext(AppContext);
    let history = useHistory();
    const { usuario } = state; 
    const location = useLocation()
    useEffect (() => {
        if (usuario === null || usuario === undefined || usuario.usuario === "" ) {
            const usuarioSesionT = JSON.parse(sessionStorage.getItem("usuario"));
            if ((usuarioSesionT === null || usuarioSesionT === undefined || usuarioSesionT.usuario === "") && location.pathname !== '/login') {
               
                console.log("entre" + location.pathname);
                //history.push('/login');
                // window.location.href = window.location.href;
            }
            agregarUsuario(usuarioSesionT);
        }
    },[])


    const cambiarVentana =()=> {
        agregarUsuario({...initialState.usuario});
        sessionStorage.setItem('usuario',JSON.stringify({...initialState.usuario}));
        history.push('/login');
    }

    const opcionNavBar = () => {
        if(usuario === null || usuario === undefined || usuario.usuario === ""){
            return;
        }else{
            return (
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Catalogos" id="collasible-nav-dropdown">  
                            <NavDropdown.Item as={Link} to="/usuario">Usuarios</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/universidad">Universidades</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/carerra">Carreras</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/alumno">Alumnos</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/temaCurso">Tema de Curso</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/curso">Curso</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/periodo">Periodo</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Procesos" id="collasible-nav-dropdown">  
                            <NavDropdown.Item as={Link} to="#action/3.1">Ver perfil</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="#action/3.2">Ajustes</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="#action/3.4">Cerrar sesion</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Reportes" id="collasible-nav-dropdown" >  
                            <NavDropdown.Item as={Link} to="#action/3.1">Ver perfil</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="#action/3.2">Ajustes</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="#action/3.4">Cerrar sesion</NavDropdown.Item>
                        </NavDropdown>
                        
                    </Nav>
                    <Nav className="ml-auto">
                        <Nav.Link onClick={() =>cambiarVentana()}>Cerrar Sesion</Nav.Link>
                    </Nav>
                    
                </Navbar.Collapse>
            )
        }
        
    }


    return(
        <Navbar bg="dark" variant="dark" sticky="top" expand="lg">
            {/* <Navbar.Brand as={Link} to="/">
                <img src={logo} width="150" height="30" alt="Hemolife"/>
            </Navbar.Brand> */}
            <Navbar.Brand as={Link} to="/">
                Capacisoft
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            {opcionNavBar()}
            
        </Navbar>
    )
}

export default withRouter(Navigation)