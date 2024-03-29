import { ActionCreator } from 'redux';
import { GetItemsAction, GetItemsSuccessAction, GetItemsFailureAction, Item } from './types';
import { AddItemAction, AddItemSuccessAction, AddItemFailureAction } from './types';
import { UpdateItemAction, UpdateItemSuccessAction, UpdateItemFailureAction } from './types';
import { DeleteItemAction, DeleteItemSuccessAction, DeleteItemFailureAction } from './types';

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

export const addItemSuccess: ActionCreator<AddItemSuccessAction> = (item: Item) => ({
    type: '@@items/ADD_SUCCESS',
    payload: {
        item,
    },
});

export const addItemFailure: ActionCreator<AddItemFailureAction> = (error: string) => ({
    type: '@@items/ADD_FAILURE',
    payload: {
        error,
    },
});

export const updateItem: ActionCreator<UpdateItemAction> = (item: Item) => ({
    type: '@@items/UPDATE',
    payload: {
        item,
    },
});

export const updateItemSuccess: ActionCreator<UpdateItemSuccessAction> = (item: Item) => ({
    type: '@@items/UPDATE_SUCCESS',
    payload: {
        item,
    },
});

export const updateItemFailure: ActionCreator<UpdateItemFailureAction> = (error: string) => ({
    type: '@@items/UPDATE_FAILURE',
    payload: {
        error,
    },
});

export const deleteItem: ActionCreator<DeleteItemAction> = (item: Item) => ({
    type: '@@items/DELETE',
    payload: {
        item,
    },
});

export const deleteItemSuccess: ActionCreator<DeleteItemSuccessAction> = (item: Item) => ({
    type: '@@items/DELETE_SUCCESS',
    payload: {
        item,
    },
});

export const deleteItemFailure: ActionCreator<DeleteItemFailureAction> = (error: string) => ({
    type: '@@items/DELETE_FAILURE',
    payload: {
        error,
    },
});
