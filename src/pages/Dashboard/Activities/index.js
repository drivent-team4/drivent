import react, { useEffect, useState } from 'react';
import { StyledTypography } from '../../../components/TicketAndPaymentArea/index.js';
import TicketWarning from '../../../components/BookingArea/TicketWarning.js';
import ContainerActivity from '../../../components/ActivityArea/index.js';
import useTicket from '../../../hooks/api/useTicket.js';
import InscriptionButton from './inscriptionButton.js';

export default function Activities() {
  const [ticket, setTicket] = useState(undefined);
  const ticketApi = useTicket();

  useEffect(() => {
    if (ticketApi?.ticket) setTicket(ticketApi.ticket);
  }, [ticketApi.ticketLoading]);
  return (
    <>
      {(!ticket || ticket?.status === 'RESERVED') && (
        <>
          <StyledTypography variant="h4">Escolha de atividades</StyledTypography>

          <TicketWarning>
            Você precisa ter confirmado pagamento antes
            <br /> de fazer a escolha de atividades
          </TicketWarning>
        </>
      )}

      {ticket?.status === 'PAID' && ticket?.TicketType.isRemote && (
        <>
          <StyledTypography variant="h4">Escolha de atividades</StyledTypography>

          <TicketWarning>
            Sua modalidade de ingresso não necessita escolher atividade.
            <br /> Você terá acesso a todas as atividades.
          </TicketWarning>
        </>
      )}

      {(ticket || ticket?.status === 'PAID') && (
        <>
          <ContainerActivity />
        </>
      )}
    </>
  );
}
