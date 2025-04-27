
/* eslint-disable */
import { request } from '@umijs/max';

/** 查询中国所有省、直辖市、自治区 */
export async function getChinaProvinces(options?: { [key: string]: any }) {
    return request('/global/getChinaProvinces', {
        method: 'GET',
        ...(options || {}),
    });
}


