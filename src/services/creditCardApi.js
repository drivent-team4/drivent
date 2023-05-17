import api from './api';

export async function getCreditCard(token) {
  const response = await api.get('/payment/process', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function postCreditCard(token, creditCardInfos) {
  const response = await api.post(
    '/payments/process',
    {
      ...creditCardInfos,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}
