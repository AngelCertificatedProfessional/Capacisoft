const config = require('./../config/config');
const UtileriasPagina = require('./UtileriasPagina');
let usuario = JSON.parse(UtileriasPagina.b64_to_utf8(sessionStorage.getItem('usuario')));

export const agregar = async (sRuta, data) => {
  try {
    if (!validaUsuario()) {
      throw 'No se a iniciado sesion';
    }

    const configuracion = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: usuario.token,
      },
      body: JSON.stringify(data),
    };

    let res = await fetch(
      `${config.env.apiCapacisoftURL}/api/${sRuta}`,
      configuracion
    );

    let json = await res.json();

    if (res.status !== 200 && json.data !== undefined) {
      throw json.data;
    } else if (res.status !== 200) {
      throw 'Hubo un error al ingresar la informacion';
    }

    if (json.data.hasOwnProperty('_id')) {
      return;
    } else {
      throw 'Hubo un error al ingresar la informacion';
    }
  } catch (error) {
    throw error;
  }
};

export const listado = async (sRuta) => {
  try {
    if (!validaUsuario()) {
      throw 'No se a iniciado sesion';
    }

    const configuracion = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: usuario.token,
      },
    };

    let res = await fetch(
      `${config.env.apiCapacisoftURL}/api/${sRuta}`,
      configuracion
    );

    if (res.status !== 200) {
      throw 'Hubo un error al ingresar la informacion';
    }

    let data = await res.json();

    return data.data;
  } catch (error) {
    throw error;
  }
};

export const consultaById = async (sRuta, nIdRegistro) => {
  try {
    if (!validaUsuario()) {
      throw 'No se a iniciado sesion';
    }

    const configuracion = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: usuario.token,
      },
    };

    let res = await fetch(
      `${config.env.apiCapacisoftURL}/api/${sRuta}${nIdRegistro}`,
      configuracion
    );

    if (res.status !== 200) {
      throw 'Hubo un error al ingresar la informacion';
    }

    let data = await res.json();
    return data.data;
  } catch (error) {
    throw error;
  }
};

export const actualizar = async (sRuta, data) => {
  try {
    if (!validaUsuario()) {
      throw 'No se a iniciado sesion';
    }

    const configuracion = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: usuario.token,
      },
      body: JSON.stringify(data),
    };

    let res = await fetch(
      `${config.env.apiCapacisoftURL}/api/${sRuta}`,
      configuracion
    );

    let json = await res.json();

    if (res.status !== 200 && json.data !== undefined) {
      throw json.data;
    } else if (res.status !== 200) {
      throw 'Hubo un error al ingresar la informacion';
    }

    if (json.data.hasOwnProperty('_id')) {
      return;
    } else {
      throw 'Hubo un error al ingresar la informacion';
    }
  } catch (error) {
    throw error;
  }
};

export const actualizarEspecifico = async (sRuta, data) => {
  try {
    if (!validaUsuario()) {
      throw 'No se a iniciado sesion';
    }

    const configuracion = {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: usuario.token,
      },
      body: JSON.stringify(data),
    };

    let res = await fetch(
      `${config.env.apiCapacisoftURL}/api/${sRuta}`,
      configuracion
    );

    let json = await res.json();

    if (res.status !== 200 && json.data !== undefined) {
      throw json.data;
    } else if (res.status !== 200) {
      throw 'Hubo un error al ingresar la informacion';
    }

    // if (json.data.hasOwnProperty('_id')) {
    //   return;
    // } else {
    //   throw 'Hubo un error al ingresar la informacion';
    // }
  } catch (error) {
    throw error;
  }
};

export const iniciarSesion = async (sRuta, data) => {
  try {
    const configuracion = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    let res = await fetch(
      `${config.env.apiCapacisoftURL}/api/${sRuta}`,
      configuracion
    );

    const json = await res.json();
    if (res.status !== 200 && json.data !== undefined) {
      throw json.data;s
    } else if (res.status !== 200) {
      throw 'Hubo un error al ingresar la informacion';
    }
    const jsonDescodificado = JSON.parse(UtileriasPagina.b64_to_utf8(json.data))
    
    if (jsonDescodificado.hasOwnProperty('token')) {
      usuario = jsonDescodificado;
      sessionStorage.setItem('usuario', json.data);
      return jsonDescodificado;
    } else {
      throw 'No se detecto el token';
    }
  } catch (error) {
    throw error;
  }
};

const validaUsuario = () => {
  if (usuario === null || usuario === undefined || usuario.usuario === '') {
    return false;
  }
  return true;
};
