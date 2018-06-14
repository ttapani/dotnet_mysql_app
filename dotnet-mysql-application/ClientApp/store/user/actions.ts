import { ActionCreator, Action } from 'redux';

import { SignUpUserAction, SignUpUserSuccessAction,
        SignUpUserFailureAction, LogOutUserAction, SignInUserAction,
        SignInUserSuccessAction, SignInUserFailureAction, UserInfo,
        UserCredentials, UserToken, UserFromTokenAction, UserFromTokenSuccessAction,
        UserFromTokenFailureAction } from './types';

// Type these action creators with `: ActionCreator<ActionTypeYouWantToPass>`.
// Remember, you can also pass parameters into an action creator. Make sure to
// type them properly.

export const signUpUser: ActionCreator<SignUpUserAction> = (user: UserInfo) => ({
    type: '@@user/SIGNUP',
    payload: {
        user,
    },
});

export const signUpUserSuccess: ActionCreator<SignUpUserSuccessAction> = (message: string) => ({
    type: '@@user/SIGNUP_SUCCESS',
    payload: {
        message,
    },
});

export const signUpUserFailure: ActionCreator<SignUpUserFailureAction> = (message: string) => ({
    type: '@@user/SIGNUP_FAILURE',
    payload: {
        message,
    },
});

export const logOutUser: ActionCreator<LogOutUserAction> = () => ({
    type: '@@user/LOGOUT',
});

export const signInUser: ActionCreator<SignInUserAction> = (credentials: UserCredentials) => ({
    type: '@@user/SIGNIN',
    payload: {
        credentials,
    },
});

export const signInUserSuccess: ActionCreator<SignInUserSuccessAction> = (token: UserToken) => ({
    type: '@@user/SIGNIN_SUCCESS',
    payload: {
        token,
    },
});

export const signInUserFailure: ActionCreator<SignInUserFailureAction> = (message: string) => ({
    type: '@@user/SIGNIN_FAILURE',
    payload: {
        message,
    },
});

export const userFromToken: ActionCreator<UserFromTokenAction> = (token: UserToken) => ({
    type: '@@user/USER_FROM_TOKEN',
    payload: {
        token,
    },
});

export const userFromTokenSuccess: ActionCreator<UserFromTokenSuccessAction> = (user: UserInfo) => ({
    type: '@@user/USER_FROM_TOKEN_SUCCESS',
    payload: {
        user,
    },
});

export const userFromTokenFailure: ActionCreator<UserFromTokenFailureAction> = (message: string) => ({
    type: '@@user/USER_FROM_TOKEN_FAILURE',
    payload: {
        message,
    },
});
