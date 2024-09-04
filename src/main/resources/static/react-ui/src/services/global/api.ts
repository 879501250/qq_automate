
/* eslint-disable */
import { request } from '@umijs/max';

// const url = 'http://localhost:8001';
const url = '';

/** 查询中国所有省、直辖市、自治区 */
export async function getChinaProvinces(options?: { [key: string]: any }) {
    return request(url + '/global/getChinaProvinces', {
        method: 'GET',
        ...(options || {}),
    });
}


