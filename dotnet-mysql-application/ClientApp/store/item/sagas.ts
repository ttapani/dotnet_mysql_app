// tslint:disable-next-line:no-submodule-imports
import { call, put, takeLatest, all } from 'redux-saga/effects';
import { GetItemsAction, GetItemsSuccessAction, GetItemsFailureAction } from './types';
import { getItems, getItemsSuccess, getItemsFailure } from './actions';
import * as Api from '../../services/api';

export function* getItemsAsync(action: GetItemsAction) {
    console.log('items saga entered');
    console.log('action: ' + action.type);
    try {
        const promise = Api.getItems();
        console.log('about to yield to promise');
        const response = yield promise;
        if (response.ok) {
            console.log('about to parse response');
            const data = yield call([response, 'json']);
            console.log(data);
            yield put(getItemsSuccess(data));
        } else {
            throw new Error('Something went wrong');
        }
    } catch (err) {
        console.log(err.message);
        yield put(getItemsFailure(err.message));
    }
}

export function* watchGetItems() {
    yield takeLatest('@@items/GET', getItemsAsync);
}

export function* alertUser(action: GetItemsFailureAction) {
    console.log('item failure saga entered');
    yield call(window.alert, action.payload.error);
}

export function* watchGetItemsFailure() {
    yield takeLatest('@@items/GET_FAILURE', alertUser);
}

export default function* itemsSagas() {
    yield all([
        watchGetItems(),
        watchGetItemsFailure(),
    ]);
}
