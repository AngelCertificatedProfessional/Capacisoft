export const validaUsuario = (state, agregarUsuario) => {
  const { usuario } = state;
  if (usuario === null || usuario === undefined || usuario.usuario === '') {
    const usuarioSesion = JSON.parse(sessionStorage.getItem('usuario'));
    if (
      usuarioSesion === null ||
      usuarioSesion === undefined ||
      usuarioSesion.usuario === ''
    ) {
      return false;
    }
    agregarUsuario(usuarioSesion);
  }
  return true;
};
