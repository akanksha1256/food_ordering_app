import classes from './Checkout.module.css';
import FormInput from './FormInput';
import useFormInput from '../../hooks/use-formInput';

const Checkout = (props) => {
  const inputValidation = (value) => {
    return value.trim() !== '';
  };
  const postalCodeValidation = (value) => {
    return value.trim().length !== 5;
  };

  const {
    input: name,
    inputTouched: nameTouched,
    inputValid: nameValid,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    resetInput: resetName,
  } = useFormInput(inputValidation);

  const {
    input: street,
    inputTouched: streetTouched,
    inputValid: streetValid,
    inputChangeHandler: streetChangeHandler,
    inputBlurHandler: streetBlurHandler,
    resetInput: resetStreet,
  } = useFormInput(inputValidation);

  const {
    input: postal,
    inputTouched: postalTouched,
    inputValid: postalValid,
    inputChangeHandler: postalChangeHandler,
    inputBlurHandler: postalBlurHandler,
    resetInput: resetPostal,
  } = useFormInput(postalCodeValidation);

  const {
    input: city,
    inputTouched: cityTouched,
    inputValid: cityValid,
    inputChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
    resetInput: resetCity,
  } = useFormInput(inputValidation);

  let formValid = false;
  if (nameValid && streetValid && postalValid && cityValid) {
    formValid = true;
  }
  const confirmHandler = (event) => {
    event.preventDefault();
    if (!formValid) {
      return;
    }
    // console.log('form submitted ', name, street, postal, city);
    props.onCheckout({
      name,
      street,
      postal,
      city,
    });
    resetName();
    resetStreet();
    resetPostal();
    resetCity();
  };
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <FormInput
        id='name'
        label='Your Name'
        type='text'
        value={name}
        inputChangeHandler={nameChangeHandler}
        inputBlurHandler={nameBlurHandler}
        err={(!nameValid && nameTouched).toString()}
      />
      <FormInput
        id='street'
        label='Street'
        type='text'
        value={street}
        inputChangeHandler={streetChangeHandler}
        inputBlurHandler={streetBlurHandler}
        err={(!streetValid && streetTouched).toString()}
      />
      <FormInput
        id='postal'
        label='postal'
        type='text'
        value={postal}
        inputChangeHandler={postalChangeHandler}
        inputBlurHandler={postalBlurHandler}
        err={(!postalValid && postalTouched).toString()}
      />
      <FormInput
        id='city'
        label='city'
        type='text'
        value={city}
        inputChangeHandler={cityChangeHandler}
        inputBlurHandler={cityBlurHandler}
        err={(!cityValid && cityTouched).toString()}
      />

      <div className={classes.actions}>
        <button type='button' onClick={props.closeCartModal}>
          Cancel
        </button>
        <button className={classes.submit} disabled={!formValid}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
