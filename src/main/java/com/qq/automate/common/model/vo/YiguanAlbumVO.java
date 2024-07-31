package com.qq.automate.common.model.vo;

import lombok.Builder;
import lombok.Data;

/**
 * 一罐——专辑详情
 */
@Data
@Builder
public class YiguanAlbumVO {
    // 专辑 id
    private String id;

    // 专辑名称
    private String title;

    // 专辑封面
    private String photo;

    // 日记数量
    private Integer diaryNum;

    // 专辑关注人数
    private Integer followNum;

    // 专辑创建时间
    private Long createTime;
}
