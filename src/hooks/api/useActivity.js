import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activityApi from '../../services/activityApi';

export function useActivity() {
  const token = useToken();
  const activityInfos = useAsync(() => activityApi.getActivity(token));
  
  if (!activityInfos.loading) return activityInfos.data;
}
