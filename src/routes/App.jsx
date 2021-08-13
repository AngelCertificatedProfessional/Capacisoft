import React from 'react'
import { HashRouter ,BrowserRouter,Switch,Route } from 'react-router-dom'
import Layout from '../components/Generales/Layout';
import Home from '../containers/Home'
import Universidad from '../containers/Universidad'
import Carrera from '../containers/Carrera'
import TemaCurso from '../containers/TemaCurso'
import Usuario from '../containers/Usuario'
import Alumno from '../containers/Alumno'
import Curso from '../containers/Curso'
import Periodo from '../containers/Periodo'
import Login from '../containers/Login'
import AppConText from '../context/AppContext';
import useInitialState from '../hooks/useInitialState';
const App = () => {
    const initialState = useInitialState();

    return (
        <AppConText.Provider value={initialState}>
            <BrowserRouter>
                <Layout>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/universidad" component={Universidad}/>
                        <Route exact path="/carerra" component={Carrera}/>
                        <Route exact path="/temaCurso" component={TemaCurso}/>
                        <Route exact path="/usuario" component={Usuario}/>
                        <Route exact path="/alumno" component={Alumno}/>
                        <Route exact path="/curso" component={Curso}/>
                        <Route exact path="/periodo" component={Periodo}/>
                        <Route exact path="/login" component={Login}/>
                    </Switch>
                </Layout>
            </BrowserRouter>
        </AppConText.Provider>
    );
}

export default App;