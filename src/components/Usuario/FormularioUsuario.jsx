import React from 'react';
import { Form,Button,Col,Row } from 'react-bootstrap'
import { Formik } from 'formik';
import * as yup from 'yup';
import {agregar,actualizar} from '../../utils/ConexionAPI'
import swal from 'sweetalert';

const schema = yup.object({
    usuario: yup.string().required('El usuario es requerido'),
    contrasena: yup.string().required('La contrasena es requerido').min(8, 'La Contrasena debe contener minimo 8 caracteres.'),
    validaContrasena: yup.string().required('El valor de valida Contrasena es obligatorio').oneOf([yup.ref('contrasena'), null], 'Las contrasenas no son iguales'),
    nombre: yup.string().required('El nombre es un campo requerido'),
    apellido: yup.string().required('El apellido es un campo obligatorio'),
    tipoUsuario: yup.number()
});

const FormularioUsuario= ({accion,usuario,actualizarListado}) => {

    console.log(usuario)

    if(accion ===3){
        usuario.contrasena = '**********';
    }


    return(
        <Formik
            validationSchema={schema}
            onSubmit={(values,e) => {
                usuario.usuario = values.usuario;
                usuario.contrasena = values.contrasena;
                usuario.nombre = values.nombre;
                usuario.apellido = values.apellido;
                usuario.tipoUsuario = values.tipoUsuario;
                if(accion === 2){
                    agregar('usuario/agregarUsuario',usuario).then(() => {
                        swal({
                            title: "Usuario Agregado",
                            text: "Su usuario se a agregado exitosamente",
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
                } else{
                    actualizar('usuario/actualizarUsuario',usuario).then( () => {
                        swal({
                            title: "Usuario Modificado",
                            text: "Su usuario se a modificado exitosamente",
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
                usuario: usuario.usuario,
                contrasena: usuario.contrasena,
                validaContrasena: usuario.contrasena,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                tipoUsuario: usuario.tipoUsuario
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
            <h1>Usuario</h1>
            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label>Usuario</Form.Label>
                    <Form.Control placeholder="Usuario" name="usuario" id="usuario" 
                        value={values.usuario} onChange={handleChange} onBlur={handleBlur}
                        isInvalid={!!touched.usuario && !!errors.usuario}
                        />
                    <Form.Control.Feedback type="invalid">
                        {errors.usuario}
                    </Form.Control.Feedback>
                </Form.Group>

                {(accion ===2)&&
                    <>
                        <Form.Group as={Col}>
                            <Form.Label>Contrasena</Form.Label>
                            <Form.Control type="password" placeholder="Contrasena" name="contrasena" id="contrasena" 
                                value={values.contrasena} onChange={handleChange} onBlur={handleBlur}
                                isInvalid={!!touched.contrasena && !!errors.contrasena} 
                                />
                            <Form.Control.Feedback type="invalid">
                                {errors.contrasena}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Contrasena</Form.Label>
                            <Form.Control type="password" placeholder="Valida Contrasena" name="validaContrasena" id="validaContrasena" 
                                value={values.validaContrasena} onChange={handleChange} onBlur={handleBlur}
                                isInvalid={!!touched.validaContrasena && !!errors.validaContrasena}
                                />
                            <Form.Control.Feedback type="invalid">
                                {errors.validaContrasena}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </>
                }
            </Row>
            <Row className="mb-3">
               
                <Form.Group as={Col}>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control  placeholder="Nombre" name="nombre" id="nombre" 
                        value={values.nombre} onChange={handleChange} onBlur={handleBlur}
                        isInvalid={!!touched.nombre && !!errors.nombre}
                        />
                    <Form.Control.Feedback type="invalid">
                        {errors.nombre}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control  placeholder="Apellido" name="apellido" id="apellido" 
                        value={values.apellido} onChange={handleChange} onBlur={handleBlur}
                        isInvalid={!!touched.apellido && !!errors.apellido}
                        />
                    <Form.Control.Feedback type="invalid">
                        {errors.apellido}
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Tipo de usuario</Form.Label>
                    <Form.Control as="select" name="tipoUsuario" id="tipoUsuario" 
                        value={values.tipoUsuario} onChange={handleChange} onBlur={handleBlur}>
                        <option value="1">Administrador</option>
                        <option value="2">Coordiandor Escolar</option>
                        <option value="3">Maestro</option>
                        <option value="4">Alumno</option>
                    </Form.Control>
                </Form.Group>
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

export default FormularioUsuario;