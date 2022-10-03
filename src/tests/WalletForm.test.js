import React from 'react';
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRedux } from './helpers/renderWith';
import WalletForm from '../components/WalletForm';

describe('Testa componente WalletForm', () => {
  const valueTestId = 'value-input';
  const descriptionTestId = 'description-input';
  const currencyTestId = 'currency-input';
  const methodTestId = 'method-input';
  const tagTestId = 'tag-input';
  it('Renderiza campos corretamente', async () => {
    renderWithRedux(<WalletForm />);
    await waitForElementToBeRemoved(() => screen.getByTestId('fetching'));
    const value = screen.getByTestId(valueTestId);

    const description = screen.getByTestId(descriptionTestId);

    const currency = screen.getByTestId(currencyTestId);

    const method = screen.getByTestId(methodTestId);

    const tag = screen.getByTestId(tagTestId);

    const addBtn = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });

    expect(value).toBeInTheDocument();
    expect(value.value).toBe('');

    expect(description).toBeInTheDocument();
    expect(description.value).toBe('');

    expect(currency).toBeInTheDocument();
    expect(currency.value).toBe('USD');

    expect(method).toBeInTheDocument();
    expect(method.value).toBe('Dinheiro');

    expect(tag).toBeInTheDocument();
    expect(tag.value).toBe('Alimentação');

    expect(addBtn).toBeInTheDocument();
  });

  it('É possível preencher o formulário corretamente', async () => {
    renderWithRedux(<WalletForm />);
    await waitForElementToBeRemoved(() => screen.getByTestId('fetching'));
    const value = screen.getByTestId(valueTestId);

    const description = screen.getByTestId(descriptionTestId);

    const currency = screen.getByTestId(currencyTestId);

    const method = screen.getByTestId(methodTestId);

    const tag = screen.getByTestId(tagTestId);

    const addBtn = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });

    userEvent.type(value, '10');
    expect(value.value).toBe('10');

    userEvent.type(description, 'dez dólares');
    expect(description.value).toBe('dez dólares');

    userEvent.selectOptions(currency, 'DOGE');
    expect(currency.value).toBe('DOGE');

    userEvent.selectOptions(method, 'Cartão de crédito');
    expect(method.value).toBe('Cartão de crédito');

    userEvent.selectOptions(tag, 'Lazer');
    expect(tag.value).toBe('Lazer');

    expect(addBtn).not.toBeDisabled();
    userEvent.click(addBtn);
    await waitForElementToBeRemoved(() => screen.getByTestId('fetching'));
    expect(screen.getByTestId(valueTestId).value).toBe('');
    expect(screen.getByTestId(descriptionTestId).value).toBe('');
  });
});
