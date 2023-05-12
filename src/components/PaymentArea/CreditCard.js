import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';

export default function CreditCard({ state }) {
  return (
    <Cards
      number={state.number}
      expiry={state.expiry}
      cvc={state.cvc}
      name={state.name}
      focused={state.focus}
    />
  );
};
