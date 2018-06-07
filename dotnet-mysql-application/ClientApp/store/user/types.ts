import { Action } from 'redux';

export interface UserState {
  currentUser?: UserInfo,
  loading: boolean
}

export interface UserToken {
  id: string,
  authToken: string,
}

export interface UserCredentials {
  username: string,
  password: string,
}

export interface UserInfo {
  email: string,
  password?: string,
  firstName: string,
  lastName: string,
}

export interface SignUpUserAction extends Action {
  type: '@@user/SIGNUP';
  payload: {
    user: UserInfo,
  }
}

export interface SignUpUserSuccessAction extends Action {
  type: '@@user/SIGNUP_SUCCESS';
  payload: {
    message: string,
  }
}

export interface SignUpUserFailureAction extends Action {
  type: '@@user/SIGNUP_FAILURE'
  payload: {
    message: string,
  }
}

export interface ResetUserAction extends Action {
  type: '@@user/RESET_USER'
}

export interface SignInUserAction extends Action {
  type: '@@user/SIGNIN';
  payload: {
    credentials: UserCredentials,
  }
}

export interface SignInUserSuccessAction extends Action {
  type: '@@user/SIGNIN_SUCCESS';
  payload: {
    token: UserToken,
  }
}

export interface SignInUserFailureAction extends Action {
  type: '@@user/SIGNIN_FAILURE';
  payload: {
    message: string,
  }
}

export interface UserFromTokenAction extends Action {
  type: '@@user/USER_FROM_TOKEN';
  payload: {
    token: UserToken,
  }
}

export interface UserFromTokenSuccessAction extends Action {
  type: '@@user/USER_FROM_TOKEN_SUCCESS';
  payload: {
    user: UserInfo,
  }
}

export interface UserFromTokenFailureAction extends Action {
  type: '@@user/USER_FROM_TOKEN_FAILURE';
  payload: {
    message: string,
  }
}

export interface ResetTokenAction extends Action {
  type: '@@user/RESET_TOKEN';
}

export type UserSignUpActions = SignUpUserAction | SignUpUserSuccessAction | SignUpUserFailureAction | ResetUserAction;
export type UserSignInActions = SignInUserAction | SignInUserSuccessAction | SignInUserFailureAction;
export type UserFromTokenActions = UserFromTokenAction | UserFromTokenSuccessAction | UserFromTokenFailureAction | ResetTokenAction;
export type UserActions = UserSignUpActions | UserSignInActions | UserFromTokenActions;