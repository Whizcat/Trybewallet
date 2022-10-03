import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Wallet from '../pages/Wallet';
import { renderWithRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';

describe('Testa pagina /carteira', () => {
  it('É possível editar uma despesa', async () => {
    const valueTestId = 'value-input';
    const descriptionTestId = 'description-input';
    const initialState = {
      wallet: {
        currencies: [...Object.keys(mockData)],
        expenses: [{
          value: '1',
          description: 'sapato',
          currency: 'AUD',
          method: 'Dinheiro',
          tag: 'Lazer',
          id: '0',
          exchangeRates: mockData,
        }],
        fetching: false,
        idToEdit: 0,
        editor: false,
        shouldEdit: false,
      },
    };

    const options = {
      initialState,
    };
    renderWithRedux(<Wallet />, options);
    await waitForElementToBeRemoved(() => screen.getByTestId('fetching'));

    const editBtn = screen.getByRole('button', {
      name: /editar/i,
    });

    userEvent.click(editBtn);
    expect(screen.getByTestId(valueTestId).value).toBe('1');
    expect(screen.getByTestId(descriptionTestId).value).toBe('sapato');

    userEvent.clear(screen.getByTestId(valueTestId));
    userEvent.type(screen.getByTestId(valueTestId), '5');
    userEvent.clear(screen.getByTestId(descriptionTestId));
    userEvent.type(screen.getByTestId(descriptionTestId), 'travesseiro');

    const saveEditBtn = screen.getByRole('button', {
      name: /editar despesa/i,
    });

    userEvent.click(saveEditBtn);

    expect(screen.getAllByRole('row').length).toBe(2);
    expect(screen.getByRole('cell', {
      name: /5/i,
    })).toBeInTheDocument();

    expect(screen.getByRole('cell', {
      name: /travesseiro/i,
    })).toBeInTheDocument();
  });
});
