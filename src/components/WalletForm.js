import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getCurrencies,
  saveFullExpense,
  saveNewList,
  setupMadeAct,
} from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrencies());
  }

  componentDidUpdate() {
    const { editor, dispatch } = this.props;
    if (editor) {
      this.setupToEdit();
      dispatch(setupMadeAct());
    }
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  resetForm = () => {
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  handleExpense = () => {
    const { expenses, dispatch } = this.props;
    const expense = {
      ...this.state,
      id: expenses.length,
    };
    this.resetForm();
    dispatch(saveFullExpense(expense));
  };

  handleEdit = () => {
    const { idToEdit, expenses, dispatch } = this.props;
    const { exchangeRates } = expenses
      .find((item) => Number(item.id) === Number(idToEdit));

    const editedExpense = {
      ...this.state,
      id: idToEdit,
      exchangeRates,
    };
    const newList = [...expenses];
    newList[idToEdit] = editedExpense;
    this.resetForm();
    dispatch(saveNewList(newList));
  };

  setupToEdit = () => {
    const { idToEdit, expenses } = this.props;
    const itemToEdit = expenses.find((item) => Number(item.id) === Number(idToEdit));
    const { value, description, currency, method, tag } = itemToEdit;
    this.setState({
      value,
      description,
      currency,
      method,
      tag,
    });
  };

  render() {
    const { currencies, fetching, shouldEdit } = this.props;
    const { value, description, currency, method, tag } = this.state;
    if (fetching) {
      return (
        <p data-testid="fetching">Loading...</p>
      );
    }
    return (
      <form>
        <label htmlFor="value">
          Valor:
          <input
            value={ value }
            name="value"
            id="value"
            type="number"
            data-testid="value-input"
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="description">
          Descrição:
          <input
            value={ description }
            name="description"
            type="text"
            id="description"
            data-testid="description-input"
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="currency">
          Moeda:
          <select
            value={ currency }
            id="currency"
            data-testid="currency-input"
            name="currency"
            onChange={ this.handleChange }
          >
            {
              currencies.map((element) => (
                <option
                  value={ element }
                  key={ element }
                >
                  {element}
                </option>
              ))
            }
          </select>
        </label>

        <label htmlFor="method">
          Método de pagamento:
          <select
            value={ method }
            data-testid="method-input"
            id="method"
            name="method"
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag">
          Tag:
          <select
            value={ tag }
            id="tag"
            data-testid="tag-input"
            name="tag"
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>

        <button
          type="button"
          onClick={ shouldEdit ? this.handleEdit : this.handleExpense }
        >
          {shouldEdit ? 'Editar despesa' : 'Adicionar despesa'}
        </button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  fetching: PropTypes.bool.isRequired,
  shouldEdit: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
  editor: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    currencies: state.wallet.currencies,
    expenses: state.wallet.expenses,
    fetching: state.wallet.fetching,
    shouldEdit: state.wallet.shouldEdit,
    idToEdit: state.wallet.idToEdit,
    editor: state.wallet.editor,
  };
}

export default connect(mapStateToProps)(WalletForm);
