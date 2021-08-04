import React,{useState,useEffect } from 'react'
import { Col,Row,Container } from 'react-bootstrap'

import InfoPeriodo from '../components/Periodo/InfoPeriodo'
import FormularioPeriodo from '../components/Periodo/FormularioPeriodo'
import SideBar from '../components/Generales/SideBar'
import initialState from '../utils/initialState'
import {listado,consultaById} from '../utils/ConexionAPI'
import {crearArregloColumnas} from '../utils/Tabla'
import Tabla from '../components/Generales/Tabla'
import moment from 'moment';

const Periodo = () => {
    const [ accion, setAccion ] = useState(0)
    const [ periodo, setPeriodo] = useState({...initialState.periodo})
    const [ alumnoListado, setAlumnoListado] = useState([])
    const [ periodoListado,setPeriodoListado] = useState([])
    const [ seleccionado,setSeleccionado] = useState(0)
    const [ columnas, setColumnas] = useState([])
    const [ columnasAlumno, setColumnasAlumno] = useState([])
    const [ seleccionadoAlumno,setSeleccionadoAlumno] = useState(0)

    const cambiarVentana = (ventana) => {
        if(ventana === 2){
            setPeriodo({...initialState.periodo})
        }
        setAccion(ventana);
    } 
    
    useEffect ( () => {
        setPeriodo({...initialState.periodo})
        actualizarListado();
    }, [] )

    const actualizarListado = async() => {
        const jsListado = await listado('periodo/listado');
        setPeriodoListado(jsListado);
        setColumnas(crearArregloColumnas(jsListado));
        setAccion(0);
    }

    const buscarRegistro = (sIdPeriodo) => {
        setSeleccionado(sIdPeriodo);
        consultaById('periodo/consultaById/',sIdPeriodo)
            .then((periodo) => {
                periodo.fechaInicio = moment(periodo.fechaInicio).format('YYYY-MM-DD');
                periodo.fechaFinal = moment(periodo.fechaFinal).format('YYYY-MM-DD');
                setColumnasAlumno(crearArregloColumnas(periodo.alumnos))
                setAlumnoListado(periodo.alumnos);
                setPeriodo(periodo);
                setAccion(1);
            })
    }

    const seleccionarRegistroFinal = (sIdAlumno) => {
        setSeleccionadoAlumno(sIdAlumno);
        //este metodo solo existe para que no truene el proceso de la tabla
    }

    return(
        <Container fluid>
            <Row>
                <Col xs={10} md={3}>
                    <SideBar 
                        cambiarVentana={cambiarVentana}
                        listado = {periodoListado}
                        seleccionado = {seleccionado}
                        buscarRegistro = {buscarRegistro}
                        columnas = {columnas}
                        proceso = 'Periodo'
                        />
                </Col>
                <Col xs={12} md={9}>
                    <main className="pt-4">
                        
                        {(accion ===1) &&
                            <>
                                <Row>
                                    <Col>
                                        <InfoPeriodo
                                            periodo = {periodo}
                                            cambiarVentana = {cambiarVentana}
                                        />
                                    </Col>
                                </Row>   
                                <Row className="mt-3">
                                    <Col>
                                        <Tabla
                                            listado = {alumnoListado}
                                            seleccionado = {seleccionadoAlumno}
                                            buscarRegistro = {seleccionarRegistroFinal}
                                            columnas = {columnasAlumno}
                                            proceso = 'Alumno'
                                        />
                                    </Col> 
                                </Row> 
                            </>
                        }



                        {(accion ===2 || accion ===3) &&
                            <FormularioPeriodo
                                accion={accion}
                                periodo={periodo}
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

export default Periodo