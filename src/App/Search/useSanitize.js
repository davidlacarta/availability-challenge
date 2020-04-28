import { useState } from 'react';

function useSanitize({ defaultValue, onChange, validate }) {
  const [value, setValue] = useState(defaultValue);
  const [valueValid, setValueValid] = useState(defaultValue);

  function isInValid(value) {
    return !value || (validate && !validate(value));
  }

  function handleChange(value) {
    if (isInValid(value)) {
      return setValue(valueValid);
    }

    setValue(value);
    setValueValid(value);

    onChange(value);
  }

  return { value, handleChange };
}

export default useSanitize;
