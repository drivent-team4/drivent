import api from './api';

export async function getRoomBookingInfos(token, hotelId) {
  const response = await api.get(`/booking/${hotelId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getUserBookingInfo(token) {
  const response = await api.get(
    '/booking',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }    
  );

  return response.data;
}

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

export async function putBooking(token, bookingId, roomId) {
  const response = await api.put(
    `/booking/${bookingId}`,
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

export async function fetchCountInfo(token, roomId) {
  const response = await api.get(`/booking/count/${roomId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  );

  return response.data;
}
