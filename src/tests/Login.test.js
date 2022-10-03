import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Testa a página de login', () => {
  const validEmail = 'tryber@teste.com';
  const validPassword = '123456';
  const emailTestId = 'email-input';
  const passwordTestId = 'password-input';
  it('Possui o campo Email, Senha e um botão de Entrar', () => {
    renderWithRouterAndRedux(<App />);
    const email = screen.getByTestId(emailTestId);
    const password = screen.getByTestId(passwordTestId);
    const btn = screen.getByRole('button', {
      name: /entrar/i,
    });

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
  });

  it('É possível digitar nos inputs e o botão começa desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    const email = screen.getByTestId(emailTestId);
    const password = screen.getByTestId(passwordTestId);
    const btn = screen.getByRole('button', {
      name: /entrar/i,
    });
    userEvent.type(email, 'lamborguine');
    expect(email).toHaveValue('lamborguine');

    userEvent.type(password, '1234');
    expect(password).toHaveValue('1234');

    expect(btn).toBeDisabled();
  });

  it('É possível entrar com dados válidos', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const email = screen.getByTestId(emailTestId);
    const password = screen.getByTestId(passwordTestId);
    const btn = screen.getByRole('button', {
      name: /entrar/i,
    });
    userEvent.type(email, validEmail);
    userEvent.type(password, validPassword);

    expect(btn).not.toBeDisabled();
    userEvent.click(btn);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/carteira');
  });

  it('O estado global recebe o email do usuário', () => {
    const { store } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(emailTestId);
    const password = screen.getByTestId(passwordTestId);
    const btn = screen.getByRole('button', {
      name: /entrar/i,
    });
    userEvent.type(emailInput, validEmail);
    userEvent.type(password, validPassword);
    userEvent.click(btn);
    const { user: { email } } = store.getState();
    expect(email).toBe(validEmail);
  });
});
