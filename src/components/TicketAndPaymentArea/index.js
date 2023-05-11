import { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { ChosenTicketInfo } from './ChosenTicketInfo';
import { InfoSectionTitle } from './InfoSectionTitle';
import useEnrollment from '../../hooks/api/useEnrollment';
import NoEnrollmentWarning from './NoEnrollmentWarning';
import { TicketContainer, TicketModel } from './TicketModel';

export default function TicketAndPaymentArea() {
  const [enrollment, setEnrollment] = useState(false);
  const enrollmentApi = useEnrollment();
  const [chosenTicketDescription, setChosenTicketDescription] = useState('undefined');
  const [chosenTicketValue, setChosenTicketValue] = useState(0);
  const [onlineSelected, setOnlineSelected] = useState(false);
  const [liveSelected, setLiveSelected] = useState(false);

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

  function handleClick(e) {
    console.log(e);
  }
  return (
    <>
      <StyledTypography variant="h4">Ingresso e Pagamento</StyledTypography>
      {enrollment ? (
        <>
          <InfoSectionTitle>Primeiro, escolha sua modalidade de ingresso</InfoSectionTitle>
          <TicketContainer>
            <TicketModel chosen={liveSelected} onClick={() => {
              setLiveSelected(!liveSelected);
              if (!liveSelected === true && onlineSelected === true) setOnlineSelected(false);
            }}>
              Presencial<p>R$ 250</p>
            </TicketModel>
            
            <TicketModel chosen={onlineSelected} onClick={() => {
              setOnlineSelected(!onlineSelected);
              if (!onlineSelected === true && liveSelected === true) setLiveSelected(false);
            }}>
              Online<p>R$ 100</p>
            </TicketModel>
          </TicketContainer>
          {false && (
            <>
              <InfoSectionTitle>Ingresso escolhido</InfoSectionTitle>
              <ChosenTicketInfo>
                {chosenTicketDescription}
                <p>R$ {chosenTicketValue}</p>
              </ChosenTicketInfo>
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
