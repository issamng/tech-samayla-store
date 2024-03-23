import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { CartContext, CartContextProvider } from '../../components/CartContext';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};

  return {
    getItem: jest.fn((key) => store[key]),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn((key) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('CartContextProvider', () => {
  it('adds product to cart', () => {
    const { getByText } = render(
      <CartContextProvider>
        <CartContext.Consumer>
          {({ addProduct }) => (
            <button onClick={() => addProduct('1')}>Add Product</button>
          )}
        </CartContext.Consumer>
      </CartContextProvider>
    );

    fireEvent.click(getByText('Add Product'));

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'cart',
      JSON.stringify(['1'])
    );
  });

  it('removes product from cart', () => {
    localStorage.setItem('cart', JSON.stringify(['1', '2']));

    const { getByText } = render(
      <CartContextProvider>
        <CartContext.Consumer>
          {({ removeProduct }) => (
            <button onClick={() => removeProduct('1')}>Remove Product</button>
          )}
        </CartContext.Consumer>
      </CartContextProvider>
    );

    fireEvent.click(getByText('Remove Product'));

    expect(localStorage.setItem).toHaveBeenCalledWith('cart', '["2"]');
  });

  it('clears cart', () => {
    localStorage.setItem('cart', JSON.stringify(['1', '2']));

    const { getByText } = render(
      <CartContextProvider>
        <CartContext.Consumer>
          {({ clearCart }) => <button onClick={clearCart}>Clear Cart</button>}
        </CartContext.Consumer>
      </CartContextProvider>
    );

    fireEvent.click(getByText('Clear Cart'));

    expect(localStorage.removeItem).toHaveBeenCalledWith('cart');
  });
});
