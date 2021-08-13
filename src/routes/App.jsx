import React,{lazy,Suspense } from 'react'
import { HashRouter ,BrowserRouter,Switch,Route } from 'react-router-dom'
const Layout = lazy(() => import('./../components/Generales/Layout'));
const Home = lazy(() => import('./../containers/Home'));
const Universidad = lazy(() => import('./../containers/Universidad'));
const Carrera = lazy(() => import('./../containers/Carrera'));
const TemaCurso = lazy(() => import('./../containers/TemaCurso'));
const Usuario = lazy(() => import('./../containers/Usuario'));
const Alumno = lazy(() => import('./../containers/Alumno'));
const Curso = lazy(() => import('./../containers/Curso'));
const Periodo = lazy(() => import('./../containers/Periodo'));
const Login = lazy(() => import('./../containers/Login'));
import AppConText from './../context/AppContext';
import useInitialState from './../hooks/useInitialState';
const App = () => {
    const initialState = useInitialState();

    return (
        <AppConText.Provider value={initialState}>
            <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
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
                </Suspense>
            </BrowserRouter>
        </AppConText.Provider>
    );
}

export default App;