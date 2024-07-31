package com.qq.automate.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * <p>
 * 一罐——情绪之海列表
 * </p>
 *
 * @author Q
 * @since 2024-07-19 13:58:07
 */
@Getter
@Setter
@ToString
@TableName("yiguan_mood")
public class YiguanMood implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 情绪之海名称
     */
    @TableField("name")
    private String name;

    /**
     * 情绪之海id
     */
    @TableField("id")
    private String id;

    /**
     * 更新时间
     */
    @TableField("update_time")
    private LocalDateTime updateTime;

    /**
     * 创建时间
     */
    @TableField("create_time")
    private LocalDateTime createTime;

}
