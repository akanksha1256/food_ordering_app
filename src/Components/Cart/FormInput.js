import React from 'react';
import classes from './Checkout.module.css';

const FormInput = (props) => {
  const class1 = props.err === 'true' ? classes.invalid : null;
  return (
    <div className={`${classes.control} ${class1}`}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.inputChangeHandler}
        onBlur={props.inputBlurHandler}
        err={props.err}
      />
      {props.err === 'true' && (
        <p className={classes['error-text']}>Please enter a valid {props.id}</p>
      )}
    </div>
  );
};

export default FormInput;
