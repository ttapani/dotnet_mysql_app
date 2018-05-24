import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Loans } from './components/Loans';
import { Equipments } from './components/Equipments';
import { Users } from './components/Users';
import { Register } from './components/Register';
import { Login } from './components/Login';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/counter' component={ Counter } />
    <Route path='/fetchdata' component={ FetchData } />
    <Route path='/loans' component={ Loans } />
    <Route path='/equipments' component={ Equipments } />
    <Route path='/users' component={ Users } />
    <Route path='/register' component={ Register } />
    <Route path='/login' component={ Login } />
</Layout>;
