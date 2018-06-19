import { ActionCreator, Action } from 'redux';
import { GetItemsAction, GetItemsSuccessAction, GetItemsFailureAction, Item } from './types';

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
