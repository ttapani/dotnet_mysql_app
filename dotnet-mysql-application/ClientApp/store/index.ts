import { combineReducers, Dispatch, Reducer } from 'redux';
import { routerReducer } from 'react-router-redux';

import { LoginState } from './user/types';
import userReducer from './user/reducer';
import itemsReducer from './item/reducer';
import { FetchItemsState } from './item/types';
import { LoansState } from './loan/types';
import loansReducer from './loan/reducer';

export interface ApplicationState {
    login: LoginState;
    items: FetchItemsState;
    loans: LoansState;
}

export const reducers: Reducer<ApplicationState> = combineReducers<ApplicationState>({
    route: routerReducer,
    login: userReducer,
    items: itemsReducer,
    loans: loansReducer,
});

export interface ConnectedReduxProps<S> {
    dispatch: Dispatch<S>;
}
