package com.qq.automate.common.model.vo;

import lombok.Builder;
import lombok.Data;

/**
 * 一罐投票选项
 */
@Data
@Builder
public class YiguanVoteOptionVO {

    // 男性占比
    private Integer malePercent;
    // 女性占比
    private Integer femalePercent;
    // 选项占比
    private Integer optionPercent;
    // 选项内容
    private String option;
}
