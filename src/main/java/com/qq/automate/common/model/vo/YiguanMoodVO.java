package com.qq.automate.common.model.vo;

import lombok.Builder;
import lombok.Data;

/**
 * 一罐——情绪之海
 */
@Data
@Builder
public class YiguanMoodVO {
    // 名称
    private String name;
    // id
    private String id;
    // 默认是否查询真身用户发的罐头
    private int realEnable;
    // 默认是否查询分身用户发的罐头
    private int shadowEnable;
}
