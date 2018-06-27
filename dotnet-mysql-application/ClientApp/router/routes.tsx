import * as React from 'react';
import { Route } from 'react-router-dom';
import { Home, FetchData, Counter, Loans, Items, Users, Register, Login, ManageItems } from '../pages';
import { ApplicationState } from '../store';
import { connect } from 'react-redux';
import withAuthentication from './withAuthentication';

const mapStateToProps = (state: ApplicationState) => ({loggedIn: state.login.loggedIn});

export const routes = (
    <React.Fragment>
        <Route exact={true} path="/" component={Home} />
        <Route path="/manage" component={connect(mapStateToProps, null)(withAuthentication(ManageItems))} />
        <Route path="/items" component={connect(mapStateToProps, null)(withAuthentication(Items))} />
        <Route path="/login" component={Login} />
        <Route path="/loans" component={connect(mapStateToProps, null)(withAuthentication(Loans))} />
        <Route path="/register" component={Register} />
    </React.Fragment>);
