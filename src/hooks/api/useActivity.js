import useAsync from '../useAsync';
import useToken from '../useToken';
import { getActivities } from '../../services/activityApi.js';

export function useActivities() {
  const token = useToken();

  const activities = useAsync(() => getActivities(token));

  if (!activities.loading) return activities.data;
}
