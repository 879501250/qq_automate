package com.qq.automate.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * <p>
 * 机票历史最低价
 * </p>
 *
 * @author Q
 * @since 2024-07-19 13:58:07
 */
@Getter
@Setter
@ToString
@TableName("flight_history_price")
public class FlightHistoryPrice implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 最新查询日期
     */
    @TableField("query_date")
    private LocalDate queryDate;

    /**
     * 出发地
     */
    @TableField("origin")
    private String origin;

    /**
     * 出发日期
     */
    @TableField("depart_date")
    private LocalDate departDate;

    /**
     * 出发日期是星期几
     */
    @TableField("depart_week")
    private String departWeek;

    /**
     * 出发航班
     */
    @TableField("depart_flight_no")
    private String departFlightNo;

    /**
     * 出发时间
     */
    @TableField("depart_time")
    private LocalDateTime departTime;

    /**
     * 目的地
     */
    @TableField("destination")
    private String destination;

    /**
     * 返回日期
     */
    @TableField("return_date")
    private LocalDate returnDate;

    /**
     * 返回日期是星期几
     */
    @TableField("return_week")
    private String returnWeek;

    /**
     * 返回航班
     */
    @TableField("return_flight_no")
    private String returnFlightNo;

    /**
     * 返回时间
     */
    @TableField("return_time")
    private LocalDateTime returnTime;

    /**
     * 价格
     */
    @TableField("price")
    private Integer price;

    /**
     * 类型。1：单程；2：往返
     */
    @TableField("type")
    private Integer type;

    /**
     * 历史查询价格
     */
    @TableField("history_price")
    private String historyPrice;

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
