import { combineReducers, Dispatch, Reducer } from "redux";
import { routerReducer } from "react-router-redux";

import { UserState } from './user/types';
import userReducer from './user/reducer';

export interface ApplicationState {
    user: UserState,
}

export const reducers: Reducer<ApplicationState> = combineReducers<ApplicationState>({
    route: routerReducer,
    user: userReducer,
});

export interface ConnectedReduxProps<S> {
    dispatch: Dispatch<S>;
}
