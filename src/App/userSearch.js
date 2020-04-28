import { useState } from 'react';
import { RateService } from './rate.service';
import { message } from 'antd';

function useSearch() {
  const [rates, setRates] = useState(undefined);
  const [loading, setLoading] = useState(false);

  function handle({ hotelId, checkin, nights }) {
    setLoading(true);

    RateService.getAll({ hotelId, checkin, nights })
      .then(response => {
        setRates(getRates({ response, hotelId }));
      })
      .catch(_ => {
        message.error('Ha ocurrido un error, inténtalo de nuevo');
        setRates(undefined);
      })
      .finally(() => setLoading(false));
  }

  function getRates({ response, hotelId }) {
    if (!response.availableRates || !response.availableRates[hotelId]) {
      return [];
    }

    return response.availableRates[hotelId].filter(
      rate => rate.hotelId.toString() === hotelId
    );
  }

  return { handle, rates, loading };
}

export default useSearch;
