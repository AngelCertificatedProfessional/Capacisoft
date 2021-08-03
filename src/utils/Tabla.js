import React from 'react'
const columnsToHide = ['_id'];
import {Table} from 'react-bootstrap'

export const createTable = (listado,seleccionado,buscarRegistro,columnas,proceso) => {
  if(listado.length === 0 || !Array.isArray(listado)){
    console.log('entre a la falla');
    console.log(listado);
    return null;
  }
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

export const mapTableColumns = (columnas,proceso) => {
    return columnas.map((col) => {
    if (!columnsToHide.includes(col)) {
        const overridedColumnName = sobreescribirColumnName(col,proceso);
        return (
          <th
            key={col}
            scope="col"
        >
            {overridedColumnName}
          </th>
       );
    }
    });
  };

export const addTableRow = (result,columns) => {
    let row = [];
    columns.forEach((col) => {
      if (!columnsToHide.includes(col)) {
        row.push(
            Object.keys(result).map((item) => {
            if (result[item] && item === col) {
              return result[item];
            } else if (item === col) {
              return "No Encontrado";
            }
          })
        );
        row = filtrarValores(row);
      }
    });
    return row.map((item) => {
        // console.log(item, "item ?");
        return (
          <td>
            {item}
          </td>
        );
      });
}

const filtrarValores = (arr) => {
    return arr
      .map((val) =>
        val.map((deepVal) => deepVal).filter((deeperVal) => deeperVal)
      )
      .map((val) => {
        if (val.length < 1) {
          val = ["-"];
          return val;
        }
        return val;
      });
  };

export const crearArregloColumnas = (results) => {
    let columns = [];
    results.forEach((result) => {
        Object.keys(result).forEach((col) => {
        if (!columns.includes(col)) {
            columns.push(col);
        }
        });
    });
    return columns;
};

export const sobreescribirColumnName = (col,proceso) => {
    switch(proceso){
        case "Universidad":
            return universidadColumna(col);
        case "Carrera":
          return carreraColumna(col);
        case "Tema Curso":
          return temaCursoColumna(col);
        case "Usuario":
          return usuarioColumna(col);
        case "Alumno":
          return alumnoColumna(col);
        case "Curso":
          return cursoColumna(col);
    }
}

/* Se agrega seccion de columnas de tablas*/

const universidadColumna = (col) => {
    switch(col) {
        case "nombre":
                return "Nombre";
        case "abreviacion":
            return "Abreviacion";
        default:
            return "";
    }
}

const carreraColumna = (col) => {
  switch(col) {
      case "nombreCarrera":
              return "Carrera";
      case "nombreCompletoCoordinador":
          return "Coordinador";
      default:
          return "";
  }
}

const temaCursoColumna = (col) => {
  switch(col) {
      case "temaCurso":
              return "Tema del Curso";
      default:
          return "";
  }
}

const usuarioColumna = (col) => {
  switch(col) {
      case "usuario":
        return "Usuario";
      case "tipoUsuario":
        return "Tipo de Usuario";
      default:
          return "";
  }
}

const alumnoColumna = (col) => {
  switch(col) {
    case "matricula":
      return "Matricula";
    case "nombreCompletoAlumno":
      return "Alumno";
    default:
        return "";
  }
}

const cursoColumna = (col) => {
  switch(col) {
    case "nombreCurso":
      return "Curso";
    case "proveedorDesc":
      return "Proovedor";
    default:
        return "";
  }
}