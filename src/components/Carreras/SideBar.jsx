import React from 'react'
import {Table, Button} from 'react-bootstrap'
import '../../styles/components/SideBar.css'

const SideBar = ({cambiarVentana,listado,seleccionado,buscarRegistro}) => {
    return (
        <aside className="aside__titulo">
            <h3 className="text-dark text-center">Carreras</h3>
            <Table striped bordered hover responsive size="sm" >
                <thead>
                    <tr>
                        <th>
                            Nombre
                        </th>
                        <th>
                            Corrdinador
                        </th>
                    </tr>
                </thead> 
                <tbody>
                {/* { listado.map( (consulta,index) => (
                    // dee2e6
                    // 007BFF
                    <tr onClick={() => buscarRegistro(consulta._id)} key={index} className={seleccionado === consulta._id ? "tablaSeleccionada" : "tablaNoSeleccionada" }>
                        <td>{consulta.nombre}</td>
                        <td>{consulta.abreviacion}</td>
                    </tr>             
                ))} */}
                </tbody>
            </Table>
            <div className="d-grid gap-2">
                <Button variant="primary" block="true" onClick={() =>cambiarVentana(2)}>
                    Agregar
                </Button>
            </div>
            
        </aside>
    );
}

export default SideBar;