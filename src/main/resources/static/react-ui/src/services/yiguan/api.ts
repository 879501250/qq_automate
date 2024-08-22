
/* eslint-disable */
import { request } from '@umijs/max';

// const url = 'http://localhost:8001';
const url = '';

/** 查询一罐情绪之海列表 */
export async function listAllMood(options?: { [key: string]: any }) {
    return request(url + '/yiguan/listAllMood', {
        method: 'GET',
        ...(options || {}),
    });
}


