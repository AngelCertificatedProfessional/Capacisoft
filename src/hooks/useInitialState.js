import {useState } from 'react';
import initialState from '../utils/initialState';


const useInitialState = () => {
  const [state, setState] = useState(initialState);

  const agregarUsuario = (usuario) => {
    setState({
      ...state,
      usuario: usuario,
    });
  };

  return {
    agregarUsuario,
    state
  };
};

export default useInitialState;
