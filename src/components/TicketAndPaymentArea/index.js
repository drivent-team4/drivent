import { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { ChosenTicketInfo } from './ChosenTicketInfo';
import { InfoSectionTitle } from './InfoSectionTitle';
import useEnrollment from '../../hooks/api/useEnrollment';
import NoEnrollmentWarning from './NoEnrollmentWarning';

export default function TicketAndPaymentArea() {
  const [enrollment, setEnrollment] = useState(false);
  const enrollmentApi = useEnrollment();
  const [chosenTicketDescription, setChosenTicketDescription] = useState('undefined');
  const [chosenTicketValue, setChosenTicketValue] = useState(0);

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

  return (
    <>
      <StyledTypography variant="h4">Ingresso e Pagamento</StyledTypography>
      {enrollment ? (<>
        <InfoSectionTitle>Primeiro, escolha sua modalidade de ingresso</InfoSectionTitle>
        <ChosenTicketInfo chosen={true}>{chosenTicketDescription}<p>R$ {chosenTicketValue}</p></ChosenTicketInfo>
        <ChosenTicketInfo chosen={true}>{chosenTicketDescription}<p>R$ {chosenTicketValue}</p></ChosenTicketInfo>
      </>) : <NoEnrollmentWarning />}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;
