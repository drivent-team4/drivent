import useToken from '../useToken';
import useAsync from '../useAsync';

import * as activityApi from '../../services/activityApi';

export function useInscriptionPost() {
  const token = useToken();
  const { act, data } = useAsync((activityId) => activityApi.postInscription(token, activityId));

  return { act, data };
}

export function useInscriptionDelete(inscriptionId) {
  const token = useToken();
  const inscriptionInfo = useAsync(() => activityApi.deleteInscription(token, inscriptionId));

  if (!inscriptionInfo.loading) return inscriptionInfo.data;
}
