import { fetchCountInfo, getRoomBookingInfos } from '../../services/bookingApi.js';
import useAsync from '../useAsync';
import useToken from '../useToken';

export function useBookingInfos(hotelId) {
  const token = useToken();

  const BookingInfos = useAsync(() => getRoomBookingInfos(token, hotelId));

  if (!BookingInfos.loading) return BookingInfos.data;
}

export function fetchBookingCount(roomId) {
  const token = useToken();

  const bookingCount = useAsync(() => fetchCountInfo(token, roomId));

  if (!bookingCount.loading) return bookingCount.data;
}
