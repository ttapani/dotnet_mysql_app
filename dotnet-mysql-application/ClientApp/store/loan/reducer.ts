import { Reducer } from 'redux';
import { LoansState, GetLoansActions, AddLoanActions, Loan, ReturnLoanActions } from './types';

type AllLoanActions = GetLoansActions | AddLoanActions | ReturnLoanActions;

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
    case '@@loans/RETURN':
      return { ...state, isLoading: true };
    case '@@loans/RETURN':
      return { ...state, isLoading: false, loans: updateObjectInArray(state.loans, action.payload.loan)};
      // return { ...state, isLoading: false, loans: [...state.loans, action.payload.loan ] };
    case '@@loans/RETURN_FAILURE':
      // Somehow communicate to UI that we fucked up
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

// This would be a cool case to use generics, but all our types would have to extend a type that always has id..
const updateObjectInArray = (array: Loan[], newLoan: Loan) => {
  const index = array.findIndex(item => item.id === newLoan.id);
  let newArray = array.slice(0, index);
  newArray = newArray.concat(newLoan);
  newArray = newArray.concat(array.slice(index + 1, array.length));
  return newArray;
};

export default loansReducer;
