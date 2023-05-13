import { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { ChosenTicketInfo } from './ChosenTicketInfo';
import { InfoSectionTitle } from './InfoSectionTitle';
import useEnrollment from '../../hooks/api/useEnrollment';
import NoEnrollmentWarning from './NoEnrollmentWarning';
import useReserveTicket from '../../hooks/api/useReserveTicket';
import { ReserveButton, TicketContainer, TicketModel } from './TicketModel';
import CreditCardBox from '../PaymentArea/CreditCardBox';
import useTicketTypes from '../../hooks/api/useTicketTypes';

export default function TicketAndPaymentArea() {
  const [enrollment, setEnrollment] = useState(false);
  const enrollmentApi = useEnrollment();
  const [chosenTicketDescription, setChosenTicketDescription] = useState('undefined');
  const [chosenTicketValue, setChosenTicketValue] = useState(0);
  const [onlineSelected, setOnlineSelected] = useState(false);
  const [liveSelected, setLiveSelected] = useState(false);
  const [withHotel, setWithHotel] = useState(false);
  const [withoutHotel, setWithoutHotel] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const { saveTicket, ticketLoading } = useReserveTicket();
  const { ticketTypes } = useTicketTypes();
  let ticketId;     //ID da reserva feita
  const [ reservationCreated, setReservationCreated ] = useState(false);

  useEffect(() => {
    if(onlineSelected) setTotalPrice(ticketTypes[0].price); 
    if(withoutHotel) setTotalPrice(ticketTypes[1].price);
    if(withHotel) setTotalPrice(ticketTypes[2].price);
  }, [onlineSelected, withoutHotel, withHotel]);
  
  useEffect(() => {
    if (enrollmentApi?.enrollment) setEnrollment(true);
  }, [enrollmentApi.enrollmentLoading]);

  const createTicketResume = (ticketType) => {
    if (ticketType.isRemote) {
      setChosenTicketDescription('Online');
    } else if (ticketType.includesHotel) {
      setChosenTicketDescription('Presencial + Com Hotel');
    } else {
      setChosenTicketDescription('Presencial');
    }
    setChosenTicketValue(ticketType.value);
  };

  async function handleReservation() {
    let ticket;
    try {
      if(onlineSelected) ticket = await saveTicket(1);
      if(withoutHotel) ticket = await saveTicket(2);
      if(withHotel) ticket = await saveTicket(3);
      ticketId = ticket.id;
      toast('Ticket reservado com sucesso!');
      setReservationCreated(true);
    } catch (err) {
      toast('Não foi possível fazer sua reserva!');
    }
  }

  async function handleCreditCard() {
    try {
      toast('Pagamento realizado com sucesso!');
    } catch (err) {
      toast('Não foi possivel realizar o pagamento!');
    }
  }

  return (
    <>
      <StyledTypography variant="h4">Ingresso e Pagamento</StyledTypography>
      {enrollment ? (
        <>
          {!reservationCreated ?
            <InfoSectionTitle>Primeiro, escolha sua modalidade de ingresso</InfoSectionTitle>
            <TicketContainer>
              <TicketModel
                chosen={liveSelected}
                onClick={() => {
                  setLiveSelected(!liveSelected);
                  if (!liveSelected === true && onlineSelected === true) setOnlineSelected(false);
                }}
              >
                Presencial<p>R$ {ticketTypes[1].price}</p>
              </TicketModel>

              <TicketModel
                chosen={onlineSelected}
                onClick={() => {
                  setOnlineSelected(!onlineSelected);
                  if (!onlineSelected === true && liveSelected === true) setLiveSelected(false);
                  if(!onlineSelected) {
                    setWithHotel(false);
                    setWithoutHotel(false);
                  }
                }}
              >
                Online<p>R$ {ticketTypes[0].price}</p>
              </TicketModel>
            </TicketContainer>

            {liveSelected && (
            <>
              <InfoSectionTitle>Primeiro, escolha sua modalidade de ingresso</InfoSectionTitle><TicketContainer>
                <TicketModel
                  chosen={liveSelected}
                  onClick={() => {
                    setLiveSelected(!liveSelected);
                    if (!liveSelected === true && onlineSelected === true)
                      setOnlineSelected(false);
                  } }
                >
                  Sem hotel<p>R$ + 0</p>
                </TicketModel>

                <TicketModel
                  chosen={onlineSelected}
                  onClick={() => {
                    setOnlineSelected(!onlineSelected);
                    if (!onlineSelected === true && liveSelected === true)
                      setLiveSelected(false);
                    if (!onlineSelected) {
                      setWithHotel(false);
                      setWithoutHotel(false);
                    }
                  } }
                >
                  Com hotel<p>R$ + {ticketTypes[2].price - ticketTypes[1].price}</p>
                </TicketModel>
              </TicketContainer>
            </>
          )}
          {
            (onlineSelected || withHotel || withoutHotel) && (
              <>
                <InfoSectionTitle>Fechado! O total ficou em <b>R$ {totalPrice}</b>. Agora é só confirmar:</InfoSectionTitle>
                <ReserveButton onClick={handleReservation}>RESERVAR INGRESSOS</ReserveButton>
              </>
                )
              }
            </> :
            <>
              <InfoSectionTitle>Ingresso escolhido</InfoSectionTitle>
              <ChosenTicketInfo>
                {chosenTicketDescription}
                <p>R$ {chosenTicketValue}</p>
              </ChosenTicketInfo>
              <InfoSectionTitle>Pagamento</InfoSectionTitle>
              <CreditCardBox
                handleCreditCard={handleCreditCard}
                button={'finalizar pagamento'}
              />
            </>
          }
        </>
      ) : (
        <NoEnrollmentWarning />
      )}
    </>
  );
}

export const StyledTypography = styled(Typography)`
  margin-bottom: 20px !important;
`;
