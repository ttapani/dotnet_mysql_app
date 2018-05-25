import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from '../layout';
import { Home, FetchData, Counter, Loans, Equipments, Users, Register, Login } from '../pages'

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
