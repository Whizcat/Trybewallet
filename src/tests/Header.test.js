import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRedux } from './helpers/renderWith';
import Header from '../components/Header';
import mockData from './helpers/mockData';

describe('Testa componente Header', () => {
  it('Verifica se as informações renderizam corretamente', () => {
    renderWithRedux(<Header />);
    const email = screen.getByTestId('email-field');
    const total = screen.getByTestId('total-field');
    const currency = screen.getByTestId('header-currency-field');

    expect(email).toBeInTheDocument();
    expect(email).toHaveTextContent('');

    expect(total).toBeInTheDocument();
    expect(total).toHaveTextContent('0');

    expect(currency).toBeInTheDocument();
    expect(currency).toHaveTextContent('BRL');
  });

  it('As informações do header mudam baseado no estado global', () => {
    const validEmail = 'tryber@teste.com';
    const initialState = {
      user: {
        email: validEmail,
      },
      wallet: {
        expenses: [
          {
            value: '1',
            description: '1 dolar',
            currency: 'USD',
            method: 'Dinheiro',
            tag: 'Alimentação',
            id: 0,
            exchangeRates: mockData,
          },
        ],
      },
    };

    const dollarToReal = Number(mockData.USD.ask).toFixed(2);

    const options = {
      initialState,
    };

    renderWithRedux(<Header />, options);
    const email = screen.getByTestId('email-field');
    const total = screen.getByTestId('total-field');
    expect(email).toHaveTextContent(validEmail);
    expect(total).toHaveTextContent(dollarToReal);
  });
});
