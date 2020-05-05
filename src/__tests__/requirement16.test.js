import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from '../App';
import * as api from '../services/api';
import mockedCategoriesResult from '../__mocks__/categories';
import mockedQueryResult from '../__mocks__/query';

jest.mock('../services/api');
api.getCategories.mockImplementation(
  () => Promise.resolve(mockedCategoriesResult)
);
api.getProductsFromCategoryAndQuery.mockImplementation(
  () => Promise.resolve(mockedQueryResult)
);

describe('Ordenar os produtos da listagem por preço', () => {
  it('should order produtos by price in shopping cart list', async () => {
    render(<App />);
    await waitFor(() => expect(api.getCategories).toHaveBeenCalled());
    fireEvent.click(screen.getAllByTestId('category')[0]);
    await waitFor(() => expect(api.getProductsFromCategoryAndQuery).toHaveBeenCalled());
    expect(screen.getAllByTestId('product-title')[0]).toHaveTextContent(mockedQueryResult.results[1].title);
    expect(screen.getAllByTestId('product-title')[1]).toHaveTextContent(mockedQueryResult.results[0].title);
  });
});
