import { Action } from 'redux';

export interface FetchItemsState {
    isLoading: boolean;
    items: Item[];
}

export interface Item {
    id: string;
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

export interface AddItemAction extends Action {
    type: '@@items/ADD';
    payload: {
        item: Item;
    };
}

export interface AddItemSuccessAction extends Action {
    type: '@@items/ADD_SUCCESS';
}

export interface AddItemFailureAction extends Action {
    type: '@@items/ADD_FAILURE';
    payload: {
        error: string;
    };
}

export interface UpdateItemAction extends Action {
    type: '@@items/UPDATE';
    payload: {
        item: Item;
    };
}

export interface UpdateItemSuccessAction extends Action {
    type: '@@items/UPDATE_SUCCESS';
    payload: {
        item: Item;
    };
}

export interface UpdateItemFailureAction extends Action {
    type: '@@items/UPDATE_FAILURE';
    payload: {
        error: string;
    };
}

export interface DeleteItemAction extends Action {
    type: '@@items/DELETE';
    payload: {
        item: Item;
    };
}

export interface DeleteItemSuccessAction extends Action {
    type: '@@items/DELETE_SUCCESS';
}

export interface DeleteItemFailureAction extends Action {
    type: '@@items/DELETE_FAILURE';
    payload: {
        error: string;
    };
}

export type GetItemsActions = GetItemsAction | GetItemsSuccessAction | GetItemsFailureAction;
export type AddItemActions = AddItemAction | AddItemSuccessAction | AddItemFailureAction;
export type UpdateItemActions = UpdateItemAction | UpdateItemSuccessAction | UpdateItemFailureAction;
export type DeleteItemActions = DeleteItemAction | DeleteItemSuccessAction | DeleteItemSuccessAction;
