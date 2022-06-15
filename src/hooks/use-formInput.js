import { useState } from 'react';

const useFormInput = (inputValidation) => {
  const [input, setInput] = useState('');
  const [inputTouched, setInputTouched] = useState(false);

  const inputValid = inputValidation(input);
  const inputChangeHandler = (event) => {
    setInput(event.target.value);
  };
  const inputBlurHandler = () => {
    setInputTouched(true);
  };
  const resetInput = () => {
    setInput('');
    setInputTouched(false);
  };

  return {
    input,
    inputTouched,
    inputValid,
    inputChangeHandler,
    inputBlurHandler,
    resetInput,
  };
};

export default useFormInput;
