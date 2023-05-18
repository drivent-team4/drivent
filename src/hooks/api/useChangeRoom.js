import { putBooking } from "../../services/bookingApi";
import useAsync from "../useAsync";
import useToken from "../useToken";

export default async function useChangeRoom(){
    const token = useToken();

    const {
        data: bookingId,
        loading: changeRoomLoading,
        error: changeRoomError,
        act: changeRoom
    } = useAsync(() => putBooking(token, bookingId, roomId), false);

    return {
        bookingId,
        changeRoomLoading,
        changeRoomError,
        changeRoom
    };
}