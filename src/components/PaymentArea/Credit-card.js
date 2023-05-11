// Estrutura e estilização do cartão de crédito que será importado no credit-card-box
import Card from 'react-credit-card';

export default function CreditCard({ myForm }) {
  return (
    <Card 
      cvc = {myForm.props.cvc} 
      name = {myForm.props.name} 
      focused = {'name'}
    />
  );
};
