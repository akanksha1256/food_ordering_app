import React, { useContext, useState, useEffect } from 'react';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../Store/cart-context';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
  const ctx = useContext(CartContext);
  const [btnHighlighted, setBtnHighlighted] = useState(false);
  const badgeCount = ctx.cartItemList.reduce((curr, item) => {
    return curr + +item.amount;
  }, 0);
  useEffect(() => {
    if (ctx.cartItemList.length === 0) {
      return;
    }
    setBtnHighlighted(true);
    const timer = setTimeout(() => {
      setBtnHighlighted(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [ctx.cartItemList]);

  const btnClasses = `${classes.button} ${btnHighlighted ? classes.bump : ''}`;
  return (
    <button className={btnClasses} onClick={props.openCartModal}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Cart</span>
      <span className={classes.badge}>{badgeCount}</span>
    </button>
  );
};

export default HeaderCartButton;
