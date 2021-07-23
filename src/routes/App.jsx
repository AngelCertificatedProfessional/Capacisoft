import React from 'react'
import { BrowserRouter,Switch,Route } from 'react-router-dom'
import Layout from '../components/Generales/Layout';
import Home from '../containers/Home'
import Universidad from '../containers/Universidad'
import Carrera from '../containers/Carrera'

const App = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/universidad" component={Universidad}/>
                    <Route exact path="/carerra" component={Carrera}/>
                </Switch>
            </Layout>
        </BrowserRouter>
    );
}

export default App;