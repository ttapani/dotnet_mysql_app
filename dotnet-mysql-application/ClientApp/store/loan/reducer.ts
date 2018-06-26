import { Reducer } from 'redux';
import { LoansState, GetLoansActions, AddLoanActions, Loan } from './types';

type AllLoanActions = GetLoansActions | AddLoanActions;

export const initialState: LoansState = {
  loans: [],
  isLoading: false,
};

const loansReducer: Reducer<LoansState> = (state: LoansState = initialState, action) => {
  switch ((action as AllLoanActions).type) {
    case '@@loans/GET':
      return { ...state, isLoading: true };
    case '@@loans/GET_SUCCESS':
      return { ...state,
        loans: action.payload.loans,
        isLoading: false };
    case '@@loans/GET_FAILURE':
      return { ...state, message: action.payload.message, isLoading: false };
    case '@@loans/ADD':
      return { ...state, isLoading: true };
    case '@@loans/ADD_SUCCESS':
      return { ...state, isLoading: false, loans: [...state.loans, action.payload.loan ] };
    case '@@loans/ADD_FAILURE':
      // Somehow communicate to UI that we fucked up
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

export default loansReducer;
