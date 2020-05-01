import * as api from '../services/api';

describe('Implementar módulo de acesso à API do Mercado Livre', () => {
  it('getCategories', () => {
    const successResponseBody = [{
      "id": "MLB5672",
      "name": "Acessórios para Veículos"
    }, {
      "id": "MLB271599",
      "name": "Agro"
    }, {
      "id": "MLB1403",
      "name": "Alimentos e Bebidas"
    }];

    const mockFetchPromise = Promise.resolve({
      json: () => Promise.resolve(successResponseBody)
    });

    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

    return api.getCategories().then(categories => {
      expect(global.fetch).toHaveBeenCalled();
      expect(global.fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/categories');
      expect(categories).toEqual(successResponseBody);
    });
  });

  it('getProductsFromCategory', () => {
    const categoryId = 'category1';
    const successResponseBody = {};

    const mockFetchPromise = Promise.resolve({
      json: () => Promise.resolve(successResponseBody)
    });

    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

    return api.getProductsFromCategory(categoryId).then(products => {
      expect(global.fetch).toHaveBeenCalled();
      expect(global.fetch).toHaveBeenCalledWith(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`);
      expect(products).toEqual(successResponseBody);
    });
  });

  it('getProductsFromQuery', () => {
    const query = 'my-query';
    const successResponseBody = {};

    const mockFetchPromise = Promise.resolve({
      json: () => Promise.resolve(successResponseBody)
    });

    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

    return api.getProductsFromQuery(query).then(products => {
      expect(global.fetch).toHaveBeenCalled();
      expect(global.fetch).toHaveBeenCalledWith(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
      expect(products).toEqual(successResponseBody);
    });
  });

  it('getProductsFromCategoryAndQuery', () => {
    const categoryId = 'category1';
    const query = 'my-query';
    const successResponseBody = {};

    const mockFetchPromise = Promise.resolve({
      json: () => Promise.resolve(successResponseBody)
    });

    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

    return api.getProductsFromCategoryAndQuery(categoryId, query).then(products => {
      expect(global.fetch).toHaveBeenCalled();
      expect(global.fetch).toHaveBeenCalledWith(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
      expect(products).toEqual(successResponseBody);
    });
  });
});
