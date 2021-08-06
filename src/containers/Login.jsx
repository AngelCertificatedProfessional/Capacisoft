import React,{useState,useEffect } from 'react'
import { Col,Row,Container } from 'react-bootstrap'
import '../styles/components/SideBar.css'
// import InfoUsuario from '../components/Usuario/InfoUsuario'
// import FormularioUsuario from '../components/Usuario/FormularioUsuario'
// import CambiarContrasenas from '../components/Usuario/CambiarContrasenas'
// import SideBar from '../components/Generales/SideBar'
// import initialState from '../utils/initialState'
// import {listado,consultaById} from '../utils/ConexionAPI'
// import {crearArregloColumnas} from '../utils/Tabla'

const Login = () => {
    // const [ accion, setAccion ] = useState(0)
    // const [ usuario, setUsuario ] = useState({...initialState.usuario})
    // const [ usuarioListado,setUsuarioListado] = useState([])
    // const [ seleccionado,setSeleccionado] = useState(0)
    // const [ columnas, setColumnas] = useState([])

    // const cambiarVentana = (ventana) => {
    //     if(ventana === 2){
    //         setUsuario({...initialState.usuario})
    //     }
    //     setAccion(ventana);
    // } 
    
    // useEffect ( () => {
    //     setUsuario({...initialState.usuario})
    //     actualizarListado();
    // }, [] )

    // const actualizarListado = async() => {
    //     const jsListado = await listado('usuario/listado');
    //     setColumnas(crearArregloColumnas(jsListado));
    //     setUsuarioListado(jsListado);
    //     setAccion(0);
    // }

    // const buscarRegistro = (sIdUsuario) => {
    //     setSeleccionado(sIdUsuario);
    //     consultaById('usuario/consultaById/',sIdUsuario)
    //         .then((jsUsuario) => {
    //             setUsuario(jsUsuario);
    //             setAccion(1);
    //         })
    // }

    return(
        <main className="fondo">
            <Container fluid>
            <Row >
            </Row>        
            </Container>
        </main>
    )
}

export default Login