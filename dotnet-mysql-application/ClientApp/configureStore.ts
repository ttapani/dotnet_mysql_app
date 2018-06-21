import { createStore, applyMiddleware, Store, compose, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { History } from 'history';

import { ApplicationState, reducers } from './store/';
import { routerMiddleware } from 'react-router-redux';
import { routerReducer } from 'react-router-redux';

import { persistReducer } from 'redux-persist';
// tslint:disable-next-line:no-submodule-imports
import storage from 'redux-persist/lib/storage';

import createSagaMiddleware from 'redux-saga';
import userSagas from './store/user/sagas';
import itemsSagas from './store/item/sagas';

export default function configureStore(
    history: History,
    initialState: ApplicationState
  ): Store<ApplicationState> {
    // create the composing function for our middlewares
    const composeEnhancers = composeWithDevTools({});
    const sagaMiddleware = createSagaMiddleware();

    const persistConfig = {
      key: 'root',
      storage,
      whitelist: ['login'],
    };

    const persistedReducer = persistReducer(persistConfig, reducers);

    // We'll create our store with the combined reducers and the initial Redux state that
    // we'll be passing from our entry point.
    const store = createStore<ApplicationState>(
      persistedReducer,
      initialState,
      composeEnhancers(applyMiddleware(
        routerMiddleware(history), sagaMiddleware
      ))
    );

    if (module.hot) {
      // Enable Webpack hot module replacement for reducers
      module.hot.accept('./store/', () => {
        const nextRootReducer = require('./store/');
        store.replaceReducer(reducers);
      });
    }

/*     module.hot.accept('./store/user/sagas', () => {
      const getNewSagas = require('./store/user/sagas');
      sagaTask.cancel()
      sagaTask.done.then(() => {
        sagaTask = sagaMiddleware.run(function* replacedSaga (action) {
          yield getNewSagas()
        })
      })
    }) */

    sagaMiddleware.run(userSagas);
    sagaMiddleware.run(itemsSagas);
    return store;
  }
