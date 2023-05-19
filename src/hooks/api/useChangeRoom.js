import { putBooking } from '../../services/bookingApi';
import useAsync from '../useAsync';
import useToken from '../useToken';

export default function useChangeRoom() {
  const token = useToken();

  const {
    data: newBookingId,
    loading: changeRoomLoading,
    error: changeRoomError,
    act: changeRoom,
  } = useAsync((bookingId, roomId) => putBooking(token, bookingId, roomId));

  return {
    newBookingId,
    changeRoomLoading,
    changeRoomError,
    changeRoom,
  };
}
