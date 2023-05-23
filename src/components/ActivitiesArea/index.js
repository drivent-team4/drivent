import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { useEffect, useState } from 'react';
import useTicket from '../../hooks/api/useTicket';
import TicketWarning from '../BookingArea/TicketWarning';

export default function ActivitiesArea() {
  const ticketApi = useTicket();
  const [ticket, setTicket] = useState(undefined);

  useEffect(() => {
    if (ticketApi?.ticket) setTicket(ticketApi.ticket);
  }, [ticketApi.ticketLoading]);
  
  return (
    <>
      {ticket?.status === 'PAID' && ticket?.TicketType.isRemote && (
        <>
          <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
    
          <TicketWarning>
            Sua modalidade de ingresso não necessita escolher atividade. Você terá acesso a todas as atividades.
            <br />
            Prossiga para a escolha de atividades
          </TicketWarning>
        </>
      )}
    </>
  );
};

export const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
