import React,{useState,useEffect,useContext } from 'react'
import { Col,Row,Container } from 'react-bootstrap'
import InfoCarrera from './../components/Carrera/InfoCarrera'
import FormularioCarrera from './../components/Carrera/FormularioCarrera'
import SideBar from './../components/Generales/SideBar'
import initialState from './../utils/initialState'
import {listado,consultaById} from './../utils/ConexionAPI'
import {crearArregloColumnas} from './../utils/Tabla'
import { useHistory,useLocation,withRouter } from "react-router-dom";

const Carrera = () => {
    const [ accion, setAccion ] = useState(0)
    const [ carrera, setCarrera ] = useState({...initialState.carerra})
    const [ carreraListado,setCarreraListado] = useState([])
    const [ seleccionado,setSeleccionado] = useState(0)
    const [ columnas, setColumnas] = useState([])
    const { state, agregarUsuario } = useContext(AppContext);


    const cambiarVentana = (ventana) => {
        if(ventana === 2){
            setCarrera({...initialState.carerra})
        }
        setAccion(ventana);
    } 

    let history = useHistory();
    const location = useLocation()

    useEffect ( () => {
        const { usuario } = state; 
        if (usuario === null || usuario === undefined || usuario.usuario === "" ) {
            const usuarioSesionT = JSON.parse(sessionStorage.getItem("usuario"));
            if ((usuarioSesionT === null || usuarioSesionT === undefined || usuarioSesionT.usuario === "") && location.pathname !== '/login') {
                history.push('/login');
            }
            agregarUsuario(usuarioSesionT);
        }

        setCarrera({...initialState.carerra})
        actualizarListado();
    }, [] )

    const actualizarListado = async() => {
        const jsListado = await listado('carrera/listado');
        setCarreraListado(jsListado);
        setColumnas(crearArregloColumnas(jsListado));
        setAccion(0);
    }

    const buscarRegistro = (sIdCarrera) => {
        setSeleccionado(sIdCarrera);
        consultaById('carrera/consultaById/',sIdCarrera)
            .then((jsCarrera) => {
                setCarrera(jsCarrera);
                setAccion(1);
            })
    }

    return(
        <Container fluid>
            <Row>
                <Col xs={10} md={3}>
                    <SideBar 
                        cambiarVentana={cambiarVentana}
                        listado = {carreraListado}
                        seleccionado = {seleccionado}
                        buscarRegistro = {buscarRegistro}
                        columnas = {columnas}
                        proceso = 'Carrera'
                        />
                </Col>
                <Col xs={12} md={9}>
                    <main className="pt-4">
                        {(accion ===1) &&
                            <InfoCarrera
                                carrera = {carrera}
                                cambiarVentana = {cambiarVentana}
                            />
                        }
                        {(accion ===2 || accion ===3) &&
                            <FormularioCarrera
                                accion={accion}
                                carrera={carrera}
                                actualizarListado ={actualizarListado}
                                seleccionado = {seleccionado}
                            />
                        }
                    </main>
                </Col>
            </Row>
            
        </Container>
    )
}

export default withRouter(Carrera)