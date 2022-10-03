import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <header>
        <p>
          Email:
          <span data-testid="email-field">{email}</span>
        </p>

        <p>
          Despesa Total:
          <span data-testid="total-field">
            {
              expenses.reduce((total, element) => {
                const { currency, value } = element;
                const { ask } = element.exchangeRates[currency];
                const expenseInBRL = Number(total) + (Number(ask) * value);
                return expenseInBRL;
              }, 0).toFixed(2)
            }
          </span>
          <span data-testid="header-currency-field">BRL</span>
        </p>
      </header>
    );
  }
}

function mapStateToProps(state) {
  return {
    email: state.user.email,
    expenses: state.wallet.expenses,
  };
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({

  })).isRequired,
};

export default connect(mapStateToProps)(Header);
