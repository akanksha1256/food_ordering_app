import React, { useReducer } from 'react';
import CartContext from './cart-context';

const defaultItemValue = { itemList: [], totalValue: 0 };

const itemListReducer = (state, action) => {
  if (action.type === 'ADD') {
    return { itemList: action.list, totalValue: action.total };
  } else if (action.type === 'REMOVE') {
    return { itemList: action.list, totalValue: action.total };
  }
  return defaultItemValue;
};
const CartProvider = (props) => {
  const [items, dispathItemList] = useReducer(
    itemListReducer,
    defaultItemValue
  );
  const addCartItemHandler = (item) => {
    let itemUpdated = false;
    const newList = [...items.itemList];
    let totalVal = items.totalValue + +item.amount * +item.price;
    for (const i1 of newList) {
      if (i1.id === item.id) {
        i1.amount = +i1.amount + +item.amount;
        itemUpdated = true;
        break;
      }
    }
    if (itemUpdated === false) {
      newList.push(item);
    }
    dispathItemList({ type: 'ADD', list: newList, total: totalVal });
  };
  const removeCartItemHandler = (id) => {
    const itemIndex = items.itemList.findIndex((item) => item.id === id);
    const item = items.itemList[itemIndex];
    let totalVal = items.totalValue - +item.price;
    let newList = [];
    if (item.amount === 1) {
      newList = items.itemList.filter((item) => item.id !== id);
    } else {
      const updatedItem = { ...item, amount: item.amount - 1 };
      newList = [...items.itemList];
      newList[itemIndex] = updatedItem;
    }
    dispathItemList({ type: 'REMOVE', list: newList, total: totalVal });
  };

  const resetCart = () => {
    dispathItemList({});
  };

  const val = {
    cartItemList: items.itemList,
    cartTotal: items.totalValue,
    addCartItem: addCartItemHandler,
    removeCartItem: removeCartItemHandler,
    resetCart: resetCart,
  };
  return (
    <CartContext.Provider value={val}>{props.children}</CartContext.Provider>
  );
};

export default CartProvider;
