import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveUserAct } from '../redux/actions';
import styles from './login.module.scss';
import logo from '../images/main-logo.png';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    loginDisabled: true,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => {
      this.validateLogin();
    });
  };

  validateLogin = () => {
    const { email, password } = this.state;
    const regexToEmail = /\S+@\S+\.\S+/;
    const validEmail = regexToEmail.test(email);

    const MIN_PASSWORD_CHARACTERS = 6;
    const validPassword = password.length >= MIN_PASSWORD_CHARACTERS;

    this.setState({
      loginDisabled: !(validPassword && validEmail),
    });
  };

  logIn = () => {
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(saveUserAct(email));
    history.push('/carteira');
  };

  render() {
    const { email, password, loginDisabled } = this.state;
    return (
      <div className={ styles.login }>
        <img src={ logo } alt="logo trybewallet" />
        <form className={ styles.login__form }>
          <label htmlFor="email">
            Email
            <input
              name="email"
              value={ email }
              id="email"
              onChange={ this.handleChange }
              type="email"
              data-testid="email-input"
              placeholder="Ex: exemplo@test.com"
              className="input_form"
            />
          </label>

          <label htmlFor="password">
            Senha
            <input
              name="password"
              value={ password }
              onChange={ this.handleChange }
              type="password"
              id="password"
              data-testid="password-input"
              placeholder="Sua senha"
              className="input_form"
            />
          </label>

          <button
            type="button"
            disabled={ loginDisabled }
            onClick={ this.logIn }
            className="input_button"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
