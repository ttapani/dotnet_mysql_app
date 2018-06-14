import { Reducer } from 'redux';
import { LoginState, UserActions } from './types';

export const initialState: LoginState = {
  loggedIn: false,
  isLoggingIn: false,
};

const reducer: Reducer<LoginState> = (state: LoginState = initialState, action) => {
  switch ((action as UserActions).type) {
    case '@@user/SIGNIN':
      return { ...state, loggedIn: false, credentials: action.payload.credentials, isLoggingIn: true };
    case '@@user/SIGNIN_SUCCESS':
      return { ...state,
        loggedIn: true,
        token: action.payload.token.auth_token,
        isLoggingIn: false,
        userName: action.payload.token.id };
    case '@@user/SIGNIN_FAILURE':
      return { ...state, loggedIn: false, message: action.payload.message, isLoggingIn: false };
    case '@@user/LOGOUT':
      return { ...state, loggedIn: false, userName: 'guest' };
    default:
      return state;
  }
};

export default reducer;
