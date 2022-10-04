import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './header.module.scss';
import logo from '../images/main-logo.png';
import currencyImg from '../images/currency.png';
import user from '../images/default-user-icon.png';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <header className={ styles.header }>
        <img src={ logo } alt="logo" className={ styles.logo } />

        <div className={ styles.currency }>
          <img src={ currencyImg } alt="icone moeda" />
          <p>
            <strong>Despesa Total:</strong>
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
        </div>

        <div className={ styles.user }>
          <img src={ user } alt="icone usuário" />
          <p>
            <strong>Email:</strong>
            <span data-testid="email-field">{email}</span>
          </p>
        </div>

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
