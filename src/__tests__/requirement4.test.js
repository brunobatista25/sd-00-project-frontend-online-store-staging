import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import * as api from '../services/api';

jest.mock('../services/api');
const categories = [{
  "id": "MLB5672",
  "name": "Acessórios para Veículos"
}, {
  "id": "MLB271599",
  "name": "Agro"
}, {
  "id": "MLB1403",
  "name": "Alimentos e Bebidas"
}];
api.getCategories.mockImplementation(() => Promise.resolve(categories));

describe('Listar as categorias de produtos disponíveis via API na página principal', () => {
  it('should request categories from API and show it in the page', async () => {
    render(<App />);
    await waitFor(() => expect(api.getCategories).toHaveBeenCalled());
    expect(screen.getAllByTestId('category').length).toEqual(categories.length);
  });
});
