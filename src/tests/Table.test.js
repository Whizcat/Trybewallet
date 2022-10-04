import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRedux } from './helpers/renderWith';
import Table from '../components/Table';
import mockData from './helpers/mockData';

describe('Testa componente Table', () => {
  it('Renderiza corretamente uma despesa', () => {
    const initialState = {
      wallet: {
        expenses: [{
          value: '1',
          description: 'sapato',
          currency: 'AUD',
          method: 'Dinheiro',
          tag: 'Lazer',
          id: '0',
          exchangeRates: mockData,
        }],
      },
    };

    const options = {
      initialState,
    };
    renderWithRedux(<Table />, options);
    expect(screen.getAllByRole('row').length).toBe(2);

    const description = screen.getByRole('cell', {
      name: /sapato/i,
    });
    expect(description).toBeInTheDocument();

    const tag = screen.getByRole('cell', {
      name: /lazer/i,
    });
    expect(tag).toBeInTheDocument();

    const method = screen.getByRole('cell', {
      name: /dinheiro/i,
    });
    expect(method).toBeInTheDocument();

    const value = screen.getByRole('cell', {
      name: /1/i,
    });
    expect(value).toBeInTheDocument();

    const currencyName = mockData.AUD.name;
    const currency = screen.getByRole('cell', {
      name: currencyName,
    });
    expect(currency).toBeInTheDocument();

    const currencyAsk = Number(mockData.AUD.ask).toFixed(2);

    const exchangeConverter = screen.getAllByRole('cell', {
      name: currencyAsk,
    });
    expect(exchangeConverter).toHaveLength(2);

    const exchangeCurrency = screen.getByRole('cell', {
      name: /brl/i,
    });

    expect(exchangeCurrency).toBeInTheDocument();
  });

  it('É possível excluir uma despesa', () => {
    const initialState = {
      wallet: {
        expenses: [{
          value: '1',
          description: 'sapato',
          currency: 'AUD',
          method: 'Dinheiro',
          tag: 'Lazer',
          id: '0',
          exchangeRates: mockData,
        }],
      },
    };

    const options = {
      initialState,
    };
    renderWithRedux(<Table />, options);
    expect(screen.getAllByRole('row').length).toBe(2);
    const deleteBtn = screen.getByRole('button', {
      name: /deletar/i,
    });
    userEvent.click(deleteBtn);
    expect(screen.getAllByRole('row').length).toBe(1);
    expect(deleteBtn).not.toBeInTheDocument();
  });
});
