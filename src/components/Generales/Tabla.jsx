import '../../styles/components/SideBar.css'
import {createTable} from '../../utils/Tabla'

const Tabla = ({listado,seleccionado,buscarRegistro,columnas,proceso}) => {
    return (
        listado.length > 0 || columnas.length > 0 ? (
            createTable(listado,seleccionado,buscarRegistro,columnas,proceso) 
        ) : null
    );
}

export default Tabla;