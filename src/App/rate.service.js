import { URL } from './api';

function getAll({ hotelId, checkin, nights }) {
  const params = buildParams({
    hotelId,
    checkin: checkin.format('DD/MM/YYYY'),
    nights,
    lang: 'es'
  });

  const url = `${URL.BASE}${URL.AVAILABLE_RATES}?${params}`;

  return fetchWithAuth({ url, method: 'GET' });
}

function fetchWithAuth({ url, method }) {
  const userPassBase64 = btoa(`${'user'}:${'pass'}`);

  const headers = new Headers([['Authorization', `Basic ${userPassBase64}`]]);

  return fetch(url, { method, headers }).then(responseHttp => {
    if (responseHttp.status >= 400) {
      throw new Error(responseHttp.status);
    }

    return responseHttp.json();
  });
}

function buildParams(params) {
  return Object.entries(params)
    .map(keyValue => keyValue.join('='))
    .join('&');
}

export const RateService = { getAll };
