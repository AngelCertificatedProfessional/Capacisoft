import React,{useState,useEffect,useContext } from 'react'
import { Col,Row,Container } from 'react-bootstrap'
import InfoAlumno from './../components/Alumno/InfoAlumno'
import InfoContacto from './../components/Alumno/InfoContacto'
import InfoAcademico from './../components/Alumno/InfoAcademico'
import FormularioAlumno from './../components/Alumno/FormularioAlumno'
import FormularioInfoAcademico from './../components/Alumno/FormularioInfoAcademico'
import FormularioContacto from './../components/Alumno/FormularioContacto'
import SideBar from './../components/Generales/SideBar'
import initialState from './../utils/initialState'
import {listado,consultaById} from './../utils/ConexionAPI'
import {crearArregloColumnas} from './../utils/Tabla'
import AppContext from './../context/AppContext';
import { useHistory,useLocation,withRouter } from "react-router-dom";

const Alumnos = () => {
    const [ accion, setAccion ] = useState(0)
    const [ alumno, setAlumno ] = useState({...initialState.alumno})
    const [ alumnoListado,setAlumnoListado] = useState([])
    const [ seleccionado,setSeleccionado] = useState(0)
    const [ columnas, setColumnas] = useState([])
    const [ universidadListado,setUniversidadListado] = useState([])
    const [ carreraListado,setCarreraListado] = useState([])
    const { state, agregarUsuario } = useContext(AppContext);

    const cambiarVentana = (ventana) => {
        if(ventana === 2){
            setAlumno({...initialState.alumno})
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

        setAlumno({...initialState.alumno})
        actualizarListado();
    }, [] )

    const actualizarListado = async() => {
        let jsListado = await listado('alumno/listado');
        setColumnas(crearArregloColumnas(jsListado));
        setAlumnoListado(jsListado);
        setAccion(0);

        jsListado = await listado('universidad/listado');
        setUniversidadListado(jsListado);

        jsListado = await listado('carrera/listado');
        setCarreraListado(jsListado);

    }

    const buscarRegistro = (sIdAlumno) => {
        setSeleccionado(sIdAlumno);
        consultaById('alumno/consultaById/',sIdAlumno)
            .then((jsAlumno) => {
                setAlumno(jsAlumno);
                setAccion(1);
            })
    }

    return(
        <Container fluid>
            <Row>
                <Col xs={10} md={3}>
                    <SideBar 
                        cambiarVentana={cambiarVentana}
                        listado = {alumnoListado}
                        seleccionado = {seleccionado}
                        buscarRegistro = {buscarRegistro}
                        columnas = {columnas}
                        proceso = 'Alumno'
                        />
                </Col>
                <Col xs={12} md={9} >
                    <main className="pt-4">
                        {(accion ===1) &&
                        <>
                            <Row>
                                <Col>
                                    <InfoAlumno
                                        alumno = {alumno}
                                        cambiarVentana = {cambiarVentana}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col className="mt-3">
                                    <InfoAcademico
                                        alumno = {alumno}
                                        cambiarVentana = {cambiarVentana}
                                    />
                                </Col>
                                <Col className="mt-3">
                                    <InfoContacto
                                        alumno = {alumno}
                                        cambiarVentana = {cambiarVentana}
                                    />
                                </Col>
                            </Row>
                        </>
                        }
                        {(accion ===2 || accion ===6) &&
                            <FormularioAlumno
                                accion={accion}
                                alumno={alumno}
                                actualizarListado ={actualizarListado}
                                cambiarVentana = {cambiarVentana}
                                setAlumno = {setAlumno}
                            />
                        }
                        {(accion ===3 || accion === 7) &&
                            <FormularioInfoAcademico
                                accion={accion}
                                alumno={alumno}
                                actualizarListado ={actualizarListado}
                                cambiarVentana = {cambiarVentana}
                                universidadListado = {universidadListado}
                                carreraListado = {carreraListado}
                                setAlumno = {setAlumno}
                            />
                        }
                        {(accion ===4 || accion === 8) &&
                            <FormularioContacto
                                accion={accion}
                                alumno={alumno}
                                actualizarListado ={actualizarListado}
                            />
                        }
                    </main> 
                </Col>
            </Row>
            
        </Container>
    )
}

export default withRouter(Alumnos)