import React from 'react';
import { render, waitForElement } from '@testing-library/react';
import App from '../App';

describe('Criar página de listagem de produtos vazia', () => {
  it('render without crash', () => {
    render(<App />);
  });

  it('should have a message', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('home-initial-message')).toHaveTextContent('Digite algum termo de pesquisa ou escolha uma categoria.')
  });
});
