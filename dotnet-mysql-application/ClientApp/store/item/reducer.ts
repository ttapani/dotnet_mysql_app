import { Reducer, combineReducers } from 'redux';
import { FetchItemsState, GetItemsActions, AddItemActions, DeleteItemActions } from './types';

type AllItemActions = GetItemsActions | AddItemActions | DeleteItemActions;

export const initialState: FetchItemsState = {
  items: [],
  isLoading: false,
};

const itemsReducer: Reducer<FetchItemsState> = (state: FetchItemsState = initialState, action) => {
  switch ((action as AllItemActions).type) {
    case '@@items/GET':
      return { ...state, isLoading: true };
    case '@@items/GET_SUCCESS':
      return { ...state,
        items: action.payload.items,
        isLoading: false };
    case '@@items/GET_FAILURE':
      return { ...state, message: action.payload.message, isLoading: false };
    case '@@items/ADD':
      return { ...state, isLoading: true };
    case '@@items/ADD_SUCCESS':
      return { ...state, isLoading: false, items: [...state.items, action.payload.item] };
    case '@@items/ADD_FAILURE':
      // Somehow communicate to UI that we fucked up
      return { ...state, isLoading: false };
    case '@@items/DELETE':
      return { ...state, isLoading: true };
    case '@@items/DELETE_SUCCESS':
      // Return new state, where items is an array without the deleted item
      return { ...state, isLoading: false, items: state.items.filter(item => item !== action.payload.item)};
    case '@@items/DELETE_FAILURE':
      // Somehow communicate to UI that we fucked up
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

export default itemsReducer;
