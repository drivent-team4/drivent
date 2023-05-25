import api from './api';

export async function getActivity(token) {
  const response = await api.get('/activity', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function postInscription(token, activityId) {
  const response = await api.post(
    '/activity',
    {
      activityId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}

export async function deleteInscription(token, inscriptionId) {
  const response = await api.post(
    '/activity',
    {
      inscriptionId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}
