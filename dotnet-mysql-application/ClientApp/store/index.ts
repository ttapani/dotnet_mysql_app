import { combineReducers, Dispatch, Reducer } from 'redux';
import { routerReducer } from 'react-router-redux';

import { LoginState } from './user/types';
import userReducer from './user/reducer';
import itemsReducer from './item/reducer';
import { FetchItemsState } from './item/types';

export interface ApplicationState {
    login: LoginState;
    items: FetchItemsState;
}

export const reducers: Reducer<ApplicationState> = combineReducers<ApplicationState>({
    route: routerReducer,
    login: userReducer,
    items: itemsReducer,
});

export interface ConnectedReduxProps<S> {
    dispatch: Dispatch<S>;
}
