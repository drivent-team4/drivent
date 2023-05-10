import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import TicketWarning from './TicketWarning';
import { useEffect, useState } from 'react';
import useTicket from '../../hooks/api/useTicket';

export default function BookingArea() {
  const [ticket, setTicket] = useState(undefined);
  const ticketApi = useTicket();

  useEffect(() => {
    if (ticketApi?.ticket) setTicket(ticketApi.ticket);
  }, [ticketApi.ticketLoading]);

  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>

      {(!ticket || ticket?.status === 'RESERVED') && <TicketWarning>
        Você precisa ter confirmado pagamento antes<br /> de fazer a escolha de hospedagem
      </TicketWarning>}

      {ticket?.status === 'PAID' && (ticket?.TicketType.isRemote || !ticket?.TicketType.includesHotel) && <TicketWarning>
        Sua modalidade de ingresso não inclui hospedagem <br /> Prossiga para a escolha de atividades
      </TicketWarning>}
    </>
  );
};

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;
