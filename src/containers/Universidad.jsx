import React,{Fragment} from 'react'
import { Container,Col,Row,Button } from 'react-bootstrap'
import InfoUniversidad from '../components/Universidad/InfoUniversidad'
import SideBar from '../components/Universidad/SideBar'

const Universidad = () => {
    return(
        <Fragment>
            <Row>
                <Col Col xs={12} md={2}> 
                    <SideBar/>
                </Col>
                <Col xs={12} md={10}>
                    <main className="pt-4">
                        <InfoUniversidad/>
                    </main>
                </Col>
            </Row>
        </Fragment>
    )
}

export default Universidad