import React from 'react';
import { Form,Button,Col,Row } from 'react-bootstrap'
import { Formik } from 'formik';
import * as yup from 'yup';
import {actualizarEspecifico } from '../../utils/ConexionAPI'
import swal from 'sweetalert';

const schema = yup.object({
    nombreCurso: yup.string().required('El nombre es un campo requerido'),
    proveedor: yup.number(),
    nombreInstructor: yup.string().required('El instructor es un campo obligatorio'),
    descripcion: yup.string().required('La descripcion es un campo obligatorio'),
});

const FormularioCurso = ({accion,curso,actualizarListado,cambiarVentana,setCurso}) => {

    console.log(curso)
    return(
        <Formik
            validationSchema={schema}
            onSubmit={(values,e) => {
                curso.nombreCurso = values.nombreCurso;
                curso.proveedor = values.proveedor;
                curso.nombreInstructor = values.nombreInstructor;
                curso.descripcion = values.descripcion;
                setCurso(curso)
                if(accion === 2){
                    console.log('entre');
                    cambiarVentana(3)
                }
                else{
                    actualizarEspecifico('curso/actualizarCurso',curso).then( () => {
                        swal({
                            title: "Curso Modificado",
                            text: "Su Curso se a modificado exitosamente",
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
                nombreCurso:curso.nombreCurso,
                proveedor:curso.proveedor,
                nombreInstructor: curso.nombreInstructor,
                descripcion: curso.descripcion
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
                    `Curso 1/3`
                :
                    `Modificar Informacion Curso`
                }
            </h1>
            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control  placeholder="Nombre" name="nombreCurso" id="nombreCurso" 
                        value={values.nombreCurso} onChange={handleChange} onBlur={handleBlur}
                        isInvalid={!!touched.nombreCurso && !!errors.nombreCurso}
                        />
                    <Form.Control.Feedback type="invalid">
                        {errors.nombreCurso}
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label>Nombre del Instructor</Form.Label>
                    <Form.Control  placeholder="Nombre del Instructor" name="nombreInstructor" id="nombreInstructor" 
                        value={values.nombreInstructor} onChange={handleChange} onBlur={handleBlur}
                        isInvalid={!!touched.nombreInstructor && !!errors.nombreInstructor}
                        />
                    <Form.Control.Feedback type="invalid">
                        {errors.nombreInstructor}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Proveedor</Form.Label>
                    <Form.Control as="select" name="proveedor" id="proveedor" 
                        value={values.proveedor} onChange={handleChange} onBlur={handleBlur}>
                        <option value="1">Udemy</option>
                        <option value="2">Coursera</option>
                        <option value="3">Platzi</option>
                        <option value="4">Otros</option>
                    </Form.Control>
                </Form.Group>
            </Row>
            <Row className="mb-3">
            <Form.Group as={Col}>
                    <Form.Label>Descripcion del curso</Form.Label>
                    <Form.Control
                    as="textarea"
                    placeholder="Agregar una descripcion"
                    style={{ height: '100px' }}
                    name="descripcion" id="descripcion" 
                    value={values.descripcion} onChange={handleChange} onBlur={handleBlur}
                    isInvalid={!!touched.descripcion && !!errors.descripcion}
                    />
                </Form.Group>
                <Form.Control.Feedback type="invalid">
                    {errors.descripcion}
                </Form.Control.Feedback>
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

export default FormularioCurso;