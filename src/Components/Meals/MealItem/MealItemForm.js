import React, { useState } from 'react';
import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = (props) => {
  const [itemAmt, setItemAmt] = useState(1);

  const updateInputValue = (event) => {
    setItemAmt(event.target.value);
  };
  const addBtnClicked = (event) => {
    event.preventDefault();
    props.addBtnClickHandler(itemAmt);
  };

  return (
    <form className={classes.form}>
      <Input
        label='Amount'
        input={{
          id: props.id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          value: itemAmt,
          onChange: updateInputValue,
        }}
      />
      <button onClick={addBtnClicked}>+ Add</button>
    </form>
  );
};

export default MealItemForm;
