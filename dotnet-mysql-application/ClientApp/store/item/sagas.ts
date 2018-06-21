// tslint:disable-next-line:no-submodule-imports
import { call, put, takeLatest, all } from 'redux-saga/effects';
import { GetItemsAction, GetItemsFailureAction, AddItemAction, DeleteItemAction, UpdateItemAction } from './types';
import { getItemsSuccess, getItemsFailure, addItemSuccess, addItemFailure, deleteItemSuccess } from './actions';
import { updateItemFailure, updateItemSuccess } from './actions';
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

export function* addItemAsync(action: AddItemAction) {
    console.log('item add saga entered');
    console.log('action: ' + action.type);
    try {
        const promise = Api.addItem(action.payload.item);
        console.log('about to yield to promise');
        const response = yield promise;
        if (response.ok) {
            console.log('about to parse response');
            const data = yield call([response, 'json']);
            console.log(data);
            yield put(addItemSuccess(data));
        } else {
            throw new Error('Something went wrong');
        }
    } catch (err) {
        console.log(err.message);
        yield put(addItemFailure(err.message));
    }
}

export function* watchAddItem() {
    yield takeLatest('@@items/ADD', addItemAsync);
}

export function* watchAddItemFailure() {
    yield takeLatest('@@items/ADD_FAILURE', alertUser);
}

export function* updateItemAsync(action: UpdateItemAction) {
    console.log('item update saga entered');
    console.log('action: ' + action.type);
    try {
        const promise = Api.updateItem(action.payload.item);
        console.log('about to yield to promise');
        const response = yield promise;
        if (response.ok) {
            console.log('about to parse response');
            const data = yield call([response, 'json']);
            console.log(data);
            yield put(updateItemSuccess(data));
        } else {
            throw new Error('Something went wrong');
        }
    } catch (err) {
        console.log(err.message);
        yield put(updateItemFailure(err.message));
    }
}

export function* watchUpdateItem() {
    yield takeLatest('@@items/UPDATE', updateItemAsync);
}

export function* watchUpdateItemFailure() {
    yield takeLatest('@@items/UPDATE_FAILURE', alertUser);
}

export function* deleteItemAsync(action: DeleteItemAction) {
    console.log('item delete saga entered');
    console.log('action: ' + action.type);
    try {
        const promise = Api.deleteItem(action.payload.item);
        console.log('about to yield to promise');
        const response = yield promise;
        if (response.ok) {
            yield put(deleteItemSuccess(action.payload.item));
        } else {
            throw new Error('Something went wrong');
        }
    } catch (err) {
        console.log(err.message);
        yield put(addItemFailure(err.message));
    }
}

export function* watchDeleteItem() {
    yield takeLatest('@@items/DELETE', deleteItemAsync);
}

export function* watchDeleteItemFailure() {
    yield takeLatest('@@items/DELETE_FAILURE', alertUser);
}

export default function* itemsSagas() {
    yield all([
        watchGetItems(),
        watchGetItemsFailure(),
        watchAddItem(),
        watchAddItemFailure(),
        watchUpdateItem(),
        watchUpdateItemFailure(),
        watchDeleteItem(),
        watchDeleteItemFailure(),
    ]);
}
