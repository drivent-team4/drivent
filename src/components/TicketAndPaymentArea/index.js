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
import PaymentMessage from '../PaymentArea/PaymentMesage';
import useTicketTypes from '../../hooks/api/useTicketTypes';
import useTicket from '../../hooks/api/useTicket';
import { savingCreditCard } from '../PaymentArea/savingCreditCard';

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
  const [onlinePrice, setOnlinePrice] = useState(0);
  const [withHotelPrice, setWithHotelPrice] = useState(0);
  const [withoutHotelPrice, setWithoutHotelPrice] = useState(0);
  const [ticketId, setTicketId] = useState();
  const [reservationCreated, setReservationCreated] = useState(false);
  const [payed, setPayed] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState({ error: false });
  const ticketApi = useTicket();

  useEffect(() => {
    if(ticketTypes) {
      for(let i = 0; i < ticketTypes.length; i++) {
        if(ticketTypes[i].isRemote) setOnlinePrice(ticketTypes[i].price);
        if(!ticketTypes[i].isRemote && !ticketTypes[i].includesHotel) setWithoutHotelPrice(ticketTypes[i].price);
        if(ticketTypes[i].includesHotel) setWithHotelPrice(ticketTypes[i].price);
      }
    }
  }, [ticketTypes]);

  useEffect(() => {
    if (onlineSelected) setTotalPrice(onlinePrice);
    if (withoutHotel) setTotalPrice(withoutHotelPrice);
    if (withHotel) setTotalPrice(withHotelPrice);
  }, [onlineSelected, withoutHotel, withHotel]);

  useEffect(() => {
    if (enrollmentApi?.enrollment) setEnrollment(true);
  }, [enrollmentApi.enrollmentLoading]);
  
  const createTicketResume = async() => {
    const { TicketType, id } = await ticketApi.getTicket();
    setTicketId(id);
    if (TicketType.isRemote) {
      setChosenTicketDescription('Online');
    } else if (TicketType.includesHotel) {
      setChosenTicketDescription('Presencial + Com Hotel');
    } else {
      setChosenTicketDescription('Presencial');
    }
    setChosenTicketValue(TicketType.price);
  };

  useEffect(async() => {
    if(ticketApi?.ticket) {
      await createTicketResume();
      setReservationCreated(true);
    }
    if(ticketApi?.ticket?.status === 'PAID') setPayed(true);
  }, [ticketApi.ticketLoading]);

  async function handleReservation() {
    try {
      if (onlineSelected) await saveTicket(ticketTypes.find(obj => obj.isRemote).id);
      if (withoutHotel) await saveTicket(ticketTypes.find(obj => !obj.isRemote && !obj.includesHotel).id);
      if (withHotel) await saveTicket(ticketTypes.find(obj => obj.includesHotel).id);
      await createTicketResume();
      toast('Ticket reservado com sucesso!');
      setReservationCreated(true);
    } catch (err) {
      toast('Não foi possível fazer sua reserva!');
    }
  }

  async function handleCreditCard(CardPaymentParams) {
    try {
      await savingCreditCard(CardPaymentParams);
      toast('Pagamento realizado com sucesso!');
      setPayed(true);
    } catch (err) {
      console.log(err);
      toast('Não foi possivel realizar o pagamento!');
    }
  };

  return (
    <>
      <StyledTypography variant="h4">Ingresso e Pagamento</StyledTypography>
      {enrollment ? (
        <>
          {!reservationCreated ? (
            <>
              <InfoSectionTitle>Primeiro, escolha sua modalidade de ingresso</InfoSectionTitle>
              <TicketContainer>
                <TicketModel
                  chosen={liveSelected}
                  onClick={() => {
                    setLiveSelected(!liveSelected);
                    if (!liveSelected === true && onlineSelected === true) setOnlineSelected(false);
                  }}
                >
                  Presencial<p>R$ {withoutHotelPrice}</p>
                </TicketModel>

                <TicketModel
                  chosen={onlineSelected}
                  onClick={() => {
                    setOnlineSelected(!onlineSelected);
                    if (!onlineSelected === true && liveSelected === true) setLiveSelected(false);
                    if (!onlineSelected) {
                      setWithHotel(false);
                      setWithoutHotel(false);
                    }
                  }}
                >
                  Online<p>R$ {onlinePrice}</p>
                </TicketModel>
              </TicketContainer>

              {liveSelected && (
                <>
                  <InfoSectionTitle>Ótimo! Agora escolha sua modalidade de hospedagem</InfoSectionTitle>
                  <TicketContainer>
                    <TicketModel
                      chosen={withoutHotel}
                      onClick={() => {
                        setWithoutHotel(!withoutHotel);
                        if (!withoutHotel === true && withHotel === true) setWithHotel(false);
                      }}
                    >
                      Sem hotel<p>+ R$ 0</p>
                    </TicketModel>

                    <TicketModel
                      chosen={withHotel}
                      onClick={() => {
                        setWithHotel(!withHotel);
                        if (!withHotel === true && withoutHotel === true) setWithoutHotel(false);
                      }}
                    >
                      Com hotel<p>+ R$ {withHotelPrice - withoutHotelPrice}</p>
                    </TicketModel>
                  </TicketContainer>
                </>
              )}
              {(onlineSelected || withHotel || withoutHotel) && (
                <>
                  <InfoSectionTitle>
                    Fechado! O total ficou em <b>R$ {totalPrice}</b>. Agora é só confirmar:
                  </InfoSectionTitle>
                  <ReserveButton onClick={handleReservation}>RESERVAR INGRESSOS</ReserveButton>
                </>
              )}
            </>
          ) : (
            <>
              <InfoSectionTitle>Ingresso escolhido</InfoSectionTitle>
              <ChosenTicketInfo>
                {chosenTicketDescription}
                <p>R$ {chosenTicketValue}</p>
              </ChosenTicketInfo>
              <InfoSectionTitle>Pagamento</InfoSectionTitle>
              {!payed ?
                <CreditCardBox handleCreditCard={handleCreditCard} button={'finalizar pagamento'} ticketId={ticketId} setPayed={setPayed} /> :
                <PaymentMessage payed={paymentMessage}/>
              }
            </>
          )}
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
