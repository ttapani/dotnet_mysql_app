import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from '../layout';
import { Home, FetchData, Counter, Loans, Items, Users, Register, Login, ManageItems } from '../pages';

export const routes = (
    <Layout>
        <Route exact={true} path="/" component={Home} />
        <Route path="/manage" component={ManageItems} />
        <Route path="/items" component={Items} />
        <Route path="/login" component={Login} />
        <Route path="/loans" component={Loans} />
    </Layout>);
