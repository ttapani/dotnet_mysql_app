import { ActionCreator } from 'redux';
import { Loan } from './types';
import { GetLoansAction, GetLoansSuccessAction, GetLoansFailureAction } from './types';
import { AddLoanAction, AddLoanSuccessAction, AddLoanFailureAction } from './types';

export const getLoans: ActionCreator<GetLoansAction> = () => ({
    type: '@@loans/GET',
});

export const getLoansSuccess: ActionCreator<GetLoansSuccessAction> = (loans: Loan[]) => ({
    type: '@@loans/GET_SUCCESS',
    payload: {
        loans,
    },
});

export const getLoansFailure: ActionCreator<GetLoansFailureAction> = (error: string) => ({
    type: '@@loans/GET_FAILURE',
    payload: {
        error,
    },
});

export const addLoan: ActionCreator<AddLoanAction> = (loan: Loan) => ({
    type: '@@loans/ADD',
    payload: {
        loan,
    },
});

export const addLoanSuccess: ActionCreator<AddLoanSuccessAction> = (loan: Loan) => ({
    type: '@@loans/ADD_SUCCESS',
    payload: {
        loan,
    },
});

export const addLoanFailure: ActionCreator<AddLoanFailureAction> = (error: string) => ({
    type: '@@loans/ADD_FAILURE',
    payload: {
        error,
    },
});
