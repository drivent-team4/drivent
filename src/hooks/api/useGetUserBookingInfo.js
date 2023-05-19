import useToken from '../useToken';
import useAsync from '../useAsync';
import { getUserBookingInfo } from '../../services/bookingApi';

export default function useGetUserBookingInfo() {
  const token = useToken();

  const { 
    data: userBookingInfo,
    loading: userBookingInfoLoading,
    error: userBookingInfoError,
    act: getUserInfo 
  } = useAsync(() => getUserBookingInfo(token));

  return {
    userBookingInfo,
    userBookingInfoLoading,
    userBookingInfoError,
    getUserInfo,
  };
}
