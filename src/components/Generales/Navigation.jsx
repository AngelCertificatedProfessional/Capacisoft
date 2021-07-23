import React, {Component} from 'react' 
import { Navbar,Nav,NavDropdown,Image } from 'react-bootstrap'
// import logo from '../images/hemolife.png'
import { Link } from 'react-router-dom'

//const Navigation = ( expedienteActivo, admisionActivo ) => {
class Navigation extends Component {
    render() {
        return(
            <Navbar bg="dark" variant="dark" sticky="top" expand="lg">
                {/* <Navbar.Brand as={Link} to="/">
                    <img src={logo} width="150" height="30" alt="Hemolife"/>
                </Navbar.Brand> */}
                <Navbar.Brand as={Link} to="/">
                    Capacisoft
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                    <Nav className="me-auto">
                        <NavDropdown title="Catalogos" id="collasible-nav-dropdown">  
                            <NavDropdown.Item as={Link} to="#action/1.1">Usuarios</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/universidad">Universidades</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/carerra">Carreras</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="#action/1.4">Alumnos</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="#action/1.5">Proveedores</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="#action/1.6">Tema de Curso</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="#action/1.5">Nombre del Curso</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="#action/1.6">Periodo</NavDropdown.Item>
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
                        <Nav.Link >Usuario</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            
        )
    }
}

export default Navigation