import { getRoomBookingInfos } from '../../services/bookingApi.js';
import useAsync from '../useAsync';
import useToken from '../useToken';

export function useBookingInfos(hotelId) {
  const token = useToken();

  const BookingInfos = useAsync(() => getRoomBookingInfos(token, hotelId));

  if (!BookingInfos.loading) return BookingInfos.data;
}
