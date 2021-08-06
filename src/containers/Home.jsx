import React,{useEffect }  from 'react'
import { useHistory } from "react-router-dom";
const Home = () => {
    let history = useHistory();
    useEffect (() => {
        // Buffer.from("SGVsbG8gV29ybGQ=", 'base64').toString('ascii')
        if (localStorage.getItem("usuario") === null) {
            history.push('/login')
        }
    }, [] )

    return(
        <>
            <p>Hola</p>
        </>
    );
}

export default Home;