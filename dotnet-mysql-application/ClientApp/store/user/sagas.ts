// tslint:disable-next-line:no-submodule-imports
import { call, put, takeLatest, all } from 'redux-saga/effects';
import {
  SignInUserAction,
  UserCredentials,
  SignInUserFailureAction,
  SignInUserSuccessAction, LogOutUserAction } from './types';
import { signInUserSuccess, signInUserFailure } from './actions';
import { push } from 'react-router-redux';
import { signInUserApi } from '../../services/api';

function* signinUserApi(credentials: UserCredentials) {
  const promise = signInUserApi(credentials);
  console.log('about to yield to promise');
  const response = yield promise;
  console.log('about to parse response');
  const data = yield call([response, 'json']);
  console.log(data);
  console.log('about to exit creator');
  return data;
}

export function* signInUserAsync(action: SignInUserAction) {
  console.log('saga entered');
  console.log('action: ' + action.type);
  try {
    const userToken = yield call(signinUserApi, action.payload.credentials);
    console.log(userToken);
    if (userToken.hasOwnProperty('auth_token')) {
      sessionStorage.setItem('jwtToken', userToken.auth_token);
      yield put(signInUserSuccess(userToken));
    } else {
      if ('Password' in userToken) {
        const {Password} = userToken;
        throw new Error(Password);
      } else if ('login_failure' in userToken) {
        const {login_failure} = userToken;
        throw new Error(login_failure);
      }
    }
  } catch (err) {
    console.log(err.message);
    yield put(signInUserFailure(err.message));
  }
}

export function* watchSignInUser() {
  yield takeLatest('@@user/SIGNIN', signInUserAsync);
}

export function* alertUser(action: SignInUserFailureAction) {
  console.log('failure saga entered');
  yield call(window.alert, action.payload.message);
}

export function* watchSignInUserFailure() {
  yield takeLatest('@@user/SIGNIN_FAILURE', alertUser);
}

export function* signInUser(action: SignInUserSuccessAction) {
  yield put(push('/'));
}

export function* watchSignInUserSuccess() {
  yield takeLatest('@@user/SIGNIN_SUCCESS', signInUser);
}

export function* logOutUser(action: LogOutUserAction) {
  sessionStorage.removeItem('jwtToken');
  console.log('removed jwttoken');
  yield put(push('/'));
}

export function* watchLogOutUser() {
  yield takeLatest('@@user/LOGOUT', logOutUser);
}

export default function* userSagas() {
  yield all([
    watchSignInUser(),
    watchSignInUserFailure(),
    watchSignInUserSuccess(),
    watchLogOutUser(),
  ]);
}
