import React,{useState,useEffect,useContext } from 'react'
import { Col,Row,Container } from 'react-bootstrap'
import '../styles/components/SideBar.css'
import AppContext from '../context/AppContext';
import LoginFormulario from '../components/Usuario/LoginFormulario'
import initialState from '../utils/initialState'
import { useHistory } from "react-router-dom";

const Login = () => {
    let history = useHistory();
    const { state, agregarUsuario } = useContext(AppContext);
    const [ usuarioTemp, setUsuario ] = useState({...initialState.usuario})
    let { usuario } = state; 
    useEffect (() => {
        if (usuario !== null && usuario !== undefined && usuario.usuario !== "" ) {
            ingresarSesion(usuario);
        }
        const usuarioSesionT = JSON.parse(sessionStorage.getItem("usuario"));
        if (usuarioSesionT !== null && usuarioSesionT !== undefined && usuarioSesionT.usuario !== "" ) {
            ingresarSesion(usuario);s
        }
    }, [] )

    const ingresarSesion = async(jsonUsuario) => {
        agregarUsuario(jsonUsuario)
        sessionStorage.setItem('usuario',JSON.stringify(jsonUsuario));
        history.push('/');
    }

    return(
        <main className="fondo">
            <Container fluid>
            <Row>
                <Col>

                </Col>
                <Col className="login__formulario">
                    <main className="mt-5 login">
                        <LoginFormulario
                            usuario = {usuarioTemp}
                            ingresarSesion = {ingresarSesion}
                        />
                    </main>
                </Col>
            </Row>        
            </Container>
        </main>
    )
}

export default Login