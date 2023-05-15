import useAsync from '../useAsync';
import useToken from '../useToken';

import * as ticketApi from '../../services/ticketApi';

export default function useReserveTicket() {
  const token = useToken();

  const {
    data: ticket,
    loading: ticketLoading,
    error: ticketError,
    act: saveTicket
  } = useAsync((data) => ticketApi.postTicket(token, data), false);

  return {
    ticket,
    ticketLoading,
    ticketError,
    saveTicket
  };
}
