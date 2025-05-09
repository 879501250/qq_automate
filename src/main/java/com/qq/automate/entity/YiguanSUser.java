package com.qq.automate.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * 一罐——— ss用户
 */
@Getter
@Setter
@ToString
@TableName("yiguan_suser")
public class YiguanSUser implements Serializable {

    @Serial
    private static final long serialVersionUID = -6416161916523301701L;

    /**
     * 用户 id
     */
    @TableId
    @TableField("uid")
    private String uid;
    /**
     * 日记 id
     */
    @TableField("diaryId")
    private String diaryId;
    /**
     * 照片
     */
    @TableField("photos")
    private String photos;
    /**
     * 日记内容
     */
    @TableField("diaryText")
    private String diaryText;
    /**
     * 用户最近活跃时间（以最新罐头发布时间为准）
     */
    @TableField("lastActiveTime")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime lastActiveTime;
}
