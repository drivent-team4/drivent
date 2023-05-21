import useAsync from '../useAsync';
import useToken from '../useToken';
import { getHotel, getHotelByRoomId } from '../../services/hotelApi';

export function useHotel() {
  const token = useToken();

  const hotels = useAsync(() => getHotel(token));

  if (!hotels.loading) return hotels.data;
}

export function useHotelByRoomId(roomId) {
  const token = useToken();

  const hotelInfo = useAsync(() => getHotelByRoomId(token, roomId));

  if (!hotelInfo.loading) return hotelInfo.data;
}
