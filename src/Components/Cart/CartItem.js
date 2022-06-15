import classes from './CartItem.module.css';

const CartItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;

  return (
    <li className={classes['cart-item']}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onRemove.bind(this, props.id)}>−</button>
        <button
          onClick={props.onAdd.bind(this, {
            id: props.id,
            name: props.name,
            amount: 1,
            price: props.price,
          })}
        >
          +
        </button>
      </div>
    </li>
  );
};

export default CartItem;
