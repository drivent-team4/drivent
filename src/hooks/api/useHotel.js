import useAsync from '../useAsync';
import useToken from '../useToken';
import { getHotel } from '../../services/hotelApi';

export function useHotel() {
  const token = useToken();

  const hotels = useAsync(() => getHotel(token));

  return hotels.data;
}
