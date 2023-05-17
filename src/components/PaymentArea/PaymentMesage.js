import { useEffect, useState } from 'react';
import { CheckCircle, XCircle } from '@phosphor-icons/react';
import { PayedContainer, PayedTextBox, PayedTextTitle, PayedText } from '../TicketAndPaymentArea/PaymentModel';

export default function PaymentMessage({ payed }) {
  const [success, setSuccess] = useState(true);

  useEffect(() => {
    if (payed.error) setSuccess(false);
  }, []);

  return (
    <>
      {success ?
        <PayedContainer>
          <CheckCircle size={66} color="#009919" weight="fill" />
          <PayedTextBox>
            <PayedTextTitle>Pagamento Confirmado!</PayedTextTitle>
            <PayedText>Prossiga para escolha de hospedagem e atividades</PayedText>
          </PayedTextBox>
        </PayedContainer>
        :
        <PayedContainer>
          <XCircle size={66} color="#E60000" weight="fill" />
          <PayedTextBox>
            <PayedTextTitle>Falha no pagamento!</PayedTextTitle>
            <PayedText>Por favor, tente novamente</PayedText>
          </PayedTextBox>
        </PayedContainer>
      }
    </>
  );
};
