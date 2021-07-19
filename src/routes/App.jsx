import React from 'react'
import { BrowserRouter,Switch,Route } from 'react-router-dom'
import Layout from '../components/Generales/Layout';
import Home from '../containers/Home'
import Universidad from '../containers/Universidad'

const App = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/universidad" component={Universidad}/>
                </Switch>
            </Layout>
        </BrowserRouter>
    );
}

export default App;