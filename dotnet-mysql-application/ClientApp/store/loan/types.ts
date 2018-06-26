import { Action } from 'redux';
import { Item } from '../item/types';

export interface LoansState {
    isLoading: boolean;
    loans: Loan[];
}

export interface Loan {
    id: string;
    userId: string;
    userName: string;
    itemId: string;
    item: Item;
    startDate: Date;
    endDate: Date;
}

export interface GetLoansAction extends Action {
    type: '@@loans/GET';
}

export interface GetLoansSuccessAction extends Action {
    type: '@@loans/GET_SUCCESS';
    payload: {
        loans: Loan[];
    };
}

export interface GetLoansFailureAction extends Action {
    type: '@@loans/GET_FAILURE';
    payload: {
        error: string;
    };
}

export interface AddLoanAction extends Action {
    type: '@@loans/ADD';
    payload: {
        id: string;
    };
}

export interface AddLoanSuccessAction extends Action {
    type: '@@loans/ADD_SUCCESS';
    payload: {
        loan: Loan;
    };
}

export interface AddLoanFailureAction extends Action {
    type: '@@loans/ADD_FAILURE';
    payload: {
        error: string;
    };
}

export type GetLoansActions = GetLoansAction | GetLoansSuccessAction | GetLoansFailureAction;
export type AddLoanActions = AddLoanAction | AddLoanSuccessAction | AddLoanFailureAction;
