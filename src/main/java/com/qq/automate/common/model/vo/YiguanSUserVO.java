package com.qq.automate.common.model.vo;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class YiguanSUserVO {
    // 用户 id
    private String uid;
    // 日记 id
    private String diaryId;
    // 照片
    private String photos;
    // 日记内容
    private String diaryText;
    // 用户最近活跃时间（以最新罐头发布时间为准）
    private LocalDateTime lastActiveTime;
}
