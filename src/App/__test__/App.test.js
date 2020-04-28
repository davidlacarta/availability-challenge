import React from 'react';
import { fireEvent, render, waitForElement } from '@testing-library/react';
import nock from 'nock';
import moment from 'moment';

import App from '../App';
import hotels from '../hotels.json';

import ratesMock from './rates.mock.json';
import { URL } from '../api';

describe('App should', () => {
  beforeEach(() => {
    configureHttpMock();
  });

  it('render cheapest rate when search with default params', async () => {
    const { getByText } = render(<App />);

    clickButton(getByText(/buscar/i));

    const cheapestRateRoomName = await waitForElement(() =>
      getByText(/cheapest rate/i)
    );

    expect(cheapestRateRoomName).toBeInTheDocument();
  });
});

function clickButton(element) {
  fireEvent(
    element.closest('button'),
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true
    })
  );
}

function configureHttpMock() {
  const tomorrow = moment().add(1, 'days');
  const [firstHotel] = hotels;

  const paramsDefault = {
    hotelId: firstHotel.id,
    checkin: tomorrow.format('DD/MM/YYYY'),
    nights: '1',
    lang: 'es'
  };

  nock(`http://localhost${URL.BASE}`)
    .get(URL.AVAILABLE_RATES)
    .query(paramsDefault)
    .reply(200, ratesMock);
}
