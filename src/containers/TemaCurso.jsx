import React,{useState,useEffect } from 'react'
import { Col,Row,Container } from 'react-bootstrap'
import InfoTemaCurso from '../components/TemaCurso/InfoTemaCurso'
import FormularioTemaCurso from '../components/TemaCurso/FormularioTemaCurso'
import SideBar from '../components/Generales/SideBar'
import initialState from '../utils/initialState'
import {listado,consultaById} from '../utils/ConexionAPI'
import {crearArregloColumnas} from '../utils/Tabla'

const TemaCurso = () => {
    const [ accion, setAccion ] = useState(0)
    const [ temaCurso, setTemaCurso ] = useState({...initialState.temaCurso})
    const [ temaCursoListado,setTemaCursoListado] = useState([])
    const [ seleccionado,setSeleccionado] = useState(0)
    const [ columnas, setColumnas] = useState([])

    const cambiarVentana = (ventana) => {
        if(ventana === 2){
            setTemaCurso({...initialState.temaCurso})
        }
        setAccion(ventana);
    } 
    
    useEffect ( () => {
        setTemaCurso({...initialState.temaCurso})
        actualizarListado();
    }, [] )

    const actualizarListado = async() => {
        const jsListado = await listado('temaCurso/listado');
        setTemaCursoListado(jsListado);
        setColumnas(crearArregloColumnas(jsListado));
        setAccion(0);
    }

    const buscarRegistro = (sIdTemaCurso) => {
        setSeleccionado(sIdTemaCurso);
        consultaById('temaCurso/consultaById/',sIdTemaCurso)
            .then((jsTemaCurso) => {
                setTemaCurso(jsTemaCurso);
                setAccion(1);
            })
    }

    return(
        <Container fluid>
            <Row>
                <Col xs={10} md={3}>
                    <SideBar 
                        cambiarVentana={cambiarVentana}
                        listado = {temaCursoListado}
                        seleccionado = {seleccionado}
                        buscarRegistro = {buscarRegistro}
                        columnas = {columnas}
                        proceso = 'Tema Curso'
                        />
                </Col>
                <Col xs={12} md={9}>
                    <main className="pt-4">
                        
                        {(accion ===1) &&
                            <InfoTemaCurso
                                temaCurso = {temaCurso}
                                cambiarVentana = {cambiarVentana}
                            />
                        }
                        {(accion ===2 || accion ===3) &&
                            <FormularioTemaCurso 
                                accion={accion}
                                temaCurso={temaCurso}
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

export default TemaCurso