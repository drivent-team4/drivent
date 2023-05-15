import useAsync from '../useAsync';
import useToken from '../useToken';

import * as ticketApi from '../../services/ticketApi';

export default function useTicketTypes() {
  const token = useToken();
  
  const {
    data: ticketTypes,
    loading: loadingTicketTypes,
    error: errorTicketTypes,
    act: getTicketTypes
  } = useAsync(() => ticketApi.getTicketTypes(token));

  return {
    ticketTypes,
    loadingTicketTypes,
    errorTicketTypes,
    getTicketTypes 
  };
}
