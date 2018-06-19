import { UserCredentials } from '../store/user/types';

const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost:3000/api' : '/api';

const getJWT = () => {
  if (sessionStorage != null) {
    const token = sessionStorage.getItem('jwtToken');
    return 'Bearer ' + token;
  } else {
    return '';
  }
};

const getHeaders = () => {
  return { 'content-type': 'application/json', 'Authorization': getJWT()};
};

export function signInUserApi(credentials: UserCredentials) {
    console.log('entered promise creator in api');
    const url = ROOT_URL + '/auth';
    const promise = fetch(url,
      {body: JSON.stringify(credentials), headers: getHeaders(), method: 'POST'});
    return promise;
}

export const getItems = () => {
    console.log('entered item promise creator in api');
    const url = ROOT_URL + '/v1/items';
    const promise = fetch(url,
      {headers: getHeaders(), method: 'GET'});
    return promise;
};
