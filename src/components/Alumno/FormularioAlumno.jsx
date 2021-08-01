import React from 'react';
import { Form,Button,Col,Row } from 'react-bootstrap'
import { Formik } from 'formik';
import * as yup from 'yup';
import {actualizarEspecifico } from '../../utils/ConexionAPI'
import swal from 'sweetalert';

const schema = yup.object({
    nombreAlumno: yup.string().required('El nombre es un campo requerido'),
    apellidoAlumno: yup.string().required('El apellido es un campo obligatorio'),
    edad: yup.number()
});

const FormularioAlumno = ({accion,alumno,actualizarListado,cambiarVentana,setAlumno}) => {

    console.log(alumno)
    return(
        <Formik
            validationSchema={schema}
            onSubmit={(values,e) => {
                alumno.nombreAlumno = values.nombreAlumno;
                alumno.apellidoAlumno = values.apellidoAlumno;
                alumno.edad = values.edad;
                setAlumno(alumno)
                if(accion === 2){
                    cambiarVentana(3)
                }
                else{
                    actualizarEspecifico('alumno/actualizarAlumno',alumno).then( () => {
                        swal({
                            title: "Alumno Modificado",
                            text: "Su Alumno se a modificado exitosamente",
                            icon: "success",
                            button: "OK",
                          })
                          actualizarListado()
                    }).catch(error => {
                        swal({
                            title: "Error",
                            text: error,
                            icon: "error",
                            button: "OK",
                          })
                    })
                }
                
            }}
            initialValues={{
                nombreAlumno: alumno.nombreAlumno,
                apellidoAlumno: alumno.apellidoAlumno,
                edad: alumno.edad
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
            <h1>
                {(accion ===2)?
                    `Alumno 1/3`
                :
                    `Modificar Informacion Alumno`
                }
            </h1>
            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control  placeholder="Nombre" name="nombreAlumno" id="nombreAlumno" 
                        value={values.nombreAlumno} onChange={handleChange} onBlur={handleBlur}
                        isInvalid={!!touched.nombreAlumno && !!errors.nombreAlumno}
                        />
                    <Form.Control.Feedback type="invalid">
                        {errors.nombreAlumno}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control  placeholder="Apellido" name="apellidoAlumno" id="apellidoAlumno" 
                        value={values.apellidoAlumno} onChange={handleChange} onBlur={handleBlur}
                        isInvalid={!!touched.apellidoAlumno && !!errors.apellidoAlumno}
                        />
                    <Form.Control.Feedback type="invalid">
                        {errors.apellidoAlumno}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Edad</Form.Label>
                    <Form.Control  placeholder="Edad" name="edad" id="edad" 
                        value={values.edad} onChange={handleChange} onBlur={handleBlur}
                        isInvalid={!!touched.edad && !!errors.edad}
                        />
                    <Form.Control.Feedback type="invalid">
                        {errors.edad}
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Form.Row className="float-right">
                <Button variant="primary" type="submit">
                {(accion ===2)?
                    `Siguiente`
                :
                    `Modificar`
                }
                </Button>                
            </Form.Row>
            
        </Form>
        )}
        </Formik>
    );
}

export default FormularioAlumno;