
/* eslint-disable */
import { request } from '@umijs/max';

/** 查询一罐情绪之海列表 */
export async function listAllMood(options?: { [key: string]: any }) {
    return request('/yiguan/listAllMood', {
        method: 'GET',
        ...(options || {}),
    });
}



/** 查询一罐登录凭证 */
export async function getYgt(options?: { [key: string]: any }) {
    return request('/yiguan/getYgt', {
        method: 'GET',
        ...(options || {}),
    });
}