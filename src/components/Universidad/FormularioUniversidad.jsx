import React from 'react';
import { Form,Button,Col,Row } from 'react-bootstrap'
// import {useFormik} from 'formik';
// import * as Yup from 'yup';
// import swal from 'sweetalert';

const FormularioUniversidad = ({accion}) => {
    return(
        <Form className="informacionUniversidad"
            // onSubmit={formik.handleSubmit} 
            noValidate>
            <h1>Universidad</h1>
            <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="formGridNombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control  
                    placeholder="nombre"
                    name="nombre"
                    id="nombre"
                    // value={formik.values.clave}
                    // onChange={formik.handleChange}
                    // onBlur={formik.handleBlur} 
                    // isInvalid={!!formik.touched.clave && !!formik.errors.clave}
                />
                </Form.Group>

                <Form.Group as={Col} md="3" controlId="formGridAbreviacion">
                <Form.Label>Abreviacion</Form.Label>
                <Form.Control 
                    placeholder="abreviacion"
                    name="abreviacion" 
                    id="abreviacion" 
                    // value={formik.values.serie} 
                    // onChange={formik.handleChange} 
                    // onBlur={formik.handleBlur} 
                    // isInvalid={!!formik.touched.serie && !!formik.errors.serie}
                />
                </Form.Group>
                <Form.Control.Feedback type="invalid">
                    {/* {formik.errors.abreviacion}    */}
                </Form.Control.Feedback>
            </Row>
           
            {(accion ===2)?
                <Button variant="primary" type="submit">
                Agregar
            </Button>
            :
            <Button variant="primary" type="submit">
                Modificar
            </Button>
            }
        </Form>
    );
}

export default FormularioUniversidad;