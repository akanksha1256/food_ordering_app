import React from 'react';
import HeaderCartButton from './HeaderCartButton';
import mealsImage from '../../Assets/meals.jpg';
import classes from './Header.module.css';

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1>Food Ordering App</h1>
        <HeaderCartButton openCartModal={props.openCartModal} />
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt='meals' />
      </div>
    </>
  );
};

export default Header;
