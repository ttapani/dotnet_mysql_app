import { call, put, takeLatest, all } from 'redux-saga/effects';
import { SignInUserAction, UserCredentials, UserToken } from './types';
import { Action } from 'redux';
import { signInUserSuccess, signInUserFailure } from './actions';

// loansystem-API
function* signinUserApi (credentials: UserCredentials) {
  console.log("entered promise creator");
  const url = "http://127.0.0.1:5001/api/auth";
  const promise = fetch(url, {body: JSON.stringify(credentials), headers: { 'content-type': 'application/json'}, method: 'POST'});
  console.log("about to yield to promise");
  const response = yield promise;
  console.log("about to parse response");
  const data = yield call([response, 'json']);
  console.log(data);
  console.log("about to exit creator");
  return data;
}

export function* signInUserAsync(action: SignInUserAction) {
  console.log("saga entered");
  console.log("action: " + action.type);
  try {
    const userToken = yield call(signinUserApi, action.payload.credentials);
    console.log(userToken)
    yield put(signInUserSuccess(userToken));
  } catch (err) {
    yield put(signInUserFailure(err));
  }
/*   if(userToken.hasOwnProperty('auth_token')) {
    console.log("success");
    yield put({ type: '@@user/SIGNIN_SUCCESS', userToken});
  } else {
    console.log("failure");
    yield put({ type: '@@user/SIGNIN_FAILURE', payload: 'error'});
  } */
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchSignInUser() {
  yield takeLatest('@@user/SIGNIN', signInUserAsync);
}

export default function* userSagas() {
  yield all([
    watchSignInUser()
  ])
}