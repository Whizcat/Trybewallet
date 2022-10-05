import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import nextId from 'react-id-generator';
import { saveNewList, changeToEditAct } from '../redux/actions';
import styles from './table.module.scss';
import deleteIcon from '../images/trashcan.png';
import editIcon from '../images/edit-icon.png';

class Table extends Component {
  deleteExpense = ({ target }) => {
    const { id } = target;
    const { expenses, dispatch } = this.props;
    const newList = expenses.filter((element) => Number(element.id) !== Number(id));
    dispatch(saveNewList(newList));
  };

  editExpense = ({ target: { id } }) => {
    const { dispatch } = this.props;
    dispatch(changeToEditAct(Number(id)));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div className={ styles.table_container }>
        <table className={ styles.table }>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {
              expenses.map((expense) => {
                const {
                  description,
                  tag,
                  method,
                  value,
                  currency,
                  id,
                  exchangeRates,
                } = expense;
                const { ask, name } = exchangeRates[currency];
                const convertedValue = Number(ask) * Number(value);
                return (
                  <tr key={ nextId() }>
                    <td>{description}</td>
                    <td>{tag}</td>
                    <td>{method}</td>
                    <td>{Number(value).toFixed(2)}</td>
                    <td>{name}</td>
                    <td>{Number(ask).toFixed(2)}</td>
                    <td>{convertedValue.toFixed(2)}</td>
                    <td>BRL</td>
                    <td className={ styles.table_buttons }>
                      <button
                        type="button"
                        data-testid="edit-btn"
                        id={ id }
                        onClick={ this.editExpense }
                      >
                        <span id={ id }>Editar</span>
                        <img src={ editIcon } alt="edit button" id={ id } />
                      </button>
                      <button
                        data-testid="delete-btn"
                        type="button"
                        id={ id }
                        onClick={ this.deleteExpense }
                      >
                        <span id={ id }>Deletar</span>
                        <img src={ deleteIcon } alt="delete" id={ id } />
                      </button>
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    expenses: state.wallet.expenses,
  };
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
