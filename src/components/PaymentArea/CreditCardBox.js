import { useState } from 'react';
import CreditCard from './CreditCard';
import styled from 'styled-components';
import Input from '../Form/Input';
import Button from '../Form/Button';
import { InputWrapper } from '../PersonalInformationForm/InputWrapper';

function PaymentForm() {
  const [state, setState] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });

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
      <EndButton type="submit">
        FINALIZAR PAGAMENTO
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
