import api from './api';

export async function getRoomById(token) {
  const response = await api.get('/rooms', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

