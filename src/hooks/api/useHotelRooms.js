import { getHotelWithRooms } from '../../services/hotelApi';
import useAsync from '../useAsync';
import useToken from '../useToken';

export function useHotelRooms(hotelId) {
  const token = useToken();

  const hotelRooms = useAsync(() => getHotelWithRooms(token, hotelId));

  if (!hotelRooms.loading) return hotelRooms.data.Rooms;
}
