import React from 'react'
import {Table, Button} from 'react-bootstrap'
import '../../styles/components/SideBar.css'
import {mapTableColumns,addTableRow} from '../../utils/Tabla'

const SideBar = ({cambiarVentana,listado,seleccionado,buscarRegistro,columnas,proceso}) => {

    const createTable = () => {
        return (
            <Table striped bordered hover responsive size="sm" >
                <thead>
                    <tr>{mapTableColumns(columnas,proceso)}</tr>
                </thead>
                <tbody>
                {listado.map((result, index) => {
                    return <tr onClick={() => buscarRegistro(result._id)} key={index}
                        className={seleccionado === result._id ? "tablaSeleccionada" : "tablaNoSeleccionada" }>
                        {addTableRow(result,columnas)}
                    </tr>;
                })} 
                </tbody>
            </Table>
        );
      };


    return (
        <aside className="aside__titulo">
            <h3 className="text-dark text-center">{proceso}</h3>

            {listado.length > 0 ? (
                 createTable() 
            ) : null}
            <div className="d-grid gap-2">
                <Button variant="primary" block="true" onClick={() =>cambiarVentana(2)}>
                    Agregar
                </Button>
            </div>
            
        </aside>
    );
}

export default SideBar;