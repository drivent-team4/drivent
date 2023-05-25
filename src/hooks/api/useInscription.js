import useToken from "../useToken";
import useAsync from "../useAsync";

import * as activityApi from '../../services/activityApi';

export function useInscriptionPost(activityId) {
    const token = useToken();
    const inscriptionInfo = useAsync(() => activityApi.postInscription(token, activityId));

    if (!inscriptionInfo.loading) return inscriptionInfo.data;
}

export function useInscriptionDelete(inscriptionId) {
    const token = useToken();
    const inscriptionInfo = useAsync(() => activityApi.deleteInscription(token, inscriptionId));

    if (!inscriptionInfo.loading) return inscriptionInfo.data;
}