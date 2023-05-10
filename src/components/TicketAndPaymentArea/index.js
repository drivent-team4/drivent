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

  useEffect(() => {
    if (enrollmentApi?.enrollment) setEnrollment(true);
  }, [enrollmentApi.enrollmentLoading]);

  return (
    <>
      <StyledTypography variant="h4">Ingresso e Pagamento</StyledTypography>
      {enrollment? (<>
        <InfoSectionTitle>Ingresso escolhido</InfoSectionTitle>
        <ChosenTicketInfo>Presencial + Com Hotel<p>R$ 600</p></ChosenTicketInfo>
      </>): <NoEnrollmentWarning />}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;
