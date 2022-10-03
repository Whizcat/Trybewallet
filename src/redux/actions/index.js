const SAVE_USER = 'SAVE_USER';
const SET_CURRENCIES = 'SET_CURRENCIES';
const SAVE_EXPENSE = 'SAVE_EXPENSE';
const FETCHING = 'FETCHING';
const FETCH_DONE = 'FETCH_DONE';
const SAVE_NEW_LIST = 'SAVE_NEW_LIST';
const CHANGE_TO_EDIT = 'EDIT_EXPENSE';
const SETUP_MADE = 'SETUP_MADE';

function changeToEditAct(payload) {
  return {
    type: CHANGE_TO_EDIT,
    payload,
  };
}

function setupMadeAct() {
  return {
    type: SETUP_MADE,
  };
}

function saveNewList(payload) {
  return {
    type: SAVE_NEW_LIST,
    payload,
  };
}

function saveUserAct(payload) {
  return {
    type: SAVE_USER,
    payload,
  };
}

function fetchDoneAct() {
  return {
    type: FETCH_DONE,
  };
}

function fetchingAct() {
  return {
    type: FETCHING,
  };
}

function setCurrenciesAct(payload) {
  return {
    type: SET_CURRENCIES,
    payload,
  };
}

function getCurrencies() {
  return async (dispatch) => {
    const endpoint = 'https://economia.awesomeapi.com.br/json/all';
    dispatch(fetchingAct());
    const response = await fetch(endpoint);
    const data = await response.json();
    dispatch(fetchDoneAct());
    const currencies = Object.keys(data).filter((currency) => currency !== 'USDT');
    dispatch(setCurrenciesAct(currencies));
  };
}

function saveExpense(payload) {
  return {
    type: SAVE_EXPENSE,
    payload,
  };
}

function saveFullExpense(expense) {
  return async (dispatch) => {
    const endpoint = 'https://economia.awesomeapi.com.br/json/all';
    dispatch(fetchingAct());
    const response = await fetch(endpoint);
    const data = await response.json();
    dispatch(fetchDoneAct());
    const fullExpense = {
      ...expense,
      exchangeRates: {
        ...data,
      },
    };
    dispatch(saveExpense(fullExpense));
  };
}

export {
  setupMadeAct,
  SETUP_MADE,
  changeToEditAct,
  CHANGE_TO_EDIT,
  SAVE_NEW_LIST,
  saveNewList,
  FETCH_DONE,
  FETCHING,
  saveFullExpense,
  getCurrencies,
  SET_CURRENCIES,
  SAVE_USER,
  saveUserAct,
  saveExpense,
  SAVE_EXPENSE,
};
