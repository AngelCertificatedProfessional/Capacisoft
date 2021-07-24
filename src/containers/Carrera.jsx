import React,{useState,useEffect } from 'react'
import { Col,Row,Container } from 'react-bootstrap'
import InfoUniversidad from '../components/Universidad/InfoUniversidad'
import FormularioUniversidad from '../components/Universidad/FormularioUniversidad'
import SideBar from '../components/Generales/SideBar'
import initialState from '../utils/initialState'
import {listado,consultaById} from '../utils/ConexionAPI'
import {crearArregloColumnas} from '../utils/Tabla'

const Carrera = () => {
    const [ accion, setAccion ] = useState(0)
    // const [ universidad, setUniversidad ] = useState(initialState.universidad)
    const [ carreraListado,setCarreraListado] = useState([{}])
    const [ seleccionado,setSeleccionado] = useState(0)
    const [ columnas, setColumnas] = useState([])

    const cambiarVentana = (ventana) => {
        if(ventana === 2){
            // setUniversidad(initialState.universidad);
        }
        setAccion(ventana);
    } 
    
    // useEffect ( () => {
    //     setUniversidad(initialState.universidad);
    //     listado('universidad/listado')
    //         .then((jsListado) => {
    //             setUniversidadListado(jsListado)
    //             setColumnas(crearArregloColumnas(jsListado));
    //         });
    // }, [] )

    // const actualizarListado = () => {
    //     listado('universidad/listado')
    //         .then((jsListado) => setUniversidadListado(jsListado));
    //     setAccion(0);
    // }

    const buscarRegistro = (sIdCarrera) => {
        setSeleccionado(sIdCarrera);
        // consultaById('universidad/consultaById/',sIdUniversidad)
        //     .then((jsUniversidad) => {
        //         setUniversidad(jsUniversidad);
        //         setAccion(1);
        //     })
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
                {/* <Col xs={12} md={9}>
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
                </Col> */}
            </Row>
            
        </Container>
    )
}

export default Carrera