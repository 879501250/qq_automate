package com.qq.automate.common.cache;

import com.qq.automate.common.constant.GlobalConstant;

import java.util.Arrays;
import java.util.HashMap;

/**
 * 全局缓存
 */
public class GlobalCache {
    private static HashMap<String, Object> instance = null;

    private GlobalCache() {
    }

    public static HashMap getInstance() {
        // 先判断实例是否存在，若不存在再对类对象进行加锁处理
        if (instance == null) {
            synchronized (GlobalCache.class) {
                init();
            }
        }
        return instance;
    }

    private static void init() {
        if (instance == null) {
            instance = new HashMap<>();
            instance.put(GlobalConstant.CHINA_PROVINCES, Arrays.asList(
                    "北京", "上海", "天津", "重庆", "河北", "山西",
                    "内蒙古", "辽宁", "吉林", "黑龙江", "江苏", "浙江", "安徽",
                    "福建", "江西", "山东", "河南", "湖北", "湖南", "广东", "广西",
                    "海南", "四川", "贵州", "云南", "西藏", "陕西", "甘肃", "青海",
                    "宁夏", "新疆", "台湾", "香港", "澳门"));
        }
    }
}
