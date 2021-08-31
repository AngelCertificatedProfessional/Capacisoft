import React from 'react';
import { Button } from 'react-bootstrap';
import Tabla from './Tabla';

const SideBar = ({
  cambiarVentana,
  listado,
  seleccionado,
  buscarRegistro,
  columnas,
  proceso,
  tipoUsuario
}) => {
  return (
    <aside className="aside__titulo">
      <h3 className="text-dark text-center">{proceso}</h3>
      <Tabla
        listado={listado}
        seleccionado={seleccionado}
        buscarRegistro={buscarRegistro}
        columnas={columnas}
        proceso={proceso}
      />

      {(tipoUsuario === 1 || proceso === 'Usuario') && (
        <div className="d-grid gap-2">
          <Button
            variant="primary"
            block="true"
            onClick={() => cambiarVentana(2)}
          >
            Agregar
          </Button>
        </div>
      )}
    </aside>
  );
};

export default SideBar;
