package com.qq.automate.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.io.Serial;
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

    @Serial
    private static final long serialVersionUID = 9083219220652948894L;

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
     * 默认是否查询这片海下真身用户发的罐头，0：不查询，1：查询
     */
    @TableField("real_enable")
    private int realEnable;

    /**
     * 默认是否查询这片海下分身用户发的罐头，0：不查询，1：查询
     */
    @TableField("shadow_enable")
    private int shadowEnable;

    /**
     * 排序
     */
    @TableField("sort")
    private int sort;

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
