package com.qq.automate.common.model.vo;

import lombok.Builder;
import lombok.Data;

/**
 * 一罐——查询最新列表的参数
 */
@Data
@Builder
public class YiguanListVO {
    private Long lastScore;
}
