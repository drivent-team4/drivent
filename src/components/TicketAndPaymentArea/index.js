import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { ChosenTicketInfo } from './ChosenTicketInfo';
import { InfoSectionTitle } from './InfoSectionTitle';

export default function TicketAndPaymentArea() {
  return (
    <>
      <StyledTypography variant="h4">Ingresso e Pagamento</StyledTypography>
      {false && <>
        <InfoSectionTitle>Ingresso escolhido</InfoSectionTitle>
        <ChosenTicketInfo>Presencial + Com Hotel<p>R$ 600</p></ChosenTicketInfo>
      </>}
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;
