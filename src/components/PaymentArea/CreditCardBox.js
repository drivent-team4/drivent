import { useState } from 'react';
import CreditCard from './CreditCard';
import styled from 'styled-components';
import Input from '../Form/Input';
import Button from '../Form/Button';
import { toast } from 'react-toastify';
import { InputWrapper } from '../PersonalInformationForm/InputWrapper';
import issuerVerify from './issuerVerify';
import useRegisterCreditCard from '../../hooks/api/useCreditCard';

function PaymentForm({ handleCreditCard, button, ticketId, setPayed }) {
  const { saveCreditCard } = useRegisterCreditCard();
  const [state, setState] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });

  async function savingCreditCard() {
    const issuer = issuerVerify(state.number.toString());
    if(!issuer) return toast('O cartão deve ser valido!');
    const body = {
      ticketId,
      cardData: {
        issuer,
        number: state.number,
        name: state.name,
        expirationDate: state.expiry,
        cvv: state.cvc
      }
    };
    try {
      await saveCreditCard(body);
      toast('Pagamento realizado com sucesso!');
      setPayed(true);
    } catch (err) {
      console.log(err);
      toast('Não foi possivel realizar o pagamento!');
    } 
  }

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  return (
    <>
      <Container>
        <CreditCard state={state} />
        <Form onSubmit={() => {'';}}>
          <InputWrapper>
            <Input type="text" name="number" label="Card Number" value={state.number} onChange={handleInputChange} onFocus={handleInputFocus} />
          </InputWrapper>
          <InputWrapper>
            <Input type="text" name="name" label="Full Name" value={state.name} onChange={handleInputChange} onFocus={handleInputFocus} />
          </InputWrapper>
          <div>
            <InputWrapper>
              <Input type="text" name="expiry" label="MM/AA" value={state.expiry} onChange={handleInputChange} onFocus={handleInputFocus} />
            </InputWrapper>
            <InputWrapper>
              <Input type="text" name="cvc" label="CVV" value={state.cvc} onChange={handleInputChange} onFocus={handleInputFocus} />
            </InputWrapper>
          </div>
        </Form>
      </Container>
      <EndButton type="submit" onClick={savingCreditCard}>
        {button}
      </EndButton>
    </>
  );
};

export default PaymentForm;

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 35px;
`;

const Form = styled.form`
  margin: 0 35px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;

  & div {
    width: 100%;
    display: flex;
  }
`;

const EndButton = styled(Button)`
  position: fixed;
  bottom: -35px;
`;
