package com.qq.automate.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.*;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * <p>
 * 一罐——罐头专辑
 * </p>
 *
 * @author Q
 * @since 2024-07-19 13:58:07
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@TableName("yiguan_album")
public class YiguanAlbum implements Serializable {

    @Serial
    private static final long serialVersionUID = 2077808997336964621L;

    /**
     * 专辑 id
     */
    @TableId
    @TableField("album_id")
    private String albumId;

    /**
     * 用户 id
     */
    @TableField("uid")
    private String uid;

    /**
     * 专辑标题
     */
    @TableField("album_title")
    private String albumTitle;

    /**
     * 关注人数
     */
    @TableField("follow_num")
    private Integer followNum;

    /**
     * 罐头数量
     */
    @TableField("diary_num")
    private Integer diaryNum;

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
