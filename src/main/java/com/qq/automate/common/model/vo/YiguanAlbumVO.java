package com.qq.automate.common.model.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * 一罐——专辑详情
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
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

    // 专辑更新时间
    private LocalDateTime updateTime;

    // 专辑创建时间
    private LocalDateTime createTime;
}
