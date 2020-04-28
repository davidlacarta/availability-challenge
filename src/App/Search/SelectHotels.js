import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

function HotelsSelect({ defaultValue, disabled, hotels, onChange }) {
  return (
    <Select
      defaultValue={defaultValue}
      style={{ width: 300 }}
      onChange={onChange}
      disabled={disabled}
    >
      {hotels.map(({ id, name }) => (
        <Option key={id} value={id}>
          {name}
        </Option>
      ))}
    </Select>
  );
}

export default HotelsSelect;
