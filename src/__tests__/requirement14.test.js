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

describe('A quantidade de produtos adicionados ao carrinho deve ser limitada pela quantidade disponível em estoque', () => {
  it('should add product to shopping cart list from the product list page until the availability quantity', async () => {
    render(<App />);
    await waitFor(() => expect(api.getCategories).toHaveBeenCalled());
    fireEvent.click(screen.getAllByTestId('category')[0]);
    await waitFor(() => expect(api.getProductsFromCategoryAndQuery).toHaveBeenCalled());
    fireEvent.click(screen.getAllByTestId('product-add-to-cart')[1]);
    fireEvent.click(screen.getAllByTestId('product-add-to-cart')[1]);
    fireEvent.click(screen.getAllByTestId('product-add-to-cart')[1]);
    fireEvent.click(screen.getAllByTestId('product-add-to-cart')[1]);
    fireEvent.click(screen.getAllByTestId('product-add-to-cart')[1]);
    fireEvent.click(screen.getByTestId('shopping-cart-button'));
    await waitFor(() => expect(screen.getAllByTestId('shopping-cart-product-name')));
    expect(screen.getByTestId('shopping-cart-product-name')).toHaveTextContent(mockedQueryResult.results[1].title);
    expect(screen.getByTestId('shopping-cart-product-quantity')).toHaveTextContent(mockedQueryResult.results[1].available_quantity);
  });

  // it('should add product to shopping cart list from product details page until the availability quantity', async () => {
  //   render(<App />);
  //   await waitFor(() => expect(api.getCategories).toHaveBeenCalled());
  //   fireEvent.click(screen.getAllByTestId('category')[0]);
  //   await waitFor(() => expect(api.getProductsFromCategoryAndQuery).toHaveBeenCalled());
  //   fireEvent.click(screen.getAllByTestId('product-detail-link')[0]);
  //   await waitFor(() => expect(screen.getByTestId('product-detail-name')).toHaveTextContent(mockedQueryResult.results[0].title));
  //   fireEvent.click(screen.getByTestId('product-detail-add-to-cart'));
  //   fireEvent.click(screen.getByTestId('product-detail-add-to-cart'));
  //   fireEvent.click(screen.getByTestId('product-detail-add-to-cart'));
  //   fireEvent.click(screen.getByTestId('product-detail-add-to-cart'));
  //   fireEvent.click(screen.getByTestId('shopping-cart-button'));
  //   await waitFor(() => expect(screen.getAllByTestId('shopping-cart-product-name')));
  //   expect(screen.getAllByTestId('shopping-cart-product-name')[0]).toHaveTextContent(mockedQueryResult.results[1].title);
  //   expect(screen.getAllByTestId('shopping-cart-product-quantity')[0]).toHaveTextContent(mockedQueryResult.results[1].available_quantity);
  // });

  // it('should increase  quantity in shopping cart list until the availability quantity', async () => {
  //   render(<App />);
  //   await waitFor(() => expect(api.getCategories).toHaveBeenCalled());
  //   fireEvent.click(screen.getAllByTestId('category')[0]);
  //   await waitFor(() => expect(api.getProductsFromCategoryAndQuery).toHaveBeenCalled());
  //   fireEvent.click(screen.getAllByTestId('product-add-to-cart')[1]);
  //   fireEvent.click(screen.getByTestId('shopping-cart-button'));
  //   await waitFor(() => expect(screen.getAllByTestId('shopping-cart-product-name')));
  //   expect(screen.getAllByTestId('shopping-cart-product-name')[1]).toHaveTextContent(mockedQueryResult.results[1].title);
  //   expect(screen.getAllByTestId('shopping-cart-product-quantity')[1]).toHaveTextContent('1');
  //   fireEvent.click(screen.getAllByTestId('product-increase-quantity')[1]);
  //   fireEvent.click(screen.getAllByTestId('product-increase-quantity')[1]);
  //   fireEvent.click(screen.getAllByTestId('product-increase-quantity')[1]);
  //   expect(screen.getAllByTestId('shopping-cart-product-quantity')[1]).toHaveTextContent(mockedQueryResult.results[1].available_quantity);
  // });
});
