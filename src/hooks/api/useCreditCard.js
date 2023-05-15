import useAsync from '../useAsync';
import useToken from '../useToken';

import * as creditCardApi from '../../services/creditCardApi';

export default function useRegisterCreditCard() {
  const token = useToken();

  const {
    data: creditCard,
    loading: creditCardLoading,
    error: creditCardError,
    act: saveCreditCard
  } = useAsync((data) => creditCardApi.postCreditCard(token, data), false);

  return {
    creditCard,
    creditCardLoading,
    creditCardError,
    saveCreditCard
  };
}
