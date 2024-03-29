import { UserCredentials } from '../store/user/types';
import { Item } from '../store/item/types';
import { LoanReturnRequest } from '../store/loan/types';

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

export const addItem = (item: Item) => {
  console.log('entered promise creator in api');
  const url = ROOT_URL + '/v1/items';
  const promise = fetch(url,
    {body: JSON.stringify(item), headers: getHeaders(), method: 'POST'});
  return promise;
};

export const updateItem = (item: Item) => {
  console.log('entered promise creator in api');
  const url = `${ROOT_URL}/v1/items/${item.id}`;
  const promise = fetch(url,
    {body: JSON.stringify(item), headers: getHeaders(), method: 'PUT'});
  return promise;
};

export const deleteItem = (item: Item) => {
  console.log('entered promise creator in api');
  const url = `${ROOT_URL}/v1/items/${item.id}`;
  const promise = fetch(url,
    {headers: getHeaders(), method: 'DELETE'});
  return promise;
};

export const getLoans = () => {
  console.log('entered get loans promise creator in api');
  const url = ROOT_URL + '/v1/loan';
  const promise = fetch(url,
    {headers: getHeaders(), method: 'GET'});
  return promise;
};

export const addLoan = (id: string) => {
  console.log('entered add loan promise creator in api');
  const url = ROOT_URL + '/v1/loan';
  const requestObject = {id: id};
  const promise = fetch(url,
    {body: JSON.stringify(requestObject), headers: getHeaders(), method: 'POST'});
  return promise;
};

export const returnLoan = (request: LoanReturnRequest) => {
  console.log('entered return loan promise creator in api');
  const url = `${ROOT_URL}/v1/loan/${request.id}`;
  const requestObject = {ReturnedTime: request.clientTime};
  const promise = fetch(url,
    {body: JSON.stringify(requestObject), headers: getHeaders(), method: 'PUT'});
  return promise;
};
