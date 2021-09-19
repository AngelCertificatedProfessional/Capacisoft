import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Layout from '../components/Generales/Layout';
import Home from './../containers/Home';
import Universidad from './../containers/Universidad';
import Carrera from './../containers/Carrera';
import TemaCurso from './../containers/TemaCurso';
import Usuario from './../containers/Usuario';
import Alumno from './../containers/Alumno';
import Curso from './../containers/Curso';
import Periodo from './../containers/Periodo';
import Login from './../containers/Login';
import ProgramarCurso from './../containers/ProgramarCurso';
import Error404 from './../containers/Error404';
import AppConText from './../context/AppContext';
import useInitialState from './../hooks/useInitialState';
import Actualizacion from './../containers/Actualizacion';
import ReporteBaja from './../containers/ReporteBaja';
import ReporteGastos from './../containers/ReporteGastos';

const App = () => {
  const initialState = useInitialState();

  return (
    <AppConText.Provider value={initialState}>
      <HashRouter>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/universidad" component={Universidad} />
            <Route exact path="/carrera" component={Carrera} />
            <Route exact path="/temaCurso" component={TemaCurso} />
            <Route exact path="/usuario" component={Usuario} />
            <Route exact path="/alumno" component={Alumno} />
            <Route exact path="/curso" component={Curso} />
            <Route exact path="/periodo" component={Periodo} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/programarCurso" component={ProgramarCurso} />
            <Route exact path="/actualizacion" component={Actualizacion} />
            <Route exact path="/reporteBaja" component={ReporteBaja} />
            <Route exact path="/reporteGastos" component={ReporteGastos} />
            <Route component={Error404} />
          </Switch>
        </Layout>
      </HashRouter>
    </AppConText.Provider>
  );
};

export default App;
