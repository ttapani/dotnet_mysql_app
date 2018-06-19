import { ActionCreator } from 'redux';
import { GetItemsAction, GetItemsSuccessAction, GetItemsFailureAction, Item } from './types';
import { AddItemAction, AddItemSuccessAction, AddItemFailureAction } from './types';

export const getItems: ActionCreator<GetItemsAction> = () => ({
    type: '@@items/GET',
});

export const getItemsSuccess: ActionCreator<GetItemsSuccessAction> = (items: Item[]) => ({
    type: '@@items/GET_SUCCESS',
    payload: {
        items,
    },
});

export const getItemsFailure: ActionCreator<GetItemsFailureAction> = (error: string) => ({
    type: '@@items/GET_FAILURE',
    payload: {
        error,
    },
});

export const addItem: ActionCreator<AddItemAction> = (item: Item) => ({
    type: '@@items/ADD',
    payload: {
        item,
    },
});

export const addItemSuccess: ActionCreator<AddItemSuccessAction> = () => ({
    type: '@@items/ADD_SUCCESS',
});

export const addItemFailure: ActionCreator<AddItemFailureAction> = (error: string) => ({
    type: '@@items/ADD_FAILURE',
    payload: {
        error,
    },
});
