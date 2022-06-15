import React, { useState } from 'react';
import Cart from './Components/Cart/Cart';
import Header from './Components/Layout/Header';
import Meals from './Components/Meals/Meals';
import CartProvider from './Store/CartProvider';

const App = () => {
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const openCartModal = () => {
    setIsCartModalOpen(true);
  };
  const closeCartModal = () => {
    setIsCartModalOpen(false);
  };

  return (
    <CartProvider>
      {isCartModalOpen && <Cart closeCartModal={closeCartModal} />}
      <Header openCartModal={openCartModal} />
      <Meals />
    </CartProvider>
  );
};

export default App;
