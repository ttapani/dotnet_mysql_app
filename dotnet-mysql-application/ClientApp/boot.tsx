// tslint:disable-next-line:no-import-side-effect
import './css/site.css';
// tslint:disable-next-line:no-import-side-effect
import 'bootstrap';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { ConnectedRouter } from 'react-router-redux';
import * as RoutesModule from './router/routes';

import configureStore from './configureStore';
import { ApplicationState } from './store/';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
let routes = RoutesModule.routes;

import { persistStore } from 'redux-persist';
// tslint:disable-next-line:no-submodule-imports
import { PersistGate } from 'redux-persist/integration/react';
import App from './app';

function renderApp() {
    // This code starts up the React app when it runs in a browser. It sets up the routing
    // configuration and injects the app into a DOM element.
    // const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
    const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href')!;
    const history = createBrowserHistory({
        basename: baseUrl,
    });
    const initialState = (window as any).initialReduxState as ApplicationState;
    const store = configureStore(history, initialState);
    const persistor = persistStore(store);
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <ConnectedRouter history={history}>
                        <App/>
                    </ConnectedRouter>
                </PersistGate>
            </Provider>
        </AppContainer>,
        document.getElementById('react-app')
    );
}

/* function renderApp() {
    // This code starts up the React app when it runs in a browser. It sets up the routing
    // configuration and injects the app into a DOM element.
    const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href')!;
    ReactDOM.render(
        <AppContainer>
        <BrowserRouter children={ routes } basename={ baseUrl } />
        </AppContainer>,
        document.getElementById('react-app')
    );
} */

renderApp();

// Allow Hot Module Replacement
if (module.hot) {
    module.hot.accept('./router/routes', () => {
        routes = require<typeof RoutesModule>('./router/routes').routes;
        renderApp();
    });
}
