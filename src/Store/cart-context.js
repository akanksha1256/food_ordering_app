import React from 'react';

const CartContext = React.createContext({
  cartItemList: [],
  cartTotal: 0,
  addCartItem: (item) => {},
  removeCartItem: (id) => {},
});

export default CartContext;
