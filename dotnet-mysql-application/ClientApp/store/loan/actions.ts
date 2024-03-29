import { ActionCreator } from 'redux';
import { Loan, LoanReturnRequest } from './types';
import { GetLoansAction, GetLoansSuccessAction, GetLoansFailureAction } from './types';
import { AddLoanAction, AddLoanSuccessAction, AddLoanFailureAction } from './types';
import { ReturnLoanAction, ReturnLoanSuccessAction, ReturnLoanFailureAction } from './types';

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

export const addLoan: ActionCreator<AddLoanAction> = (id: string) => ({
    type: '@@loans/ADD',
    payload: {
        id,
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

export const returnLoan: ActionCreator<ReturnLoanAction> = (returnRequest: LoanReturnRequest) => ({
    type: '@@loans/RETURN',
    payload: {
        returnRequest,
    },
});

export const returnLoanSuccess: ActionCreator<ReturnLoanSuccessAction> = (loan: Loan) => ({
    type: '@@loans/RETURN_SUCCESS',
    payload: {
        loan,
    },
});

export const returnLoanFailure: ActionCreator<ReturnLoanFailureAction> = (error: string) => ({
    type: '@@loans/RETURN_FAILURE',
    payload: {
        error,
    },
});
