import { Reducer, combineReducers } from 'redux';
import { FetchItemsState, GetItemsActions, AddItemActions, DeleteItemActions, UpdateItemActions, Item } from './types';

type AllItemActions = GetItemsActions | AddItemActions | DeleteItemActions | UpdateItemActions;

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
      return { ...state, isLoading: false, items: [...state.items, action.payload.item ] };
    case '@@items/ADD_FAILURE':
      // Somehow communicate to UI that we fucked up
      return { ...state, isLoading: false };
    case '@@items/UPDATE':
      return { ...state, isLoading: true };
    case '@@items/UPDATE_SUCCESS':
      // Return new state, where items is an array with one item updated
      return { ...state, isLoading: false, items: updateObjectInArray(state.items, action.payload.item)};
    case '@@items/UPDATE_FAILURE':
      // Somehow communicate to UI that we fucked up
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

const updateObjectInArray = (array: Item[], newItem: Item) => {
  const index = array.findIndex(item => item.id === newItem.id);
  let newArray = array.slice(0, index);
  newArray = newArray.concat(newItem);
  newArray = newArray.concat(array.slice(index + 1, array.length));
  return newArray;
};

export default itemsReducer;
