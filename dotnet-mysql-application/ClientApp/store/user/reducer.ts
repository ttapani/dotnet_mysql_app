import { Reducer } from 'redux';
import { UserState, UserActions, UserInfo } from './types';

export const initialState: UserState = {
  loading: false,
};

const reducer: Reducer<UserState> = (state: UserState = initialState, action) => {
  // We'll augment the action type on the switch case to make sure we have
  // all the cases handled.
  switch ((action as UserActions).type) {
    case '@@user/SIGNIN':
      return { ...state, credentials: action.payload.credentials };
    case '@@user/SIGNIN_SUCCESS':
      return { ...state, token: action.payload.token };
    case '@@user/SIGNIN_FAILURE':
      return { ...state, message: action.payload.message };
    default:
      return state;
  }
}

export default reducer;