import api from './api';
export async function postBooking(token, roomId) {
  const response = await api.post(
    '/booking',
    {
      roomId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}
