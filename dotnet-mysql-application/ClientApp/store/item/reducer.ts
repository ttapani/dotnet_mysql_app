import { Reducer, combineReducers } from 'redux';
import { FetchItemsState, GetItemsActions, AddItemActions } from './types';

type AllItemActions = GetItemsActions | AddItemActions;

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
      // Something here from the tutorial..
      return { ...state, isLoading: false };
    case '@@items/ADD_FAILURE':
      // Somehow communicate to UI that we fucked up
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

export default itemsReducer;
