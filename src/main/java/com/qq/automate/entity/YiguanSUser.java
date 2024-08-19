package com.qq.automate.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * 一罐——— ss用户
 */
@Getter
@Setter
@ToString
@TableName("yiguan_suser")
public class YiguanSUser {

    private static final long serialVersionUID = 1L;

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
     * 专辑 id
     */
    @TableField("albumIds")
    private String albumIds;
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
}
