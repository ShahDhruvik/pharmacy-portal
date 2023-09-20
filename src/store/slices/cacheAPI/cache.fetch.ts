// Data regarding the store are fetched through an API and state is set for further usage
// Other manipulation can be performed too.
// A slice is created for individual entity.
import { CacheType } from '../../../types/common';
import { cacheSetState } from './cache.slice';
const getCachedData = (key: string, cache: CacheType) => {
    const cachedData = cache.cacheData[key];
    const cacheExpDate = cache.cacheExpDate[key];
    if (cachedData && cacheExpDate) {
        const currentDate = new Date();
        const expiration = new Date(cacheExpDate);
        if (currentDate <= expiration) {
            return true;
        } else {
            return false
        }
    } else {
        return false;
    }
};
export const fetchCachedData = (api: string, key: string, cache: CacheType) => async (dispatch: (arg0: { payload: any; type: "cache/cacheSetState"; }) => void) => {
    try {
        const isCacheExist = getCachedData(key, cache);
        if (isCacheExist) {
            dispatch(
                cacheSetState([
                    { key: `cache`, value: cache },
                ]),
            );
        } else {
            const res = await fetch(api);
            const data = await res.json()
            const _todayDate = new Date()
            const _sevenDaysAhead = new Date(_todayDate.getTime() + 7 * 24 * 60 * 60 * 1000);
            dispatch(
                cacheSetState([
                    { key: `cache.cacheData[${key}]`, value: data },
                    { key: `cache.cacheExpDate[${key}]`, value: _sevenDaysAhead.toISOString() },
                ]),
            );
        }
    } catch (error) {
        console.log(error, 'error');
    }
};
