// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  SET_CURRENCIES,
  SAVE_EXPENSE,
  FETCHING,
  FETCH_DONE,
  SAVE_NEW_LIST,
  CHANGE_TO_EDIT,
  SETUP_MADE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  fetching: false,
  shouldEdit: false,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_CURRENCIES:
    return {
      ...state,
      currencies: action.payload,
    };
  case SAVE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case SAVE_NEW_LIST:
    return {
      ...state,
      expenses: action.payload,
      shouldEdit: false,
    };
  case FETCHING:
    return {
      ...state,
      fetching: true,
    };
  case FETCH_DONE:
    return {
      ...state,
      fetching: false,
    };
  case CHANGE_TO_EDIT:
    return {
      ...state,
      shouldEdit: true,
      editor: true,
      idToEdit: action.payload,
    };
  case SETUP_MADE:
    return {
      ...state,
      editor: false,
    };
  default:
    return state;
  }
}

export default wallet;
