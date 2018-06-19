import { UserCredentials } from '../store/user/types';

const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/api' : '/api';
const jwt = 'Bearer: ' + sessionStorage.getItem('jwtToken') || '';
const HEADERS = { 'content-type': 'application/json', 'Authorization': jwt};

export function signInUserApi(credentials: UserCredentials) {
    console.log('entered promise creator in api');
    const url = ROOT_URL + '/auth';
    const promise = fetch(url,
      {body: JSON.stringify(credentials), headers: HEADERS, method: 'POST'});
    return promise;
}

export const getItems = () => {
    console.log('entered item promise creator in api');
    const url = ROOT_URL + '/v1/items';
    const promise = fetch(url,
      {headers: HEADERS, method: 'GET'});
    return promise;
};
