import React,{useState,useEffect} from 'react';
import { Form,Button,Col,Row,Pagination } from 'react-bootstrap'
import { Formik } from 'formik';
import * as yup from 'yup';
import {agregar,actualizar,listado} from '../../utils/ConexionAPI'
import swal from 'sweetalert';
import moment from 'moment';
import {crearArregloColumnas} from '../../utils/Tabla'
import Tabla from '../../components/Generales/Tabla'

const schema = yup.object({
    periodo: yup.string().required('El periodo es un campo Obligatorio'),
});

const FormularioPeriodo = ({accion,periodo,actualizarListado}) => {

    const [ alumnoListado,setAlumnoListado] = useState([])
    const [ columnasAlumno, setColumnasAlumno] = useState([])
    const [ columnasAlumnoFinal, setColumnasAlumnoFinal] = useState([])
    const [ alumnoListadoFinal, setAlumnoListadoFinal] = useState([])
    const [ seleccionado,setSeleccionado] = useState(0)
    const [ seleccionadoFinal,setSeleccionadoFinal] = useState(0)

    const seleccionarRegistro = (sIdAlumno) => {
        setSeleccionado(sIdAlumno);
    }
      
    const seleccionarRegistroFinal = (sIdAlumno) => {
        setSeleccionadoFinal(sIdAlumno);
    }

    useEffect(() => {
       actualizarListadoAlumno();
       setAlumnoListadoFinal(periodo.alumnos);
    }, [] )

    const actualizarListadoAlumno = async() => {
        const jsListado = await listado('alumno/listado');
        setAlumnoListado(jsListado);
        setColumnasAlumno(crearArregloColumnas(jsListado));
        let arreglo = crearArregloColumnas(jsListado);
        arreglo.push("alumnoBaja")
        setColumnasAlumnoFinal(arreglo);
    }

    const agregarRegistroTabla = () => {
        const alumno = alumnoListado.find(alumnoListado => alumnoListado._id === seleccionado);
        alumno.alumnoBaja = false;
        setAlumnoListadoFinal([...alumnoListadoFinal,alumno])
    }
    
    const eliminarRegistroTabla = () => {
        const alumno = alumnoListadoFinal.filter(alumnoListadoFinal => alumnoListadoFinal._id != seleccionadoFinal);
        setAlumnoListadoFinal(alumno)
    }

    const bajaAlumno = () => {
        const objIndex = alumnoListadoFinal.findIndex((alumnoListadoFinal => alumnoListadoFinal._id == seleccionadoFinal));
        if(objIndex===-1){
            return;
        }
        alumnoListadoFinal[objIndex].alumnoBaja = true;
        setAlumnoListadoFinal([...alumnoListadoFinal]);
    }

    return(
        <Formik
            validationSchema={schema}
            onSubmit={(values,e) => {
                periodo.periodo = values.periodo;
                periodo.fechaInicio = moment.utc(values.fechaInicio,'YYYY-MM-DD').format("YYYY-MM-DD HH:mm");
                periodo.fechaFinal = moment.utc(values.fechaFinal,'YYYY-MM-DD').format("YYYY-MM-DD HH:mm");
                periodo.alumnos = alumnoListadoFinal;
                if(accion === 2){
                    agregar('periodo/agregarPeriodo',periodo).then( () => {
                        swal({
                            title: "Periodo Agregado",
                            text: "Su periodo se a agregado exitosamente",
                            icon: "success",
                            button: "OK",
                          })
                          actualizarListado()
                    })
                } else{
                    actualizar('periodo/actualizarPeriodo',periodo).then( () => {
                        swal({
                            title: "Perido Modificado",
                            text: "Su periodo se a modificado exitosamente",
                            icon: "success",
                            button: "OK",
                          })
                          actualizarListado()
                    })
                }
                
            }}
            initialValues={{
                periodo: periodo.periodo,
                fechaInicio: periodo.fechaInicio,
                fechaFinal: periodo.fechaFinal,
            }}
            >
        {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            isValid,
            errors,
        }) => (
        <Form className="informacionUniversidad"
            onSubmit={handleSubmit}
            noValidate>
            <h1>Periodo</h1>
            <Row className="mb-3">
                <Form.Group as={Col}>
                <Form.Label>Periodo</Form.Label>
                <Form.Control  placeholder="Periodo" name="periodo" id="periodo" 
                    value={values.periodo} onChange={handleChange} onBlur={handleBlur}
                    isInvalid={!!touched.periodo && !!errors.periodo}
                    />
                <Form.Control.Feedback type="invalid">
                    {errors.periodo}
                </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col}>
                <Form.Label>Fecha Inicio</Form.Label>
                <Form.Control  placeholder="Fecha Periodo" name="fechaInicio" id="fechaInicio" 
                    type="date"
                    value={values.fechaInicio} onChange={handleChange} onBlur={handleBlur}
                    isInvalid={!!touched.fechaInicio && !!errors.fechaInicio}
                    />
                <Form.Control.Feedback type="invalid">
                    {errors.fechaInicio}
                </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Fecha Final</Form.Label>
                    <Form.Control  placeholder="Fecha Final" name="fechaFinal" id="fechaFinal" 
                        type="date"
                        value={values.fechaFinal} onChange={handleChange} onBlur={handleBlur}
                        isInvalid={!!touched.fechaFinal && !!errors.fechaFinal}
                        />
                    <Form.Control.Feedback type="invalid">
                        {errors.fechaFinal}
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <h2>
               Agregar Alumnos al periodo 
            </h2>
            <Row className="mb-3">
                <Pagination>
                    <Pagination.Item onClick={() => eliminarRegistroTabla()}>{`<`}</Pagination.Item>
                    <Pagination.Item onClick={() => agregarRegistroTabla()}>{`>`}</Pagination.Item>
                    <Pagination.Item onClick={() => bajaAlumno()}>{`Baja`}</Pagination.Item>
                </Pagination>
            </Row>
            <Row className="mb-3">
                <Col>
                    <Tabla
                        listado = {alumnoListado}
                        seleccionado = {seleccionado}
                        buscarRegistro = {seleccionarRegistro}
                        columnas = {columnasAlumno}
                        proceso = 'Alumno'
                    />
                </Col>
                <Col>
                    <Tabla
                        listado = {alumnoListadoFinal}
                        seleccionado = {seleccionadoFinal}
                        buscarRegistro = {seleccionarRegistroFinal}
                        columnas = {columnasAlumnoFinal}
                        proceso = 'Alumno'
                    />
                </Col>
            </Row>
            <Form.Row className="float-right">
                <Button variant="primary" type="submit" >
                    {(accion ===2)?
                        "Agregar"
                    :
                        "Modificar"
                    }
                </Button>
            </Form.Row>
            
        </Form>
        )}
        </Formik>
    );
}

export default FormularioPeriodo;