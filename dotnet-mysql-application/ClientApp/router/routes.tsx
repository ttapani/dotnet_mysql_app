import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from '../layout';
import { Home, FetchData, Counter, Loans, Items, Users, Register, Login } from '../pages';

export const routes = (
    <Layout>
        <Route exact={true} path="/" component={Home} />
        <Route path="/counter" component={Counter} />
        <Route path="/fetchdata" component={FetchData} />
        <Route path="/loans" component={Loans} />
        <Route path="/equipments" component={Items} />
        <Route path="/users" component={Users} />
        <Route path="/login" component={Login} />
    </Layout>);
