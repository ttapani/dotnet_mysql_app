import { combineReducers, Dispatch, Reducer } from "redux";
import { routerReducer } from "react-router-redux";

import { LoginState } from './user/types';
import userReducer from './user/reducer';

export interface ApplicationState {
    login: LoginState,
}

export const reducers: Reducer<ApplicationState> = combineReducers<ApplicationState>({
    route: routerReducer,
    login: userReducer,
});

export interface ConnectedReduxProps<S> {
    dispatch: Dispatch<S>;
}
