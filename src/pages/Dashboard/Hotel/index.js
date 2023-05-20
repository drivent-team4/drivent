import styled from 'styled-components';
import TicketWarning from '../../../components/BookingArea/TicketWarning.js';
import react, { useEffect, useState } from 'react';
import ContainerChoiceHotel from '../../../components/Dashboard/Hotel/index.js';
import useTicket from '../../../hooks/api/useTicket.js';
import { StyledTypography } from '../../../components/TicketAndPaymentArea/index.js';
import { Button } from '../../../components/Dashboard/Hotel/index.js';
import useGetUserBookingInfo from '../../../hooks/api/useGetUserBookingInfo.js';
import ReservationSummary from '../../../components/Dashboard/Hotel/ReservationSummary.js';

export default function Hotel() {
  const [changingMode, setChangingMode] = useState(false);
  const [isReserved, setIsReserved] = useState(false);
  const [ticket, setTicket] = useState(undefined);
  const ticketApi = useTicket();
  const { userBookingInfo, userBookingInfoLoading } = useGetUserBookingInfo();

  useEffect(() => {
    if(userBookingInfo) setIsReserved(true);
  }, [userBookingInfoLoading]);

  useEffect(() => {
    if (ticketApi?.ticket) setTicket(ticketApi.ticket);
  }, [ticketApi.ticketLoading]);

  return (
    <>
      {(!ticket || ticket?.status === 'RESERVED') && (
        <>
          <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>

          <TicketWarning>
            Você precisa ter confirmado pagamento antes
            <br /> de fazer a escolha de hospedagem
          </TicketWarning>
        </>
      )}

      {ticket?.status === 'PAID' && (ticket?.TicketType.isRemote || !ticket?.TicketType.includesHotel) && (
        <>
          <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>

          <TicketWarning>
            Sua modalidade de ingresso não inclui hospedagem <br /> Prossiga para a escolha de atividades
          </TicketWarning>
        </>
      )}

      {ticket && ticket?.status === 'PAID' && ticket.TicketType.includesHotel && (!isReserved || changingMode) && (
        <ContainerHotel>
          <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>

          <p>Primeiro, escolha seu hotel</p>
          <ContainerChoiceHotel changingMode={changingMode} setIsReserved={setIsReserved} bookingId={userBookingInfo?.id} setChangingMode={setChangingMode}/>
        </ContainerHotel>
      )}

      {isReserved && !changingMode && (
        <>
          <ReservationSummary />
          <Button onClick={() => setChangingMode(true)}>Trocar de quarto</Button>
        </>
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
