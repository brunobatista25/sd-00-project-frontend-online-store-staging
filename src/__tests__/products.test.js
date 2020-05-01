import React from 'react';
import { render, fireEvent, waitForElement, screen } from '@testing-library/react';
import App from '../App';

describe('Criar página de listagem de produtos vazia', () => {
  it('render without crash', () => {
    render(<App />);
  });

  it('should have a message', () => {
    render(<App />);
    expect(screen.getByTestId('home-initial-message')).toHaveTextContent('Digite algum termo de pesquisa ou escolha uma categoria.')
  });
});

describe('Criar página do carrinho de compras', () => {
  it('should have shopping cart button', () => {
    render(<App />);
    expect(screen.getByTestId('shopping-cart-button')).toBeDefined();
  });

  it('should visit and render message in shopping cart page', async () => {
    render(<App />);
    fireEvent.click(screen.getByTestId('shopping-cart-button'));
    await waitForElement(() => screen.getByTestId('shopping-cart-empty-message'));
    expect(screen.getByTestId('shopping-cart-empty-message')).toHaveTextContent('Seu carrinho está vazio')
  });
});
