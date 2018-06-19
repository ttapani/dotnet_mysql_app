import { Action } from 'redux';

export interface FetchItemsState {
    isLoading: boolean;
    items: Item[];
}

export interface Item {
    guid: string;
    name: string;
}

export interface GetItemsAction extends Action {
    type: '@@items/GET';
}

export interface GetItemsSuccessAction extends Action {
    type: '@@items/GET_SUCCESS';
    payload: {
        items: Item[];
    };
}

export interface GetItemsFailureAction extends Action {
    type: '@@items/GET_FAILURE';
    payload: {
        error: string;
    };
}

export type GetItemsActions = GetItemsAction | GetItemsSuccessAction | GetItemsFailureAction;
