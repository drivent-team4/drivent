import useToken from '../useToken';
import useAsync from '../useAsync';

import * as activityApi from '../../services/activityApi';

export function useInscriptionPost() {
  const token = useToken();
  const { act, data } = useAsync((activityId) => activityApi.postInscription(token, activityId), false);

  return { act, data };
}

export function useInscriptionDelete() {
  const token = useToken();
  const { act, data } = useAsync((activityId) => activityApi.deleteInscription(token, activityId), false);

  return { act, data };
}
