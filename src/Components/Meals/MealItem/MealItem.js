import React, { useContext } from 'react';
import CartContext from '../../../Store/cart-context';
import MealItemForm from './MealItemForm';
import classes from './MealItem.module.css';

const MealItem = (props) => {
  const ctx = useContext(CartContext);
  const addBtnClickHandler = (amt) => {
    const newItem = {
      id: props.id,
      name: props.name,
      amount: amt,
      price: props.price,
    };
    // console.log(newItem);
    ctx.addCartItem(newItem);
  };
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>${props.price.toFixed(2)}</div>
      </div>
      <div>
        <MealItemForm id={props.id} addBtnClickHandler={addBtnClickHandler} />
      </div>
    </li>
  );
};

export default MealItem;
