package com.qq.automate.common.model.vo;

import lombok.Builder;
import lombok.Data;

import java.util.List;

/**
 * 一罐——罐子详情
 */
@Data
@Builder
public class YiguanDiaryVO {
    // 罐头id
    private String id;
    // 罐头内容
    private String text;
    // 图片
    private List<String> photos;
    // 罐头创建时间
    private Long createTime;
    // 情绪之海
    private String mood;
    // 标志--创建时间
    private String score;
    // ip
    private String ipLocation;
    // 用户信息
    private YiguanUserVO user;
    // 专辑信息
    private YiguanAlbumVO album;
}
