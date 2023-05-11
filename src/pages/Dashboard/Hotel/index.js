import styled from 'styled-components';
import TicketWarning from '../../../components/BookingArea/TicketWarning.js';
import react, { useEffect, useState } from 'react';
import ContainerChoiceHotel from '../../../components/Dashboard/Hotel/index.js';
import useTicket from '../../../hooks/api/useTicket.js';
import { StyledTypography } from '../../../components/TicketAndPaymentArea/index.js';

export default function Hotel() {
  const [ticket, setTicket] = useState(undefined);
  const ticketApi = useTicket();

  useEffect(() => {
    if (ticketApi?.ticket) setTicket(ticketApi.ticket);
  }, [ticketApi.ticketLoading]);

  return (
    <>
      {(!ticket || ticket?.status === 'RESERVED') && (
        <TicketWarning>
          Você precisa ter confirmado pagamento antes
          <br /> de fazer a escolha de hospedagem
        </TicketWarning>
      )}

      {(ticket || ticket?.status === 'PAID') && (
        <ContainerHotel>
          <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>

          <p>Primeiro, escolha seu hotel</p>
          <ContainerChoiceHotel />
        </ContainerHotel>
      )}
    </>
  );
}

const ContainerHotel = styled.div`
  width: 100%;
  height: 100%;
  > p {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: #8e8e8e;
    margin-bottom: 1rem;
  }
`;
