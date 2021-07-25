import React,{useState,useEffect } from 'react'
import { Col,Row,Container } from 'react-bootstrap'
import InfoCarrera from '../components/Carrera/InfoCarrera'
import FormularioCarrera from '../components/Carrera/FormularioCarrera'
import SideBar from '../components/Generales/SideBar'
import initialState from '../utils/initialState'
import {listado,consultaById} from '../utils/ConexionAPI'
import {crearArregloColumnas} from '../utils/Tabla'

const Carrera = () => {
    const [ accion, setAccion ] = useState(0)
    const [ carrera, setCarrera ] = useState(initialState.carerra)
    const [ carreraListado,setCarreraListado] = useState([{}])
    const [ seleccionado,setSeleccionado] = useState(0)
    const [ columnas, setColumnas] = useState([])

    const cambiarVentana = (ventana) => {
        if(ventana === 2){
            setCarrera(initialState.carrera);
        }
        setAccion(ventana);
    } 
    
    useEffect ( () => {
        setCarrera(initialState.carrera);
        actualizarListado();
    }, [] )

    const actualizarListado = () => {
        listado('carrera/listado')
            .then((jsListado) => {
                setCarreraListado(jsListado)
                setColumnas(crearArregloColumnas(jsListado));
            });
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

export default Carrera