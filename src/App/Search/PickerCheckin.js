import moment from 'moment';
import React from 'react';
import { DatePicker } from 'antd';

import useSanitize from './useSanitize';

function ChekinPicker({ defaultValue, disabled, onChange }) {
  const { value, handleChange } = useSanitize({ defaultValue, onChange });

  return (
    <DatePicker
      format="YYYY-MM-DD"
      allowClear={false}
      disabledDate={disabledDate}
      value={value}
      onChange={handleChange}
      disabled={disabled}
    />
  );
}

function disabledDate(current) {
  return current && current < moment().endOf('day');
}

export default ChekinPicker;
