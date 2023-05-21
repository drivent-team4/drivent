import useToken from '../useToken';
import useAsync from '../useAsync';
import { getUserBookingInfoWithHotel } from '../../services/bookingApi';

export default function useGetUserBookingInfoWithHotel() {
  const token = useToken();

  const { 
    data: userBookingInfoWithHotel,
    loading: userBookingInfoLoadingWithHotel,
    error: userBookingInfoErrorWithHotel,
    act: getUserInfoWithHotel 
  } = useAsync(() => getUserBookingInfoWithHotel(token));

  return {
    userBookingInfoWithHotel,
    userBookingInfoLoadingWithHotel,
    userBookingInfoErrorWithHotel,
    getUserInfoWithHotel,
  };
}
