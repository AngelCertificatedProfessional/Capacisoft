import React from 'react'
import {Table, Button} from 'react-bootstrap'
import '../../styles/components/SideBar.css'

const SideBar = ({cambiarVentana}) => {
    return (
        <aside className="aside__titulo">
            <h3 className="text-dark text-center">Universidades</h3>
            <Table striped border hover responsive size="sm" >
                <thead>
                    <tr>
                        <th>
                            Alias
                        </th>
                        <th>
                            Nombre
                        </th>
                    </tr>
                </thead> 
                <tbody>
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