import { Reducer } from 'redux';
import { FetchItemsState, GetItemsActions } from './types';

export const initialState: FetchItemsState = {
  items: [],
  isLoading: false,
};

const reducer: Reducer<FetchItemsState> = (state: FetchItemsState = initialState, action) => {
  switch ((action as GetItemsActions).type) {
    case '@@items/GET':
      return { ...state, isLoading: true };
    case '@@items/GET_SUCCESS':
      return { ...state,
        items: action.payload.items,
        isLoading: false };
    case '@@items/GET_FAILURE':
      return { ...state, message: action.payload.message, isLoading: false };
    default:
      return state;
  }
};

export default reducer;
