import React, { useState } from 'react';
import moment from 'moment';
import { Button, Form } from 'antd';

import SelectHotels from './SelectHotels';
import PickerCheckin from './PickerCheckin';
import InputNights from './InputNights';

import styles from './Search.module.css';
import './Search.css';

const defaultSearch = {
  hotelId: hotels => hotels && hotels.length > 0 && hotels[0].id,
  checkin: () => moment().add(1, 'days'),
  nights: 1
};

function Search({ hotels, onSubmit, loading }) {
  const [hotelId, setHotelId] = useState(defaultSearch.hotelId(hotels));
  const [checkin, setCheckin] = useState(defaultSearch.checkin());
  const [nights, setNights] = useState(defaultSearch.nights);

  function handleHotel(hotelId) {
    setHotelId(hotelId);
  }

  function handleCheckin(checkin) {
    setCheckin(checkin);
  }

  function handleNights(nights) {
    setNights(nights);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit({ hotelId, checkin, nights });
  }

  return (
    <Form className={styles.form} layout="inline" onSubmit={handleSubmit}>
      <FormItem label="Hotel">
        <SelectHotels
          defaultValue={hotelId}
          hotels={hotels}
          onChange={handleHotel}
          disabled={loading}
        />
      </FormItem>
      <FormItem label="Entrada">
        <PickerCheckin
          defaultValue={checkin}
          onChange={handleCheckin}
          disabled={loading}
        />
      </FormItem>
      <FormItem label="Noches">
        <InputNights
          defaultValue={nights}
          onChange={handleNights}
          disabled={loading}
        />
      </FormItem>
      <Form.Item className={styles.item}>
        <Button
          type="primary"
          icon="search"
          loading={loading}
          htmlType="submit"
        >
          Buscar
        </Button>
      </Form.Item>
    </Form>
  );
}

function FormItem({ label, children }) {
  return (
    <Form.Item className={styles.item}>
      <label className={styles.label}>
        <span className={styles.span}>{label}</span>
        {children}
      </label>
    </Form.Item>
  );
}

export default Search;
