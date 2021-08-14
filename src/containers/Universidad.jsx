import React,{useState,useEffect,useContext } from 'react'
import { Col,Row,Container } from 'react-bootstrap'
import InfoUniversidad from './../components/Universidad/InfoUniversidad'
import FormularioUniversidad from './../components/Universidad/FormularioUniversidad'
import SideBar from './../components/Generales/SideBar'
import initialState from './../utils/initialState'
import {listado,consultaById} from './../utils/ConexionAPI'
import {crearArregloColumnas} from './../utils/Tabla'
import AppContext from './../context/AppContext';
import { useHistory,useLocation,withRouter } from "react-router-dom";

const Universidad = () => {
    const [ accion, setAccion ] = useState(0);
    const [ universidad, setUniversidad ] = useState({...initialState.universidad});
    const [ universidadListado,setUniversidadListado] = useState([]);
    const [ seleccionado,setSeleccionado] = useState(0);
    const [ columnas, setColumnas] = useState([]);
    const { state, agregarUsuario } = useContext(AppContext);

    const cambiarVentana = (ventana) => {
        if(ventana === 2){
            setUniversidad({...initialState.universidad})
        }
        setAccion(ventana);
    } 

    let history = useHistory();
    const location = useLocation();
    useEffect ( () => {
        const { usuario } = state; 


        if (usuario === null || usuario === undefined || usuario.usuario === "" ) {
            const usuarioSesionT = JSON.parse(sessionStorage.getItem("usuario"));
            if ((usuarioSesionT === null || usuarioSesionT === undefined || usuarioSesionT.usuario === "") && location.pathname !== '/login') {
                history.push('/login');
            }
            agregarUsuario(usuarioSesionT);
        }

        setUniversidad({...initialState.universidad})
        actualizarListado();
    }, [] )

    const actualizarListado = async() => {
        const jsListado = await listado('universidad/listado');
        setUniversidadListado(jsListado);
        setColumnas(crearArregloColumnas(jsListado));
        setAccion(0);
    }

    const buscarRegistro = (sIdUniversidad) => {
        setSeleccionado(sIdUniversidad);
        consultaById('universidad/consultaById/',sIdUniversidad)
            .then((jsUniversidad) => {
                setUniversidad(jsUniversidad);
                setAccion(1);
            })
    }

    return(
        <Container fluid>
            <Row>
                <Col xs={10} md={3}>
                    <SideBar 
                        cambiarVentana={cambiarVentana}
                        listado = {universidadListado}
                        seleccionado = {seleccionado}
                        buscarRegistro = {buscarRegistro}
                        columnas = {columnas}
                        proceso = 'Universidad'
                        />
                </Col>
                <Col xs={12} md={9}>
                    <main className="pt-4">
                        
                        {(accion ===1) &&
                            <InfoUniversidad
                                universidad = {universidad}
                                cambiarVentana = {cambiarVentana}
                            />
                        }
                        {(accion ===2 || accion ===3) &&
                            <FormularioUniversidad 
                                accion={accion}
                                universidad={universidad}
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

export default withRouter(Universidad)