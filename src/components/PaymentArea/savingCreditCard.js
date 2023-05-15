import { useState } from 'react';
import useRegisterCreditCard from '../../hooks/api/useCreditCard';
import issuerVerify from './issuerVerify';

export async function savingCreditCard(CardPaymentParams) {
  const [creditCardInfos] = useState({
    issuer: issuerVerify(CardPaymentParams.number),
    number: CardPaymentParams.number,
    name: CardPaymentParams.name,
    expirationDate: CardPaymentParams.expiry,
    cvv: CardPaymentParams.cvc
  });
  const { saveCreditCard } = useRegisterCreditCard();
  
  return await saveCreditCard(creditCardInfos);
};
