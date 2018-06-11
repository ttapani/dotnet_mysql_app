import { Reducer } from 'redux';
import { LoginState, UserActions, UserInfo } from './types';

export const initialState: LoginState = {
  loggedIn: false,
  isLoggingIn: false,
};

const reducer: Reducer<LoginState> = (state: LoginState = initialState, action) => {
  switch ((action as UserActions).type) {
    case '@@user/SIGNIN':
      return { ...state, loggedIn: false, credentials: action.payload.credentials, isLoggingIn: true };
    case '@@user/SIGNIN_SUCCESS':
      return { ...state, loggedIn: true, token: action.payload.token, isLoggingIn: false };
    case '@@user/SIGNIN_FAILURE':
      return { ...state, loggedIn: false, message: action.payload.message, isLoggingIn: false };
    default:
      return state;
  }
}

export default reducer;