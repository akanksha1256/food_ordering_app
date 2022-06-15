import React, { useContext, useState } from 'react';
import CartContext from '../../Store/cart-context';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import Checkout from './Checkout';
import classes from './Cart.module.css';

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const ctx = useContext(CartContext);
  const hasItems = ctx.cartItemList.length > 0;
  const getCartItem = (item) => {
    return (
      <CartItem
        key={item.id}
        id={item.id}
        price={item.price}
        name={item.name}
        amount={item.amount}
        onAdd={onAdd}
        onRemove={onRemove}
      />
    );
  };
  const orderBtnClicked = () => {
    setIsCheckout(true);
  };
  const onAdd = (item) => {
    ctx.addCartItem(item);
  };
  const onRemove = (id) => {
    ctx.removeCartItem(id);
  };
  const onCheckout = async (userData) => {
    setIsSubmitting(true);
    console.log(userData);
    console.log('cart', ctx.cartItemList);
    await fetch(
      'https://udemy-course-react-3b9c3-default-rtdb.firebaseio.com/orders.json',
      {
        method: 'POST',
        body: JSON.stringify({
          user: userData,
          orderedItems: ctx.cartItemList,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    ctx.resetCart();
    // props.closeCartModal();
  };
  let retElem = null;
  if (isSubmitting) {
    retElem = <p className={classes.feedback}>Placing the order...</p>;
  } else {
    if (didSubmit) {
      retElem = (
        <>
          <p className={classes.feedback}>Order Placed Successfully!</p>
          <div className={classes.actions}>
            <button className={classes.button} onClick={props.closeCartModal}>
              Close
            </button>
          </div>
        </>
      );
    } else {
      retElem = (
        <>
          <ul className={classes['cart-items']}>
            {ctx.cartItemList.map(getCartItem)}
          </ul>
          <div className={classes.total}>
            <span>Total Amount</span>
            <span>${ctx.cartTotal.toFixed(2)}</span>
          </div>
          {isCheckout ? (
            <Checkout
              closeCartModal={props.closeCartModal}
              onCheckout={onCheckout}
            />
          ) : (
            <div className={classes.actions}>
              <button
                className={classes['button--alt']}
                onClick={props.closeCartModal}
              >
                Close
              </button>
              {hasItems && (
                <button className={classes.button} onClick={orderBtnClicked}>
                  Order
                </button>
              )}
            </div>
          )}
        </>
      );
    }
  }
  return <Modal closeCartModal={props.closeCartModal}>{retElem}</Modal>;
};

export default Cart;
