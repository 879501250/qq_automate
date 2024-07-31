package com.qq.automate.common.model.vo;

import lombok.Builder;
import lombok.Data;

/**
 * 一罐——用户详情
 */
@Data
@Builder
public class YiguanUserVO {
    // 用户id
    private String id;
    // 年龄
    private String age;
    // 性别
    private String gender;
    // 昵称
    private String nickname;
    // ip
    private String ipLocation;
}
