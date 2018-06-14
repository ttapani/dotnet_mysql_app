import { UserCredentials } from '../store/user/types';

const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/api' : '/api';
const HEADERS = { 'content-type': 'application/json'};
const jwt = '';

export function signInUserApi(credentials: UserCredentials) {
    console.log('entered promise creator in api');
    const url = ROOT_URL + '/auth';
    const promise = fetch(url,
      {body: JSON.stringify(credentials), headers: HEADERS, method: 'POST'});
    return promise;
}
