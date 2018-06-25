import { Action } from 'redux';

export interface LoanState {
    isLoading: boolean;
    loans: Loan[];
}

export interface Loan {
    id: string;
    userId: string;
    itemId: string;
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
        loan: Loan;
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
