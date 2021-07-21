import React,{Fragment,useState } from 'react'
import { Col,Row,Container } from 'react-bootstrap'
import InfoUniversidad from '../components/Universidad/InfoUniversidad'
import FormularioUniversidad from '../components/Universidad/FormularioUniversidad'
import SideBar from '../components/Universidad/SideBar'

const Universidad = () => {
    const [ accion, setAccion ] = useState(0)

    const cambiarVentana = (ventana) => {
        setAccion(ventana);
    }

    return(
        <Container fluid>
            <Row>
                <Col xs={10} md={2}>
                    <SideBar cambiarVentana={cambiarVentana}/>
                </Col>
                <Col xs={12} md={10}>
                    <main className="pt-4">
                        
                        {(accion ==1) &&
                            <InfoUniversidad/>
                        }:
                        {(accion ==2 || accion ==3) &&
                            <FormularioUniversidad/>
                        }
                    </main>
                </Col>
            </Row>
            
        </Container>
    )
}

export default Universidad