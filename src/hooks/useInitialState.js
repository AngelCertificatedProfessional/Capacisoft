import { useEffect,useState } from 'react';
import initialState from '../utils/initialState';

//import axios from 'axios'
// const API = 'http://localhost:3006/products';


const useInitialState = () => {
  const [state, setState] = useState(initialState);

    // console.log(state);

  // const [products,setProducts] = useState([]);

  // useEffect(async () => {
  //   const response = await axios(API);
  //   setProducts(response.data)
  // },[])

  const agregarUsuario = (usuario) => {
    setState({
      ...state,
      usuario: usuario,
    });
  };

//   const removeFromCart = (payload) => {
//     setState({
//       ...state,
//       cart: state.cart.filter((items) => items.id !== payload.id),
//     });
//   };

//   const addToBuyer = (payload) => {
//     setState({
//       ...state,
//       buyer: [...state.buyer, payload],
//     });
//   };

//   const addNewOrder = (payload) => {
//     setState({
//       ...state,
//       orders: [...state.orders, payload],
//     });
//   };

  return {
    agregarUsuario,
    state
  };
};

export default useInitialState;
