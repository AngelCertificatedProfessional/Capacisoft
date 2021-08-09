import React,{useEffect,useContext }  from 'react'
import AppContext from '../context/AppContext';
import {validaUsuario} from '../utils/UtileriasPagina'
import { useHistory } from "react-router-dom";

const Home = () => {

    const { state, agregarUsuario } = useContext(AppContext);
    let history = useHistory();
    // const { usuario } = state;
    // console.log(state);
    useEffect (() => {
        // Buffer.from("SGVsbG8gV29ybGQ=", 'base64').toString('ascii')
        //console.log(localStorage.getItem("usuario") );
        // console.log(usuario)
        // if(!validaUsuario(state,agregarUsuario)){
        //     history.push('/login');
        // }
    }, [] )

    return(
        <>
            <p>Hola</p>
        </>
    );
}

export default Home;