import React,{useState,useEffect } from 'react'
import { Col,Row,Container } from 'react-bootstrap'
import InfoCurso from './../components/Curso/InfoCurso'
import InfoDetalleCurso from './../components/Curso/InfoDetalleCurso'
import InfoTemaCurso from './../components/Curso/InfoTemaCurso'
import FormularioCurso from './../components/Curso/FormularioCurso'
import FormularioDetalleCurso from './../components/Curso/FormularioDetalleCurso'
import FormularioTemaCurso from './../components/Curso/FormularioTemaCurso'
import SideBar from './../components/Generales/SideBar'
import initialState from './../utils/initialState'
import {listado,consultaById} from './../utils/ConexionAPI'
import {crearArregloColumnas} from './../utils/Tabla'

const Curso = () => {
    const [ accion, setAccion ] = useState(0)
    const [ curso, setCurso ] = useState({...initialState.curso})
    const [ cursoListado,setCursoListado] = useState([])
    const [ seleccionado,setSeleccionado] = useState(0)
    const [ columnas, setColumnas] = useState([])

    const cambiarVentana = (ventana) => {
        if(ventana === 2){
            setCurso({...initialState.curso})
        }
        setAccion(ventana);
    } 
    
    useEffect ( () => {
        if (usuario === null || usuario === undefined || usuario.usuario === "" ) {
            const usuarioSesionT = JSON.parse(sessionStorage.getItem("usuario"));
            if ((usuarioSesionT === null || usuarioSesionT === undefined || usuarioSesionT.usuario === "") && location.pathname !== '/login') {
                history.push('/login');
            }
            agregarUsuario(usuarioSesionT);
        }
        setCurso({...initialState.curso})
        actualizarListado();
    }, [] )

    const actualizarListado = async() => {
        let jsListado = await listado('curso/listado');
        setColumnas(crearArregloColumnas(jsListado));
        setCursoListado(jsListado);
        setAccion(0);
    }

    const buscarRegistro = (sIdCurso) => {
        setSeleccionado(sIdCurso);
        consultaById('curso/consultaById/',sIdCurso)
            .then((jsCurso) => {
                setCurso(jsCurso);
                setAccion(1);
            })
    }

    return(
        <Container fluid>
            <Row>
                <Col xs={10} md={3}>
                    <SideBar 
                        cambiarVentana={cambiarVentana}
                        listado = {cursoListado}
                        seleccionado = {seleccionado}
                        buscarRegistro = {buscarRegistro}
                        columnas = {columnas}
                        proceso = 'Curso'
                        />
                </Col>
                <Col xs={12} md={9} >
                    <main className="pt-4">
                        {(accion ===1) &&
                        <>
                            <Row>
                                <Col>
                                    <InfoCurso
                                        curso = {curso}
                                        cambiarVentana = {cambiarVentana}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col className="mt-3">
                                    <InfoDetalleCurso
                                        curso = {curso}
                                        cambiarVentana = {cambiarVentana}
                                    />
                                </Col>
                                <Col className="mt-3">
                                    <InfoTemaCurso
                                        curso = {curso}
                                        cambiarVentana = {cambiarVentana}
                                    />
                                </Col>
                            </Row>
                        </>
                        }
                        {(accion ===2 || accion ===6) &&
                            <FormularioCurso
                                accion={accion}
                                curso={curso}
                                actualizarListado ={actualizarListado}
                                cambiarVentana = {cambiarVentana}
                                setCurso = {setCurso}
                            />
                        }
                        {(accion ===3 || accion === 7) &&
                            <FormularioDetalleCurso
                                accion={accion}
                                curso={curso}
                                actualizarListado ={actualizarListado}
                                cambiarVentana = {cambiarVentana}
                                setCurso = {setCurso}
                            />
                        }
                        {(accion ===4 || accion === 8) &&
                            <FormularioTemaCurso
                                accion={accion}
                                curso={curso}
                                actualizarListado ={actualizarListado}
                            />
                        }
                    </main> 
                </Col>
            </Row>
            
        </Container>
    )
}

export default Curso