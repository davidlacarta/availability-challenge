import React from 'react';
import { InputNumber } from 'antd';

import useSanitize from './useSanitize';

const MIN = 1;
const MAX = 30;

function InputNights({ defaultValue, disabled, onChange }) {
  const { value, handleChange } = useSanitize({
    defaultValue,
    onChange,
    validate
  });

  return (
    <InputNumber
      min={MIN}
      max={MAX}
      value={value}
      onChange={handleChange}
      disabled={disabled}
    />
  );
}

function validate(value) {
  return value && value >= MIN && value <= MAX;
}

export default InputNights;
