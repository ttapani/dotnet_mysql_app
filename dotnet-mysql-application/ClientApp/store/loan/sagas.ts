// tslint:disable-next-line:no-submodule-imports
import { call, put, takeLatest, all } from 'redux-saga/effects';
import { GetLoansAction, GetLoansFailureAction, AddLoanAction } from './types';
import { getLoansSuccess, getLoansFailure, addLoanSuccess, addLoanFailure } from './actions';
import * as Api from '../../services/api';
import { getItems } from '../item/actions';

export function* getLoansAsync(action: GetLoansAction) {
    console.log('get loans saga entered');
    console.log('action: ' + action.type);
    try {
        const promise = Api.getLoans();
        console.log('about to yield to promise');
        const response = yield promise;
        if (response.ok) {
            console.log('about to parse response');
            const data = yield call([response, 'json']);
            console.log(data);
            yield put(getLoansSuccess(data));
        } else {
            throw new Error('Something went wrong: ' + response);
        }
    } catch (err) {
        console.log(err.message);
        yield put(getLoansFailure(err.message));
    }
}

export function* watchGetLoans() {
    yield takeLatest('@@loans/GET', getLoansAsync);
}

export function* alertUser(action: GetLoansFailureAction) {
    console.log('loans failure saga entered');
    yield call(window.alert, action.payload.error);
}

export function* watchGetItemsFailure() {
    yield takeLatest('@@loans/GET_FAILURE', alertUser);
}

export function* addLoanAsync(action: AddLoanAction) {
    console.log('add loan add saga entered');
    console.log('action: ' + action.type);
    try {
        const promise = Api.addLoan(action.payload.id);
        console.log('about to yield to promise');
        const response = yield promise;
        if (response.ok) {
            console.log('about to parse response');
            const data = yield call([response, 'json']);
            console.log(data);
            yield put(addLoanSuccess(data));
            yield put(getItems());
        } else {
            throw new Error('Something went wrong');
        }
    } catch (err) {
        console.log(err.message);
        yield put(addLoanFailure(err.message));
    }
}

export function* watchAddLoan() {
    yield takeLatest('@@loans/ADD', addLoanAsync);
}

export function* watchAddLoanFailure() {
    yield takeLatest('@@loans/ADD_FAILURE', alertUser);
}

export default function* loansSagas() {
    yield all([
        watchGetLoans(),
        watchGetItemsFailure(),
        watchAddLoan(),
        watchAddLoanFailure(),
    ]);
}
